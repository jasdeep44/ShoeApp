import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import MenuIcon from './../Assets/SVG/MenuIcon';
import ProductCard from '../components/ProductCard';
import {productData} from '../Data/ProductData';
import {useNavigation} from '@react-navigation/native';
import CartIcon from './../Assets/SVG/CartIcon';
import {useRoute} from '@react-navigation/native';
import {getAuth, signOut} from '@react-native-firebase/auth';

const Home = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {email} = route.params || {}; // Retrieve the email passed from Login.js
  console.log('Email received:', email);
  const [modalVisible, setModalVisible] = useState(false);

  // Function to handle logout
  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth); // Sign the user out from Firebase
      console.log('User signed out');
      navigation.navigate('Login'); // Navigate back to the Login screen
    } catch (error) {
      console.error('Error signing out:', error);
      Alert.alert('Error', 'Something went wrong while logging out.');
    }
  };

  function renderModal() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              padding: 20,
              borderRadius: 10,
              width: '80%',
              alignItems: 'center',
            }}>
            <Text
              style={{
                borderTopWidth: 2,
                borderRightWidth: 2,
                borderLeftWidth: 2,
                padding: 6,
                marginBottom: 15,
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
                color: 'grey',
                fontStyle: 'italic',
                width: '80%',
              }}>
              {email}
            </Text>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Go Back</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,
                styles.buttonClose,
                {backgroundColor: 'red', color: 'white'},
              ]}
              onPress={handleLogout}>
              <Text style={styles.textStyle}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ProductDetail', {data: item});
        }}>
        <ProductCard item={item} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView />
      {/* Header */}
      <View style={styles.Header}>
        {/* Open Modal on MenuIcon Press */}
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <MenuIcon />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Cart');
          }}>
          <CartIcon />
        </TouchableOpacity>
      </View>
      {/* Body Text */}
      <View style={styles.bodyContainer}>
        <Text style={styles.title}>Nike Shoes</Text>
        <Text style={styles.subTitle}>Product of your Choice</Text>
      </View>
      {/* Card List */}
      <FlatList
        data={productData}
        keyExtractor={item => `${item.id.toString()}`}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={styles.contentContainerStyle}
        columnWrapperStyle={styles.columnWrapperStyle} // Add this for proper column spacing
        showsVerticalScrollIndicator={false}
      />
      {/* render modal */}
      {renderModal()}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa', // Optional: Add a background color
  },
  Header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingTop: 20, // Add some top padding for better spacing
  },
  title: {
    fontSize: 30,
    color: '#000',
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 18,
    color: '#000',
  },
  bodyContainer: {
    paddingHorizontal: 30,
    marginTop: 20,
  },
  contentContainerStyle: {
    paddingBottom: 20, // Add padding at the bottom to avoid overflow
  },
  columnWrapperStyle: {
    justifyContent: 'center', // Space out columns evenly
    paddingHorizontal: 15, // Add horizontal padding to avoid overflow
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    marginVertical: 6,
    width: '80%',
  },
  buttonClose: {
    backgroundColor: '#323232',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
