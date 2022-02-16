import React from 'react'
import { PortalsContext } from './context'

export const PortalsContextProvider = ({children})=>{
    const [ portals, setPortals] = React.useState();

    return (
        <PortalsContext.Provider value={{portals, setPortals}}>
            {children}
        </PortalsContext.Provider>
    )
}