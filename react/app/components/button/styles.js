import styled from 'styled-components/native';
import { colors } from '../../styles/colors';



export const ButtonStyle = styled.Pressable`
    padding: 10px 30px 10px 30px; 
    margin-top: 30px;
    border-radius: 5px;
    background-color: ${props=> props.colorapp ?? colors.default_button};
`


export const TextButton = styled.Text`
    font-size: 18px;
    color: #FFF;
    font-weight: bold;
`