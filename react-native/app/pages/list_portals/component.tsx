import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {
  BlockTextWithoutPortal,
  ButtonDelete,
  ButtonOpen,
  DivButtonDelete,
  DivDelete,
  ItemList,
  TextButtonOpen,
  TextWithoutPortal,
  WrapperItemListText,
  WrapperListContainer,
  WrapperViewAdd,
} from './styles';
import {usePortal} from '../../contexts/portals/hook';
import {Modalize} from 'react-native-modalize';
import {StorePortals} from '../store_portals/component';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {colors} from '../../styles/colors';
import {SwipeListView} from 'react-native-swipe-list-view';
import {IHandles} from 'react-native-modalize/lib/options';
import {IItem, IItemDelete, IListPortalsDTO} from './types';
import i18next from 'i18next';
import {initTranslation} from '../../translations/index';
import {createNewPortal} from '../../utils/createNewPortal';

export const ListPortals = ({navigation}: IListPortalsDTO) => {
  initTranslation();
  const icon = (
    <FontAwesome5 color={colors.white} solid size={18} name={'plus'} />
  );
  const {portals, setPortals} = usePortal();
  async function getPortals() {
    try {
      let items = await AsyncStorage.getAllKeys();
      if (items.includes('portal')) {
        let portalsStorage = await AsyncStorage.getItem('portal');
        portalsStorage = JSON.parse(portalsStorage as string);
        setPortals(portalsStorage);
      } else {
        console.log('Error: Dont Have Portals Storage');
      }
    } catch (e) {
      console.log('error', e);
    }
  }

  React.useEffect(() => {
    getPortals();
  }, []);

  const modalizeRef = React.useRef<Modalize>(null);

  const onOpen = () => modalizeRef.current?.open();

  const DeleteItem = async (item: IItemDelete) => {
    try {
      let items = await AsyncStorage.getAllKeys();
      if (items.includes('portal')) {
        let portalsStorage = await AsyncStorage.getItem('portal');
        portalsStorage = JSON.parse(portalsStorage as string);
        const newPortalStorage = portalsStorage?.filter(
          (portalItem: IItemDelete) => {
            if (item.name === portalItem.name) {
              return false;
            }
            return portalItem;
          },
        );

        await AsyncStorage.setItem('portal', JSON.stringify(newPortalStorage));
        setPortals(newPortalStorage);
      } else {
        console.log('Error: Dont have Portals in Storage');
      }
    } catch (e) {
      console.log('error', e);
    }
  };

  const onPress = (namePortal: string) => navigation.navigate(namePortal);

  const onPressTextCreateDemoServer = async () => {
    const nameDemoServer = 'Demo Server';
    const urlDemoServer = 'https://demo-ios.bigbluebutton.org';

    const listPortals = await createNewPortal({
      name: nameDemoServer,
      url: urlDemoServer,
    });

    setPortals(listPortals);
    navigation.navigate(nameDemoServer);
  };

  const Item = ({namePortal, url}: IItem) => (
    <WrapperItemListText onPress={() => onPress(namePortal)}>
      <ItemList bold>{namePortal}</ItemList>
      <ItemList>{url}</ItemList>
    </WrapperItemListText>
  );

  return (
    <WrapperListContainer>
      <ButtonOpen onPress={onOpen}>
        <TextButtonOpen>
          {i18next.t('mobileApp.portals.list.add.button.label')} {icon}
        </TextButtonOpen>
      </ButtonOpen>

      <Modalize ref={modalizeRef} adjustToContentHeight={true}>
        <WrapperViewAdd>
          <StorePortals
            modalizeRef={modalizeRef as unknown as IHandles}
            navigation={navigation}
          />
        </WrapperViewAdd>
      </Modalize>

      {portals && portals.length != 0 ? (
        <SwipeListView
          useFlatList={true}
          data={portals}
          renderItem={rowData => (
            <Item
              onPress={onPress}
              key={rowData.index}
              namePortal={rowData.item.name}
              url={rowData.item.url}
            />
          )}
          renderHiddenItem={rowData => (
            <DivDelete>
              <DivButtonDelete>
                <ButtonDelete
                  onPress={() => DeleteItem(rowData.item as IItemDelete)}>
                  <FontAwesome5
                    size={20}
                    color={colors.primary}
                    name={'trash'}
                  />
                </ButtonDelete>
              </DivButtonDelete>
            </DivDelete>
          )}
          leftOpenValue={0}
          rightOpenValue={-80}
          disableRightSwipe={true}
          closeOnRowPress={true}
          closeOnRowOpen={true}
          onRowOpen={(rowKey, rowMap) => {
            //This timeout is recommended https://github.com/jemise111/react-native-swipe-list-view/blob/master/docs/migrating-to-flatlist.md
            setTimeout(() => {
              if (rowMap[rowKey] != undefined) {
                rowMap[rowKey].closeRow();
              }
            }, 3000);
          }}
        />
      ) : (
        <>
          <BlockTextWithoutPortal>
            <TextWithoutPortal>
              {i18next.t('mobileApp.portals.list.empty.addFirstPortal.label') +
                ' '}
              <TextWithoutPortal
                onPress={() => onPressTextCreateDemoServer()}
                color={true}>
                {i18next.t(
                  'mobileApp.portals.list.empty.orUseOurDemoServer.label',
                )}
              </TextWithoutPortal>
            </TextWithoutPortal>
          </BlockTextWithoutPortal>
        </>
      )}
    </WrapperListContainer>
  );
};
