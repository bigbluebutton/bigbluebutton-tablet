import React from 'react'
import { LabelInput, WrapperInputText } from './styles';

type IInputText = {
    children?: object;
    placeholder: string;
    label: string;
    onChangeText?: any,
    value?: any
    autoCapitalize?: "none"
}
export const InputText = (props: IInputText)=>{

    const {children, placeholder, label, onChangeText, value, autoCapitalize} = props

    return (
        <>
            <LabelInput>{props.label}</LabelInput>
            <WrapperInputText autoCapitalize={props.autoCapitalize} value={props.value} onChangeText={props.onChangeText} placeholder={props.placeholder}></WrapperInputText>          
        </>
    )
}