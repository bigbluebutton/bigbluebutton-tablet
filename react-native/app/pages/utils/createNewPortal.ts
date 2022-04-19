import AsyncStorage from '@react-native-async-storage/async-storage';
import {ICreatePortal, IPortal, IPortalProp, IPortalToAdd} from './types';

export async function createNewPortal({
  name,
  url,
}: ICreatePortal): Promise<IPortal[]> {
  let portalsStorage: IPortalProp = await getPortals();

  if (portalsStorage === null || portalsStorage === '[]')
    return await createFromEmptyStorage(name, url);

  portalsStorage = parseString(portalsStorage);

  return await addPortalToStorage({portals: portalsStorage, name, url});
}

async function createFromEmptyStorage(name: string, url: string) {
  await createStorageEmpty();
  let portalsStorage = await getPortals();
  const portalStorage = parseString(portalsStorage!);
  await addPortalToStorage({portals: portalStorage, name, url});
  return portalStorage;
}

async function getPortals(): Promise<string | null> {
  return await AsyncStorage.getItem('portal');
}

async function createStorageEmpty() {
  await AsyncStorage.setItem('portal', JSON.stringify([]));
}

function parseString(portalsStorage: string): Array<IPortal> {
  return (portalsStorage = JSON.parse(portalsStorage));
}

async function addPortalToStorage({
  portals,
  name,
  url,
}: IPortalToAdd): Promise<IPortal[]> {
  portals.push({name, url});
  await AsyncStorage.setItem('portal', JSON.stringify(portals));
  return portals;
}
