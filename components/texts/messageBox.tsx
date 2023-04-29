import React, { FunctionComponent } from 'react';
import { StyleProp, TextStyle } from "react-native";
// Styled components
import styled from 'styled-components/native';
import { colors } from '../colors';


const StyledText = styled.Text`
  font-size: 13px;
  color: ${colors.failure};
  text-align: center;
`;

interface MessageBoxProps {
  children: React.ReactNode;
  textStyle?: StyleProp<TextStyle>;
}

const MessageBox: FunctionComponent<MessageBoxProps> = (props) => {
  return (
    <StyledText style={props.textStyle}>
      { props.children }
    </StyledText>
  );
}

export default MessageBox;