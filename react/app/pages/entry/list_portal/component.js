import React from 'react'
import { WrapperListPortals } from './styles'
import { getAsyncStorage } from '../../../utils/getAsyncStorage';
import { usePortal } from '../../../context/portals/hook';

export const ListPortals = ()=>{
    
    async function getPortals(){
        const {getPortals} = usePortal()
        const portals = getPortals()
        console.log(portals)
    }
    React.useEffect(()=>{
        (async()=>{
            await getPortals()
        })        
    }, [])
    return (
        <>
            <WrapperListPortals>

            </WrapperListPortals>
        </>
    )
}