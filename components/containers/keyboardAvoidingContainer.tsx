import React, { FunctionComponent } from 'react';
import { KeyboardAvoidingView, Keyboard, ScrollView, Pressable, Platform } from 'react-native';


interface KeyboardAvoidingContainerProps {
  children: React.ReactNode;
}

const KeyboardAvoidingContainer: FunctionComponent<KeyboardAvoidingContainerProps> = (props) => {
  return (
    <KeyboardAvoidingView
      style={{flex: 1,
        backgroundColor: 'transparent',
      }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={15}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <Pressable
          onPress={Keyboard.dismiss}
        >
          {props.children}
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default KeyboardAvoidingContainer;