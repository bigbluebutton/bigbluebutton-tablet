import * as React from 'react';
import { NavigationContainer, useNavigation} from '@react-navigation/native';
import {ListPortals} from '../pages/list_portals/component';
import {usePortal} from '../contexts/portals/hook';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18next from 'i18next';

import {createDrawerNavigator} from '@react-navigation/drawer';
import SdkContainer from '../../bootstrap/sdk/container';
import {initTranslation} from '../translations/index';
import { Alert, Linking } from 'react-native';
import { createNewPortal } from '../pages/utils/createNewPortal';
import { emitter } from '../emitter/emitter';
import { IPortal } from '../pages/utils/types';

const DeepLink = ()=>{
  initTranslation();

  const SCHEME = 'bigbluebutton-tablet://';
  var lastDeepLinkPortalName:String|undefined = undefined;

  const navigation = useNavigation();
  const {portals, setPortals} = usePortal();

  function decodeUrlParameter(str:string) {
    return decodeURIComponent(str.replace(/\+/g, '%20'));
  }

  async function createPortalFromDeepLink(link: string){
    const linkWithoutScheme = link.replace(SCHEME, '').replace(/\+/g, ' ');

    if(linkWithoutScheme === ''){
      navigation.navigate(i18next.t('mobileApp.portals.drawerNavigation.button.label'))
      return Alert.alert(i18next.t('mobileApp.portals.handleWithoutURL'))
    }

    const linkParts = linkWithoutScheme.split('/https://');
    let portalName = linkParts[0];
    let portalLink = linkParts[1];

    if(!portalName || !portalLink) {
      navigation.navigate(i18next.t('mobileApp.portals.drawerNavigation.button.label'))
      return Alert.alert(i18next.t('mobileApp.portals.handleWithoutURL'))
    }

    portalName=decodeUrlParameter(portalName);
    portalLink= 'https://' + decodeUrlParameter(portalLink);
    portalLink=portalLink.replace(/%20/g, '+');

    // Join links are temporary (discarded on next app launch)
    const isTemporary = portalLink.includes('/bigbluebutton/api/join?');

    const portalToAdd:IPortal = {
      name: portalName,
      url: portalLink,
      temporary: isTemporary
    }

    lastDeepLinkPortalName = portalName;

    // Adding LinkedPortal to AsyncStorage
    const newPortals = await createNewPortal(portalToAdd)
    
    // Adding to context
    setPortals(newPortals)

    // Navigate to it
    navigation.navigate(lastDeepLinkPortalName);
  }

  async function checkIfHaveTemporaryPortal(){
    let portalsParsed: IPortal[]|null = null;
    try {
      let items = await AsyncStorage.getAllKeys();

      // If portal storage is empty, initialize it
      if(!items.includes('portal')) {
        await AsyncStorage.setItem('portal', JSON.stringify([]));
      }
      
      const portalsFromStorage = await AsyncStorage.getItem('portal')
      portalsParsed = portalsFromStorage ?  JSON.parse(portalsFromStorage) : null
    } catch (e) {
      console.log('error', e);
    }
          
    if(!portalsParsed){
      console.error("Invalid portal storage: ", portalsParsed);
      return;
    }

    // Clear temporary portals from previous executions
    const portalsWithoutTemporary = portalsParsed.filter((portal: IPortal)=>{
      if(portal.temporary == true) return false;
      if(portal.name == lastDeepLinkPortalName) return false;
      return portal;
    });
    await AsyncStorage.setItem('portal', JSON.stringify(portalsWithoutTemporary));
    setPortals(portalsWithoutTemporary);

    // Handle app launch with link
    getLinkFromAppLaunch();

    // Handle link when app is running
    Linking.addEventListener('url', (url)=>{
      createPortalFromDeepLink(url.url);
    });

  }

  async function getLinkFromAppLaunch(){
    const linkFromAppClosed = await Linking.getInitialURL();
    if(linkFromAppClosed === null) return;
    createPortalFromDeepLink(linkFromAppClosed);
  }

  React.useEffect(() => {
    checkIfHaveTemporaryPortal();
  }, []);

  return null;
}

const Drawer = createDrawerNavigator();
export const Routes = () => {
  initTranslation();
  const {portals, setPortals} = usePortal();
  async function getPortals() {
    try {
      let items = await AsyncStorage.getAllKeys();
      if (items.includes('portal')) {
        let portalsStorage = await AsyncStorage.getItem('portal');
        portalsStorage = JSON.parse(portalsStorage);
        setPortals(portalsStorage);
      }
    } catch (e) {
      console.log('error', e);
      return null;
    }
  }
  
  React.useEffect(() => {
    getPortals();
  }, []);

  return (
    <NavigationContainer>
      <DeepLink/>
      <Drawer.Navigator
        initialRouteName={i18next.t('mobileApp.portals.drawerNavigation.button.label')}
        screenOptions={{
          headerShown: false,
        }}>
        <Drawer.Screen
          name={i18next.t('mobileApp.portals.drawerNavigation.button.label')}
          component={ListPortals}
        />
        {portals && portals.length
          ? portals.map((item: { name: React.Key | null | undefined; url: string; }) => {
              return (
                <Drawer.Screen
                  key={item.name}
                  name={item.name}
                  children={() => <SdkContainer url={item.url} />}
                />
              );
            })
          : null}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
