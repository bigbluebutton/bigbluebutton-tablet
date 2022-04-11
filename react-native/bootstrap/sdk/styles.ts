import styled from 'styled-components/native';

export const SdkContainerDiv = styled.SafeAreaView`
  flex: 1;
  flex-direction: row;
  opacity: ${props => (props.validatePortal ? '.1' : '1')};
`;
