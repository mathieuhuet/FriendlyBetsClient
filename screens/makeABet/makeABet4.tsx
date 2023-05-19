import React, { FunctionComponent, useState, useEffect, useContext } from 'react';
import styled from 'styled-components/native';
import { View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';


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
import StyledView from '../../components/views/styledView';



const Background = styled.Image`
  width: 100%;
  height: ${ScreenHeight * 0.6}px;
  position: absolute;
  bottom: -1px;
`;



const MakeABet4: FunctionComponent = ({navigation, route}) => {
  const [message, setMessage] = useState('');
  const [resolvedDate, setResolvedDate] = useState(null);
  const betData = route.params;
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    if (betData.betResolvedAt) {
      setResolvedDate(new Date(betData.betResolvedAt));
    }
  }, [betData])


  const handleNewBet = () => {
    setMessage('');
    if (!date) {
      setMessage('Date invalid');
    } else {
      const bet = {...betData, bettingEndAt: Date.parse(date)}
      navigation.navigate('MakeABet5', bet);
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
              alignItems: 'flex-start',
              width: '100%'
            }}
          >
            {resolvedDate && 
            <>
              <RegularText
                textStyle={{color: colors.tertiary, textAlign: 'left', width: '100%'}}
              >
                The bet will be resolved on
              </RegularText>
              <RegularText
                textStyle={{color: colors.tertiary, width: '100%', textAlign: 'left', fontWeight: 'bold'}}
              >
                {resolvedDate.toDateString()} at {resolvedDate.toLocaleTimeString()}
              </RegularText>
            </>    
            }
            


            <LargeText textStyle={{fontWeight: 'bold', color: colors.tertiary, marginTop: 5, marginBottom: 20}}>
              When's the last day for someone to cast their bet?
            </LargeText>  

            {resolvedDate ? 
            <StyledView
              style={{backgroundColor: colors.tertiary}}
            >
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={'date'}
                display='inline'
                onChange={onChange}
                minimumDate={new Date()}
                maximumDate={new Date(resolvedDate)}
              /> 
            </StyledView>
            :
            <StyledView
              style={{backgroundColor: colors.tertiary}}
            >
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={'date'}
                display='inline'
                onChange={onChange}
                minimumDate={new Date()}
              />
            </StyledView>
            }



            <MessageBox
              textStyle={{ marginBottom: 20 }}
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

export default MakeABet4;