import { ActivityIndicator, StyleSheet, View, Text } from 'react-native';
interface Props {
	message?: string;
}

function LoadingOverlay({ message }: Props) {
	return (
		<View style={styles.container}>
			<ActivityIndicator
				size='large'
				color='black'
			/>
			{message && <Text>{message}</Text>}
		</View>
	);
}

export default LoadingOverlay;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
