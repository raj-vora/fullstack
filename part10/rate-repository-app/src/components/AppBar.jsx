import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppBarTab from './AppBarTab';
import theme from '../theme';
import { Link } from "react-router-native";

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: theme.colors.appBar,
    justifyContent: 'center'
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
        <Link to="/signin"><AppBarTab tabText={"Sign In"}/></Link>
        <Link to="/"><AppBarTab tabText={"Repositories"}/></Link>
    </View>
  );
};

export default AppBar;