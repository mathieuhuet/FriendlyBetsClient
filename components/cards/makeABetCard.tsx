import React, { FunctionComponent } from 'react';
import { StyleProp, TextStyle } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
// Styled components
import styled from 'styled-components/native';
import RegularText from '../texts/regularText';
import SmallText from '../texts/smallText';
import { ScreenHeight, ScreenWidth } from '../shared';
import { colors } from '../colors';


const CardView = styled.TouchableOpacity`
  flex-direction: row;
  height: ${(ScreenWidth / 2) - 35}px;
  width: ${(ScreenWidth / 2) - 35}px;
  background-color: ${colors.purple};
  border-width: 2px;
  padding: 20px;
  border-radius: 15px;
  elevation: 5;
  shadow-color: ${colors.black};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 4px;
`; // overflow: hidden; removes the shadow-box...

const CardSection = styled.View`
  justify-content: space-between;
  align-items: flex-start;

`;

interface MakeABetCardProps {
  style?: StyleProp<TextStyle>;
  icon?: string;
  title?: string;
  value?: string;
}

const MakeABetCard: FunctionComponent<MakeABetCardProps> = (props) => {
  return (
    <CardView {...props}>
      <CardSection>
        <RegularText textStyle={{fontWeight: 'bold', fontSize: 32}}>
          Make a bet
        </RegularText>
      </CardSection>
    </CardView>
  );
}

export default MakeABetCard;