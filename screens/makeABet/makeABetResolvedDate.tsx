import React, { FunctionComponent, useState, useEffect, useContext } from 'react';
import styled from 'styled-components/native';
import { View } from 'react-native';
import { Formik } from 'formik';
import { ActivityIndicator } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button, Text } from 'react-native';


// Custom components
import MainContainer from '../../components/containers/mainContainer';
import LargeText from '../../components/texts/largeText';
import { ScreenHeight } from '../../components/shared';
import { colors } from '../../components/colors';
import MessageBox from '../../components/texts/messageBox';
import background from '../../assets/backgrounds/card_background_v1.png';
import RegularButton from '../../components/buttons/regularButton';
import KeyboardAvoidingContainer from '../../components/containers/keyboardAvoidingContainer';
import RegularText from '../../components/texts/regularText';
import { makeABet } from '../../services/betServices/makeABet';


const Background = styled.Image`
  width: 100%;
  height: ${ScreenHeight * 0.6}px;
  position: absolute;
  bottom: -1px;
`;



const MakeABetResolvedDate: FunctionComponent = ({navigation, route}) => {
  const [message, setMessage] = useState('');
  const betText = route.params;
  const [date, setDate] = useState(new Date());


  const handleNewBet = () => {
    setMessage('');
    if (true) {
      const bet = {...betText, resolvedDate: date}
      navigation.navigate('MakeABetLastDate', bet);
    }
  }

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  return (
    <MainContainer style={{paddingTop: 0, paddingLeft: 0, paddingRight: 0, backgroundColor: colors.purple}} >
      <Background source={background} />
      <KeyboardAvoidingContainer>
        <MainContainer style={{backgroundColor: 'transparent'}}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%'
            }}
          >
            <LargeText textStyle={{fontWeight: 'bold', color: colors.tertiary, marginTop: 20, marginBottom: 20}}>
              Which date will this bet be resolved?
            </LargeText>  

              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={'date'}
                display='inline'
                onChange={onChange}
                minimumDate={new Date()}
                accentColor={colors.primary}
              />
            
            <LargeText textStyle={{fontWeight: 'bold', color: colors.tertiary, marginTop: 20, marginBottom: 20}}>
              At what time?
            </LargeText>  

            <View
              style={{backgroundColor: colors.tertiary, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 5, borderRadius: 5}}
            >
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={'time'}
                is24Hour={true}
                onChange={onChange}
                style={{alignSelf: 'center'}}
              />
            </View>


            <MessageBox
              textStyle={{ marginBottom: 20, marginTop: 20 }}
            >
              { message || ' ' }
            </MessageBox>
            <RegularButton
              onPress={handleNewBet}
              style={{marginBottom: 10, backgroundColor: colors.primary}}
              textStyle={{color: colors.purple, fontSize: 20}}
            >
              Next
            </RegularButton>
          </View>
        </MainContainer>
      </KeyboardAvoidingContainer>
    </MainContainer>
  );
}

export default MakeABetResolvedDate;