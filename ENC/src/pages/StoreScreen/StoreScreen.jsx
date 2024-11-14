// StoreScreen.js
import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from "react-native";
import Magnifier from '../StoreScreen/Magnifier.png';
import Coffee from '../StoreScreen/coffee.png';
import Coffee1 from '../StoreScreen/coffee1.png';
import Coffee2 from '../StoreScreen/coffee2.png';
import Coffee3 from '../StoreScreen/coffee3.png';
import Coffee4 from '../StoreScreen/coffee4.png';
import Meal1 from '../StoreScreen/meal1.png';
import Meal2 from '../StoreScreen/meal2.png';
import Meal3 from '../StoreScreen/meal3.png';
import Meal4 from '../StoreScreen/meal4.png';
import StudentMeal from '../StoreScreen/studentMeal.png';
import ProductBox from '../StoreScreen/productBox';
import Coopsket from '../StoreScreen/coopsket.png';
import CoopssketLogo from '../StoreScreen/coopsketLogo.png';

const StoreScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState(0);

  const categories = ["커피 쿠폰", "학식 쿠폰", "쿱스켓", "동국대 굿즈"];
  const categoryProducts = {
    0: [ // 커피 쿠폰
      { imageSource: Coffee1, title: "아이스아메리카노", category: "가온누리", price: "₩1,500", tag: "coffee" },
      { imageSource: Coffee2, title: "카페라떼", category: "카페베네", price: "₩2,500", tag: "coffee" },
      { imageSource: Coffee3, title: "에스프레소", category: "스타벅스", price: "₩3,000", tag: "coffee" },
      { imageSource: Coffee4, title: "바닐라라떼", category: "투썸", price: "₩3,000", tag: "coffee" },
    ],
    1: [ // 학식 쿠폰
      { imageSource: Meal1, title: "오늘의 덮밥", category: "상록원", price: "₩4,500", tag: "meal" },
      { imageSource: Meal2, title: "삼겹김치철판", category: "상록원", price: "₩5,800", tag: "meal" },
      { imageSource: Meal3, title: "명란파스타", category: "가든쿡", price: "₩7,000", tag: "meal" },
      { imageSource: Meal4, title: "페퍼로니피자", category: "가든쿡", price: "₩9,900", tag: "meal" },
    ],
    2: [ // 쿱스켓
      { imageSource: CoopssketLogo, title: "쿱스켓 5천원권", category: "쿱스켓", price: "₩5,000", tag: "coop" },
      { imageSource: CoopssketLogo, title: "쿱스켓 만원권", category: "쿱스켓", price: "₩10,000", tag: "coop" },
      { imageSource: CoopssketLogo, title: "쿱스켓 2만원권", category: "쿱스켓", price: "₩20,000", tag: "coop" },
      { imageSource: CoopssketLogo, title: "쿱스켓 5만원권", category: "쿱스켓", price: "₩50,000", tag: "coop" },
    ],
    3: [ // 동국대 굿즈
      { imageSource: '', title: "아코 인형", category: "동국대", price: "₩7,500", tag: "goods" },
      { imageSource: '', title: "늙코 인형", category: "동국대", price: "₩7,500", tag: "goods" },
      { imageSource: '', title: "동국대 학잠", category: "동국대", price: "₩45,000", tag: "goods" },
      { imageSource: '', title: "동국대 돕바", category: "동국대", price: "₩55,900", tag: "goods" },
    ],
  };
  const products = categoryProducts[selectedCategory];

  // 카테고리에 따라 동적으로 색상과 이미지를 설정
  const categoryStyles = {
    0: { // 커피 쿠폰
      containerTopColor: '#FFEFC7',
      searchBoxColor: '#FFE7A9',
      placeholderTextColor: '#8C8251',
      middleBoxColor: '#FFF9E9',
      middleBoxImage: Coffee,
      imageStyle: styles.coffee,
      productImage: styles.coffeeImage,
    },
    1: { // 학식 쿠폰
      containerTopColor: '#FFEAE3',
      searchBoxColor: '#FFD1C4',
      placeholderTextColor: '#C25656',
      middleBoxColor: '#FFF9F8',
      middleBoxImage: StudentMeal,
      imageStyle: styles.studentMeal,
      productImage: styles.mealImage,
    },
    2: { // 쿱스켓
      containerTopColor: '#E3FFEC',
      searchBoxColor: '#C4FFD1',
      placeholderTextColor: '#56C27A',
      middleBoxColor: '#F8FFF9',
      middleBoxImage: Coopsket,
      imageStyle: styles.coopsket,
      productImage: styles.coopImage,
    },
    3: { // 동국대 굿즈
      containerTopColor: '#E3EAFF',
      searchBoxColor: '#C4D1FF',
      placeholderTextColor: '#5668C2',
      middleBoxColor: '#F8F9FF',
      middleBoxImage: null,
      imageStyle: styles.studentMeal,
    }
  };

  const { containerTopColor, searchBoxColor, placeholderTextColor, middleBoxColor, middleBoxImage, imageStyle, productImage,} = categoryStyles[selectedCategory];

  return (
    <View style={styles.container}>
      <View style={[styles.containerTop, { backgroundColor: containerTopColor }]}>
        <View style={styles.affiliation}>
          <Text style={styles.univText}>동국대학교</Text>
          <Text style={styles.nameText}>박주형님</Text>
        </View>
        <View style={styles.searchArea}>
          <View style={[styles.searchBox, { backgroundColor: searchBoxColor }]}>
            <Image source={Magnifier} style={styles.magnifierIcon} />
            <TextInput 
              style={styles.searchInput}
              placeholder="검색어를 입력하세요" 
              placeholderTextColor={placeholderTextColor}
            />
          </View>
        </View>
      </View>
      
      <View style={styles.middleArea}>
        <View style={[styles.middleBox, { backgroundColor: middleBoxColor }]}>
          <Image source={middleBoxImage} style={imageStyle} />
        </View>
      </View>

      <View style={styles.containerBottom}>
        <View style={styles.categoryArea}>
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.categoryBox,
                selectedCategory === index && styles.selectedCategoryBox,
              ]}
              onPress={() => setSelectedCategory(index)} 
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === index && styles.selectedCategoryText, 
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={styles.productArea}>
          {products.map((product, index) => (
            <ProductBox
              key={index}
              imageSource={product.imageSource}
              productImage={productImage}
              title={product.title}
              category={product.category}
              price={product.price}
              tag={product.tag}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerTop: {
    width: '100%',
    height: '28.5%',
    paddingTop: 50,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  containerBottom: {
    width: '100%',
    height: '65%',
    backgroundColor: '#FAFAFA',
    paddingTop: 80,
    alignItems: 'center',
  },
  affiliation: {
    width: '100%',
    height: '20%',
    marginLeft: 20,
    marginBottom: 18,
  },
  univText: {
    fontFamily: "Pretendard",
    fontSize: 10,
    fontWeight: "bold",
    color: "#444444",
  },
  nameText: {
    textAlign: "left",
    fontFamily: "Pretendard",
    fontSize: 15,
    fontWeight: "bold",
    color: "#444444",
  },
  searchArea: {
    width: '100%',
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBox: {
    width: '93%',
    height: 50,
    borderRadius: 20,
    alignItems: 'center',
    paddingLeft: 15,
    flexDirection: 'row',
  },
  magnifierIcon: {
    width: 25, 
    height: 25, 
    marginRight: 5,
  },
  middleArea: {
    width: '100%',
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '20%', 
    zIndex: 2, 
    borderRadius: 10, 
  },
  middleBox: {
    width: '84%',
    height: '90%',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingTop: 10,
  },
  coffee: {
    width: 300, 
    height: 120,
  },
  studentMeal: {
    width: 300, 
    height: 89,
  },
  coopsket: {
    width: 300, 
    height: 100,
  },
  categoryArea: {
    width: '90%',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  categoryBox: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 12,
    backgroundColor: '#F2F2F2',
  },
  selectedCategoryBox: {
    backgroundColor: '#E86C00', 
  },
  categoryText: {
    fontSize: 14,
    color: '#5F5F5F',
  },
  selectedCategoryText: {
    fontWeight: 'bold', 
    color: 'white',   
  },
  productArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    width: '100%',
    paddingHorizontal: 30,
  },
  coffeeImage: {
    width: 130,
    height: 70,
  },
  mealImage: {
    width: 70,
    height: 70,
  },
  coopImage: {
    width: 120,
    height: 30,
  },
});

export default StoreScreen;
