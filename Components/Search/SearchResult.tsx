import {
  StyleSheet,
  Text,
  View,
  useColorScheme,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import TopBar from '../TopBar';
import { products } from "../Products/Product";
// change screen props
type RootStackParamList = {
  SearchResult: {searchTerm: string};
  ProductFullInfo: { productId: number };
};

type SearchResultProps = {
  navigation: StackNavigationProp<RootStackParamList, 'SearchResult'>;
  route: RouteProp<RootStackParamList, 'SearchResult'>;
};

const SearchResult: React.FC<SearchResultProps> = ({route, navigation}) => {
  const {searchTerm} = route.params;
  const normalizedSearchTerm = searchTerm.toLowerCase();
  const filteredSearch = products.filter((product) => {
    const normalizedTitle = product.title.toLowerCase();
    const normalizedGender = product.gender.toLowerCase();
    const normalizedCategory = product.category.toLowerCase();

    return (
      normalizedTitle.includes(normalizedSearchTerm) ||
      normalizedGender.includes(normalizedSearchTerm) ||
      normalizedCategory.includes(normalizedSearchTerm)
    );
  });
  // shift to productInfo
  const handlePress = (productId: number) => {
    navigation.navigate('ProductFullInfo', { productId });
    console.log({ productId });
  };
  // color mode
  const scheme = useColorScheme();
  const [backgroundColor, setBackgroundColor] = useState(
    scheme === 'dark' ? '#383838' : 'white',
  );
  return (
    <SafeAreaView style={[styles.container, {backgroundColor}]}>
      <View style={[styles.topB, {backgroundColor}]}>
        <TopBar />
      </View>
      <ScrollView style={styles.scroll}>
        <View style={styles.darkDiv}></View>
        <Text> This is the result</Text>
        <View>
          <Text>SearchResult is {searchTerm}</Text>
        </View>
        {filteredSearch.length === 0 ? (
          <Text style={styles.noProductsText}>No products found.</Text>
        ) : (
          filteredSearch.map(product => (
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchResult;

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
    flexDirection: 'row',
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
    fontSize: 14,
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 3,
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
    height: 200,
    borderBottomColor: '#ccc',
  },
  topB: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    zIndex: 1,
  },
});
