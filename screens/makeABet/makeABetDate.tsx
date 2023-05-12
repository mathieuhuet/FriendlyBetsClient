import React, { FunctionComponent, useState, useEffect, useContext } from 'react';
import styled from 'styled-components/native';
import { View } from 'react-native';
import { UserContext, UserDispatchContext } from '../../context/user/userContext';
import { Formik } from 'formik';
import { ActivityIndicator } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';
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



const MakeABetDate: FunctionComponent = ({navigation, route}) => {
  const dispatch = useContext(UserDispatchContext);
  const user = useContext(UserContext);
  const [message, setMessage] = useState('');
  const betText = route.params;

  const handleNewBet = async (values, setSubmitting) => {
    setMessage('');
    // call backend and move to next page if successful
    makeABet(values, user.accessToken).then(result => {
      setSubmitting(false);
      if (result.data) {

      }
    }).catch(err => {
      console.log(err);
      setSubmitting(false);
      setMessage(err.message);
    });
  }
  const [date, setDate] = useState(new Date(1598051730000));

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  return (
    <MainContainer style={{paddingTop: 0, paddingLeft: 0, paddingRight: 0, backgroundColor: colors.purple}} >
      <Background source={background} />
      <KeyboardAvoidingContainer>
        <MainContainer style={{backgroundColor: 'transparent'}}>
          <Formik
            initialValues={{betTitle: '', betExtraText: ''}}
            onSubmit={(values, {setSubmitting}) => {
              if (values.betTitle === '') {
                setMessage('Please fill all the required fields.');
                setSubmitting(false);
              } else {
                handleNewBet(values, setSubmitting);
              }
            }}
          >
            {({handleChange, handleBlur, handleSubmit, values, isSubmitting, setFieldValue}) => (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '100%'
                }}
              >
                <LargeText textStyle={{fontWeight: 'bold', color: colors.tertiary, marginTop: 20, marginBottom: 20}}>
                  When is it happening?
                </LargeText>  
                <RegularText>
                  When will the bet be resolved?
                </RegularText>

                <Text>selected: {date.toLocaleString()}</Text>
                
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={'date'}
                  is24Hour={true}
                  onChange={onChange}
                />
              
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={'time'}
                  is24Hour={true}
                  onChange={onChange}
                />
                <RegularText>
                  When will be the last moment to cast your bet?
                </RegularText>

                <MessageBox
                  textStyle={{ marginBottom: 20, marginTop: 20 }}
                >
                  { message || ' ' }
                </MessageBox>
                {isSubmitting && <RegularButton
                  style={{marginBottom: 10, backgroundColor: colors.primary}}
                >
                  <ActivityIndicator
                    size="small"
                    color={colors.primary}
                  />
                </RegularButton>}
                {!isSubmitting && <RegularButton
                  onPress={handleSubmit}
                  style={{marginBottom: 10, backgroundColor: colors.primary}}
                  textStyle={{color: colors.purple, fontSize: 20}}
                >
                  Next
                </RegularButton>}
              </View>
            )}
          </Formik>
        </MainContainer>
      </KeyboardAvoidingContainer>
    </MainContainer>
  );
}

export default MakeABetDate;