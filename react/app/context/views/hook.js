import React, { useContext } from 'react'
import { ViewContext } from './context';

export const useView = ()=>{
    const context = useContext(ViewContext)
    const { view, setView } = context;
    return {view, setView};
}
 