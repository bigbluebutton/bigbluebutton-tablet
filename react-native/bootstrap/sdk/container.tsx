/* eslint-disable react-hooks/exhaustive-deps */
import {BigbluebuttonMobile} from 'bigbluebutton-mobile-sdk';
import React from 'react';
import {StyleSheet, Platform, Text} from 'react-native';
import {SdkContainerDiv} from './styles';
import AwesomeAlert from 'react-native-awesome-alerts';
import {useIsFocused} from '@react-navigation/native';
import {useRenderPortal} from '../../app/contexts/renderPortal/hook';
import {colors} from '../../app/styles/colors';
import {ISdkContainer} from './types';

export default function SdkContainer({url, itemNavigate, name}: ISdkContainer) {
  const [renderPortal, setRenderPortal] = React.useState(true);
  const {
    validatePortal,
    setValidatePortal,
    setPortalWantBeRenderized,
    clickNo,
    clickYes,
    showAlert,
  } = useRenderPortal();
  const isFocused = useIsFocused();

  React.useEffect(() => {
    if (!isFocused) {
      if (!clickNo.current) {
        setValidatePortal({name, itemNavigate});
      }
      clickNo.current = false;
    } else {
      setRenderPortal(true);
      setPortalWantBeRenderized({name, itemNavigate});
    }
  }, [isFocused]);

  React.useEffect(() => {
    if (!isFocused && clickYes.current) {
      setRenderPortal(false);
      clickYes.current = false;
    }
  }, [validatePortal]);

  return (
    <>
      {validatePortal ? (
        <AwesomeAlert
          show={showAlert.current}
          showProgress={true}
          title="Atenção"
          message={`Voce tem certeza que deseja sair do portal ${validatePortal.name}`}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="Não, Voltar"
          confirmText="Sim, Continuar"
          confirmButtonColor={colors.primary}
          onCancelPressed={() => {
            clickNo.current = true;
            setValidatePortal(false);
            showAlert.current = false;
            validatePortal.itemNavigate.navigation.navigate(
              validatePortal.name,
            );
          }}
          onConfirmPressed={() => {
            clickYes.current = true;
            setValidatePortal(false);
            showAlert.current = false;
          }}
        />
      ) : null}

      {validatePortal ? <Text>Validando</Text> : null}

      {renderPortal ? (
        <SdkContainerDiv validatePortal={validatePortal}>
          <BigbluebuttonMobile url={url} style={styles.bbb} />
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
