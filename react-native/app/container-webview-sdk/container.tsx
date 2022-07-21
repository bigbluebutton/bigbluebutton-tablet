import {BigBlueButtonMobile} from 'bigbluebutton-mobile-tablet-sdk';
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
        <BigBlueButtonMobile url={url} style={styles.bbb} onError={()=>console.log('error')} onSuccess={()=>console.log('success')}/>
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
