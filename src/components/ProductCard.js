import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
// import Animated from 'react-native-reanimated';
const ProductCard = ({item}) => {
  return (
    <View style={styles.mainBox}>
      <Image
        sharedTransitionTag = {`T${item.id}`}
        style={styles.image}
        source={item.thumbnail} />
      <Text style={styles.price}>₹{item.price}</Text>
      <Text style={styles.title} numberOfLines={1} >{item.title}</Text>
    </View>
  )
}

export default ProductCard

const styles = StyleSheet.create({
  mainBox: {
    alignItems: 'center', // Center items horizontally
    justifyContent: 'center', // Center items vertically
    padding: 20,
    margin: 5,
    
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  price: {
    fontSize: 18,
    color: '#323232',
    fontWeight: '600',
    marginTop: 10, // Add some space between the image and price
  },
  title: {
    fontSize: 18,
    color: '#323232',
    fontWeight: 'bold',
    marginTop: 5, // Add some space between the price and title
  },
})
