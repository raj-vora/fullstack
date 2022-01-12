import React from 'react';
import { Pressable } from 'react-native';
import Text from './Text';

const AppBarTab = ({tabText}) => {
  return (
    <Pressable>
        <Text color="appBarText">{tabText}</Text>
    </Pressable>
  );
};

export default AppBarTab;