import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  useColorScheme,
  ScrollView,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';
import React, {useState} from 'react';
import TopBar from '../TopBar';
import {RouteProp} from '@react-navigation/native';
import {products} from '../Products/Product';
import {StackNavigationProp} from '@react-navigation/stack';

type RootStackParamList = {
  SearchResult: undefined;
  ProductFullInfo: {productId: number};
  Shopping: {
    productId: number;
    selectedColor: string;
    selectedSize: string;
    productImage: string;
    productGender: string;
    productCategory: string;
    productTitle: string;
    productPrice: number;
  };
};
type ProductFullInfoProps = {
  navigation: StackNavigationProp<RootStackParamList, 'ProductFullInfo'>;
  route: RouteProp<RootStackParamList, 'ProductFullInfo'>;
};
const ProductFullInfo: React.FC<ProductFullInfoProps> = ({
  route,
  navigation,
}) => {
  const {productId} = route.params;

  // product filter
  const selectedProduct = products.filter(product => product.id === productId);

  // color mode
  const scheme = useColorScheme();
  const [backgroundColor, setBackgroundColor] = useState(
    scheme === 'dark' ? '#383838' : 'white',
  );
  // size selection
  const [selectedSize, setSelectedSize] = useState('');
  const handleSizeSelection = (size: string) => {
    setSelectedSize(size);
  };
  // color selection
  const [selectedColor, setSelectedColor] = useState('');
  const handleColorSelection = (color: string) => {
    setSelectedColor(color);
  };
  // handle submit
  const handleShopping = () => {
    const product = selectedProduct[0];
    console.log('Searched Color:', selectedSize);
    console.log('Searched Size:', selectedColor);
    navigation.navigate('Shopping', {
      productId: product.id,
      productImage: product.imagePath,
      productGender: product.gender,
      selectedColor: selectedColor,
      selectedSize: selectedSize,
      productCategory: product.category,
      productTitle: product.title,
      productPrice: product.price,
    });
  };
  return (
    <SafeAreaView style={[styles.container, {backgroundColor}]}>
      <View style={[styles.topB, {backgroundColor}]}>
        <TopBar />
      </View>
      <ScrollView style={styles.scroll}>
        <View style={styles.darkDiv}/>
        <View>
          {selectedProduct.map(product => (
            <View key={product.id}>
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
                </View>
              </View>
              <View>
                <Text style={styles.sizeTxt}>Select your Size:</Text>
                <View style={styles.sizeOptions}>
                  <TouchableOpacity
                    style={[
                      styles.sizeOption,
                      selectedSize === product.size1 && styles.selectedSize,
                    ]}
                    onPress={() => handleSizeSelection(product.size1)}>
                    <Text>{product.size1}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.sizeOption,
                      selectedSize === product.size2 && styles.selectedSize,
                    ]}
                    onPress={() => handleSizeSelection(product.size2)}>
                    <Text>{product.size2}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.sizeOption,
                      selectedSize === product.size3 && styles.selectedSize,
                    ]}
                    onPress={() => handleSizeSelection(product.size3)}>
                    <Text>{product.size3}</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View>
                <Text style={styles.sizeTxt}>Select your favorite Color:</Text>
                <View style={styles.sizeOptions}>
                  <TouchableOpacity
                    onPress={() => handleColorSelection(product.color1)}>
                    <View
                      style={[
                        styles.productColor,
                        {backgroundColor: product.color1},
                        selectedColor === product.color1 &&
                          styles.selectedColor,
                      ]}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleColorSelection(product.color2)}>
                    <View
                      style={[
                        styles.productColor,
                        {backgroundColor: product.color2},
                        selectedColor === product.color2 &&
                          styles.selectedColor,
                      ]}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleColorSelection(product.color3)}>
                    <View
                      style={[
                        styles.productColor,
                        {backgroundColor: product.color3},
                        selectedColor === product.color3 &&
                          styles.selectedColor,
                      ]}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.darkDiv}/>
              {/* <View style={styles.processBtn}>
              <Button  title="Add to Shopping Page" onPress={handleShopping} />
            </View> */}
            </View>
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity onPress={handleShopping}>
        <Text style={styles.processBtn} >
          Add to Shopping Page
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ProductFullInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
  },
  topB: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    zIndex: 1,
  },
  darkDiv: {
    height: 50,
    borderBottomColor: '#ccc',
  },
  colorsCard: {
    flex: 1,
    flexDirection: 'row',
  },
  image: {
    width: 400,
    height: 400,
  },
  productColor: {
    width: 40,
    height: 40,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 5,
    marginBottom: 40,
    borderRadius: 30,
  },
  details: {
    fontSize: 16,
  },
  title: {
    fontSize: 16,
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 3,
    fontWeight: 'bold',
  },
  sizeTxt: {
    fontSize: 16,
    marginLeft: 20,
    marginBottom: 10,
    marginTop: 15,
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
    fontSize: 22,
    marginLeft: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  sizeOptions: {
    flex: 1,
    flexDirection: 'row',
  },
  sizeOption: {
    fontSize: 72,
    backgroundColor: '#9B9B9B',
    color: '#7AFFCE',
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 40,
  },
  selectedSize: {
    fontSize: 18,
    backgroundColor: '#565656',
    color: '#FFFFFF',
    padding: 15,
  },
  selectedColor: {
    borderColor: '#7AFFCE',
    borderWidth: 5,
    padding: 3,
  },
  processBtn: {
    position: 'absolute',
    bottom: -10,
    left: 0,
    right: 0,
    zIndex: 1,
    color: '#5F00A2',
    backgroundColor: '#7AFFCE',
    fontSize: 18,
    fontWeight: "bold",
    textAlign: 'center',
    paddingTop: 15,
    paddingBottom: 20,
  },
});

{
  /* <View style={styles.colorsCard}>
                    <TouchableOpacity onPress={() => handleColorPress(product.color)}>
                    <View
                      style={[
                        styles.productColor,
                        {backgroundColor: product.color},
                      ]}
                    />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleColorPress(product.color2)}>
                    <View
                      style={[
                        styles.productColor,
                        {backgroundColor: product.color2},
                      ]}
                    />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleColorPress(product.color3)}>
                    <View
                      style={[
                        styles.productColor,
                        {backgroundColor: product.color3},
                      ]}
                    />
                    </TouchableOpacity>
                  </View> */
}
