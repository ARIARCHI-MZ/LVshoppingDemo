import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';

type CategoriesProps = {
  onPress: (categoryName: string) => void;
};

const Categories: React.FC<CategoriesProps> = ({onPress}) => {
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('');

  const handleCategorySelected = (categoryName: string) => {
    console.log('Selected Category:', categoryName);
    setSelectedCategoryFilter(categoryName);
    onPress(categoryName);
  };
  
  return (
    <View>
      {/* heading */}
      <Text style={styles.headingTow}>Select A Category</Text>
      {/* top 3 items */}
      <View style={styles.container}>
        <View style={styles.card}>
          <TouchableOpacity onPress={() => handleCategorySelected('Dresses')}>
            <Image source={require('../img/dress.jpeg')} style={styles.image} />
          </TouchableOpacity>
          <Text style={styles.caption}> Dresses </Text>
        </View>
        <View style={styles.card}>
          <TouchableOpacity onPress={() => handleCategorySelected('Blouses')}>
            <Image
              source={require('../img/Blouse.jpeg')}
              style={styles.image}
            />
          </TouchableOpacity>
          <Text style={styles.caption}> Blouses </Text>
        </View>
        <View style={styles.card}>
          <TouchableOpacity onPress={() => handleCategorySelected('Sweaters')}>
            <Image source={require('../img/ss.jpg')} style={styles.image} />
          </TouchableOpacity>
          <Text style={styles.caption}> Sweaters </Text>
        </View>
      </View>
      {/* bottom 3 items */}
      <View style={styles.container}>
        <View style={styles.card}>
          <TouchableOpacity onPress={() => handleCategorySelected('Tops')}>
            <Image source={require('../img/tops.webp')} style={styles.image} />
          </TouchableOpacity>
          <Text style={styles.caption}> Tops </Text>
        </View>
        <View style={styles.card}>
          <TouchableOpacity onPress={() => handleCategorySelected('Hoodie')}>
            <Image source={require('../img/hoodie.jpg')} style={styles.image} />
          </TouchableOpacity>
          <Text style={styles.caption}> Hoodie </Text>
        </View>
        <View style={styles.card}>
          <TouchableOpacity onPress={() => handleCategorySelected('Blazers')}>
            <Image source={require('../img/Blazers.jpg')} style={styles.image} />
          </TouchableOpacity>
          <Text style={styles.caption}> Blazers </Text>
        </View>
      </View>
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  headingTow: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 8,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 30,
    paddingVertical: 15,
  },
  card: {
    flex: 1,
    flexDirection: 'column',
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    aspectRatio: 1, // Ensures that the image is always square.
    borderRadius: 40,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 5,

    marginBottom: 5, // add bottom margin to account for shadow
    marginRight: 5, // add right margin to account for shadow
  },
  caption: {
    fontSize: 14,
  },
});
