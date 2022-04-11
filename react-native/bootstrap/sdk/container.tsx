/* eslint-disable react-hooks/exhaustive-deps */
import {BigBlueButtonMobile} from 'bigbluebutton-mobile-sdk';
import React from 'react';
import {StyleSheet, Platform, Text, View} from 'react-native';
import {SdkContainerDiv} from './styles';
import AwesomeAlert from 'react-native-awesome-alerts';
import {useIsFocused} from '@react-navigation/native';
import {useRenderPortal} from '../../app/contexts/renderPortal/hook';
import {colors} from '../../app/styles/colors';
import {ISdkContainer} from './types';
import i18next from 'i18next';
import { initTranslation } from '../../app/translations';
export default function SdkContainer({url, itemNavigate, name}: ISdkContainer) {
  initTranslation()
  const [renderPortalValidation, setRenderPortalValidation] = React.useState(true);
  const {
    renderPortal, setRenderPortal
  } = useRenderPortal();
  const isFocused = useIsFocused();
  React.useEffect(() => {

    if (!isFocused) {
      //Check if clickNo is active to enable modal,
      //because if portal which desrender is background during validation after choose anyone
      //cannot set a new validation
      if (!renderPortal.clickNo) { 
        setRenderPortal({
          type: "InitValidateModal",
          payload: {name, itemNavigate}
        });
      }
      setRenderPortal({type: "ClickNoFalse"})
    } else {
      setRenderPortalValidation(true);
    }
  }, [isFocused]);

  React.useEffect(() => {
    if (!isFocused && renderPortal.clickYes) {
      setRenderPortal({type: "ClickYesFalse"})
      setRenderPortalValidation(false);
    }

  }, [renderPortal.validatePortal]);

  return (
    <>

      {renderPortal.validatePortal ? (
        <AwesomeAlert
          show={renderPortal.showAlert}
          showProgress={true}
          title={`${i18next.t('mobileApp.portals.changePortal.validation.modal.title')}`}
          message={`${i18next.t('mobileApp.portals.changePortal.validation.modal.message')} ${renderPortal.validatePortal.name}?`}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText={`${i18next.t('mobileApp.portals.changePortal.validation.modal.button.no')}`}
          confirmText={`${i18next.t('mobileApp.portals.changePortal.validation.modal.button.yes')}`}
          confirmButtonColor={colors.primary}
          onCancelPressed={() => {
            setRenderPortal({
              type: "ClickNoModal"
            })
            renderPortal.validatePortal.itemNavigate.navigation.navigate(
              renderPortal.validatePortal.name,
            );
          }}
          onConfirmPressed={() => {            
            setRenderPortal({
              type: "ClickYesModal"
            })            
          }}
        />
      ) : null}

      {renderPortalValidation ? (
        <SdkContainerDiv validatePortal={renderPortal.validatePortal}>
          <BigBlueButtonMobile url={url} style={styles.bbb} />
        </SdkContainerDiv>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  bbb: {
    marginTop: Platform.select({ios: 20, android: 0}),
    flex: 1,
  },
});
