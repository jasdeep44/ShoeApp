import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import React, {useContext} from 'react'; // Import useContext
import AddIcon from '../Assets/SVG/AddIcon';
import {CartContext} from '../context/CartContext'; // Import CartContext
import MinusIcon from '../Assets/SVG/MinusIcon';

const ProductCart = ({item}) => {
  const {cartItems, addToCart, decreaseQuantity} = useContext(CartContext); // Use CartContext

  // Find the current item in the cart
  const cartItem = cartItems.find(cartItem => cartItem.id === item.id);
  const quantity = cartItem ? cartItem.quantity : 0; // Get the current quantity

  // Function to handle adding quantity
  const handleAddQuantity = () => {
    addToCart(item); // Update the global cart state
  };

  // Function to handle decreasing quantity
  const handleDecreaseQuantity = () => {
    decreaseQuantity(item.id); // Decrease quantity or remove the item
  };

  // Calculate total price
  const totalPrice = (item.price * quantity).toFixed(2);

  return (
    <View style={styles.mainBox}>
      {/* Product Image */}
      <Image style={styles.image} source={item.thumbnail} />

      {/* Product Details */}
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.price}>₹{totalPrice}</Text>
      </View>

      {/* Add Icon and Quantity */}
      <View style={styles.quantityContainer}>
        <TouchableOpacity style={styles.iconBox} onPress={handleAddQuantity}>
          <AddIcon width={20} height={20} />
        </TouchableOpacity>
        <Text style={styles.quantityText}>Qty: {quantity}</Text>
        <TouchableOpacity
          style={styles.iconBox}
          onPress={handleDecreaseQuantity}>
          <MinusIcon width={20} height={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductCart;

const styles = StyleSheet.create({
  mainBox: {
    flexDirection: 'row',
    alignItems: 'center', // Center items vertically
    justifyContent: 'space-between', // Space out items horizontally
    padding: 8,
    marginHorizontal: 15,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 9,
    height: 120,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    backgroundColor: 'lightgrey',
    borderRadius: 9,
  },
  textContainer: {
    flex: 1, // Take up remaining space
    marginLeft: 10, // Add some space between the image and text
  },
  title: {
    fontSize: 16,
    color: '#323232',
    fontWeight: 'bold',
    marginBottom: 5, // Add some space between the title and price
  },
  price: {
    fontSize: 16,
    color: 'grey',
    fontWeight: '600',
  },
  quantityContainer: {
    alignItems: 'center', // Center items vertically
    justifyContent: 'center',
    height: 50,
    width: 50,
  },
  iconBox: {
    backgroundColor: 'lightgrey',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 55,
    borderWidth: 0.5,
    marginVertical: 5,
    // Uncomment for shadows
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
  },
  quantityText: {
    fontSize: 14,
    color: '#323232',
    // fontWeight: 'bold',
    marginTop: 5, // Add some space between the icon and quantity text
  },
});
