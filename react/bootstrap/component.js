import React from 'react'
import { HeaderApp } from '../app/components/header/component'

import { BootstrapWrapper } from './styles'
import { EntryContainer } from '../app/pages/entry/container';
import { ViewContextProvider } from '../app/context/views/provider';
import { PortalsContextProvider } from '../app/context/portals/provider';

export const Bootstrap = ()=>{
    return (
        <ViewContextProvider>
            <PortalsContextProvider>
                <BootstrapWrapper>
                    <HeaderApp/>
                    <EntryContainer/>
                </BootstrapWrapper>
            </PortalsContextProvider>
        </ViewContextProvider>
    )
}