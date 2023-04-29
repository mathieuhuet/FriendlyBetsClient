import React, { FunctionComponent } from 'react';
import { StyleProp, TextStyle } from "react-native";
// Styled components
import styled from 'styled-components/native';
import { colors } from '../colors';


const StyledText = styled.Text`
  font-size: 15px;
  color: ${colors.tertiary};
  text-align: left;
`;

interface RegularTextProps {
  children: React.ReactNode;
  textStyle?: StyleProp<TextStyle>;
}

const RegularText: FunctionComponent<RegularTextProps> = (props) => {
  return (
    <StyledText style={props.textStyle}>
      { props.children }
    </StyledText>
  );
}

export default RegularText;