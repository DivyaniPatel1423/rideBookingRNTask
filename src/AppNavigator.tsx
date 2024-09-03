import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from './screens/SplashScreen';
import TicketScreen from './screens/TicketScreen';
import HomeScreen from './screens/HomeScreen';
import ScanCardScreen from './screens/ScanCardScreen';
const Stack = createStackNavigator();

const linking = {
  prefixes: ['myapp://'],
  config: {
    screens: {
      Home: 'home',
    },
  },
};

const AppNavigator: React.FC = () => {
  return (
    //deeplinking to open home screen
    <NavigationContainer linking={linking}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="TicketScreen" component={TicketScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ScanCardScreen" component={ScanCardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
