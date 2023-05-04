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

// Background
import background from '../../assets/backgrounds/card_background_v1.png';
import RegularButton from '../../components/buttons/regularButton';
import KeyboardAvoidingContainer from '../../components/containers/keyboardAvoidingContainer';


const Background = styled.Image`
  width: 100%;
  height: ${ScreenHeight * 0.6}px;
  position: absolute;
  bottom: -1px;
`;



const ChangeEmail: FunctionComponent = ({navigation}) => {
  const dispatch = useContext(UserDispatchContext);
  const user = useContext(UserContext);
  const [message, setMessage] = useState('');

  const handleChangeEmail = async (credentials, setSubmitting) => {
    setMessage('');
    // call backend and move to next page if successful

  }

  return (
    <MainContainer style={{paddingTop: 0, paddingLeft: 0, paddingRight: 0, backgroundColor: colors.tertiary}} >
      <Background source={background} />
      <KeyboardAvoidingContainer>
        <MainContainer style={{backgroundColor: 'transparent'}}>
          <LargeText textStyle={{marginBottom: 25, fontWeight: 'bold', color: colors.primary}}>
            Change Name
          </LargeText>  
          <Formik
            initialValues={{firstName: "", lastName: "", email: "", privacyPolicy: false}}
            onSubmit={(values, {setSubmitting}) => {
              if (values.firstName === "") {
                setMessage('Please fill all the required fields.');
                setSubmitting(false);
              } else {
                handleChangeEmail({firstName: values.firstName, lastName: values.lastName}, setSubmitting);
              }
            }}
          >
            {({handleChange, handleBlur, handleSubmit, values, isSubmitting, setFieldValue}) => (
              <>
                <StyledTextInput
                  label="Email"
                  icon="email-variant"
                  keyboardType="default"
                  placeholder={user.email}
                  onChangeText={handleChange('firstName')}
                  onBlur={handleBlur('firstName')}
                  value={values.firstName}
                  inputFieldStyle={{ marginBottom: 10 }}
                  iconColor={colors.tertiary}
                  labelStyle={{color: colors.primary}}
                />
                <StyledTextInput
                  label="Confirm email"
                  icon="email-variant"
                  keyboardType="default"
                  placeholder=''
                  onChangeText={handleChange('lastName')}
                  onBlur={handleBlur('lastName')}
                  value={values.lastName}
                  inputFieldStyle={{ marginBottom: 10 }}
                  iconColor={colors.tertiary}
                  labelStyle={{color: colors.primary}}
                />
                <MessageBox
                  textStyle={{ marginBottom: 20, marginTop: 20 }}
                >
                  { message || ' ' }
                </MessageBox>
                {isSubmitting && <RegularButton>
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