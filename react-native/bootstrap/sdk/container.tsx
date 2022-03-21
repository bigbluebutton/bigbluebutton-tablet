import {BigbluebuttonMobile} from 'bigbluebutton-mobile-sdk';
import React from 'react';
import {StyleSheet, View, Platform} from 'react-native';
import { SdkContainerDiv } from './styles';
type ISdkContainer = {
  url: string;
  props?: any;
};
export default function SdkContainer({url}: ISdkContainer) {
  return (
    <>
      <SdkContainerDiv>
        <BigbluebuttonMobile url={url} style={styles.bbb} />
      </SdkContainerDiv>
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
