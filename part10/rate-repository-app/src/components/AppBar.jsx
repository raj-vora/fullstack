import React from 'react';
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBar
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
        <AppBarTab tabText={"Repositories"}/>
    </View>
  );
};

export default AppBar;