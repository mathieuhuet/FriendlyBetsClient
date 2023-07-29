import React, { FunctionComponent, useState } from 'react';
import { StyleProp, TextStyle, View, ViewStyle } from "react-native";

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
  shadow-color: ${colors.black};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 4px;
  elevation: 5;
`;


interface Props {
  multiline?: boolean;
  keyboardType?: any;
  inputFieldStyle?: StyleProp<View>;
  placeholder?: string;
  onChangeText?: any;
  onBlur?: any;
  onFocus?: any;
  value?: any;
  style?: StyleProp<ViewStyle>;
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
      style={[{width: '100%'}, props.style]}
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