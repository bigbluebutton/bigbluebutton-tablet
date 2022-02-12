import React from 'react';
import SystemBroadcastPicker from './ios-native-components/BBBN_SystemBroadcastPicker';

const BroadcastPicker = ({children, title}): Node => {
  return <SystemBroadcastPicker style={{marginTop: 50, height: 50, widht: 50, backgroundColor: '#EEE'}} />;
};

export default BroadcastPicker;
