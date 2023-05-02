import React, { FunctionComponent } from 'react';
import { StyleProp, TextStyle } from "react-native";
// Styled components
import styled from 'styled-components/native';
import RegularText from '../texts/regularText';
import { ScreenWidth } from '../shared';
import { colors } from '../colors';


const CardView = styled.TouchableOpacity`
  flex-direction: row;
  height: ${(ScreenWidth / 2) - 35}px;
  width: ${(ScreenWidth / 2) - 35}px;
  border-width: 2px;
  padding: 20px;
  border-radius: 15px;
  elevation: 5;
  shadow-color: ${colors.black};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 4px;
`;



interface Props {
  children?: React.ReactNode;
  style?: StyleProp<TextStyle>;
  text?: string;
  textStyle?: StyleProp<TextStyle>;
  onPress?: any;
}

const SquareCard: FunctionComponent<Props> = (props) => {
  return (
    <CardView 
      style={props.style}
      onPress={props.onPress}
    >
      <RegularText textStyle={props.textStyle}>
        {props.children}
      </RegularText>
    </CardView>
  );
}

export default SquareCard;