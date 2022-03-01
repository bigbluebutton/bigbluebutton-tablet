import React, { useContext } from 'react'
import { PortalContext } from './context';
type IPortalContext = {
    portals?: any
    setPortals?: any
}

export const usePortal = (): IPortalContext=>{
    const contextOfPortals = useContext(PortalContext);
    return contextOfPortals as IPortalContext;
}