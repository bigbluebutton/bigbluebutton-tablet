import React from 'react'
import { ViewContext } from './context'


export const ViewContextProvider = ({children})=>{
    const [view, setView] = React.useState(null)

    return (
        <ViewContext.Provider value={{view, setView}}>
            {children}
        </ViewContext.Provider>
    )
}