import React, { FunctionComponent, useState, useEffect, useContext } from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';


// Custom components
import MainContainer from '../../components/containers/mainContainer';
import LargeText from '../../components/texts/largeText';
import { ScreenHeight } from '../../components/shared';
import { colors } from '../../components/colors';
import background from '../../assets/backgrounds/card_background_v1.png'
import { getUserBets } from '../../services/betServices/getUserBets';
import { UserContext } from '../../context/user/userContext';
import RegularText from '../../components/texts/regularText';
import { ScrollView } from 'react-native-gesture-handler';
import StyledView from '../../components/views/styledView';
import { sortBetByDate } from '../../utils/sortBetByDate';


const Background = styled.Image`
  width: 100%;
  height: ${ScreenHeight * 0.6}px;
  position: absolute;
  bottom: -1px;
`;

const ViewBets: FunctionComponent = ({navigation}) => {
  const user = useContext(UserContext);
  const [bets, setBets] = useState([]);
  const [betsLoaded, setBetsLoaded] = useState(false);

  useEffect(() => {
    const getBets = async () => {
      try {
        const result = await getUserBets(user.accessToken)
        setBets(sortBetByDate(result.data));
        setBetsLoaded(true);
      } catch (error) {
        console.log(error);
        setBets([]);
      }
    }
    getBets();
  }, [user])
  
  return (
    <MainContainer style={{paddingTop: 0, paddingLeft: 0, paddingRight: 0, backgroundColor: colors.accent}} >
      <Background source={background} />
      <MainContainer style={{backgroundColor: 'transparent'}}>
        <LargeText textStyle={{marginBottom: 25, fontWeight: 'bold', color: colors.primary}}>
          View bets
        </LargeText>
        {betsLoaded ?
          <ScrollView>
            {bets.map((bet) => 
              <StyledView
                style={{backgroundColor: colors.primary, width: '100%', marginBottom: 10, padding: 10, borderRadius: 10}}
                key={bet._id.toString()}
                onPress={() => navigation.navigate('BetDetails', bet)}
              >
                <LargeText
                  textStyle={{marginBottom: 10}}
                >
                  {bet.betTitle}
                </LargeText>
                <RegularText>
                  Betting ends : 
                  <RegularText
                  textStyle={{fontWeight: 'bold'}}
                  >
                    {new Date(bet.bettingEndAt).toDateString()} at {new Date(bet.bettingEndAt).toLocaleTimeString()}
                  </RegularText>
                </RegularText>
              </StyledView>
            )}
          </ScrollView>
          :
          <ActivityIndicator
              size='large'
              color={colors.primary}
          />
        }
      </MainContainer>
    </MainContainer>
  );
}

export default ViewBets;