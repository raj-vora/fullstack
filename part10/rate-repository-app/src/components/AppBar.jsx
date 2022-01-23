import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import AppBarTab from './AppBarTab';
import theme from '../theme';
import { Link } from "react-router-native";

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 20,
    backgroundColor: theme.colors.appBar,
    justifyContent: 'space-evenly'
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/signin"><AppBarTab tabText={"Sign In"}/></Link>
        <Link to="/"><AppBarTab tabText={"Repositories"}/></Link>
      </ScrollView>
    </View>
  );
};

export default AppBar;