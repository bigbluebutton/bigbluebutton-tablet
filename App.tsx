import * as React from 'react';

import {StyleSheet, View, Platform, SafeAreaView} from 'react-native';
import {BigbluebuttonMobile} from 'bigbluebutton-mobile-sdk';
import { Bootstrap } from './react-native/bootstrap/start/component';

export default function App() {
  return (
    <SafeAreaView>
      {/* <BigbluebuttonMobile
        broadcastAppBundleId="org.bigbluebutton.mobile.BigBlueButton-Broadcast"
        url="https://bigbluebutton.org"
        style={styles.bbb}
      /> */}
      <Bootstrap/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bbb: {
    marginTop: Platform.select({ios: 20, android: 0}),
    flex: 1,
  },
});
