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
import IconHeader from '../../components/icons/iconHeader';
import BetCodeInput from '../../components/inputs/betCodeInput';
import { verifyBetCode } from '../../services/betServices/verifyBetCode';
import MessageModal from '../../components/modals/messageModal';
import { UserDispatchContext, UserContext } from '../../context/user/userContext';

// Background
import background from '../../assets/backgrounds/card_background_v1.png'


const Background = styled.Image`
  width: 100%;
  height: ${ScreenHeight * 0.6}px;
  position: absolute;
  bottom: -1px;
`;

const JoinABet: FunctionComponent = ({navigation}) => {
  const dispatch = useContext(UserDispatchContext);
  const user = useContext(UserContext);
  const MAX_CONST_LENGTH = 6;
  const [code, setCode] = useState('');
  const [pinReady, setPinReady] = useState(false);
  const [verifying, setVerifying] = useState(false);

  // Resending email
  const [activeResend, setActiveResend] = useState(true);

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
      navigation.navigate('More');
    }
  }

  const showModal = (type:string, headerText:string, message:string, buttonText:string) => {
    setModalMessageType(type);
    setModalHeaderText(headerText);
    setModalMessage(message);
    setModalButtonText(buttonText);
    setModalVisible(true);
  }

  const handleEmailVerification = () => {
    setVerifying(true);
    // call backend
    verifyBetCode({newEmail: email, code: code}, user.accessToken).then(result => {
      setVerifying(false);
      if (result.data) {
        const email = result.data.newEmail;

        return showModal('success', 'All Good!', 'Your email has been changed.', 'Proceed');
      }
    }).catch(err => {
      setVerifying(false);
      return showModal('failed', 'Uh oh...', err.message, 'OK');
    });
  }


  return (
    <MainContainer style={{paddingTop: 0, paddingLeft: 0, paddingRight: 0, backgroundColor: colors.orange}} >
      <Background source={background} />
      <MainContainer style={{backgroundColor: 'transparent'}}>
      <KeyboardAvoidingContainer>
        <LargeText
          textStyle={{marginTop: 20, textAlign: 'center', color: colors.primary}}
        >
          Join a Bet.
        </LargeText>
        <RegularText 
        textStyle={{marginTop: 20, textAlign: 'center', color: colors.primary}}
        >
          Enter the code for the bet you wanna join.
        </RegularText>
        <BetCodeInput 
          maxLength={MAX_CONST_LENGTH}
          code={code}
          setCode={setCode}
          setPinReady={setPinReady}
        />

        {verifying && <RegularButton>
          <ActivityIndicator
            size="small"
            color={colors.primary}
          />
        </RegularButton>}
        {!verifying && pinReady && <RegularButton
          onPress={handleEmailVerification}
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
