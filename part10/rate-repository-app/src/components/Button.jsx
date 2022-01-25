import React from 'react';
import { Pressable, StyleSheet} from 'react-native';
import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.primary,
        padding: 5,
        borderRadius: 5,
        padding: 10,
        margin: 10,
        height: 40,
    },
    textStyle: {
        alignSelf: 'center'
    }
});

const Button = ({ onSubmit, text }) => {
  return (
      <Pressable style={styles.container} onPress={onSubmit}>
      <Text style={styles.textStyle} color="secondary">{text}</Text>
    </Pressable>
  );
};

export default Button;