import React from 'react';
import { StyleSheet, View} from 'react-native';
import theme from '../theme';
import Details from './Details';
import Statistics from './Statistics';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 10,
    backgroundColor: theme.colors.secondary
  }
});

const RepositoryItem = ({ repository }) => (
    <View style={styles.container}>
      <Details repository={repository} />
      <Statistics repository={repository} />
  </View>
);

export default RepositoryItem;