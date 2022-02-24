import React from 'react'
import { InputText } from '../../components/input/text/component';
import { TextEmptyFileds, WrapperInput, WrapperStore, WrapperStoreContainer } from './styles';
import { Text } from 'react-native';
import { ButtonApp } from '../../components/button/component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { usePortal } from '../../contexts/portals/hook';
import { IStore } from './types';

export const StorePortals = ({navigation, modalizeRef}:IStore)=>{
    const {portals, setPortals} = usePortal()
    const [name, setName] = React.useState('');
    const [url, setUrl] = React.useState('');
    const [emptyFields, setEmptyFields] = React.useState(false);

    async function newPortal(name:string, url:string){
        let portalsStorage;
        portalsStorage = await AsyncStorage.getItem('portal')            
        portalsStorage = portalsStorage ? JSON.parse(portalsStorage) : null            
        portalsStorage.push({name, url})            
        AsyncStorage.setItem('portal', JSON.stringify(portalsStorage))            
        setPortals(portalsStorage)
        modalizeRef?.current?.close();
        navigation.navigate(name)
    }

    async function onPress(){

        if(!name || !url) return setEmptyFields(true)
        try{
            await newPortal(name, url )
        } catch(e){
            console.log('error', e)
            await AsyncStorage.setItem('portal', JSON.stringify([]))
            newPortal(name, url )
            return null
        }
    }

    const textEmptyFields = ()=>(
        <>
            {   
                emptyFields ?
                <TextEmptyFileds>Empty Fields</TextEmptyFileds>
                : null
            }
        </>
    )
    
    return (
        <>      
            <WrapperStoreContainer> 
                <WrapperStore>
                    {textEmptyFields()}
                    <WrapperInput>
                        <InputText value={name} onChangeText={(e:any)=>setName(e)} placeholder='Demo Server' label='Portal Name'/>                       
                    </WrapperInput>
                    <WrapperInput>
                        <InputText value={url} onChangeText={(e:any)=>setUrl(e)} placeholder='https://bigbluebutton.org/' label='Server URL'/>                       
                    </WrapperInput>
                    <WrapperInput>
                        <ButtonApp onPress={onPress}><Text>Add</Text></ButtonApp>
                    </WrapperInput>
                </WrapperStore>
            </WrapperStoreContainer>   
        </>
    )
}