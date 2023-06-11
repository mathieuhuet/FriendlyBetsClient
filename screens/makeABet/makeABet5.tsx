import React, { FunctionComponent, useState, useEffect, useContext } from 'react';
import styled from 'styled-components/native';
import { View, ActivityIndicator } from 'react-native';
import { Formik } from 'formik';


// Custom components
import MainContainer from '../../components/containers/mainContainer';
import LargeText from '../../components/texts/largeText';
import { ScreenHeight } from '../../components/shared';
import { colors } from '../../components/colors';
import background from '../../assets/backgrounds/card_background_v1.png';
import RegularButton from '../../components/buttons/regularButton';
import KeyboardAvoidingContainer from '../../components/containers/keyboardAvoidingContainer';
import RegularText from '../../components/texts/regularText';
import { getBetOptions } from '../../components/betOptions';
import MessageBox from '../../components/texts/messageBox';
import MessageModal from '../../components/modals/messageModal';
import TextInput from '../../components/inputs/textInput';
import { makeABet } from '../../services/betServices/makeABet';
import { UserContext } from '../../context/user/userContext';
import MakeABetModal from '../../components/modals/makeABetModal';


const Background = styled.Image`
  width: 100%;
  height: ${ScreenHeight * 0.6}px;
  position: absolute;
  bottom: -1px;
`;



const MakeABet5: FunctionComponent = ({navigation, route}) => {
  const user = useContext(UserContext);
  const betData = route.params;
  const [message, setMessage] = useState('');

  //makeABetModal
  const [makeABetModalVisible, setMakeABetModalVisible] = useState(false);
  const [betCode, setBetCode] = useState('');

  // TODO changing all those useState into a single useReducer
  // Modal
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessageType, setModalMessageType] = useState('');
  const [modalHeaderText, setModalHeaderText] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalButtonText, setModalButtonText] = useState('');

  const modalButtonHandler = async () => {
    setModalVisible(false);
    navigation.navigate('Dashboard');
  }

  const showModal = (type:string, headerText:string, message:string, buttonText:string) => {
    setModalMessageType(type);
    setModalHeaderText(headerText);
    setModalMessage(message);
    setModalButtonText(buttonText);
    setModalVisible(true);
  }

  const showMakeABetModal = (betCodeReceived:string) => {
    setBetCode(betCodeReceived);
    setMakeABetModalVisible(true);
  }

  const handleNewBet = async (values, setSubmitting) => {
    try {
      setMessage('');
      // call backend and move to next page if successful
      const bet = {...betData, userBet: values.bet, createdAt: Date.parse(new Date())}
      const result = await makeABet(bet, user.accessToken)
      setSubmitting(false);
      if (result.data) {
        console.log(result.data);
        return showMakeABetModal(result.data.betCode);
      }
      return showModal('failed', 'Uh oh...', result.message, 'OK');
    } catch (err) {
      console.log(err);
      setSubmitting(false);
      setMessage(err.message);
    }
  }

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
              width: '100%',
              backgroundColor: colors.tertiary,
              borderRadius: 30,
            }}
          >
            <View
              style={{padding: 10, marginTop: 12, width: '100%'}}
            >
              <RegularText
                textStyle={{color: colors.primary,textAlign: 'left'}}
              >
                Your bet :
              </RegularText>
              <RegularText
                textStyle={{fontWeight: 'bold', color: colors.primary,textAlign: 'left', fontSize: 20}}
              >
                "{betData.betTitle.charAt(0).toUpperCase() + betData.betTitle.slice(1)}"
              </RegularText>
              <RegularText
                textStyle={{color: colors.primary, textAlign: 'left',}}
              >
                has been created succesfully.
              </RegularText>
            </View>
            <View
              style={{padding: 10, width: '100%'}}
            >
              <RegularText
                textStyle={{color: colors.primary,textAlign: 'left'}}
              >
                The person(s) who lose must provide the winner : 
              </RegularText>
              <RegularText
                textStyle={{fontWeight: 'bold', color: colors.primary,textAlign: 'left', fontSize: 20}}
              >
                {getBetOptions(betData.betType)}
              </RegularText>
              <RegularText
                textStyle={{fontWeight: 'bold', color: colors.primary,textAlign: 'left'}}
              >
                "{betData.betExplain}"
              </RegularText>
            </View>
            <View
              style={{padding: 10, marginTop: 5, width: '100%'}}
            >
              <RegularText
                textStyle={{color: colors.primary, textAlign: 'left'}}
              >
                Participants have until
              </RegularText>
              <RegularText
                textStyle={{fontWeight: 'bold', color: colors.primary, textAlign: 'left'}}
              >
                {new Date(betData.bettingEndAt).toDateString()} at {new Date(betData.bettingEndAt).toLocaleTimeString().slice(0, -3)}
              </RegularText>
              <RegularText
                textStyle={{color: colors.primary, textAlign: 'left', marginBottom: 12}}
              >
                to cast their bet.
              </RegularText>
            </View>
          </View>

            <Formik
              initialValues={{bet: ''}}
              onSubmit={(values, {setSubmitting}) => {
                if (values.bet === '') {
                  setMessage('Please write your bet.');
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
                    width: '100%',
                    marginTop: 30
                  }}
                >
                  <RegularText
                    textStyle={{fontSize: 20, fontWeight: 700, color: colors.primary, width: 300}}
                  >
                    Write the outcome you're betting on.
                  </RegularText>
                  <TextInput
                    keyboardType="default"
                    placeholder=''
                    onChangeText={handleChange('bet')}
                    onBlur={handleBlur('bet')}
                    value={values.bet}
                    inputFieldStyle={{ fontSize: 20, fontWeight: 'bold', height: 80, borderWidth: 0 }}
                    multiline={true}
                  />
                  <MessageBox
                    textStyle={{ marginBottom: 10, marginTop: 10 }}
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
                  values.bet &&
                  <RegularButton
                    onPress={handleSubmit}
                    style={{marginBottom: 10, backgroundColor: colors.accent}}
                    textStyle={{color: colors.primary, fontSize: 20, fontWeight: 700}}
                  >
                    Create a bet
                  </RegularButton>}
                  {!values.bet &&<RegularButton
                    onPress={handleSubmit}
                    style={{marginBottom: 10, backgroundColor: colors.lightGray}}
                    textStyle={{color: colors.darkGray, fontSize: 20}}
                    disabled={true}
                  >
                    Create a bet
                  </RegularButton>}
                </View>
              )}
            </Formik>

            <MessageModal
              headerText={modalHeaderText}
              message={modalMessage}
              modalVisible={modalVisible}
              type={modalMessageType}
              buttonText={modalButtonText}
              buttonHandler={modalButtonHandler}
            />
            <MakeABetModal
              buttonHandler={() => navigation.navigate('Dashboard')}
              betTitle={betData.betTitle.charAt(0).toUpperCase() + betData.betTitle.slice(1)}
              modalVisible={makeABetModalVisible}
              betCode={betCode}
            />
        </MainContainer>
      </KeyboardAvoidingContainer>
    </MainContainer>
  );
}


export default MakeABet5;