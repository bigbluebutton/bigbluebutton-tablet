import 'react-native-gesture-handler';
import * as React from 'react';

import { Routes } from './react-native/app/routes/component';
import { PortalContextContainer } from './react-native/app/contexts/portals/container';
import { LogBox } from 'react-native';
import { Bootstrap } from './react-native/bootstrap/start/component';




export default function App() {
  React.useEffect(()=>{    
    LogBox.ignoreAllLogs();
  }, [])

  return (
    <> 
      
        <Bootstrap/>
      
    </>
  ); 
}
