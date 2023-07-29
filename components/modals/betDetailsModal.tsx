import React, { FunctionComponent, useState } from 'react';
import { Modal, View, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
// Styled components
import styled from 'styled-components/native';
import { colors } from '../colors';
import LargeText from '../texts/largeText';
import RegularText from '../texts/regularText';
import RegularButton from '../buttons/regularButton';
import ConfirmModal from './confirmModal';


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
  closeModal: any;
  message: string;
  modalVisible: boolean;
  admin: boolean;
  resolveButtonHandler: any;
}

const BetDetailsModal: FunctionComponent<Props> = (props) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Modal
      animationType='slide'
      visible={props.modalVisible}
      transparent={true}
    >
      <ModalPressableContainer
        onPress={props.closeModal}
      >
        <ModalView>
          <View
            style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around', width: '100%', marginTop: 20}}
          >
          {props.admin ?
            <>
                <RegularButton
                  style={{backgroundColor: colors.success, marginBottom: 20}}
                  onPress={props.resolveButtonHandler}
                  textStyle={{fontSize: 20}}
                >
                  Resolve the bet
                </RegularButton>
                <RegularButton
                  style={{backgroundColor: colors.orange}}
                  onPress={() => setModalVisible(true)}
                  textStyle={{fontSize: 20}}
                >
                  Delete Bet
                </RegularButton>
            </>
          : 
            <>
                <RegularButton
                  style={{backgroundColor: colors.orange}}
                  onPress={() => setModalVisible(true)}
                  textStyle={{fontSize: 20}}
                >
                  Quit Bet
                </RegularButton>
            </>
          }
          <ConfirmModal
            message={props.message}
            modalVisible={modalVisible}
            buttonHandler={props.buttonHandler}
            closeModal={() => setModalVisible(false)}
          />
          </View>
        </ModalView>
      </ModalPressableContainer>
    </Modal>
  );
}

export default BetDetailsModal;