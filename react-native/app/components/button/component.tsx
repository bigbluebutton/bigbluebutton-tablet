import React from 'react'
import { Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { ButtonAppStyle, TextButton } from './styles';

type IButtonApp = {
    children?: object
    onPress?: Function
}
export const ButtonApp = ({children, onPress}:IButtonApp)=>{
    return (
        <>
            <ButtonAppStyle onPress={onPress}>
                <TextButton>{children}</TextButton>
            </ButtonAppStyle>
            
        </>
    )
}