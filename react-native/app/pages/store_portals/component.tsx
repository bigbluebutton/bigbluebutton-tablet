import React from 'react';
import {InputText} from '../../components/input/text/component';
import {
  TextEmptyFileds,
  WrapperInput,
  WrapperStore,
  WrapperStoreContainer,
} from './styles';
import {Text} from 'react-native';
import {ButtonApp} from '../../components/button/component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {usePortal} from '../../contexts/portals/hook';
import {IStore} from './types';
import {initTranslation} from '../../translations/index';
import i18next from 'i18next';

export const StorePortals = ({navigation, modalizeRef}: IStore) => {
  initTranslation();
  const {portals, setPortals} = usePortal();
  const [name, setName] = React.useState('');
  const [url, setUrl] = React.useState('');
  const [emptyFields, setEmptyFields] = React.useState(false);
  const [nameAlreadyUsed, setNameAlreadyUsed] = React.useState(false);

  async function newPortal(name: string, url: string) {
    let portalsStorage;
    portalsStorage = await AsyncStorage.getItem('portal');
    portalsStorage = portalsStorage ? JSON.parse(portalsStorage) : null;
    portalsStorage.push({name, url});
    AsyncStorage.setItem('portal', JSON.stringify(portalsStorage));
    setPortals(portalsStorage);
    modalizeRef?.current?.close();
    navigation.navigate(name);
  }

  async function onPress() {
    //return false;
    if (!name || !url) return setEmptyFields(true);
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
      await newPortal(name, url);
    } catch (e) {
      console.log('error', e);
      await AsyncStorage.setItem('portal', JSON.stringify([]));
      newPortal(name, url);
      return null;
    }
  }

  const textEmptyFields = () => (
    <>
      {emptyFields ? (
        <TextEmptyFileds>
          {i18next.t('mobileApp.portals.addPortalPopup.validation.emptyFilds')}
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
              placeholder={i18next.t(
                'mobileApp.portals.fields.url.placeholder',
              )}
              label={i18next.t('mobileApp.portals.fields.url.label')}
            />
          </WrapperInput>
          <WrapperInput>
            <ButtonApp onPress={onPress}>
              <Text>
                {i18next.t(
                  'mobileApp.portals.addPortalPopup.confirm.button.label',
                )}
              </Text>
            </ButtonApp>
          </WrapperInput>
        </WrapperStore>
      </WrapperStoreContainer>
    </>
  );
}
