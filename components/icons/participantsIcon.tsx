import React, { FunctionComponent, useState, useEffect } from 'react';
import { View, Pressable } from 'react-native';
// Styled components
import ProfileIcon from './profileIcon';
import { getParticipants } from '../../services/betServices/getParticipants';
import UserModal from '../modals/userModal';



interface Props {
  betId: string;
  accessToken: string;
}


const ParticipantsIcon: FunctionComponent<Props> = (props) => {
  const [participants, setParticipants] = useState([]);

  // TODO changing all those useState into a single useReducer
  // Modal
  const [modalVisible, setModalVisible] = useState(false);
  const [modalFirstName, setModalFirstName] = useState('');
  const [modalLastName, setModalLastName] = useState('');
  const [modalColor, setModalColor] = useState('');
  const [modalBackgroundColor, setModalBackGroundColor] = useState('');
  const [modalPolice, setModalPolice] = useState('');

  const modalButtonHandler = async () => {
    setModalVisible(false);
  }

  const showModal = (firstName:string, lastName:string, color:string, backgroundColor:string, police:string) => {
    setModalFirstName(firstName);
    setModalLastName(lastName);
    setModalColor(color);
    setModalBackGroundColor(backgroundColor);
    setModalPolice(police);
    setModalVisible(true);
  }

  useEffect(() => {
    const getParticips = async () => {
      try {
        const participantList = await getParticipants({_id: props.betId}, props.accessToken);
        setParticipants(participantList.data);
      } catch (error) {
        console.log(error);
      }
    }
    getParticips();
  }, [])

  return (
    <View
      style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}
    >
      {participants.map((participant) => 
        <Pressable
          onPress={() => showModal(participant.firstName, participant.lastName, participant.profileIconColor, participant.profileIconBackgroundColor, participant.profileIconPolice)}
          style={{margin: 1}}
          key={participant._id}
        >
          <ProfileIcon
            firstName={participant.firstName}
            lastName={participant.lastName}
            color={participant.profileIconColor}
            backgroundColor={participant.profileIconBackgroundColor}
            police={participant.profileIconPolice}
            size={4}
          />
        </Pressable>
      )}
      <UserModal
        firstName={modalFirstName}
        lastName={modalLastName}
        color={modalColor}
        backgroundColor={modalBackgroundColor}
        police={modalPolice}
        modalVisible={modalVisible}
        buttonHandler={modalButtonHandler}
      />
    </View>
  );
}



export default ParticipantsIcon;