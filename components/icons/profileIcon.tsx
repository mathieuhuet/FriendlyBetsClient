import React, { FunctionComponent } from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
// Styled components
import styled from 'styled-components/native';
import { colors } from '../colors';
import { ScreenHeight } from '../shared';


const IconBackground = styled.View`
  width: ${ScreenHeight * 0.1}px;
  height: ${ScreenHeight * 0.1}px;
  border-radius: 100%;
  justify-content: center;
  align-items: center;
  align-self: center;
`;

const IconInitials = styled.Text`
  font-size: ${ScreenHeight * 0.05}px;
  text-align: center;
`;

interface Props {
  firstName: string;
  lastName?: string;
  color: string;
  backgroundColor: string;
  police?: string;
  size: number;
}

const ProfileIcon: FunctionComponent<Props> = (props) => {
  const circleSize = ScreenHeight * (props.size / 100);
  const fontSize = ScreenHeight * (props.size / 200);
  return (
    <IconBackground style={{backgroundColor: props.backgroundColor, width: circleSize, height: circleSize}}>
      <IconInitials style={{color: props.color, fontSize: fontSize}}>
        {props.firstName[0]}{props.lastName ? props.lastName[0] : ''}
      </IconInitials>
    </IconBackground>
  );
}

export default ProfileIcon;