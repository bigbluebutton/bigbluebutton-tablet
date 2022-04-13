import AsyncStorage from "@react-native-async-storage/async-storage";
import { usePortal } from "../../contexts/portals/hook";

export async function new_portal_name_and_url(name: string, url: string): Promise<object | Error> {
    try{
        let portalsStorage;
        portalsStorage = await AsyncStorage.getItem('portal');
        portalsStorage = portalsStorage ? JSON.parse(portalsStorage) : null;
        portalsStorage.push({name, url});
        AsyncStorage.setItem('portal', JSON.stringify(portalsStorage));        
        return portalsStorage
    } catch(error){
        return Error("Error when try create a new portal")
    }
}