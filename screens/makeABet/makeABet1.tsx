import React, { FunctionComponent, useState, useEffect, useContext } from 'react';
import styled from 'styled-components/native';
import { View } from 'react-native';
import { Formik } from 'formik';
import { ActivityIndicator } from 'react-native';


// Custom components
import MainContainer from '../../components/containers/mainContainer';
import TextInput from '../../components/inputs/textInput';
import LargeText from '../../components/texts/largeText';
import { ScreenHeight } from '../../components/shared';
import { colors } from '../../components/colors';
import MessageBox from '../../components/texts/messageBox';
import background from '../../assets/backgrounds/card_background_v1.png';
import RegularButton from '../../components/buttons/regularButton';
import KeyboardAvoidingContainer from '../../components/containers/keyboardAvoidingContainer';
import RegularText from '../../components/texts/regularText';



const Background = styled.Image`
  width: 100%;
  height: ${ScreenHeight * 0.6}px;
  position: absolute;
  bottom: -1px;
`;



const MakeABet1: FunctionComponent = ({navigation}) => {
  const [message, setMessage] = useState('');

  const handleNewBet = async (values, setSubmitting) => {
    setMessage('');
    // call backend and move to next page if successful
    navigation.navigate('MakeABet2', values);
    setSubmitting(false);

  }

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
                <LargeText textStyle={{fontWeight: 'bold', color: colors.tertiary, marginTop: 20, fontSize: 40, marginBottom: 20}}>
                  What's the bet?
                </LargeText>  
                <RegularText
                  textStyle={{right: '40%', fontSize: 20, fontWeight: 700}}
                >
                  Title
                </RegularText>
                <TextInput
                  keyboardType="default"
                  placeholder=''
                  onChangeText={handleChange('betTitle')}
                  onBlur={handleBlur('betTitle')}
                  value={values.betTitle}
                  inputFieldStyle={{ marginBottom: 10, fontSize: 20, fontWeight: 'bold', height: 80, borderWidth: 0 }}
                  multiline={true}
                />
                <RegularText
                  textStyle={{right: '20%', fontWeight: 600}}
                >
                  Description (optional)
                </RegularText>
                <TextInput
                  keyboardType="default"
                  placeholder=''
                  onChangeText={handleChange('betExtraText')}
                  onBlur={handleBlur('betExtraText')}
                  value={values.betExtraText}
                  inputFieldStyle={{ marginBottom: 10, height: 120, borderWidth: 0 }}
                  multiline={true}
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
                {!isSubmitting &&
                values.betTitle &&
                <RegularButton
                  onPress={handleSubmit}
                  style={{marginBottom: 10, backgroundColor: colors.accent}}
                  textStyle={{color: colors.primary, fontSize: 20, fontWeight: 700}}
                >
                  Next
                </RegularButton>}
                {!values.betTitle &&<RegularButton
                  onPress={handleSubmit}
                  style={{marginBottom: 10, backgroundColor: colors.primary}}
                  textStyle={{color: colors.purple, fontSize: 20}}
                  disabled={true}
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

export default MakeABet1;