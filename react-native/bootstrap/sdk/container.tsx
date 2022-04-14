import { useIsFocused } from '@react-navigation/native';
import {BigBlueButtonMobile} from 'bigbluebutton-mobile-sdk';
import React from 'react';
import {StyleSheet, View, Platform} from 'react-native';
import { SdkContainerDiv } from './styles';
type ISdkContainer = {
  url: string;
  props?: any;
};
export default function SdkContainer({url}: ISdkContainer) {
  const isPortalFocused = useIsFocused()
  return (
    <>
      {isPortalFocused ? 
      <SdkContainerDiv>
        <BigBlueButtonMobile url={url} style={styles.bbb} onError={()=>console.log('error')} onSuccess={()=>console.log('success')}/>
      </SdkContainerDiv> :
      null }
      
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
