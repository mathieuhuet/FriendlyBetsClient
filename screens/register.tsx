import React, { FunctionComponent, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { View } from 'react-native';
import { Formik } from 'formik';
import { registerUser } from '../services/userServices/register';
// Custom components
import MainContainer from '../components/containers/mainContainer';
import KeyboardAvoidingContainer from '../components/containers/keyboardAvoidingContainer';
import RegularText from '../components/texts/regularText';
import SmallText from '../components/texts/smallText';
import StyledTextInput from '../components/inputs/styledTextInputs';
import MessageBox from '../components/texts/messageBox';
import RegularButton from '../components/buttons/regularButton';
import PressableText from '../components/texts/pressableText';
import { colors } from '../components/colors';
import StyledCheckBox from '../components/inputs/styledCheckBox';

const Register: FunctionComponent = ({ navigation }) => {
  const [message, setMessage] = useState('');
  const [boxColor, setBoxColor] = useState(colors.secondary);

  const handleRegistration = async (credentials, setSubmitting) => {
    setMessage('');
    // call backend and move to next page if successful
    registerUser(credentials).then(result => {
      if (result.data) {
        const email = result.data;
        navigation.navigate('EmailVerification', email);
      }
      setSubmitting(false);
    }).catch(err => {
      if (err.message) {
        setMessage(err.message);
      }
      console.log(err);
      setSubmitting(false);
    });
  }
  return (
    <MainContainer>
      <KeyboardAvoidingContainer>
        <RegularText textStyle={{marginBottom: 25}}>Create your account.</RegularText>
        <Formik
          initialValues={{firstName: "", lastName: "", email: "", privacyPolicy: false}}
          onSubmit={(values, {setSubmitting}) => {
            if (values.firstName === "" || values.email === "") {
              setMessage('Please fill all the required fields.');
              setSubmitting(false);
            } else if (!values.privacyPolicy) {
              setMessage('Please agree to the following terms to continue.');
              setBoxColor(colors.failure);
              setSubmitting(false);
            } else {
              handleRegistration({firstName: values.firstName, lastName: values.lastName, email: values.email.toLowerCase()}, setSubmitting);
            }
          }}
        >
          {({handleChange, handleBlur, handleSubmit, values, isSubmitting, setFieldValue}) => (
            <>
              <StyledTextInput
                label="First name"
                icon="account"
                keyboardType="default"
                placeholder="André"
                onChangeText={handleChange('firstName')}
                onBlur={handleBlur('firstName')}
                value={values.firstName}
                inputFieldStyle={{ marginBottom: 10 }}
              />
              <StyledTextInput
                label="Last name (optional)"
                icon="account"
                keyboardType="default"
                placeholder="Benoit"
                onChangeText={handleChange('lastName')}
                onBlur={handleBlur('lastName')}
                value={values.lastName}
                inputFieldStyle={{ marginBottom: 10 }}
              />
              <StyledTextInput
                label="Email Address"
                icon="email-variant"
                keyboardType="email-address"
                placeholder="Your email"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                inputFieldStyle={{ marginBottom: 20 }}
              />
              <StyledCheckBox
                isChecked={values.privacyPolicy}
                setChecked={() => setFieldValue('privacyPolicy', !values.privacyPolicy)}
                name={'privacyPolicy'}
                boxColor={boxColor}
              >
              <View
                style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', flexWrap: 'wrap', width: 300}}
              >
                <SmallText textStyle={{textAlign: 'left'}}>By clicking the "Register" button you agree </SmallText>
                <SmallText textStyle={{textAlign: 'left'}}>to our</SmallText>
                <PressableText onPress={() => navigation.navigate('PrivacyPolicy')} textStyle={{textAlign: 'left'}}> Privacy Policy.</PressableText>
              </View>
              </StyledCheckBox>
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
              >
                Register
              </RegularButton>}
              <View
                style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20}}
              >
                <SmallText>
                  Already have an account?
                </SmallText>
                <PressableText
                  onPress={() => navigation.navigate('Login')}
                >
                  &nbsp; Click here to Login.
                </PressableText>
              </View>
            </>
          )}
        </Formik>
      </KeyboardAvoidingContainer>
    </MainContainer>
  );
}

export default Register;