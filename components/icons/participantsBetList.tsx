import React, { FunctionComponent, useState, useEffect } from 'react';
import { View, Pressable, ScrollView, ActivityIndicator } from 'react-native';
// Styled components
import ProfileIcon from './profileIcon';
import { getParticipants } from '../../services/betServices/getParticipants';
import UserModal from '../modals/userModal';
import RegularText from '../texts/regularText';
import { getAllUserIndividualBet } from '../../services/betServices/getAllUserIndividualBet';
import { colors } from '../colors';



interface Props {
  betId: string;
  accessToken: string;
  betCreatedAt: number;
}


const ParticipantsBetList: FunctionComponent<Props> = (props) => {
  const [participants, setParticipants] = useState([]);
  const [participantsBet, setParticipantsBet] = useState([]);

  // TODO changing all those useState into a single useReducer
  // Modal
  const [modalVisible, setModalVisible] = useState(false);
  const [modalFirstName, setModalFirstName] = useState('');
  const [modalLastName, setModalLastName] = useState('');
  const [modalColor, setModalColor] = useState('');
  const [modalBackgroundColor, setModalBackGroundColor] = useState('');
  const [modalPolice, setModalPolice] = useState('');
  const [modalJoinedAt, setModalJoinedAt] = useState(0);

  const modalButtonHandler = async () => {
    setModalVisible(false);
  }

  const showModal = (firstName:string, lastName:string, color:string, backgroundColor:string, police:string, joinedAt:number) => {
    setModalFirstName(firstName);
    setModalLastName(lastName);
    setModalColor(color);
    setModalBackGroundColor(backgroundColor);
    setModalPolice(police);
    setModalJoinedAt(joinedAt);
    setModalVisible(true);
  }

  useEffect(() => {
    const getParticips = async () => {
      try {
        const participantList = await getParticipants({_id: props.betId}, props.accessToken);
        setParticipants(participantList.data);
        const participantIdList = [];
        for ( let i = 0; i < participantList.data.length; i++) {
          participantIdList.push(participantList.data[i]._id);
        }
        const allUserIndiviualBet = await getAllUserIndividualBet({bet_id: props.betId, user_id_list: participantIdList}, props.accessToken);
        setParticipantsBet(allUserIndiviualBet.data);
      } catch (error) {
        console.log(error,);
      }
    }
    getParticips();
  }, [])

  return (
    <ScrollView
      style={{display: 'flex', flexDirection: 'column', height: 200}}
    >
      {participants.map((participant) => 
      <View
        key={participant._id}
      >
        {participants[participants.length - 1] == participant ?
          <View
          style={{
            display: 'flex', 
            flexDirection: 'row', 
            justifyContent: 'flex-start', 
            alignItems: 'center', 
            marginTop: 4, 
            paddingBottom: 4,
            paddingLeft: 3,
            paddingRight: 3
          }}
        >
          <Pressable
            onPress={() => showModal(participant.firstName,
              participant.lastName,
              participant.profileIconColor,
              participant.profileIconBackgroundColor,
              participant.profileIconPolice,
              participantsBet.findIndex((el) => el[participant._id]) > -1 ? participantsBet[participantsBet.findIndex((el) => el[participant._id])][participant._id].userJoinedAt : 0
            )}
            style={{margin: 1}}
          >
            <ProfileIcon
              firstName={participant.firstName}
              lastName={participant.lastName}
              color={participant.profileIconColor}
              backgroundColor={participant.profileIconBackgroundColor}
              police={participant.profileIconPolice}
              size={6}
            />
          </Pressable>
          <RegularText
            textStyle={{marginLeft: 10}}
          >
            {participantsBet.findIndex((el) => el[participant._id]) > -1 ? participantsBet[participantsBet.findIndex((el) => el[participant._id])][participant._id].userBet : 'oups'}
          </RegularText>
        </View>
          :
          <View
          style={{
            display: 'flex', 
            flexDirection: 'row', 
            justifyContent: 'flex-start', 
            alignItems: 'center', 
            marginTop: 4, 
            borderBottomWidth: 1, 
            paddingBottom: 4,
            paddingLeft: 3,
            paddingRight: 3,
            borderBottomColor: colors.darkGray
          }}
        >
          <Pressable
            onPress={() => showModal(participant.firstName,
              participant.lastName,
              participant.profileIconColor,
              participant.profileIconBackgroundColor,
              participant.profileIconPolice,
              participantsBet.findIndex((el) => el[participant._id]) > -1 ? participantsBet[participantsBet.findIndex((el) => el[participant._id])][participant._id].userJoinedAt : 0
            )}
            style={{margin: 1}}
          >
            <ProfileIcon
              firstName={participant.firstName}
              lastName={participant.lastName}
              color={participant.profileIconColor}
              backgroundColor={participant.profileIconBackgroundColor}
              police={participant.profileIconPolice}
              size={6}
            />
          </Pressable>
          <RegularText
            textStyle={{marginLeft: 10}}
          >
            {participantsBet.findIndex((el) => el[participant._id]) > -1 ? participantsBet[participantsBet.findIndex((el) => el[participant._id])][participant._id].userBet :           
            <ActivityIndicator
              size='small'
              color={colors.tertiary}
            />}
          </RegularText>
        </View>
        }
      </View>
      )}
      <UserModal
        firstName={modalFirstName}
        lastName={modalLastName}
        color={modalColor}
        backgroundColor={modalBackgroundColor}
        police={modalPolice}
        modalVisible={modalVisible}
        buttonHandler={modalButtonHandler}
        joinedAt={modalJoinedAt}
        createdAt={props.betCreatedAt}
      />
    </ScrollView>
  );
}



export default ParticipantsBetList;