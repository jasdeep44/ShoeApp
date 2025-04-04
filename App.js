import { StyleSheet, StatusBar, useColorScheme } from 'react-native';
import AppNavigation from './src/Navigation/AppNavigtion';
import { CartProvider } from './src/context/CartContext';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      {/* StatusBar Configuration */}
      <StatusBar
        backgroundColor="#fff" // Set the background color of the status bar
        barStyle="dark-content" // Use "dark-content" for dark text/icons
      />
      <CartProvider>
        <AppNavigation />
      </CartProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({});