import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import { borderColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import theme from '../theme';

const styles = StyleSheet.create({
  error: {
    borderColor: theme.colors.error
  }
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [
    error != '' && styles.error,
    style
  ];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;