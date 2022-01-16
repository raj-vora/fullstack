import React from 'react';
import { StyleSheet, View } from 'react-native';
import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        paddingBottom: 10,
        paddingHorizontal: 10,
        backgroundColor: theme.colors.secondary,
        justifyContent: 'space-between'
    },
    smallContainer: {
        paddingHorizontal: 10,
        backgroundColor: theme.colors.secondary,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
});

function kFormatter(num) {
    return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
}

const Statistics = ({ repository }) => {
  return (
		<View style={styles.container}>
			<View style={styles.smallContainer}>
				<Text fontWeight="bold">{kFormatter(repository.stargazersCount)}</Text>
				<Text>Stars</Text>
			</View>
            <View style={styles.smallContainer}>
				<Text fontWeight="bold">{kFormatter(repository.forksCount)}</Text>
				<Text>Forks</Text>
			</View>
            <View style={styles.smallContainer}>
				<Text fontWeight="bold">{kFormatter(repository.reviewCount)}</Text>
				<Text>Reviews</Text>
			</View>
            <View style={styles.smallContainer}>
				<Text fontWeight="bold">{kFormatter(repository.ratingAverage)}</Text>
				<Text>Rating</Text>
			</View>
    </View>
  );
};

export default Statistics;