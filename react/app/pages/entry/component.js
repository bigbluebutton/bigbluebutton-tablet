import React from 'react';
import {  Text, TextInput, View } from 'react-native';
import { ButtonApp } from '../../components/button/component';
import { InputForText } from '../../components/Input/text/component';
import { WrapperButtons, WrapperInput } from './styles';
import { colors } from '../../styles/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';




export const Entry = () => {
    const [name, setName] = React.useState(null);
    const [url, setUrl] = React.useState(null);
    const [rooms, setRooms] = React.useState(null);

    async function addRoom(){
        console.log(AsyncStorage)
        const room = {name,url}
        const jsonRoom = JSON.stringify(room)
        try { 
            //await AsyncStorage.setItem('rooms', jsonRoom)
            //await AsyncStorage.setItem('rooms', jsonRoom)
            await AsyncStorage.setItem('rooms', jsonRoom)
            
        } catch (e) {
            console.log(e)
        }
    }

    async function listRooms(){
        try {
            const jsonValue = await AsyncStorage.getItem('rooms')
            console.log(jsonValue)
            return jsonValue != null ? setRooms(JSON.parse(jsonValue)) : null;
          } catch(e) {
            console.log(e)
          }
    }

    React.useEffect(()=>{
        listRooms();
    }, [])

    return (
        <View>
            <WrapperInput>
               
                <InputForText 
                    onChange={(e)=>setName(e)} 
                    value={name}
                    name="Name" 
                    placeholder="Gustavo.."
                />

                <InputForText 
                    onChange={(e)=>setUrl(e)} 
                    value={url}
                    name="Web Addres (URL)" 
                    placeholder="www.bigbluebutton.com"
                /> 

                <WrapperButtons>
                    <ButtonApp onPress={addRoom} colorapp={colors.danger}>Cancel</ButtonApp>     
                    <ButtonApp onPress={addRoom}>Add</ButtonApp>     
                </WrapperButtons>
            </WrapperInput>
            
        </View>
    )
}