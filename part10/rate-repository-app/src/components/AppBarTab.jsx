import React from 'react';
import { Pressable } from 'react-native';
import Text from './Text';

const AppBarTab = ({tabText}) => {
  return (
    <Pressable>
        <Text color="secondary">{tabText}</Text>
    </Pressable>
  );
};

export default AppBarTab;