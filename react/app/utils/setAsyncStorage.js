import AsyncStorage from '@react-native-async-storage/async-storage';

export const setAsyncStorage = async (name, value)=>{
    let valueAdd = {};
    try{

        const storage = await AsyncStorage.getItem(name)   

        const storeOld = storage != null ? JSON.parse(storage) : null; 

        valueAdd = JSON.stringify(storeOld)


        const jsonWithStorageAdd = await AsyncStorage.setItem(name, valueAdd)       

        return jsonWithStorageAdd
    }catch(e){
        return false
    }
}