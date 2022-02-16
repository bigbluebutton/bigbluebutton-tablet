import AsyncStorage from '@react-native-async-storage/async-storage';
export const getAsyncStorage = async (name)=>{
    try{

        const portals = await AsyncStorage.getItem(name)       
        return portals != null ? JSON.parse(portals) : null; 
    }catch(e){
        return false
    }
}