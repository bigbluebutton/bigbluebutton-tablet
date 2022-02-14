import styled from "styled-components/native";

export const InputForTextStyle = styled.TextInput.attrs(props=>({placeholder: props.placeholder}))`
    padding: 10px 20px 10px 20px;

    background-color: #FFF;
    color: #000;
    border-radius: 10px;
    margin: 5px 0px;
`
export const NameInput = styled.Text`
    color: #FFF;
    font-size: 18px;
`

export const WrapperInputForText = styled.View`
    margin: 20px 0px;
    flex-direction: column;    
`