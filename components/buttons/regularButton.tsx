import React, { FunctionComponent } from 'react';
import { StyleProp, TextStyle } from "react-native";
// Styled components
import styled from 'styled-components/native';
import { colors } from '../colors';
import RegularText from '../texts/regularText';


const ButtonView = styled.TouchableOpacity`
  padding: 15px;
  background-color: ${colors.accent};
  width: 100%;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  height: 60px;
  align-self: center;
`;

interface Props {
  children: React.ReactNode;
  onPress?: any;
  textStyle?: StyleProp<TextStyle>;
  style?: StyleProp<TextStyle>;
  disabled?: Boolean
}

const RegularButton: FunctionComponent<Props> = (props) => {
  return (
    <>
      {props.disabled &&       
      <ButtonView style={props.style}>
        <RegularText
          textStyle={[{color: colors.primary}, props.textStyle]}
        >
          {props.children}
        </RegularText>
      </ButtonView>}
      {!props.disabled && 
      <ButtonView style={props.style} onPress={props.onPress}>
        <RegularText
          textStyle={[{color: colors.primary}, props.textStyle]}
        >
          {props.children}
        </RegularText>
      </ButtonView>}
    </>
  );
}

export default RegularButton;