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
import StyledCheckBox from '../../components/inputs/styledCheckBox';
import StyledView from '../../components/views/styledView';


const Background = styled.Image`
  width: 100%;
  height: ${ScreenHeight * 0.6}px;
  position: absolute;
  bottom: -1px;
`;



const MakeABet2: FunctionComponent = ({navigation, route}) => {
  const [message, setMessage] = useState('');
  const [check, setCheck]= useState(false);
  const betData = route.params;
  const [date, setDate] = useState(new Date());


  const handleNewBet = () => {
    setMessage('');
    if (check) {
      const bet = {...betData, betResolvedAt: ''}
      navigation.navigate('MakeABet4', bet);
    } else if (!date) {
      setMessage('Date invalid');
    } else {
      const bet = {...betData, betResolvedAt: Date.parse(date)}
      navigation.navigate('MakeABet3', bet);
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
            <LargeText textStyle={{fontWeight: 'bold', color: colors.tertiary, marginTop: 20, marginBottom: 10}}>
              When will this bet be resolved?
            </LargeText>  

            <StyledCheckBox
              isChecked={check}
              setChecked={() => setCheck(!check)}
              name={'selfDateResolving'}
              boxColor={colors.primary}
            >
              <RegularText textStyle={{textAlign: 'left', fontWeight: 'bold', fontSize: 20}}>
                I will decide when the bet is resolved.
              </RegularText>
            </StyledCheckBox>

            <StyledView
              style={{backgroundColor: colors.tertiary, marginTop: 10}}
            >
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={'date'}
              display='inline'
              onChange={onChange}
              minimumDate={new Date()}
              disabled={check}
            />
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

export default MakeABet2;