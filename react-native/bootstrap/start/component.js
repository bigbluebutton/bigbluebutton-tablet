import React from 'react'
import { Text, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Routes } from '../../app/routes/component';


//This archive is used to envolve app in contexts, libs, etc..
export const Bootstrap = ()=>{
    return (
        <>
            <GestureHandlerRootView>
                <Text>a</Text>
                <Routes/>
            </GestureHandlerRootView>
        </>
    )
}