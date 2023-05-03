import React, { FunctionComponent } from 'react';
import { StyleProp, TextStyle } from "react-native";

// Styled components
import styled from 'styled-components/native';
import RegularText from '../texts/regularText';
import { ScreenHeight } from '../shared';
import { colors } from '../colors';
import ProfileIcon from '../icons/profileIcon';


const CardView = styled.TouchableOpacity`
  flex-direction: row;
  height: ${ScreenHeight * 0.2}px;
  width: 100%;
  background-color: ${colors.primary};
  border-width: 2px;
  border-color: ${colors.secondary};
  padding: 20px;
  border-radius: 15px;
  elevation: 5;
  shadow-color: ${colors.black};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 4px;
`; // overflow: hidden; removes the shadow-box...

const CardSection = styled.View`
  justify-content: space-evenly;
  align-items: flex-start;

`;

interface Props {
  style?: StyleProp<TextStyle>;
  icon?: string;
  title?: string;
  value?: string;
  onPress?: any;
}

const BalanceCard: FunctionComponent<Props> = (props) => {
  return (
    <CardView {...props}
      onPress={props.onPress}
    >
      <CardSection style={{width: '60%'}}>
        <RegularText textStyle={{fontWeight: 'bold'}}>
          You owe..
        </RegularText>
        <RegularText textStyle={{fontWeight: 'bold', fontSize: 25}}>
          $ 15.41
        </RegularText>
      </CardSection>
      <CardSection style={{width: '40%'}}>
        <ProfileIcon
          firstName='Mathieu'
          lastName='Huet'
          color={colors.primary}
          size={12}
          backgroundColor={colors.accent}
        />
      </CardSection>
    </CardView>
  );
}

export default BalanceCard;