import * as React from 'react';
import { Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ListPortals } from '../pages/list_portals/component';
import { usePortal } from '../contexts/portals/hook';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  createDrawerNavigator,
} from '@react-navigation/drawer';
import SdkContainer from '../../bootstrap/sdk/container';

const Drawer = createDrawerNavigator();
export const Routes = ()=>{

  
  const {portals, setPortals} = usePortal()
  async function getPortals(){
      try{          
          let items = await AsyncStorage.getAllKeys()
          if(items.includes('portal')){              
              let portalsStorage = await AsyncStorage.getItem('portal')
              portalsStorage = JSON.parse(portalsStorage)
              setPortals(portalsStorage)
          } else {
              Alert.alert('Portals', 'Dont have Portals in Storage')
          }
      } catch(e){
          console.log('error', e)
          return null
      }      
  }

  React.useEffect(()=>{   
    getPortals()
  }, [])

  return (
      
      <NavigationContainer>
        <Drawer.Navigator 
            initialRouteName="Portals"
            screenOptions={{ 
              headerShown: false
          }}
        >
          
          <Drawer.Screen name="Portals" component={ListPortals} />         
          { 
            portals || portals != 0 ?
            portals.map((item)=>{
              return <Drawer.Screen key={item.name} name={item.name} children={()=> (<SdkContainer url={item.url}/>)}/>
            }) : null
          }

        </Drawer.Navigator>
      </NavigationContainer>
  );
}


export const RoutesContainer = ()=>{

  return(

    <>
        <Routes/>
    </>
  )
}