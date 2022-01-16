import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import theme from '../theme';
import Text from './Text';
import LanguageTag from './Language';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
		paddingTop: 10,
    backgroundColor: theme.colors.secondary
  },
	smallContainer: {
		height: 90,
    paddingHorizontal: 10,
    backgroundColor: theme.colors.secondary,
		justifyContent: 'space-evenly'
	},
	avatar: {
    width: 50,
    height: 50,
		padding: 10,
		borderRadius: 5,
  }
});

const Details = ({ repository }) => {
  return (
		<View style={styles.container}>
			<Image
        style={styles.avatar}
        source={{
          uri: repository.ownerAvatarUrl
        }} 
      />
			<View style={styles.smallContainer}>
				<Text fontWeight="bold">{repository.fullName}</Text>
				<Text>{repository.description}</Text>
				<LanguageTag language={repository.language} />
			</View>
      
    </View>
  );
};

export default Details;