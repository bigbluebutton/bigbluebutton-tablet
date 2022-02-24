import 'react-native-gesture-handler';
import * as React from 'react';

import { StyleSheet, Platform, LogBox } from 'react-native';
import { Routes } from './react-native/app/routes/component';
import { PortalContextContainer } from './react-native/app/contexts/portals/container';

export default function App() {
  React.useEffect(()=>{
    LogBox.ignoreLogs([
      "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
    ]);
  })
  return (
    <>
      <PortalContextContainer>
        <Routes/>
      </PortalContextContainer>
    </>
  );
}
