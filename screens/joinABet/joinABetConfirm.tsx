import React, { FunctionComponent, useState, useEffect, useContext } from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { ActivityIndicator } from 'react-native';
import { Formik } from 'formik';


// Custom components
import MainContainer from '../../components/containers/mainContainer';
import KeyboardAvoidingContainer from '../../components/containers/keyboardAvoidingContainer';
import RegularText from '../../components/texts/regularText';
import RegularButton from '../../components/buttons/regularButton';
import LargeText from '../../components/texts/largeText';
import { ScreenHeight } from '../../components/shared';
import { colors } from '../../components/colors';
import BetCodeInput from '../../components/inputs/betCodeInput';
import { joinABet } from '../../services/betServices/joinABet'
import MessageModal from '../../components/modals/messageModal';
import { UserContext } from '../../context/user/userContext';
import MessageBox from '../../components/texts/messageBox';
import TextInput from '../../components/inputs/textInput';


// Background
import background from '../../assets/backgrounds/card_background_v1.png'
import StyledView from '../../components/views/styledView';
import SmallText from '../../components/texts/smallText';
import { getBetOptions } from '../../components/betOptions';
import ParticipantsIcon from '../../components/icons/participantsIcon';


const Background = styled.Image`
  width: 100%;
  height: ${ScreenHeight * 0.6}px;
  position: absolute;
  bottom: -1px;
`;

const JoinABetConfirm: FunctionComponent = ({navigation, route}) => {
  const user = useContext(UserContext);
  const betData = route.params;
  const [message, setMessage] = useState('');

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

  const handleJoinBet = async (values, setSubmitting) => {
    try {
      const result = await joinABet({betCode: betData.betCode, userBet: values.bet}, user.accessToken);
      setSubmitting(false);
      if (result.data) {
        return showModal('success', 'All Good!', result.message, 'OK');
      }
      return showModal('failed', 'Uh oh...', result.message, 'OK');
    } catch (error) {
      setSubmitting(false);
      return showModal('failed', 'Uh oh...', error.message, 'OK');
    }
  }


  return (
    <MainContainer style={{paddingTop: 0, paddingLeft: 0, paddingRight: 0, backgroundColor: colors.orange}} >
      <Background source={background} />
      <MainContainer style={{backgroundColor: 'transparent'}}>
      <KeyboardAvoidingContainer>
        <StyledView
          style={{backgroundColor: colors.tertiary, borderRadius: 10, marginVertical: 20, paddingHorizontal: 10, paddingBottom: 10}}
        >
          <LargeText
            textStyle={{fontWeight: 'bold', color: colors.primary, marginTop: 20, fontSize: 40, marginBottom: 10}}
          >
            {betData.betTitle}
          </LargeText>
          {betData.betExtraText && 
            <RegularText
              textStyle={{fontWeight: 'bold', color: colors.primary, marginBottom: 20}}
            >
              {betData.betExtraText}
            </RegularText>
          }
          <SmallText
            textStyle={{fontWeight: 'bold', color: colors.primary, marginBottom: 20}}
          >
            {'Bet created on ' + new Date(betData.createdAt).toDateString()}
          </SmallText>
          <LargeText
            textStyle={{fontWeight: 'bold', color: colors.primary, marginBottom: 5}}
          >
            {getBetOptions(betData.betType)}
          </LargeText>
          <RegularText
            textStyle={{fontWeight: 'bold', color: colors.primary, marginBottom: 20}}
          >
            {betData.betExplain}
          </RegularText>
          <SmallText
            textStyle={{fontWeight: 'bold', color: colors.primary, marginBottom: 5}}
          >
            Participants:
          </SmallText>
          <ParticipantsIcon
            betId={betData._id}
            accessToken={user.accessToken}
          />
        </StyledView>

        <Formik
            initialValues={{bet: ''}}
            onSubmit={(values, {setSubmitting}) => {
              if (values.bet === '') {
                setMessage('Please write your bet.');
                setSubmitting(false);
              } else {
                handleJoinBet(values, setSubmitting);
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
                <RegularText
                  textStyle={{right: 20, fontSize: 20, fontWeight: 700, color: colors.primary}}
                >
                  Write your bet below
                </RegularText>
                <TextInput
                  keyboardType="default"
                  placeholder=''
                  onChangeText={handleChange('bet')}
                  onBlur={handleBlur('bet')}
                  value={values.bet}
                  inputFieldStyle={{ marginBottom: 10, fontSize: 20, fontWeight: 'bold', height: 80, borderWidth: 0 }}
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
                values.bet &&
                <RegularButton
                  onPress={handleSubmit}
                  style={{marginBottom: 10, backgroundColor: colors.accent}}
                  textStyle={{color: colors.primary, fontSize: 20, fontWeight: 700}}
                >
                  Join the bet
                </RegularButton>}
                {!values.bet &&<RegularButton
                  onPress={handleSubmit}
                  style={{marginBottom: 10, backgroundColor: colors.lightGray}}
                  textStyle={{color: colors.darkGray, fontSize: 20}}
                  disabled={true}
                >
                  Join the bet
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
      </KeyboardAvoidingContainer>
    </MainContainer>
    </MainContainer>
  );
}

export default JoinABetConfirm;