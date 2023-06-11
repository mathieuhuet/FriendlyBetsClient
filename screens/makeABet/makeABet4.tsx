import React, { FunctionComponent, useState } from 'react';
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
import StyledView from '../../components/views/styledView';
import StyledCheckBox from '../../components/inputs/styledCheckBox';
import RegularText from '../../components/texts/regularText';

const Background = styled.Image`
  width: 100%;
  height: ${ScreenHeight * 0.6}px;
  position: absolute;
  bottom: -1px;
`;



const MakeABet4: FunctionComponent = ({navigation, route}) => {
  const [message, setMessage] = useState('');
  const betData = route.params;
  const [date, setDate] = useState(new Date(betData.bettingEndAt));
  const [check, setCheck] = useState(false);



  const handleNewBet = async () => {
    setMessage('');
    if (check) {
      date.setHours(0,0,0);
    }
    if (new Date () > date) {
      setMessage('' + date.toDateString() + ' at ' + date.toLocaleTimeString() + ' is not valid date, nobody will be able to join a bet that is already over.');
    } else {
      const bet = {...betData, bettingEndAt: Date.parse(date), createdAt: Date.parse(new Date())}
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
              alignItems: 'center',
              width: '100%'
            }}
          >
            
            <LargeText textStyle={{color: colors.tertiary, marginTop: 20, textAlign: 'left', width: '100%'}}>
              OK, the last day to make a bet is on
            </LargeText> 
            <LargeText textStyle={{fontWeight: 'bold', color: colors.tertiary, marginBottom: 10, textAlign: 'left', width: '100%'}}>
              {date.toDateString()}
            </LargeText>  

            <LargeText textStyle={{fontWeight: 'bold', color: colors.tertiary, marginBottom: 20, backgroundColor: colors.primary, padding: 5}}>
              At what time?
            </LargeText>

            
            <StyledCheckBox
              isChecked={check}
              setChecked={() => setCheck(!check)}
              name={'selfDateResolving'}
              boxColor={colors.primary}
              style={{padding: 12}}
            >
              <RegularText textStyle={{textAlign: 'left', fontWeight: 'bold', fontSize: 24}}>
                At midnight
              </RegularText>
            </StyledCheckBox>

            <StyledView
              style={{backgroundColor: colors.tertiary, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 5, width: '80%', marginTop: 10}}
            >

            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={'time'}
              display='spinner'
              is24Hour={true}
              onChange={onChange}
              style={{alignSelf: 'center', width: '80%'}}
              minimumDate={new Date()}
              disabled={check}
            />

            </StyledView>

            {message ? 
              <MessageBox
                textStyle={{ marginBottom: 20, fontSize: 16, marginTop: 10, backgroundColor: colors.primary }}
              >
                {message}
              </MessageBox>
            :
              <MessageBox
                textStyle={{ marginBottom: 20, fontSize: 16, marginTop: 10 }}
              >
                { ' ' }
              </MessageBox>
            }

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