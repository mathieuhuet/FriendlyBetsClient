import React, { FunctionComponent } from 'react';
import { StyleProp, TextStyle } from "react-native";
// Styled components
import styled from 'styled-components/native';
import { StatusBarHeight } from '../shared';
import { colors } from '../colors';


const StyledView = styled.View`
  flex: 1;
  padding: 25px;
  padding-top: ${StatusBarHeight + 25}px;
  background-color: ${colors.primary};
`;

interface MainContainerProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
}

const MainContainer: FunctionComponent<MainContainerProps> = (props) => {
  return (
    <StyledView {...props}>
      { props.children }
    </StyledView>
  );
}

export default MainContainer;