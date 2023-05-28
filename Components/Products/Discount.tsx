import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {productDis} from './ProductDiscount';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';


// type RootStackParamList = {
//   ProductFullInfo: { productId: number };
// };
// Define props for Discount component
type DiscountProps = {
  // navigation: StackNavigationProp<RootStackParamList, 'ProductFullInfo'>;
  onDiscount: (productId: number) => void;
};
const Discount:React.FC<DiscountProps> = ({onDiscount}) => {
 const handleDiscount = (productId: number)=>{
  // navigation.navigate('ProductFullInfo', { productId });
    console.log({ productId });
    onDiscount(productId);
 };
  return (
    <View>
      <Text style={styles.heading}>Top Discount For You</Text>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => handleDiscount(1)}>
          <View style={styles.card}>
            <Image source={productDis[0].imagePath} style={styles.image} />
            <Text style={styles.caption}> {productDis[0].title} </Text>
            <Text style={styles.priceDiscount}> $ {productDis[0].priceDiscount} </Text>
            <Text style={styles.price}> $ {productDis[0].price} </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDiscount(2)}>
          <View style={styles.card}>
            <Image source={productDis[1].imagePath} style={styles.image} />
            <Text style={styles.caption}> {productDis[1].title} </Text>
            <Text style={styles.priceDiscount}> $ {productDis[1].priceDiscount} </Text>
            <Text style={styles.price}> $ {productDis[1].price} </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDiscount(3)}>
          <View style={styles.card}>
            <Image source={productDis[2].imagePath} style={styles.image} />
            <Text style={styles.caption}> {productDis[2].title} </Text>
            <Text style={styles.priceDiscount}> $ {productDis[2].priceDiscount} </Text>
            <Text style={styles.price}> $ {productDis[2].price} </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Discount;

const styles = StyleSheet.create({
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 8,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  card: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#BFBFBF',

  },
  image: {
    width: 110,
    height: 110,
    aspectRatio: 1, // Ensures that the image is always square.
  },
  caption: {
    fontSize: 14,
  },
  priceDiscount: {
    fontSize: 14,
    textDecorationLine: 'line-through',
    
  },
  price : {
    fontSize: 16,
    fontWeight: "bold",
  },
});
