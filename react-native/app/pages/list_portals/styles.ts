import styled from 'styled-components/native'
import { colors } from '../../styles/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SwipeListView } from 'react-native-swipe-list-view';


export const WrapperListContainer = styled.SafeAreaView`
    background-color: ${colors.secundary};
    flex: 1 ;
    justify-content: center;
    align-items: center;
`;

export const WrapperList = styled.FlatList`
    background-color: ${colors.primary};
    width: 95%;

    border-radius: 10px;
`

export const WrapperItemListText = styled.TouchableOpacity.attrs(props=>({
    activeOpacity: 1
}))`

    width: 300px;
    padding: 5px;
    margin: 3% auto;
    height: 80px;
    background-color: ${colors.primary_light};
    border-radius: 10px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
export const WrapperItemListView = styled.View`
    display: flex;
    flex: 1;
    background-color: black;

    padding: 10px;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 100px;
    width: 200px;

`

export const ItemList = styled.Text`
    color: #fff;
    padding: 2px;
    font-size: 16px;

    font-weight: ${(props)=>(props.bold ? 'bold': 'normal')};
    
`


export const TextItem = styled.Text`
    font-size: 18px;
`

export const WrapperViewAdd = styled.View`
    background-color: ${colors.primary};
    margin: 70px 0px 0px 0px;
    
`

export const ButtonOpen = styled.TouchableOpacity`
    padding: 10px;
    background-color: ${colors.primary};
    width: 300px;
    margin: 10px;
    border-radius: 10px;
    
    align-items: center;
    justify-content: center;


`

export const TextButtonOpen = styled.Text`
    color: #fff;
    font-size: 20px;
    font-weight: bold;
`


export const TextWithoutPortal = styled.Text`
    color: ${(props)=> (props.color ? colors.primary_light:  colors.primary)};
    font-size: 20px;
    text-align: center;
`

export const ButtonDelete = styled.TouchableOpacity`
    background-color: ${colors.white};
    border-radius: 10px;
    margin: 3% auto;
    width: 100%;
    height: 80px;
    
    justify-content: center;
    align-items: center;
   
    flex-direction: row;
    
`

export const DivButtonDelete = styled.View`
    width: 100px;
    align-items: center;
    justify-content: center;
    margin: 3% 0px;
    align-content: center;
    justify-items: center;

    
`

export const DivDelete = styled.View`
    width: 300px;
    justify-content: flex-end;
    align-items: flex-end;
`