/* eslint-disable @typescript-eslint/no-shadow */
import React from 'react';
import {InputText} from '../../components/input/text/component';
import {
  TextEmptyFileds,
  WrapperInput,
  WrapperStore,
  WrapperStoreContainer,
  WrapperWebView,
} from './styles';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {ButtonApp} from '../../components/button/component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {usePortal} from '../../contexts/portals/hook';
import {IStore} from './types';
import {initTranslation} from '../../translations/index';
import i18next from 'i18next';
import {BigBlueButtonMobile} from 'bigbluebutton-mobile-tablet-sdk';
import {createNewPortal} from '../../utils/createNewPortal';

export const StorePortals = ({navigation, modalizeRef}: IStore) => {
  initTranslation();
  const {portals, setPortals} = usePortal();
  const [name, setName] = React.useState('');
  const [url, setUrl] = React.useState('');
  const [emptyFields, setEmptyFields] = React.useState(false);
  const [nameAlreadyUsed, setNameAlreadyUsed] = React.useState(false);
  const [urlInvalid, setUrlInvalid] = React.useState(false);
  const [loadComponent, setLoadComponent] = React.useState(false);

  async function afterValidationsToCreatePortalAddANew(
    name: string,
    url: string,
  ) {
    const listPortals = await createNewPortal({
      name,
      url,
      temporary: false,
    });
    setPortals(listPortals);
    modalizeRef?.current?.close();
    navigation.navigate(name);
  }

  const validateAndCreateNewPortal = async () => {
    try {
      let portalsFilter = portals.filter(
        (portal: {name: string; url: string}) => {
          if (portal.name != name) return false;
          return portal;
        },
      );
      if (portalsFilter.length >= 1) {
        setNameAlreadyUsed(true);
        return false;
      }
      await afterValidationsToCreatePortalAddANew(name, url);
    } catch (e) {
      console.log('error', e);
      await AsyncStorage.setItem('portal', JSON.stringify([]));
      afterValidationsToCreatePortalAddANew(name, url);
      return null;
    }
  };

  async function onPress() {
    setNameAlreadyUsed(false);
    setEmptyFields(false);
    setUrlInvalid(false);
    if (!name || !url) return setEmptyFields(true);
    if (!url.includes('://')) {
      setUrl('https://' + url);
    }
    setLoadComponent(true);
  }

  const textEmptyFields = () => (
    <>
      {emptyFields ? (
        <TextEmptyFileds>
          {i18next.t('mobileApp.portals.addPortalPopup.validation.emptyFilds')}
        </TextEmptyFileds>
      ) : null}
      {urlInvalid ? (
        <TextEmptyFileds>
          {i18next.t('mobileApp.portals.addPortalPopup.validation.urlInvalid')}
        </TextEmptyFileds>
      ) : null}
      {nameAlreadyUsed ? (
        <TextEmptyFileds>
          {i18next.t(
            'mobileApp.portals.addPortalPopup.validation.portalNameAlreadyExists',
          )}
        </TextEmptyFileds>
      ) : null}
    </>
  );
  const onErrorLoadUrl = () => {
    setUrlInvalid(true);
    setLoadComponent(false);
  };

  const loadComponentOnValidateUrl = () => {
    if (!loadComponent)
      return (
        <ButtonApp onPress={onPress}>
          <Text>
            {i18next.t('mobileApp.portals.addPortalPopup.confirm.button.label')}
          </Text>
        </ButtonApp>
      );

    return (
      <View>
        <ActivityIndicator />
        <WrapperWebView>
          <BigBlueButtonMobile
            url={url}
            style={styles.bbb}
            onError={(content: any) => onErrorLoadUrl()}
            onSuccess={() => validateAndCreateNewPortal()}
          />
        </WrapperWebView>
      </View>
    );
  };

  return (
    <>
      <WrapperStoreContainer>
        <WrapperStore>
          {textEmptyFields()}

          <WrapperInput>
            <InputText
              autoCapitalize={'none'}
              autoCorrect={false}
              value={name}
              onChangeText={(e: any) => setName(e)}
              placeholder={i18next.t(
                'mobileApp.portals.fields.name.placeholder',
              )}
              label={i18next.t('mobileApp.portals.fields.name.label')}
            />
          </WrapperInput>
          <WrapperInput>
            <InputText
              autoCapitalize={'none'}
              autoCorrect={false}
              value={url}
              onChangeText={(e: any) => setUrl(e)}
              placeholder={'https://demo.bigbluebutton.org'}
              label={i18next.t('mobileApp.portals.fields.url.label')}
            />
          </WrapperInput>
          <WrapperInput>{loadComponentOnValidateUrl()}</WrapperInput>
        </WrapperStore>
      </WrapperStoreContainer>
    </>
  );
};

const styles = StyleSheet.create({
  bbb: {
    marginTop: 48,
    flex: 1,
  },
});
