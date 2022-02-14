import React from 'react';
import SystemBroadcastPicker from './ios/native-components/BBBN_SystemBroadcastPicker';
import {Platform, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  broacastPicker: {
    ...Platform.select({
      ios: {
        marginTop: 50,
        height: 50,
        widht: 50,
        backgroundColor: '#EEE',
      },
    }),
  },
});

const Header = ({children, title}): Node => {
  return Platform.select({
    ios: <SystemBroadcastPicker style={styles.broacastPicker} />,
    android: null

  });
};

export default Header;
