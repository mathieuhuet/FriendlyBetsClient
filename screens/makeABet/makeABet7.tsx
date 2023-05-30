import React, { FunctionComponent, useState, useEffect, useContext } from 'react';
import styled from 'styled-components/native';
import { View } from 'react-native';


// Custom components
import MainContainer from '../../components/containers/mainContainer';
import LargeText from '../../components/texts/largeText';
import { ScreenHeight } from '../../components/shared';
import { colors } from '../../components/colors';
import background from '../../assets/backgrounds/card_background_v1.png';
import RegularButton from '../../components/buttons/regularButton';
import KeyboardAvoidingContainer from '../../components/containers/keyboardAvoidingContainer';
import RegularText from '../../components/texts/regularText';


const Background = styled.Image`
  width: 100%;
  height: ${ScreenHeight * 0.6}px;
  position: absolute;
  bottom: -1px;
`;



const MakeABet7: FunctionComponent = ({navigation, route}) => {

  const betData = route.params;

  console.log(betData);


  return (
    <MainContainer style={{paddingTop: 0, paddingLeft: 0, paddingRight: 0, backgroundColor: colors.purple}} >
      <Background source={background} />
      <KeyboardAvoidingContainer>
        <MainContainer style={{backgroundColor: 'transparent'}}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              backgroundColor: colors.tertiary,
              borderRadius: 30,
            }}
          >
            <View
              style={{padding: 10, marginTop: 20, width: '100%'}}
            >
              <RegularText
                textStyle={{color: colors.primary,textAlign: 'left'}}
              >
                Your bet :
              </RegularText>
              <RegularText
                textStyle={{fontWeight: 'bold', color: colors.primary,textAlign: 'left'}}
              >
                "{betData.betTitle}"
              </RegularText>
              <RegularText
                textStyle={{color: colors.primary, textAlign: 'left',}}
              >
                has been created succesfully.
              </RegularText>
            </View>
            <View
              style={{padding: 10, width: '100%'}}
            >
              <RegularText
                textStyle={{color: colors.primary,textAlign: 'left'}}
              >
                The person(s) who lose the bet must : 
              </RegularText>
              <RegularText
                textStyle={{fontWeight: 'bold', color: colors.primary,textAlign: 'left'}}
              >
                "{betData.bet}"
              </RegularText>
              <RegularText
                textStyle={{fontWeight: 'bold', color: colors.primary,textAlign: 'left'}}
              >
                "{betData.betExplain}"
              </RegularText>
            </View>
            <View
              style={{padding: 10, marginTop: 5, width: '100%'}}
            >
              <RegularText
                textStyle={{color: colors.primary, textAlign: 'left'}}
              >
                Participants have until
              </RegularText>
              <RegularText
                textStyle={{fontWeight: 'bold', color: colors.primary, textAlign: 'left'}}
              >
                {new Date(betData.bettingEndAt).toDateString()} at {new Date(betData.bettingEndAt).toLocaleTimeString()}
              </RegularText>
              <RegularText
                textStyle={{color: colors.primary, textAlign: 'left'}}
              >
                to cast their bet.
              </RegularText>
            </View>
            <View
              style={{padding: 10, marginTop: 5, marginBottom: 20, width: '100%'}}
            >
              {betData.betResolvedAt ?
                <>
                  <RegularText
                    textStyle={{color: colors.primary, textAlign: 'left'}}
                  >
                    The outcome of the bet will be known on
                  </RegularText>
                  <RegularText
                    textStyle={{fontWeight: 'bold', color: colors.primary, textAlign: 'left'}}
                  >
                    {new Date(betData.betResolvedAt).toDateString()} at {new Date(betData.betResolvedAt).toLocaleTimeString()}
                  </RegularText>
                </>
                :
                <RegularText
                  textStyle={{fontWeight: 'bold', color: colors.primary, textAlign: 'left'}}
                >
                  You'll decide of the outcome of the bet.
                </RegularText>
              }
            </View>

            <LargeText
              textStyle={{textAlign: 'left', color: colors.primary, fontSize: 26, padding: 10}}
            >
              SHARE THE CODE BELOW TO EVERYONE WHO WANTS TO JOIN THIS BET
            </LargeText>
            <View
              style={{ marginBottom: 20, backgroundColor: colors.tertiary, padding: 10, borderWidth: 10, borderColor: colors.primary}}
            >
              <LargeText
                textStyle={{fontWeight: 'bold', fontSize: 42, color: colors.primary, textAlign: 'center'}}
              >
                {betData.betCode}
              </LargeText>
            </View>

            <RegularButton
              onPress={() => navigation.navigate('Dashboard')}
              textStyle={{fontWeight: 'bold', fontSize: 20}}
            >
              OK
            </RegularButton>
          </View>
        </MainContainer>
      </KeyboardAvoidingContainer>
    </MainContainer>
  );
}

export default MakeABet7;