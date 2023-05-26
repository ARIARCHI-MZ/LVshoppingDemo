import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  useColorScheme,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import TopBar from './TopBar';
import GenderCat from './GenderCat';
import Categories from './Categories';
import Introduction from './Introduction';
import BottomBar from './BottomBar';
import { StackNavigationProp } from '@react-navigation/stack';
import Discount from './Products/Discount';
import Modal from 'react-native-modal';

type RootStackParamList = {
  Home: undefined;
  ProductDetails: { categoryName: string, genderName: string };
  SearchResult: { searchTerm: string };
  ProductFullInfo : { productId: number };
};

type HomeScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

const Home : React.FC<HomeScreenProps> = ({ navigation }) => {
  // define handle press to pass to the product screen
  const handleCategoryPress = (categoryName: string) => {
    navigation.navigate('ProductDetails', { categoryName });
    console.log(categoryName);
  };
  const handleGenderPress = (genderName: string) => {
    navigation.navigate('ProductDetails', { genderName });
    console.log(genderName);
  };
  // color mode
  const scheme = useColorScheme();
  const [backgroundColor, setBackgroundColor] = useState(
    scheme === 'dark' ? '#383838' : 'white',
  );
  const handleSearch = (searchTerm: string) => {
    console.log('Searched Name in Home:', searchTerm);
    navigation.navigate('SearchResult', { searchTerm });
  };
const handleDiscount = (productId: number) => {
  console.log('Discount ID in Home:', productId);
    navigation.navigate('ProductFullInfo', { productId });
}

  return (
    <SafeAreaView style={[styles.container, {backgroundColor}]}>
      <View style={[styles.topB, {backgroundColor}]}>
        <TopBar/>
      </View>
      <ScrollView style={styles.scroll}>
        <View>
          <Introduction />
          <GenderCat onPress={handleGenderPress}/>
          <Categories onPress={handleCategoryPress} />
          <Discount onDiscount={handleDiscount}/>
          <View style={styles.darkDiv}></View>
        </View>
      </ScrollView>
      <View>
        <View style={[styles.btBar, {backgroundColor}]}>
          <BottomBar  onSearch={handleSearch} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
  },
  darkDiv: {
    height: 70,
  },
  topB: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    zIndex: 1,
  },
  btBar: {
    zIndex: 1,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
});
