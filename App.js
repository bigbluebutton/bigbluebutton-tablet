/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';

import {
  SafeAreaView,
} from 'react-native';


import { Bootstrap } from './react/bootstrap/component';


const App: () => Node = () => {
  return (
    <>      
      <SafeAreaView>
        <Bootstrap/>
      </SafeAreaView>
    </>
  );
};

export default App;
