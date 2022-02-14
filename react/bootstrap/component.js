import React from 'react'
import { HeaderApp } from '../app/components/header/component'

import { Entry } from '../app/pages/entry/component'

import { BootstrapWrapper } from './styles'

export const Bootstrap = ()=>{
    return (
        <BootstrapWrapper>
            <HeaderApp/>
            <Entry/>
        </BootstrapWrapper>
    )
}