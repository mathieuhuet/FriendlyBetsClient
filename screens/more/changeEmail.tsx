import React, { FunctionComponent, useState, useEffect, useContext } from 'react';
import styled from 'styled-components/native';
import { UserContext } from '../../context/user/userContext';
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
import { changeEmail } from '../../services/userServices/changeEmail';


const Background = styled.Image`
  width: 100%;
  height: ${ScreenHeight * 0.6}px;
  position: absolute;
  bottom: -1px;
`;



const ChangeEmail: FunctionComponent = ({navigation}) => {
  const user = useContext(UserContext);
  const [message, setMessage] = useState('');

  const handleChangeEmail = async (credentials, setSubmitting) => {
    setMessage('');
    // call backend and move to next page if successful
    changeEmail(credentials, user.accessToken).then(result => {
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
    <MainContainer style={{paddingTop: 0, paddingLeft: 0, paddingRight: 0, backgroundColor: colors.tertiary}} >
      <Background source={background} />
      <KeyboardAvoidingContainer>
        <MainContainer style={{backgroundColor: 'transparent'}}>
          <LargeText textStyle={{marginBottom: 25, fontWeight: 'bold', color: colors.primary}}>
            Change Email
          </LargeText>  
          <Formik
            initialValues={{email: "", confirmEmail: ""}}
            onSubmit={(values, {setSubmitting}) => {
              if (values.email === '' || values.confirmEmail === '') {
                setMessage('Please fill all the required fields.');
              } else if (values.email !== values.confirmEmail) {
                setMessage("Email and Confirm email aren't identical.");
                setSubmitting(false);
              } else if (values.email === user.email) {
                setMessage('The email you entered must be different from your current email address.');
                setSubmitting(false);
              } else {
                handleChangeEmail({newEmail: values.email}, setSubmitting);
              }
            }}
          >
            {({handleChange, handleBlur, handleSubmit, values, isSubmitting, setFieldValue}) => (
              <>
                <RegularText
                  textStyle={{color: colors.primary, marginBottom: 20}}
                >
                  Your current email: {user.email}
                </RegularText>
                <StyledTextInput
                  label="Email"
                  icon="email-variant"
                  keyboardType="email-address"
                  placeholder=''
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  inputFieldStyle={{ marginBottom: 10 }}
                  iconColor={colors.tertiary}
                  labelStyle={{color: colors.primary}}
                />
                <StyledTextInput
                  label="Confirm email"
                  icon="email-variant"
                  keyboardType="email-address"
                  placeholder=''
                  onChangeText={handleChange('confirmEmail')}
                  onBlur={handleBlur('confirmEmail')}
                  value={values.confirmEmail}
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
                  style={{marginBottom: 10, backgroundColor: colors.orange}}
                >
                  <ActivityIndicator
                    size="small"
                    color={colors.primary}
                  />
                </RegularButton>}
                {!isSubmitting && <RegularButton
                  onPress={handleSubmit}
                  style={{marginBottom: 10, backgroundColor: colors.orange}}
                >
                  Change Email
                </RegularButton>}
              </>
            )}
          </Formik>
        </MainContainer>
      </KeyboardAvoidingContainer>
    </MainContainer>
  );
}

export default ChangeEmail;