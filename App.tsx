import 'react-native-gesture-handler';
import * as React from 'react';

import {StyleSheet, View, Platform, SafeAreaView} from 'react-native';
import {BigbluebuttonMobile} from 'bigbluebutton-mobile-sdk';
import { Bootstrap } from './react-native/bootstrap/start/component';
import { Routes } from './react-native/app/routes/component';

export default function App() {
  return (
    <>
        <Routes/>
    </>
  );
}

const styles = StyleSheet.create({
  bbb: {
    marginTop: Platform.select({ios: 20, android: 0}),
    flex: 1,
  },
});
