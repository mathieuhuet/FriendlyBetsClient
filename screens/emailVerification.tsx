import React, { FunctionComponent, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { loginEmail, verifyUser } from '../services/authServices';
// Custom components
import MainContainer from '../components/containers/mainContainer';
import KeyboardAvoidingContainer from '../components/containers/keyboardAvoidingContainer';
import RegularText from '../components/texts/regularText';
import ResendEmailTimer from '../components/timers/resendEmailTimer';
import RegularButton from '../components/buttons/regularButton';
import IconHeader from '../components/icons/iconHeader';
import StyledCodeInput from '../components/inputs/styledCodeInput';
import MessageModal from '../components/modals/messageModal';
import { colors } from '../components/colors';


async function save(value: string) {
  await SecureStore.setItemAsync('accessToken', value);
}


const EmailVerification: FunctionComponent = ({ navigation, route }) => {
  const email = route.params.email;
  const MAX_CONST_LENGTH = 4;
  const [code, setCode] = useState('');
  const [pinReady, setPinReady] = useState(false);
  const [verifying, setVerifying] = useState(false);

  // Resending email
  const [activeResend, setActiveResend] = useState(true);

  // Modal
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessageType, setModalMessageType] = useState('');
  const [modalHeaderText, setModalHeaderText] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalButtonText, setModalButtonText] = useState('');


  const modalButtonHandler = () => {
    if (modalMessageType === 'success') {
      // go to the dashboard


    }
    setModalVisible(false);
  }

  const showModal = (type:string, headerText:string, message:string, buttonText:string) => {
    setModalMessageType(type);
    setModalHeaderText(headerText);
    setModalMessage(message);
    setModalButtonText(buttonText);
    setModalVisible(true);
  }

  const handleEmailVerification = () => {
    try {
      setVerifying(true);
      // call backend
      verifyUser({loginCode: code, email: email}).then(data => {
        setVerifying(false);
        if (data.error) {
          return showModal('failed', 'Uh oh...', data.message, 'OK');
        } else if (!data.error) {
          return showModal('success', 'All Good!', 'Your email has been verified.', 'Proceed');
        }
        return showModal('failed', 'Uh oh...', 'error', 'OK');
      }).catch(err => {
        return showModal('failed', 'Uh oh...', err, 'OK');
      });
    } catch (error) {
      setVerifying(false);
      return showModal('failed', 'Uh oh...', error.message, 'OK');
    }
  }

  const resendEmail = async (triggerTimer: Function) => {
    try {
      loginEmail({email: email});
    } catch (error) {
      alert("Resending the email has failed: " + error.message);
    }
  }
  return (
    <MainContainer>
      <KeyboardAvoidingContainer>
        <IconHeader 
          name="lock"
        />
        <RegularText textStyle={{marginTop: 20, textAlign: 'center'}}>An email with a 4-digit code was sent to :</RegularText>
        <RegularText textStyle={{marginBottom: 25, marginTop: 2, textAlign: 'center', fontWeight: 'bold'}}>{email}</RegularText>

        <StyledCodeInput 
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
        >
          Verify
        </RegularButton>}
        {!verifying && !pinReady && <RegularButton
          disabled={true} 
          style={{backgroundColor: colors.secondary}}
          textStyle={{color: colors.lightGray}}
        >
          Verify
        </RegularButton>}
        <ResendEmailTimer
          activeResend={activeResend}
          setActiveResend={setActiveResend}
          targetTime={30000}
          resendEmail={resendEmail}
        />
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
  );
}

export default EmailVerification;