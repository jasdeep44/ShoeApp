import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeInLeft, FadeInRight, FadeInDown, FadeInUp, LinearTransition } from 'react-native-reanimated';

const SplashScreen = () => {
  const { navigate } = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("Login");
    }, 3000);

    // Clear the timer if the component is unmounted
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <View style={styles.container}>
      <LottieView
        style={{
          height: 400,
          width: 400,
        }}
        source={require("./../Assets/Animations/Animation1.json")}
        autoPlay
        loop
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
});