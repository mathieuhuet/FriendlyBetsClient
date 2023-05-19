import React, { FunctionComponent, useState, useEffect, useContext } from 'react';
import styled from 'styled-components/native';
import { View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { UserContext } from '../../context/user/userContext';



// Custom components
import MainContainer from '../../components/containers/mainContainer';
import LargeText from '../../components/texts/largeText';
import { ScreenHeight } from '../../components/shared';
import { colors } from '../../components/colors';
import MessageBox from '../../components/texts/messageBox';
import background from '../../assets/backgrounds/card_background_v1.png';
import RegularButton from '../../components/buttons/regularButton';
import KeyboardAvoidingContainer from '../../components/containers/keyboardAvoidingContainer';
import { makeABet } from '../../services/betServices/makeABet';
import StyledView from '../../components/views/styledView';


const Background = styled.Image`
  width: 100%;
  height: ${ScreenHeight * 0.6}px;
  position: absolute;
  bottom: -1px;
`;



const MakeABet5: FunctionComponent = ({navigation, route}) => {
  const user = useContext(UserContext);
  const [message, setMessage] = useState('');
  const [isResolvedDate, setIsResolvedDate] = useState(false);
  const [resolvedDate, setResolvedDate] = useState(null);
  const betData = route.params;
  const [date, setDate] = useState(new Date(betData.bettingEndAt));

  useEffect(() => {
    if (betData.betResolvedAt) {
      setResolvedDate(new Date(betData.betResolvedAt));
      setIsResolvedDate(true);
    }
  }, [betData])



  const handleNewBet = async () => {
    try {
      setMessage('');
      // call backend and move to next page if successful
      if (new Date () > date) {
        setMessage('Date invalid');
      } else {
        const bet = {...betData, bettingEndAt: Date.parse(date), createdAt: Date.parse(new Date())}
        const result = await makeABet(bet, user.accessToken)
        if (result.data) {
          navigation.navigate('MakeABet6', result.data);
        }
      }
    } catch (err) {
      console.log(err);
      setMessage(err.message);
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
            
            <LargeText textStyle={{color: colors.tertiary, marginTop: 20, textAlign: 'left', width: '100%'}}>
              OK, the last day to make a bet is on
            </LargeText> 
            <LargeText textStyle={{fontWeight: 'bold', color: colors.tertiary, marginBottom: 20, textAlign: 'left', width: '100%'}}>
              {date.toDateString()}
            </LargeText>  

            <LargeText textStyle={{fontWeight: 'bold', color: colors.tertiary, marginTop: 20, marginBottom: 20}}>
              At what time?
            </LargeText>  

            <StyledView
              style={{backgroundColor: colors.tertiary, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 5, width: '80%'}}
            >
            {isResolvedDate ? 
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={'time'}
              display='spinner'
              is24Hour={true}
              onChange={onChange}
              style={{alignSelf: 'center', width: '80%'}}
              minimumDate={new Date()}
              maximumDate={new Date(resolvedDate)}
            /> :
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={'time'}
              display='spinner'
              is24Hour={true}
              onChange={onChange}
              style={{alignSelf: 'center', width: '80%'}}
              minimumDate={new Date()}
            />
            }
            </StyledView>

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

export default MakeABet5;