import {BigbluebuttonMobile} from 'bigbluebutton-mobile-sdk';
import React from 'react';
import {StyleSheet, View, Platform} from 'react-native';
type ISdkContainer = {
  url: string;
  props?: any;
};
export default function SdkContainer({url}: ISdkContainer) {
  return (
    <>
      <View style={styles.container}>
        <BigbluebuttonMobile url={url} style={styles.bbb} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  bbb: {
    marginTop: Platform.select({ios: 20, android: 0}),
    flex: 1,
  },
});
