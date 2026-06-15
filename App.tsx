import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import MastersScreen from './src/screens/MastersScreen';
import AddVenueScreen from './src/screens/AddVenueScreen';

export type RootStackParamList = {
  Login: undefined;
  Dashboard: undefined;
  Masters: undefined;
  Allotment: undefined;
  AddVenue: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Masters" component={MastersScreen} />
        <Stack.Screen name="AddVenue" component={AddVenueScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;