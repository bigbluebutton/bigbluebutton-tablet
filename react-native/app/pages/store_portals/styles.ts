import styled from 'styled-components/native';
import {colors} from '../../styles/colors';

export const WrapperStoreContainer = styled.View`
  background-color: ${colors.white};
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const WrapperStore = styled.View`
  background-color: ${colors.primary};
  width: 80%;
  height: 95%;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 5px;
  padding-top: 20px;
`;

export const WrapperInput = styled.View`
  background-color: transparent;
  width: 80%;
  height: 100px;
  margin: 20px;
`;
export const TextEmptyFileds = styled.Text`
  color: ${colors.danger};
`;

export const WrapperWebView = styled.View`
  width: 10px;
`;

export const TextTest = styled.Text`
  color: ${colors.white};
`;
