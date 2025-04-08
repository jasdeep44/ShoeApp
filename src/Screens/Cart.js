import React, { useContext } from 'react';
import { StyleSheet, Text, FlatList, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProductCart from '../components/ProductCart';
import { CartContext } from './../context/CartContext'; // Import CartContext
import BackIcon from '../Assets/SVG/BackIcon';
import { useNavigation } from '@react-navigation/native';
import TrashIcon from '../Assets/SVG/TrashIcon';
import SendIcon from '../Assets/SVG/SendIcon';
import RazorpayCheckout from 'react-native-razorpay';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Cart = () => {
  const { cartItems, clearCart } = useContext(CartContext); // Retrieve cart items from the context
  const { goBack } = useNavigation();

  // Function to handle clearing the cart
  const handleClearCart = () => {
    clearCart();
    AsyncStorage.removeItem('@cartItems'); // Clears cart from AsyncStorage
  };

  // Calculate the total amount of items in the cart (in paise/ smallest currency unit)
  const calculateTotalAmount = () => {
    let totalAmount = 0;
    cartItems.forEach(item => {
      totalAmount += item.price * item.quantity; // Assuming each item has a price and quantity
    });
    return totalAmount * 100; // Multiply by 100 to convert to paise (smallest unit of INR)
  };

  const renderItem = ({ item }) => {
    return <ProductCart item={item} />;
  };

  const handlePayment = () => {
    const totalAmount = calculateTotalAmount();

    // Generate Razorpay options
    var options = {
      description: 'Credits towards consultation',
      image: 'https://i.imgur.com/3g7nmJC.jpg', // Optional: Add a product image URL
      currency: 'INR',
      key: 'rzp_test_FtSBBQWvJscpLA', // Your Razorpay API key
      amount: totalAmount.toString(), // Pass the dynamically calculated amount in paise
      name: 'Shoe App', // Company Name
      prefill: {
        email: 'gaurav.kumar@example.com', // Replace with user email dynamically
        contact: '9191919191', // Replace with user contact dynamically
        name: 'Gaurav Kumar', // Replace with user name dynamically
      },
      theme: { color: '#53a20e' }, // Optional: Set your theme color
    };

    // Open Razorpay checkout
    RazorpayCheckout.open(options)
      .then(data => {
        // handle success
        alert(`Success: ${data.razorpay_payment_id}`);
      })
      .catch(error => {
        // handle failure
        console.log(`Error: ${error.code} | ${error.description}`);
      });
  };

  return (
    <View style={styles.container}>
      <SafeAreaView />
      {/* Header */}
      <View style={styles.Header}>
        <Text style={styles.headerText}>Cart Items</Text>
        <TouchableOpacity style={styles.backBtn} onPress={() => goBack()}>
          <BackIcon />
        </TouchableOpacity>
      </View>
  
      {/* Main Content */}
      <View style={styles.mainContent}>
        {cartItems.length > 0 ? (
          <FlatList
            data={cartItems}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={[styles.contentContainerStyle, { paddingBottom: 6 }]}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <Text style={styles.emptyCartText}>Your cart is empty...</Text>
        )}
      </View>
  
      {/* Grey Background */}
      <View style={styles.greyBackground}>
        <TouchableOpacity style={styles.btn} onPress={handleClearCart}>
          <Text style={{ fontSize: 15, color: 'black' }}>Clear Cart Items</Text>
          <TrashIcon height={20} width={20} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: '#4361ee' }]}
          onPress={handlePayment}>
          <Text style={[styles.btnText, { color: '#fff' }]}>
            Proceed to Payment
          </Text>
          <SendIcon height={18} width={18} fill={'#fff'} />
        </TouchableOpacity>
      </View>
    </View>
  );
  
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  Header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingTop: 20,
  },
  headerText: {
    fontSize: 30,
    color: '#000',
    fontWeight: 'bold',
  },
  mainContent: {
    flex: 1, // Occupy available space
  },
  contentContainerStyle: {
    paddingBottom: 20, // Keep some padding at the bottom
  },
  emptyCartText: {
    fontSize: 16,
    color: 'grey',
    textAlign: 'left',
    marginLeft: 30,
    marginTop: 10,
    textTransform: 'capitalize',
  },
  greyBackground: {
    height: 150,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: 'lightgrey',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: '#fff',
    width: '70%',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
  },
  btnText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  backBtn: {
    backgroundColor: '#fff',
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
});
