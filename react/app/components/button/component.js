import React from 'react'
import { Text } from 'react-native'
import { ButtonStyle, TextButton } from './styles'

export const ButtonApp = ({children, colorapp, onPress})=>{
    return (
        <>
            <ButtonStyle onPress={onPress} colorapp={colorapp}>
                <TextButton>{children}</TextButton>
            </ButtonStyle>
        </>
    )
}