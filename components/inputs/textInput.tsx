import React, { FunctionComponent, useState } from 'react';
import { StyleProp, TextStyle, View } from "react-native";

// Styled components
import styled from 'styled-components/native';
import { colors } from '../colors';



const InputField = styled.TextInput`
  background-color: ${colors.primary};
  padding: 15px;
  border-radius: 10px;
  font-size: 16px;
  height: 60px;
  margin-top: 3px;
  margin-bottom: 10px;
  color: ${colors.tertiary};
  border-color: ${colors.secondary};
  border-width: 2px;
`;


interface Props {
  multiline?: boolean;
  keyboardType?: any;
  inputFieldStyle?: StyleProp<TextStyle>;
  placeholder?: string;
  onChangeText?: any;
  onBlur?: any;
  onFocus?: any;
  value?: any;
}

const TextInput: FunctionComponent<Props> = (props) => {
  const [inputBackgroundColor, setInputBackgroundColor] = useState(colors.primary);

  const customOnBlur = () => {
    props?.onBlur;
    setInputBackgroundColor(colors.primary);
  }

  const customOnFocus = () => {
    props?.onFocus;
    setInputBackgroundColor(colors.secondary);
  }

  return (
    <View
      style={{width: '100%'}}
    >
      <InputField
        keyboardType={props.keyboardType}
        placeholder={props.placeholder}
        placeholderTextColor={colors.lightGray}
        style={[{backgroundColor: inputBackgroundColor}, props.inputFieldStyle]}
        onBlur={customOnBlur}
        onFocus={customOnFocus}
        onChangeText={props.onChangeText}
        spellCheck={false}
        multiline={props.multiline}
      />
    </View>
  );
}

export default TextInput;