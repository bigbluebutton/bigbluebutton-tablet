import React from 'react';

import { NameInput, InputForTextStyle, WrapperInputForText } from './styles';


export const TextInput = ({name, placeholder, onChange, value})=>{
    return (
        <>
            <WrapperInputForText>
                <NameInput>{name}</NameInput>
                <InputForTextStyle onChangeText={onChange} value={value} placeholder={placeholder}/>
            </WrapperInputForText>
        </>
    )
}