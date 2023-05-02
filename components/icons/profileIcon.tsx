import React, { FunctionComponent } from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
// Styled components
import styled from 'styled-components/native';
import { colors } from '../colors';
import { ScreenHeight } from '../shared';


const IconBackground = styled.View`
  width: ${ScreenHeight * 0.15}px;
  height: ${ScreenHeight * 0.15}px;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  align-self: center;
`;

const IconInitials = styled.Text`
  font-size: 32px;
  text-align: center;
`;

interface Props {
  firstName: string;
  lastName?: string;
  color: string;
  police?: string;
  size: number;
  style?: StyleProp<TextStyle>;
}

const ProfileIcon: FunctionComponent<Props> = (props) => {
  return (
    <IconBackground style={props.style}>
      <IconInitials style={{color: props.color}}>
        {props.firstName[0]}{props.lastName ? props.lastName[0] : ''}
      </IconInitials>
    </IconBackground>
  );
}

export default ProfileIcon;