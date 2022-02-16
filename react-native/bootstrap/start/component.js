import React from 'react'
import { Text, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export const Bootstrap = ()=>{
    return (
        <>
            <GestureHandlerRootView>
                <View>
                    <Text>Bootstrap</Text>
                </View>
            </GestureHandlerRootView>
        </>
    )
}