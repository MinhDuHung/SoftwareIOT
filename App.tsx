import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from './src/screens/Dashboard';
import Profile from './src/screens/Profile';
import SensorHistory from './src/screens/SensorHistory';
import ActionHistory from './src/screens/ActionHistory';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="SensorHistory" component={SensorHistory} />
          <Stack.Screen name="ActionHistory" component={ActionHistory} />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}