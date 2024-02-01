import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import RecentExpenses from './screens/RecentExpenses';
import AllExpenses from './screens/AllExpenses';
import ManageExpenses from './screens/ManageExpenses';
import Icon from './components/UI/Icon';
import { RouteStackParams } from './types/RouteStackParams';
import ExpensesContextProvider from './store/expenses';

const Stack = createNativeStackNavigator<RouteStackParams>();
const BottomTab = createBottomTabNavigator();

function OverviewExpenses() {
	const navigation = useNavigation();

	return (
		<BottomTab.Navigator
			screenOptions={({ navigation }) => ({
				tabBarActiveTintColor: 'blue',
				headerRight: () =>
					Icon({
						name: 'plus',
						size: 24,
						color: 'blue',
						style: {
							borderRadius: 24,
							padding: 6,
							marginHorizontal: 8,
							marginVertical: 2,
						},
						onPress: () => navigation.navigate('ManageExpenses'),
					}),
			})}>
			<BottomTab.Screen
				name="RecentExpenses"
				component={RecentExpenses}
				options={{
					title: 'Recent Expenses',
					tabBarLabel: 'Recent',
					tabBarIcon: ({ color, size }) =>
						Icon({
							name: 'clock',
							color,
							size,
							onPress: () => navigation.navigate('RecentExpenses' as never),
						}),
				}}
			/>
			<BottomTab.Screen
				name="AllExpenses"
				component={AllExpenses}
				options={{
					title: 'All Expenses',
					tabBarLabel: 'All',
					tabBarIcon: ({ color, size }) =>
						Icon({
							name: 'calendar',
							color,
							size,
							onPress: () => navigation.navigate('AllExpenses' as never),
						}),
				}}
			/>
		</BottomTab.Navigator>
	);
}

export default function App() {
	return (
		<>
			<StatusBar style="auto" />
			<ExpensesContextProvider>
				<NavigationContainer>
					<Stack.Navigator>
						<Stack.Screen
							name="OverviewExpenses"
							component={OverviewExpenses}
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name="ManageExpenses"
							component={ManageExpenses}
							options={{
								presentation: 'modal',
							}}
						/>
					</Stack.Navigator>
				</NavigationContainer>
			</ExpensesContextProvider>
		</>
	);
}
