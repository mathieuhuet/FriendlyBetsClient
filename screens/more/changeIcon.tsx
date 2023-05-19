import React, { FunctionComponent, useState, useEffect, useContext } from 'react';
import styled from 'styled-components/native';
import { UserContext, UserDispatchContext } from '../../context/user/userContext';
import { Formik } from 'formik';
import { ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { View } from 'react-native';


// Custom components
import MainContainer from '../../components/containers/mainContainer';
import LargeText from '../../components/texts/largeText';
import { ScreenHeight } from '../../components/shared';
import { colors } from '../../components/colors';

import ProfileIcon from '../../components/icons/profileIcon';
import { changeIcon } from '../../services/userServices/changeIcon';
import MessageModal from '../../components/modals/messageModal';
import RegularText from '../../components/texts/regularText';
import IconButton from '../../components/buttons/iconButton';




const ChangeIcon: FunctionComponent = ({navigation}) => {
  const dispatch = useContext(UserDispatchContext);
  const user = useContext(UserContext);

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

  const handleChangeIcon = async (credentials, setSubmitting) => {
    // call backend and move to next page if successful
    changeIcon(credentials, user.accessToken).then(result => {
      setSubmitting(false);
      if (result.data) {
        dispatch({ type: 'SET_PROFILEICON', payload: {
          profileIconColor: result.data.profileIconColor, 
          profileIconBackgroundColor: result.data.profileIconBackgroundColor,
          profileIconPolice: result.data.profileIconPolice
        }});
        return showModal('success', 'All Good!', 'Your Icon has been updated.', 'Proceed');
      }
    }).catch(err => {
      console.log(err);
      setSubmitting(false);
      return showModal('failed', 'Uh oh...', err.message, 'OK');
    });
  }


  return (
    <MainContainer style={{paddingTop: 0, paddingLeft: 0, paddingRight: 0, backgroundColor: colors.tertiary}} >
      <MainContainer style={{backgroundColor: 'transparent'}}>
        <Formik
          initialValues={{
            profileIconColor: user.profileIconColor, 
            profileIconBackgroundColor: user.profileIconBackgroundColor, 
            profileIconPolice: user.profileIconPolice
          }}
          onSubmit={(values, {setSubmitting}) => {
            if (values.profileIconBackgroundColor === values.profileIconColor) {
              setSubmitting(false);
              showModal('failed', 'Uh oh...', 'Your color and the background color cannot be the same.', 'OK');
            } else {
              handleChangeIcon({
                profileIconColor: values.profileIconColor, 
                profileIconBackgroundColor: values.profileIconBackgroundColor, 
                profileIconPolice: values.profileIconPolice
              }, setSubmitting);
            }
          }}
        >
          {({handleChange, handleBlur, handleSubmit, values, isSubmitting, setFieldValue}) => (
            <>
              <View
                style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}
              >
                <LargeText textStyle={{marginBottom: 25, fontWeight: 'bold', color: colors.primary}}>
                  Change Icon
                </LargeText>
                {isSubmitting && <IconButton
                  style={{marginTop: 10, backgroundColor: colors.orange}}
                  size={8}
                  name='check-bold'
                  color={colors.primary}
                >
                  <ActivityIndicator
                    size="small"
                    color={colors.primary}
                  />
                </IconButton>}
                {!isSubmitting && <IconButton
                  onPress={handleSubmit}
                  style={{marginTop: 10, backgroundColor: colors.orange}}
                  size={8}
                  name='check-bold'
                  color={colors.primary}
                >
                </IconButton>}
              </View>
              <ProfileIcon
                  firstName={user.firstName}
                  lastName={user.lastName}
                  color={values.profileIconColor}
                  size={16}
                  backgroundColor={values.profileIconBackgroundColor}
                  police={values.profileIconPolice}
                />
              <RegularText
                textStyle={{color: colors.primary, fontSize: 24, marginTop: -20}}
              >
                Color : 
              </RegularText>
              <Picker
                selectedValue={values.profileIconColor}
                onValueChange={handleChange('profileIconColor')}
                style={{marginTop: -20}}
              >
                <Picker.Item label="White" value="white" />
                <Picker.Item label="Light Blue" value="lightBlue" />
                <Picker.Item label="Dark Blue" value="darkBlue" />
                <Picker.Item label="Gray" value="gray" />
                <Picker.Item label="Sand" value="sand" />
                <Picker.Item label="Yellow" value="yellow" />
                <Picker.Item label="Light Green" value="lightGreen" />
                <Picker.Item label="Orange" value="orange" />
                <Picker.Item label="Purple" value="purple" />
              </Picker>
              <RegularText
                textStyle={{color: colors.primary, fontSize: 24}}
              >
                Background color :
              </RegularText>
              <Picker
                selectedValue={values.profileIconBackgroundColor}
                onValueChange={handleChange('profileIconBackgroundColor')}
                style={{marginBottom: -20, marginTop: -10}}
              >
                <Picker.Item label="Light Blue" value="lightBlue" />
                <Picker.Item label="Dark Blue" value="darkBlue" />
                <Picker.Item label="Gray" value="gray" />
                <Picker.Item label="Sand" value="sand" />
                <Picker.Item label="Yellow" value="yellow" />
                <Picker.Item label="Light Green" value="lightGreen" />
                <Picker.Item label="Orange" value="orange" />
                <Picker.Item label="Purple" value="purple" />
              </Picker>
            </>
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
      </MainContainer>
    </MainContainer>
  );
}

export default ChangeIcon;