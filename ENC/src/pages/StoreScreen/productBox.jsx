// ProductBox.js
import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import HeartEmpty from '../StoreScreen/heart_empty.png';
import HeartFull from '../StoreScreen/heartFull.png';

const ProductBox = ({ imageSource, title, category, price, tag, productImage }) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <View style={styles.productBox}>
      <View style={styles.tagArea}>
        <View style={styles.tag}>
          <Text style={styles.tagText}>{tag}</Text>
        </View>
      </View>
      <View style={styles.imageArea}>
        <Image source={imageSource} style={productImage} />
      </View>
      <View style={styles.productTextArea}>
        <Text style={styles.productTitle}>{title}</Text>
      </View>
      <View style={styles.productCategoryArea}>
        <Text style={styles.productCategory}>{category}</Text>
      </View>
      <View style={styles.productPriceArea}>
        <Text style={styles.productPrice}>{price}</Text>
        <TouchableOpacity onPress={() => setIsLiked(!isLiked)}>
          <Image source={isLiked ? HeartFull : HeartEmpty} style={styles.heart} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  productBox: {
    width: 165,
    height: 190,
    backgroundColor: 'white',
    borderRadius: 30,
    marginVertical: 10,
    padding: 15,
  },
  tagArea: {
    width: "100%",
  },
  tag: {
    width: 35,
    height: 18,
    borderRadius: 5,
    backgroundColor: '#FFC55E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "white",
  },
  imageArea: {
    width: '100%',
    height: 85,
    justifyContent: 'center',
    alignItems: 'center'
  },
  coffeeImage: {
    width: 130,
    height: 70,
  },
  mealImage: {
    width: 70,
    height: 70,
  },
  productTextArea: {
    width: '100%',
    height: 18,
    justifyContent: 'center',
  },
  productTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#4D4D4D",
  },
  productCategoryArea: {
    width: '100%',
    height: 15,
    justifyContent: 'center',
    marginBottom: 5,
  },
  productCategory: {
    fontSize: 10,
    color: "#C3C3C3",
  },
  productPriceArea: {
    flexDirection: 'row',
    width: '99%',
    height: 23,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#6E6E6E",
  },
  heart: {
    width: 21,
    height: 18,
  },
});

export default ProductBox;
