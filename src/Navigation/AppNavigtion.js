import React from 'react';
import { useColorScheme } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './../Screens/Home';
import SplashScreen from './../Screens/SplashScreen';
import ProductDetails from './../Screens/ProductDetails';
import Cart from '../Screens/Cart';
import Login from '../Screens/Login';

const Stack = createNativeStackNavigator();

function AppNavigation() {
  // Detect the system's color scheme
  const colorScheme = useColorScheme();

  // Apply the appropriate theme based on the color scheme
  const navigationTheme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="ProductDetail" component={ProductDetails} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
