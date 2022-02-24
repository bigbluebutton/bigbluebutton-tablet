import styled from 'styled-components/native';
import { colors } from '../../styles/colors';


export const ButtonAppStyle = styled.TouchableHighlight`
    height: 50px;
    font-size: 22px;
    background-color: ${colors.primary_light};
    border-radius: 5px;
    align-items: center;
    justify-content: center;
`

export const TextButton = styled.Text`
    font-size: 22px;
    font-weight: bold;
    color: #fff;

`