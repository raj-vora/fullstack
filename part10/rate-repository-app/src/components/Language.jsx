import React from 'react';
import { View, StyleSheet } from 'react-native';
import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
    textStyle: {
        backgroundColor: theme.colors.primary,
        padding: 5,
        borderRadius: 5,
        alignSelf: 'flex-start'
    }
});

const LanguageTag = ({language}) => {
  return (
      <View style={styles.textStyle}>
          <Text color="secondary">{language}</Text>
      </View>
  );
};

export default LanguageTag;