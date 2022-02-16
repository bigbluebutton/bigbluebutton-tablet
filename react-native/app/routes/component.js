import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { ListPortals } from '../pages/list_portals/component';

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

function Test(){
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button title="Go back home" />
        </View>
    )
}

const Drawer = createDrawerNavigator();
export const Routes = ()=>{
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Portals"  screenOptions={{ headerShown: false}}>
        <Drawer.Screen name="Portals" component={ListPortals} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />

        {['1','2'].map((item)=>{
            return <Drawer.Screen key={item} name={item} component={NotificationsScreen} />
        })}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}