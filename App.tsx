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
import Login from './screens/Login';
import Signup from './screens/Signup';
import AuthContextProvider, { AuthContext } from './store/auth';
import { useCallback, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';
import { View } from 'react-native';

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator<RouteStackParams>();
const BottomTab = createBottomTabNavigator();

function OverviewExpenses() {
	const navigation = useNavigation();

	const authCtx = useContext(AuthContext);

	return (
		<BottomTab.Navigator
			screenOptions={({ navigation }) => ({
				tabBarActiveTintColor: 'blue',
				headerRight: () =>
					Icon({
						name: 'log-out',
						size: 24,
						color: 'red',
						style: {
							borderRadius: 24,
							padding: 6,
							marginHorizontal: 8,
							marginVertical: 2,
						},
						onPress: () => authCtx.logout(),
					}),
			})}>
			<BottomTab.Screen
				name='RecentExpenses'
				component={RecentExpenses}
				options={{
					title: 'Recent Expenses',
					tabBarLabel: 'Recent',
					tabBarIcon: ({ color, size }) =>
						Icon({
							name: 'clock',
							color,
							size,
							onPress: () =>
								navigation.navigate('RecentExpenses' as never),
						}),
				}}
			/>
			<BottomTab.Screen
				name='AllExpenses'
				component={AllExpenses}
				options={{
					title: 'All Expenses',
					tabBarLabel: 'All',
					tabBarIcon: ({ color, size }) =>
						Icon({
							name: 'calendar',
							color,
							size,
							onPress: () =>
								navigation.navigate('AllExpenses' as never),
						}),
				}}
			/>
		</BottomTab.Navigator>
	);
}

function AuthStack() {
	return (
		<Stack.Navigator initialRouteName='Login'>
			<Stack.Screen
				name='Login'
				component={Login}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name='Signup'
				component={Signup}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	);
}

function AuthenticatedStack() {
	return (
		<ExpensesContextProvider>
			<Stack.Navigator initialRouteName='OverviewExpenses'>
				<Stack.Screen
					name='OverviewExpenses'
					component={OverviewExpenses}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name='ManageExpenses'
					component={ManageExpenses}
					options={{
						presentation: 'modal',
					}}
				/>
			</Stack.Navigator>
		</ExpensesContextProvider>
	);
}

function Root() {
	const [isReady, setIsReady] = useState(false);

	const authCtx = useContext(AuthContext);

	useEffect(() => {
		async function fetchUserData() {
			try {
				const userData = await AsyncStorage.getItem(
					'@expense-tracker-app:userData',
				);

				if (userData) {
					authCtx.addToken(JSON.parse(userData));
				}

				await new Promise((resolve) => setTimeout(resolve, 2000));
			} catch (error) {
				console.warn(error);
			} finally {
				setIsReady(true);
			}
		}

		fetchUserData();
	}, []);

	const onLayoutRootView = useCallback(async () => {
		if (isReady) {
			await SplashScreen.hideAsync();
		}
	}, [isReady]);

	if (!isReady) {
		return null;
	}

	return (
		<View
			style={{ flex: 1 }}
			onLayout={onLayoutRootView}>
			<NavigationContainer>
				{authCtx.isAuthenticated ? (
					<AuthenticatedStack />
				) : (
					<AuthStack />
				)}
			</NavigationContainer>
		</View>
	);
}

export default function App() {
	return (
		<>
			<StatusBar style='auto' />
			<AuthContextProvider>
				<Root />
			</AuthContextProvider>
		</>
	);
}
