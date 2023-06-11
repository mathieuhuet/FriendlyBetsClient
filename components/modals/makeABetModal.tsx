import React, { FunctionComponent, useState } from 'react';
import { Modal, View } from 'react-native';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
// Styled components
import styled from 'styled-components/native';
import { colors } from '../colors';
import LargeText from '../texts/largeText';
import RegularText from '../texts/regularText';
import RegularButton from '../buttons/regularButton';


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
  padding: 15px;
  align-items: center;
  elevation: 5;
  shadow-color: ${colors.black};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 4px;
`;

interface Props {
  buttonHandler: any;
  betTitle: string;
  modalVisible: boolean;
  betCode: string;
}

const MakeABetModal: FunctionComponent<Props> = (props) => {

  const [clipboardText, setClipBoardText] = useState('Copy code to clipboard')

  const copyToClipboard = async () => {
    try {
      await Clipboard.setStringAsync(props.betCode);
      setClipBoardText('Code copied to clipboard ✔️')
    } catch (error) {
      
    }
  };

  return (
    <Modal
      animationType='slide'
      visible={props.modalVisible}
      transparent={true}
    >
      <ModalPressableContainer>
        <ModalView>
          <MaterialCommunityIcons 
            name={'check-circle'} 
            size={100}
            color={colors.orange}  
          />
          <LargeText
            textStyle={{fontSize: 25, color: colors.tertiary, marginVertical: 10}}
          >
            Congratulation your bet has been succesfully created.
          </LargeText>
          <LargeText
            textStyle={{fontSize: 25, color: colors.tertiary, marginVertical: 10}}
          >
            Share the code below with your friends who want to join the bet.
          </LargeText>
          <View
            style={{ marginBottom: 20, backgroundColor: colors.primary, padding: 10, borderWidth: 10, borderColor: colors.tertiary}}
          >
            <LargeText
              textStyle={{fontSize: 40, color: colors.tertiary, fontWeight: 'bold', letterSpacing: 5}}
            >
              {props.betCode}
            </LargeText>
          </View>

          <RegularButton
            style={{width: '100%', backgroundColor: colors.lightGray}}
            onPress={copyToClipboard}
            textStyle={{fontSize: 20, color: colors.darkGray}}
          >
            {clipboardText}
          </RegularButton>
          <RegularButton
            style={{width: '100%', marginTop: 10}}
            onPress={props.buttonHandler}
            textStyle={{fontSize: 20}}
          >
            Go back to Dashboard
          </RegularButton>
        </ModalView>
      </ModalPressableContainer>
    </Modal>
  );
}

export default MakeABetModal;