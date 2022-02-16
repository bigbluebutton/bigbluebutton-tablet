import { useContext } from 'react';
import { PortalsContext } from './context';
import { getAsyncStorage } from '../../utils/getAsyncStorage';
import { setAsyncStorage } from '../../utils/setAsyncStorage';

export const usePortal = ()=>{

    const {portals, setPortals} = useContext(PortalsContext);

    const getPortals = async()=>{
        try {
            const portalsStorage = await getAsyncStorage('portal');        
            setPortals(portalsStorage)            
            return portalsStorage
        } catch(e){
            console.log(e)
            return false
        }
        
    }

    const setPortalsHook = async(value)=>{
        try{
            console.log('value', value)
            await setAsyncStorage('portal', value)
            const portalsStorage = await getAsyncStorage('portal');
            setPortals(portalsStorage)
            return portalsStorage
        } catch(e){
            console.log(e)
            return false
        }
        
    }

    return {getPortals, setPortalsHook}
}