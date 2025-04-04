import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, Dimensions } from 'react-native';
import PasswordIcon from '../Assets/SVG/PasswordIcon';
import EmailIcon from '../Assets/SVG/EmailIcon';
import GoogleIcon from './../Assets/SVG/GoogleIcon';
import LoginIcon from './../Assets/SVG/LoginIcon';
import { useNavigation } from '@react-navigation/native';
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signInWithCredential } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

// Get screen height for dynamic margin
const { height } = Dimensions.get('window');

const Login = () => {
  const { navigate } = useNavigation();

  // Define state variables for email and password input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between login and sign-up
  const [loading, setLoading] = useState(true); // Track loading state while checking auth

  // Google Sign-In configuration
  useEffect(() => {

    GoogleSignin.configure({
      webClientId: '14370231613-p90et7av2p8qplfmp4i1lrd89567cle8.apps.googleusercontent.com', // Replace with your web client ID
      offlineAccess: true,
    });

    const auth = getAuth();

    // Monitor authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Pass email to the Home screen if user is authenticated
        navigate('Home', { email: user.email }); 
      } else {
        setLoading(false); // Stop loading if no user is logged in
      }
    });

    return () => unsubscribe(); // Cleanup listener when component unmounts
  }, [navigate]);

  async function onGoogleButtonPress() {
    try {
      // Check if Google Play Services is available
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  
      // Sign in with Google
      const signInResult = await GoogleSignin.signIn();
      console.log('Google Sign-In Result:', JSON.stringify(signInResult, null, 2));
  
      // Extract the ID token
      let idToken;
      if (signInResult.idToken) {
        idToken = signInResult.idToken; // For older versions
      } else if (signInResult.user?.idToken) {
        idToken = signInResult.user.idToken; // For newer versions
      } else if (signInResult.data?.idToken) {
        idToken = signInResult.data.idToken; // For newer versions
      } else {
        throw new Error('No ID token found');
      }
      console.log('ID Token:', idToken);
  
      // Create a Google credential with the token
      const authInstance = getAuth();
      const googleCredential = GoogleAuthProvider.credential(idToken);
      console.log('Firebase Credential:', googleCredential);
  
      // Sign in to Firebase with the Google credential
      const userCredential = await signInWithCredential(authInstance, googleCredential);
      console.log('Signed in with Google!', userCredential.user);
  
      // Navigate to the Home screen or perform other actions
      navigate('Home', { email: userCredential.user.email });
    } catch (error) {
      console.error('Google Sign-In error:', error);
      Alert.alert('Error', error.message || 'Something went wrong during Google Sign-In');
    }
  }

  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    const auth = getAuth();

    try {
      setLoading(true); // Show loading when making authentication request

      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
        Alert.alert('Success', 'User account created. Logging you in now.');
        navigate('Home', { email }); // Pass email to Home screen after successful sign-up
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        navigate('Home', { email }); // Pass email to Home screen after successful login
      }
    } catch (error) {
      let errorMessage = 'An error occurred. Please try again.';
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'User not found. Please sign up.';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password. Please try again.';
          break;
        case 'auth/email-already-in-use':
          errorMessage = 'Email already in use. Please log in.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address.';
          break;
        default:
          errorMessage = error.message;
      }
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false); // Hide loading after authentication attempt
    }
  };

  if (loading) {
    return <Text>Loading...</Text>; // Show loading text while checking auth state
  }

  // Dynamically calculate marginTop for WELCOME text
  const dynamicMarginTop = Math.max(200, height * 0.1);

  return (
    <View style={styles.container}>
      {/* Welcome Text */}
      <View style={{ alignSelf: 'center', marginTop: 190, marginTop: dynamicMarginTop  }}>
        <Text style={{ fontSize: 50, fontWeight: 'bold', color: 'white', transform: [{ scaleX: 1.3 }] }}>
          WELCOME
        </Text>
      </View>

      {/* Main Box */}
      <View style={styles.mainBox}>
        <View style={styles.mainBackground}>
          {/* Nike Shoe Image */}
          <View>
            <Image source={require('./../Assets/Images/Nike-Air-Max-Sneakers-red-white.png')} style={styles.img} />
          </View>

          {/* Welcome Message */}
          <Text style={styles.welcomeText}>
            Walk the Extra Mile in Style! Log in to discover the perfect pair for every occasion. Your next favorite shoes are just a step away!
          </Text>

          {/* Email Input */}
          <View style={styles.inputContainer}>
            <EmailIcon width={20} height={20} color="#323232" style={styles.icon} />
            <TextInput
              placeholder="Enter your email"
              placeholderTextColor="grey"
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <PasswordIcon width={20} height={20} color="#323232" style={styles.icon} />
            <TextInput
              placeholder="Enter your password"
              placeholderTextColor="grey"
              style={styles.input}
              secureTextEntry={true}
              autoCapitalize="none"
              value={password}
              onChangeText={setPassword}
            />
          </View>

          {/* Login/Sign Up Button */}
          <TouchableOpacity style={styles.loginButton} onPress={handleAuth}>
            <LoginIcon width={24} height={24} color="white" />
            <Text style={styles.loginButtonText}>{isSignUp ? 'Sign Up' : 'Log In'}</Text>
          </TouchableOpacity>

          {/* Toggle Between Login and Sign Up */}
          <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)}>
            <Text style={{ color: '#323232', marginTop: 10 }}>
              {isSignUp ? 'Already have an account? Log In' : 'Don’t have an account? Sign Up'}
            </Text>
          </TouchableOpacity>

          {/* Or Continue With */}
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Text style={{ color: '#323232' }}>Or Continue With</Text>

            {/* Google Login Button */}
            <TouchableOpacity style={styles.googleButton} onPress={onGoogleButtonPress}>
              <GoogleIcon width={20} height={20} color="#323232" />
              <Text style={styles.googleButtonText}>Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgrey',
  },
  mainBox: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#e9ecef',
    height: 650,
    marginHorizontal: 25,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    borderWidth: 10,
    borderColor: '#fff',
    borderBottomWidth: 0,
  },
  mainBackground: {
    marginHorizontal: 15,
    alignItems: 'center',
  },
  img: {
    resizeMode: 'contain',
    height: 200,
    width: 250,
  },
  welcomeText: {
    fontSize: 15,
    color: '#323232',
    fontWeight: '400',
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 20,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    width: 280,
    height: 50,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: '#fff',
  },
  loginButton: {
    backgroundColor: '#323232',
    width: 280,
    height: 50,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    flexDirection: 'row',
    gap: 5,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  googleButton: {
    backgroundColor: '#fff',
    width: 280,
    height: 50,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    flexDirection: 'row',
    gap: 5,
  },
  googleButtonText: {
    color: '#323232',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
