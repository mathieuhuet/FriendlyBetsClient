import React, { FunctionComponent } from 'react';
import { Modal, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
// Styled components
import styled from 'styled-components/native';
import { colors } from '../colors';
import LargeText from '../texts/largeText';
import RegularText from '../texts/regularText';
import RegularButton from '../buttons/regularButton';
import ProfileIcon from '../icons/profileIcon';


const ModalPressableContainer = styled.Pressable`
  flex: 1;
  padding: 25px;
  background-color: rgba(0, 0, 0, 0.7);
  justify-content: center;
  align-items: center;
`;

const ModalView = styled.View`
  background-color: ${colors.primary};
  border-radius: 20px;
  width: 100%;
  padding: 35px;
  align-items: center;
  elevation: 5;
  shadow-color: ${colors.black};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 4px;
`;

interface Props {
  buttonHandler: any;
  firstName: string;
  lastName: string;
  color: string;
  backgroundColor: string;
  police: string;
  modalVisible: boolean;
}

const UserModal: FunctionComponent<Props> = (props) => {
  return (
    <Modal
      animationType='slide'
      visible={props.modalVisible}
      transparent={true}
    >
      <ModalPressableContainer>
        <ModalView>
          <View
            style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginBottom: 20}}
          >
            <View>
              <LargeText>
                {props.firstName}
              </LargeText>
              <LargeText>
                {props.lastName}
              </LargeText>
            </View>
            <ProfileIcon
              firstName={props.firstName}
              lastName={props.lastName}
              color={props.color}
              backgroundColor={props.backgroundColor}
              police={props.police}
              size={10}
            />
          </View>
          <RegularButton
            onPress={props.buttonHandler}
          >
            Close
          </RegularButton>
        </ModalView>
      </ModalPressableContainer>
    </Modal>
  );
}

export default UserModal;