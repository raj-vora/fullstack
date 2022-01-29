import React from 'react';
import Text from './Text';
import Constants from 'expo-constants';
import { StyleSheet, View} from 'react-native';

const styles = StyleSheet.create({
  tab: {
    paddingVertical: Constants.statusBarHeight,
    paddingHorizontal: 20
  }
});

const AppBarTab = ({tabText}) => {
  return (
    <View style={styles.tab}>
      <Text color="secondary">{tabText}</Text>
    </View>
  );
};

export default AppBarTab;