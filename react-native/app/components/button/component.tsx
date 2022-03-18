import React from 'react';
import {ButtonAppStyle, TextButton} from './styles';

type IButtonApp = {
  children?: object;
  onPress?: Function;
};
export const ButtonApp = ({children, onPress}: IButtonApp) => {
  return (
    <>
      <ButtonAppStyle onPress={onPress}>
        <TextButton>{children}</TextButton>
      </ButtonAppStyle>
    </>
  );
};
