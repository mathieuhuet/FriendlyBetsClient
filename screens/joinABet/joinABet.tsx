import React, { FunctionComponent, useState, useEffect, useContext } from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { ActivityIndicator } from 'react-native';


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

// Background
import background from '../../assets/backgrounds/card_background_v1.png'
import StyledView from '../../components/views/styledView';


const Background = styled.Image`
  width: 100%;
  height: ${ScreenHeight * 0.6}px;
  position: absolute;
  bottom: -1px;
`;

const JoinABet: FunctionComponent = ({navigation}) => {
  const user = useContext(UserContext);
  const MAX_CONST_LENGTH = 6;
  const [code, setCode] = useState('');
  const [pinReady, setPinReady] = useState(false);
  const [verifying, setVerifying] = useState(false);

  // TODO changing all those useState into a single useReducer
  // Modal
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessageType, setModalMessageType] = useState('');
  const [modalHeaderText, setModalHeaderText] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalButtonText, setModalButtonText] = useState('');

  const modalButtonHandler = async () => {
    setModalVisible(false);
    if (modalMessageType === 'success') {
      navigation.navigate('Dashboard');
    }
  }

  const showModal = (type:string, headerText:string, message:string, buttonText:string) => {
    setModalMessageType(type);
    setModalHeaderText(headerText);
    setModalMessage(message);
    setModalButtonText(buttonText);
    setModalVisible(true);
  }

  const handleJoinBet = async () => {
    try {
      setVerifying(true);
      const result = await joinABet({betCode: code}, user.accessToken);
      setVerifying(false);
      if (result.data) {
        return showModal('success', 'All Good!', result.message, 'Proceed');
      }
      return showModal('failed', 'Uh oh...', result.message, 'OK');
    } catch (error) {
      setVerifying(false);
      return showModal('failed', 'Uh oh...', error.message, 'OK');
    }
  }


  return (
    <MainContainer style={{paddingTop: 0, paddingLeft: 0, paddingRight: 0, backgroundColor: colors.orange}} >
      <Background source={background} />
      <MainContainer style={{backgroundColor: 'transparent'}}>
      <KeyboardAvoidingContainer>
        <LargeText
          textStyle={{fontWeight: 'bold', color: colors.primary, marginTop: 20, fontSize: 40, marginBottom: 20, textAlign: 'center'}}
        >
          Join a Bet!
        </LargeText>
        <RegularText 
        textStyle={{marginTop: 20, textAlign: 'center', color: colors.primary}}
        >
          Enter the code for the bet you wanna join.
        </RegularText>
        <StyledView
          style={{backgroundColor: colors.tertiary, borderRadius: 10, marginVertical: 20, paddingHorizontal: 10}}
        >
          <BetCodeInput 
            maxLength={MAX_CONST_LENGTH}
            code={code}
            setCode={setCode}
            setPinReady={setPinReady}
            textStyle={{color: colors.primary}}
          />
        </StyledView>

        {verifying && <RegularButton>
          <ActivityIndicator
            size="small"
            color={colors.primary}
          />
        </RegularButton>}
        {!verifying && pinReady && <RegularButton
          onPress={handleJoinBet}
          style={{backgroundColor: colors.primary}}
          textStyle={{color: colors.tertiary , fontSize: 20}}
        >
          Join Bet
        </RegularButton>}
        {!verifying && !pinReady && <RegularButton
          disabled={true} 
          style={{backgroundColor: colors.secondary}}
          textStyle={{color: colors.lightGray, fontSize: 20}}
        >
          Join Bet
        </RegularButton>}
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

export default JoinABet;
