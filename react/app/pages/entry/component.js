import React from 'react';
import { View } from 'react-native';
import { ButtonApp } from '../../components/button/component';
import { TextInput as ReactTextInput } from '../../components/Input/text/component';
import { WrapperButtons, WrapperInput } from './styles';
import { colors } from '../../styles/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';




export const Entry = () => {
    const [name, setName] = React.useState(null);
    const [url, setUrl] = React.useState(null);
    const [rooms, setRooms] = React.useState(null);

    async function addPortal(){
        const portal = {name,url}
        const jsonPortal = JSON.stringify(portal)
        try { 
            await AsyncStorage.setItem('portal', jsonPortal)
            
        } catch (e) {
            console.log(e)
        }
    }

    async function listPortals(){
        try {
            const jsonValue = await AsyncStorage.getItem('portal')
            return jsonValue != null ? setRooms(JSON.parse(jsonValue)) : null;
          } catch(e) {
            console.log(e)
          }
    }

    React.useEffect(()=>{
        listPortals();
    }, [])

    return (
        <View>
            <WrapperInput>
               
                <ReactTextInput 
                    onChange={(e)=>setName(e)} 
                    value={name}
                    name="Name" 
                    placeholder="Deme Server"
                />

                <ReactTextInput 
                    onChange={(e)=>setUrl(e)} 
                    value={url}
                    name="Web Addres (URL)" 
                    placeholder="https://demo.bigbluebutton.org"
                /> 

                <WrapperButtons>
                    <ButtonApp colorapp={colors.danger}>Cancel</ButtonApp>     
                    <ButtonApp onPress={addPortal}>Add</ButtonApp>     
                </WrapperButtons>
            </WrapperInput>
            
        </View>
    )
}