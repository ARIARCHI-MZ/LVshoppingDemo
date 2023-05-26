import React, {useState} from 'react';
import {
  View,
  Text,
  useColorScheme,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import TopBar from '../TopBar';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import { products } from "./Product";

type RootStackParamList = {
  Home: undefined;
  ProductDetails: {categoryName: string; genderName: string};
  ProductFullInfo: { productId: number };
};

type ProductDetailsProps = {
  navigation: StackNavigationProp<RootStackParamList, 'ProductDetails'>;
  route: RouteProp<RootStackParamList, 'ProductDetails'>;
};


const ProductDetails: React.FC<ProductDetailsProps> = ({route,navigation}) => {
  // color mode
  const scheme = useColorScheme();
  const [backgroundColor, setBackgroundColor] = useState(
    scheme === 'dark' ? '#383838' : 'white',
  );
  // product filter
  const {categoryName, genderName} = route.params;

 
  let filteredProducts = [];

  if (categoryName) {
    filteredProducts = products.filter(
      product => product.category === categoryName,
    );
  } else if (genderName && genderName !== "All") {
    filteredProducts = products.filter(
      product => product.gender === genderName,
    );
  } else {
    filteredProducts = products;
  }

  console.log('Category Name:', categoryName);
  console.log('Gender Name:', genderName);
  console.log('Filtered Products:', filteredProducts);

  const handlePress = (productId: number) => {
    navigation.navigate('ProductFullInfo', { productId });
    console.log({ productId });
  };
  return (
    <SafeAreaView style={[styles.container, {backgroundColor}]}>
      <View style={[styles.topB, {backgroundColor}]}>
        <TopBar />
      </View>
      <ScrollView style={styles.scroll}>
        <View>
          <View style={styles.darkDiv}></View>
          <Text> Our products for "{categoryName}{genderName}"</Text>
          {filteredProducts.length === 0 ? (
            <Text style={styles.noProductsText}>No products found.</Text>
          ) : (
            filteredProducts.map(product => (
              <TouchableOpacity onPress={() => handlePress(product.id)} key={product.id}>
              <View style={styles.card}>
                <Image
                  source={product.imagePath}
                  key={product.id}
                  style={styles.image}
                />
                <View style={styles.details}>
                  <View>
                    <Text style={styles.title}>
                      {product.gender} {product.category} {product.title}
                    </Text>
                    <Text style={styles.price}> ${product.price}</Text>
                    <Text style={styles.ProductClrTxt}> Product Colors</Text>
                    <View style={styles.colorsCard}>
                      <View
                        style={[
                          styles.productColor,
                          {backgroundColor: product.color1},
                        ]}
                      />
                      <View
                        style={[
                          styles.productColor,
                          {backgroundColor: product.color2},
                        ]}
                      />
                      <View
                        style={[
                          styles.productColor,
                          {backgroundColor: product.color3},
                        ]}
                      />
                    </View>
                  </View>
                </View>
              </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    margin: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#BFBFBF',
  },
  colorsCard: {
    flex: 1,
    flexDirection: "row",
  },
  image: {
    width: 150,
    height: 150,
  },
  productColor: {
    width: 30,
    height: 30,
    marginLeft: 20,
    marginTop: 5,
    marginBottom: 20,
    borderRadius: 30,
  },
  details: {
    fontSize: 16,
  },
  title: {
    fontSize: 10,
    marginTop: 20 ,
    marginLeft: 20 ,
    marginBottom: 3 ,
    fontWeight: 'bold',
  },
  ProductClrTxt: {
    fontSize: 10,
    marginLeft: 20,
  },
  noProductsText: {
    margin: 20,
    fontSize: 16,
  },
  price: {
    fontSize: 18,
    marginLeft: 16,
    fontWeight: 'bold',
  },
  darkDiv: {
    height: 60,
    borderBottomColor: '#ccc',
  },
  topB: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    zIndex: 1,
  },
});
