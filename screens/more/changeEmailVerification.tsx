import React, { FunctionComponent, useContext, useState } from 'react';
import { ActivityIndicator } from 'react-native';


// Custom components
import { UserContext, UserDispatchContext } from '../../context/user/userContext';
import MainContainer from '../../components/containers/mainContainer';
import KeyboardAvoidingContainer from '../../components/containers/keyboardAvoidingContainer';
import IconHeader from '../../components/icons/iconHeader';
import RegularText from '../../components/texts/regularText';
import StyledCodeInput from '../../components/inputs/styledCodeInput';
import RegularButton from '../../components/buttons/regularButton';
import MessageModal from '../../components/modals/messageModal';
import ResendEmailTimer from '../../components/timers/resendEmailTimer';
import { colors } from '../../components/colors';
import { changeEmail } from '../../services/userServices/changeEmail';
import { verifyChangeEmail } from '../../services/userServices/verifyChangeEmail';





const ChangeEmailVerification: FunctionComponent = ({ route, navigation }) => {
  const dispatch = useContext(UserDispatchContext);
  const user = useContext(UserContext);
  const email = route.params;
  const MAX_CONST_LENGTH = 4;
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
    verifyChangeEmail({newEmail: email, code: code}, user.accessToken).then(result => {
      setVerifying(false);
      if (result.data) {
        const email = result.data.newEmail;
        dispatch({ type: 'SET_EMAIL', payload: {
          email: email
        }});
        return showModal('success', 'All Good!', 'Your email has been changed.', 'Proceed');
      }
    }).catch(err => {
      setVerifying(false);
      return showModal('failed', 'Uh oh...', err.message, 'OK');
    });
  }


  const resendEmail = async (newEmail) => {
    changeEmail(newEmail, user.accessToken).then(result => {
      if (result.data) {
        const email = result.data.newEmail;
        navigation.navigate('ChangeEmailVerification', email);
      }
    }).catch(err => {
      console.log(err);
    });
  }
  return (
    <MainContainer>
      <KeyboardAvoidingContainer>
        <IconHeader 
          name="email-variant"
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
          resendEmail={() => resendEmail({newEmail: email})}
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

export default ChangeEmailVerification;