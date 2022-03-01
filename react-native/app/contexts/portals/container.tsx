import React from 'react'
import { PortalContext } from './context'
type IPortalContext = {
    portals?: any
    setPortals?: any
}

export const PortalContextContainer = ({children}: any)=>{
    const [portals, setPortals] = React.useState(0)
    const portalHook: IPortalContext = {portals, setPortals}
    return (
        <>
            <PortalContext.Provider value={portalHook}>
                {children}
            </PortalContext.Provider>
        </>
    )

}