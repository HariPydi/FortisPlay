import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/login/LoginScreen';
import DashboardScreen from './src/screens/dashboard/DashboardScreen';
import MastersScreen from './src/screens/masters/MastersScreen';
import AddVenueScreen from './src/screens/masters/venues/AddVenueScreen';
import KYCPersonalInfoScreen from './src/screens/KYCPersonalInfoScreen';

export type RootStackParamList = {
  Login: undefined;
  Dashboard: undefined;
  Masters: undefined;
  Allotment: undefined;
  AddVenue: undefined;
  KYCPersonalInfo: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Masters" component={MastersScreen} />
        <Stack.Screen name="AddVenue" component={AddVenueScreen} />
        <Stack.Screen name="KYCPersonalInfo" component={KYCPersonalInfoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;