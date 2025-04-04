import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState, useContext} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation, useRoute} from '@react-navigation/native';
import BackIcon from './../Assets/SVG/BackIcon';
import HeartIcon from './../Assets/SVG/HeartIcon';
import {CartContext} from './../context/CartContext';

const ProductDetails = () => {
  const {params} = useRoute();
  const {goBack} = useNavigation();
  const [isFav, setIsFav] = useState(false);
  const data = params?.data;
  const {navigate} = useNavigation();
  const {addToCart} = useContext(CartContext); // Destructure addToCart from context

  return (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.greyBackground}>
        <SafeAreaView />
        <View style={styles.iconsContainer}>
          <TouchableOpacity onPress={() => goBack()} style={styles.iconBox}>
            <BackIcon />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsFav(!isFav)}
            style={styles.iconBox}>
            <HeartIcon isFav={isFav} />
          </TouchableOpacity>
        </View>
        {/* images */}
        <Image
          sharedTransitionTag={`T${data.id}`}
          source={data.thumbnail}
          style={styles.image}
        />
      </View>
      {/* body */}
      <View style={styles.bodyContainer}>
        <View style={styles.box}>
          <Text style={styles.title}>{data.title}</Text>
          <View style={styles.innerBox}>
            <Text style={styles.price}>₹{data.price}</Text>
            <Text style={styles.rating}>✦ {data.rating}</Text>
          </View>
        </View>

        {/* description */}
        <View>
          <Text style={styles.description}>{data.description}</Text>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              addToCart(data); // Add the item to the cart
              navigate('Cart'); // Navigate to the Cart screen
            }}>
            <Text style={styles.btnTitle}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa', // Optional: Add a background color
  },
  greyBackground: {
    height: 350,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    backgroundColor: 'lightgrey',
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 5,
  },
  iconBox: {
    backgroundColor: '#fff',
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
  },
  image: {
    height: 200,
    width: 350,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  bodyContainer: {
    paddingHorizontal: 20,
  },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    color: '#000',
    fontWeight: 'bold',
  },
  price: {
    fontSize: 24,
    color: '#000',
    fontWeight: 'bold',
  },
  rating: {
    fontSize: 18,
    color: '#000',
  },
  innerBox: {
    alignItems: 'flex-end',
  },
  description: {
    fontSize: 16,
    color: '#000',
    marginVertical: 30,
  },
  btn: {
    backgroundColor: '#495057',
    width: '40%',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
  },
  btnTitle: {
    color: '#fff',
    fontSize: 16,
  },
});
