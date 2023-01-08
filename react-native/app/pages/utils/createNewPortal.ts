import AsyncStorage from '@react-native-async-storage/async-storage';
import { IPortal, IPortalProp, IPortalToAdd} from './types';

export async function createNewPortal({
  name,
  url,
  temporary = false
}: IPortal): Promise<IPortal[]> {
  let portalsStorage: IPortalProp = await getPortals();

  if (portalsStorage === null || portalsStorage === '[]')
    return await createFromEmptyStorage({name, url, temporary});

  portalsStorage = parseString(portalsStorage);

  return await addPortalToStorage({portals: portalsStorage, name, url, temporary});
}

async function createFromEmptyStorage({name, url, temporary}:IPortal) {
  await createStorageEmpty();
  let portalsStorage = await getPortals();
  const portalStorage = parseString(portalsStorage!);
  await addPortalToStorage({portals: portalStorage, name, url, temporary});
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
  temporary
}: IPortalToAdd): Promise<IPortal[]> {
  // Copy current elements
  const copyOfPortals = [...portals];

  // Remove elements without changing reference
  portals.length=0;

  // Add all but those with same name of the new
  copyOfPortals.forEach((portal: IPortal)=>{
    if(portal.name == name) return;
    portals.push(portal);
  })

  // Add the new portal
  portals.push({name, url, temporary});

  // Store new list
  await AsyncStorage.setItem('portal', JSON.stringify(portals));
  
  return portals;
}
