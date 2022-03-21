import React from 'react';
import {LabelInput, WrapperInputText} from './styles';

type IInputText = {
  children?: object;
  placeholder: string;
  label: string;
  onChangeText?: any;
  value?: any;
  autoCapitalize?: 'none';
  autoCorrect?: false | true;
  autoComplete?: 'off';
  allowFontScaling?: true | false;
};
export const InputText = (props: IInputText) => {
  const {
    children,
    placeholder,
    label,
    onChangeText,
    value,
    autoCapitalize,
    autoCorrect,
    autoComplete,
    allowFontScaling,
  } = props;

  return (
    <>
      <LabelInput>{label}</LabelInput>
      <WrapperInputText
        allowFontScaling={allowFontScaling}
        autoComplete={autoComplete}
        autoCorrect={autoCorrect}
        autoCapitalize={autoCapitalize}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
      />
    </>
  );
};
