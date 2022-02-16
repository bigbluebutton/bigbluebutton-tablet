import React from 'react'
import { EntryStore } from './store_portal/component'
import { ListPortals } from './list_portal/component';
import { ActivityIndicator } from 'react-native';
import { useView } from '../../context/views/hook';
import { usePortal } from '../../context/portals/hook';

export const EntryContainer = ()=>{
    const {view, setView} = useView();
    const {getPortals} = usePortal()

    const entryComponent = async ()=>{
        setTimeout(async ()=>{
                const portals = await getPortals()
                if(false) {
                    return setView(<ListPortals/>)
                } else {
                    return setView(<EntryStore/>)
                }
        }, 3000)
        
    }
    React.useEffect(()=>{
        entryComponent();
    }, [])

    return (
        <>
            {view ?? <ActivityIndicator/>}
 
        </>
    )
}