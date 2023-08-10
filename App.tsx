import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';

import  Home  from './Screens/homeScreen'
import Parking from './Screens/parkingSpace'
import Checkout from './Screens/checkoutScreen'
import { store } from './Store/Store'


export type ScreenParamTypes = {
  Home: undefined;
  Parking: undefined;
  Checkout: undefined;
}

export default function App() {
  const Stack = createNativeStackNavigator<ScreenParamTypes>()
  return (
    <NavigationContainer>
        <Provider store={store}>
          <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen name='Home' component={Home} options={{ title: 'Welcome' }} />
            <Stack.Screen name='Parking' component={Parking} options={{ title: "Register Parking" }} />
            <Stack.Screen name='Checkout' component={Checkout} options={{title:"Thank you"}}/>
            </Stack.Navigator>
            <StatusBar style="auto" />
        </Provider>
    </NavigationContainer>
  );
}

