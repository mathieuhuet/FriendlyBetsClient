import React, { FunctionComponent, useState, useEffect, useContext } from 'react';
import styled from 'styled-components/native';
import { View } from 'react-native';
import { Formik } from 'formik';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';

// Custom components
import MainContainer from '../../components/containers/mainContainer';
import LargeText from '../../components/texts/largeText';
import { ScreenHeight } from '../../components/shared';
import { colors } from '../../components/colors';
import MessageBox from '../../components/texts/messageBox';
import background from '../../assets/backgrounds/card_background_v1.png';
import RegularButton from '../../components/buttons/regularButton';
import KeyboardAvoidingContainer from '../../components/containers/keyboardAvoidingContainer';
import RegularText from '../../components/texts/regularText';
import StyledCheckBox from '../../components/inputs/styledCheckBox';
import StyledView from '../../components/views/styledView';
import TextInput from '../../components/inputs/textInput';


const Background = styled.Image`
  width: 100%;
  height: ${ScreenHeight * 0.6}px;
  position: absolute;
  bottom: -1px;
`;



const MakeABet2: FunctionComponent = ({navigation, route}) => {
  const [message, setMessage] = useState('');
  const betData = route.params;

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: '🍷 Drink', value: 'drink'},
    {label: '🍻 Pay a round of drink', value: 'roundDrink', parent: 'drink'},
    {label: '🥃 Shots', value: 'shots', parent: 'drink'},
    {label: '💸 Money', value: 'money'},
    {label: '⛑ Charity donation', value: 'charity', parent: 'money'},
    {label: '🎁 Gift', value: 'gift', parent: 'money'},
    {label: '🍝 Meal', value: 'meal'},
    {label: '🧹 Chore', value: 'chore'},
    {label: '⚙️ Custom', value: 'custom'}
  ]);


  const handleNewBet = (betExplain, setSubmitting) => {
    setMessage('');
    if (!value) {
      setMessage('Select the stake.');
      setSubmitting(false);
    } else {
      const bet = {...betData, betType: value, betExplain: betExplain}
      navigation.navigate('MakeABet3', bet);
      setSubmitting(false);
    }
  }

  
  return (
    <MainContainer style={{paddingTop: 0, paddingLeft: 0, paddingRight: 0, backgroundColor: colors.purple}} >
      <Background source={background} />
        <MainContainer style={{backgroundColor: 'transparent'}}>
          <LargeText textStyle={{fontWeight: 'bold', color: colors.tertiary, marginTop: 20, marginBottom: 30}}>
            What are you waging?
          </LargeText>  
          <DropDownPicker
            placeholder='Select the stake'
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            maxHeight={400}
            dropDownContainerStyle={{
              backgroundColor: colors.primary
            }}
            style={{
              backgroundColor: colors.primary,
            }}
            containerStyle={{
              height: 70
            }}
            textStyle={{
              color: colors.tertiary,
              fontSize: 18
            }}
            listParentLabelStyle={{
              fontWeight: "bold"
            }}
            listChildContainerStyle={{
              paddingLeft: 20
            }}
            listItemContainerStyle={{
              height: 40
            }}
            theme="DARK"
            multiple={false}
            mode="BADGE"
            itemSeparator={true}
          />
          <KeyboardAvoidingContainer>
            <Formik
              initialValues={{betExplain: ''}}
              onSubmit={(values, {setSubmitting}) => {
                if (values.betExplain === '') {
                  setMessage('Please fill all the required fields.');
                  setSubmitting(false);
                } else {
                  handleNewBet(values.betExplain, setSubmitting);
                }
              }}
            >
              {({handleChange, handleBlur, handleSubmit, values, isSubmitting, setFieldValue}) => (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '100%'
                }}
              >
                <RegularText
                  textStyle={{right: '30%', marginTop: 20, fontWeight: 'bold'}}
                >
                  Explain the bet
                </RegularText>
                <TextInput
                  keyboardType="default"
                  placeholder=''
                  onChangeText={handleChange('betExplain')}
                  onBlur={handleBlur('betExplain')}
                  value={values.betExplain}
                  inputFieldStyle={{ marginBottom: 10, height: 120, borderWidth: 0 }}
                  multiline={true}
                />

                <MessageBox
                  textStyle={{ marginBottom: 20 }}
                >
                  { message || ' ' }
                </MessageBox>
                {!isSubmitting &&
                values.betExplain &&
                <RegularButton
                  onPress={handleSubmit}
                  style={{marginBottom: 10, backgroundColor: colors.accent}}
                  textStyle={{color: colors.primary, fontSize: 20, fontWeight: 700}}
                >
                  Next
                </RegularButton>}
                {!values.betExplain &&<RegularButton
                  onPress={handleSubmit}
                  style={{marginBottom: 10, backgroundColor: colors.primary}}
                  textStyle={{color: colors.purple, fontSize: 20}}
                  disabled={true}
                >
                  Next
                </RegularButton>}
              </View>
            )}
            </Formik>
          </KeyboardAvoidingContainer>
        </MainContainer>
    </MainContainer>
  );
}

export default MakeABet2;