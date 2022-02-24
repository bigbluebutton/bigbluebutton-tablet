import { DrawerScreenProps } from '@react-navigation/drawer';
export type IItem = {
    url: string;
    namePortal: string;
}

export type IListPortalsDTO = {
    navigation: DrawerScreenProps
}

export type IItemDelete = { 
    name: string;
    url: string
}