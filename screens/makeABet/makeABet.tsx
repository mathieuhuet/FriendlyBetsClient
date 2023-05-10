import React, { FunctionComponent, useState, useEffect, useContext } from 'react';
import styled from 'styled-components/native';
import { UserContext, UserDispatchContext } from '../../context/user/userContext';
import { Formik } from 'formik';
import { ActivityIndicator } from 'react-native';


// Custom components
import MainContainer from '../../components/containers/mainContainer';
import LargeText from '../../components/texts/largeText';
import { ScreenHeight } from '../../components/shared';
import { colors } from '../../components/colors';
import StyledTextInput from '../../components/inputs/styledTextInputs';
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



const MakeABet: FunctionComponent = ({navigation}) => {
  const dispatch = useContext(UserDispatchContext);
  const user = useContext(UserContext);
  const [message, setMessage] = useState('');

  const handleNewBet = async (values, setSubmitting) => {
    setMessage('');
    // call backend and move to next page if successful
    makeABet(values, user.accessToken).then(result => {
      setSubmitting(false);
      if (result.data) {
        const email = result.data.newEmail;
        navigation.navigate('ChangeEmailVerification', email);
      }
    }).catch(err => {
      console.log(err);
      setSubmitting(false);
      setMessage(err.message);
    });
  }

  return (
    <MainContainer style={{paddingTop: 0, paddingLeft: 0, paddingRight: 0, backgroundColor: colors.purple}} >
      <Background source={background} />
      <KeyboardAvoidingContainer>
        <MainContainer style={{backgroundColor: 'transparent'}}>
          <LargeText textStyle={{marginBottom: 25, fontWeight: 'bold', color: colors.tertiary}}>
            Make a bet!
          </LargeText>  
          <Formik
            initialValues={{createdAt: '', bettingEndAt: '', betResolvedAt: '', betTitle: '', betExtraText: ''}}
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
              <>
                <StyledTextInput
                  label="Bet Title"
                  icon="default"
                  keyboardType="default"
                  placeholder='Bet Title'
                  onChangeText={handleChange('betTitle')}
                  onBlur={handleBlur('betTitle')}
                  value={values.betTitle}
                  inputFieldStyle={{ marginBottom: 10 }}
                  iconColor={colors.tertiary}
                  labelStyle={{color: colors.primary}}
                />
                <StyledTextInput
                  label="Bet ExtraText"
                  icon="text"
                  keyboardType="default"
                  placeholder=''
                  onChangeText={handleChange('betExtraText')}
                  onBlur={handleBlur('betExtraText')}
                  value={values.betExtraText}
                  inputFieldStyle={{ marginBottom: 10 }}
                  iconColor={colors.tertiary}
                  labelStyle={{color: colors.primary}}
                />
                <StyledTextInput
                  label="Betting End At"
                  icon="email-variant"
                  keyboardType="default"
                  placeholder=''
                  onChangeText={handleChange('bettingEndAt')}
                  onBlur={handleBlur('bettingEndAT')}
                  value={values.bettingEndAt}
                  inputFieldStyle={{ marginBottom: 10 }}
                  iconColor={colors.tertiary}
                  labelStyle={{color: colors.primary}}
                />
                <StyledTextInput
                  label="Bet Resolved At"
                  icon="email-variant"
                  keyboardType="default"
                  placeholder=''
                  onChangeText={handleChange('betResolvedAt')}
                  onBlur={handleBlur('betResolvedAt')}
                  value={values.betResolvedAt}
                  inputFieldStyle={{ marginBottom: 10 }}
                  iconColor={colors.tertiary}
                  labelStyle={{color: colors.primary}}
                />
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
                  textStyle={{color: colors.purple}}
                >
                  Bet on
                </RegularButton>}
              </>
            )}
          </Formik>
        </MainContainer>
      </KeyboardAvoidingContainer>
    </MainContainer>
  );
}

export default MakeABet;