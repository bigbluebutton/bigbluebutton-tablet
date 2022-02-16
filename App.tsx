import * as React from 'react';

import {StyleSheet, View, Platform} from 'react-native';
import {BigbluebuttonMobile} from 'bigbluebutton-mobile-sdk';

export default function App() {
  return (
    <View style={styles.container}>
      <BigbluebuttonMobile
        broadcastAppBundleId="org.bigbluebutton.mobile-sdk.example.BigBlueButtonMobileSdkBroadcastExample"
        url="https://demo.bigbluebutton.org/gl"
        style={styles.bbb}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  bbb: {
    marginTop: Platform.select({ios: 48, android: 0}),
    flex: 1,
  },
});
