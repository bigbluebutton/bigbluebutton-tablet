import React from 'react';
import { View } from 'react-native';
import { ButtonApp } from '../../../components/button/component';
import { TextInput as ReactTextInput } from '../../../components/Input/text/component';
import { WrapperButtons, WrapperInput } from './styles';
import { colors } from '../../../styles/colors';
import { usePortal } from '../../../context/portals/hook';


export const EntryStore = () => {
    const [name, setName] = React.useState(null);
    const [url, setUrl] = React.useState(null);
    const { getPortals, setPortalsHook } = usePortal()

    async function addPortal(){
        const portal = {name, url}
        await setPortalsHook(portal)
        console.log(await getPortals())
    }   
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