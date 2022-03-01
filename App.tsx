import 'react-native-gesture-handler';
import * as React from 'react';

import { Routes } from './react-native/app/routes/component';
import { PortalContextContainer } from './react-native/app/contexts/portals/container';
import { LogBox } from 'react-native';
import { Bootstrap } from './react-native/bootstrap/start/component';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';

FontAwesomeIcon.getStyledIconSet('brand').loadFont();
FontAwesomeIcon.getStyledIconSet('light').loadFont();
FontAwesomeIcon.getStyledIconSet('regular').loadFont();
FontAwesomeIcon.getStyledIconSet('solid').loadFont();


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
