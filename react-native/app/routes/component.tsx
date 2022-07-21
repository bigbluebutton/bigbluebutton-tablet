import * as React from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {ListPortals} from '../pages/list_portals/component';
import {usePortal} from '../contexts/portals/hook';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18next from 'i18next';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SdkContainer from '../container-webview-sdk/container';
import {initTranslation} from '../translations/index';
import {Alert, Linking} from 'react-native';
import {createNewPortal} from '../utils/createNewPortal';
import {IPortal} from '../utils/types';

const DeepLink = () => {
  initTranslation();

  const SCHEME = 'bigbluebutton://';
  const SCHEME_DEFAULT = 'https://';
  var NAME_PORTALS_DEEP_LINK = i18next.t(
    'mobileApp.portals.namePortal.deepLink',
  );

  const navigate = useNavigation();
  const {portals, setPortals} = usePortal();

  async function createTemporaryPortalFromDeepLink(link: string) {
    const linkWithoutScheme = link.replace(SCHEME, '');

    if (linkWithoutScheme === '') {
      navigate.navigate(
        i18next.t('mobileApp.portals.drawerNavigation.button.label'),
      );
      return Alert.alert(i18next.t('mobileApp.portals.handleWithoutURL'));
    }

    let roomNameWithBar = linkWithoutScheme.match(/^[A-z-.\w]+\//);
    if (!roomNameWithBar) {
      navigate.navigate(
        i18next.t('mobileApp.portals.drawerNavigation.button.label'),
      );
      return Alert.alert(i18next.t('mobileApp.portals.handleWithoutURL'));
    }
    let roomName = roomNameWithBar[0].replace(/\//, '');

    if (roomName != 'bigbluebutton') {
      NAME_PORTALS_DEEP_LINK = roomName;
    }
    let linkWhitoutSchemeAndName = linkWithoutScheme.replace(
      /^[A-z-.\w]+\//,
      '',
    );

    if (!linkWhitoutSchemeAndName.includes('://')) {
      linkWhitoutSchemeAndName = SCHEME_DEFAULT + linkWhitoutSchemeAndName;
    }
    const portalToAdd: IPortal = {
      name: NAME_PORTALS_DEEP_LINK,
      url: linkWhitoutSchemeAndName,
      temporary: true,
    };

    // Adding LinkedPortal to AsyncStorage
    const newPortals = await createNewPortal(portalToAdd);
    // Adding to context
    setPortals(newPortals);
    // Navigation to portal
    navigate.navigate(NAME_PORTALS_DEEP_LINK);
  }

  async function checkIfHaveTemporaryPortal() {
    let portalsParsed: IPortal[] | null = null;
    try {
      let items = await AsyncStorage.getAllKeys();
      if (items.includes('portal')) {
        const portalsFromStorage = await AsyncStorage.getItem('portal');
        portalsParsed = portalsFromStorage
          ? JSON.parse(portalsFromStorage)
          : null;
      } else {
        console.log('Error: Dont Have Portals Storage');
      }
    } catch (e) {
      console.log('error', e);
    }

    if (!portalsParsed) {
      return;
    }
    const portalsWithoutTemporary = portalsParsed.filter((portal: IPortal) => {
      if (portal.temporary == true) return false;
      if (portal.name == NAME_PORTALS_DEEP_LINK) return false;
      return portal;
    });
    await AsyncStorage.setItem(
      'portal',
      JSON.stringify(portalsWithoutTemporary),
    );
    setPortals(portalsWithoutTemporary);

    getLinkFromAppClosed(); //To app running in backgrond then open throug deep link
    Linking.addEventListener('url', url => {
      // if app is open when it's minimized (not running in background)
      createTemporaryPortalFromDeepLink(url.url);
    });
  }

  async function getLinkFromAppClosed() {
    const linkFromAppClosed = await Linking.getInitialURL();
    if (linkFromAppClosed === null) return;
    createTemporaryPortalFromDeepLink(linkFromAppClosed);
  }

  React.useEffect(() => {
    checkIfHaveTemporaryPortal();
  }, []);
  return null;
};

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
      <DeepLink />
      <Drawer.Navigator
        initialRouteName={i18next.t(
          'mobileApp.portals.drawerNavigation.button.label',
        )}
        screenOptions={{
          headerShown: false,
        }}>
        <Drawer.Screen
          name={i18next.t('mobileApp.portals.drawerNavigation.button.label')}
          component={ListPortals}
        />
        {portals && portals.length
          ? portals.map(
              (item: {name: React.Key | null | undefined; url: string}) => {
                return (
                  <Drawer.Screen
                    key={item.name}
                    name={item.name}
                    children={() => <SdkContainer url={item.url} />}
                  />
                );
              },
            )
          : null}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
