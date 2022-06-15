import {
    NativeModules,
    NativeEventEmitter,
} from 'react-native';

const {
    ReactNativeEventEmitter,
} = NativeModules;


export const emitter: NativeEventEmitter =  new NativeEventEmitter(
    ReactNativeEventEmitter
)
  
