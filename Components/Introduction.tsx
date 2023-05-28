import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
const Introduction = () => {
  const navigation = useNavigation();
  const handlePress = ()=> {
    navigation.navigate("AboutUs");
  };
  return (
    <View style={[styles.container, {marginBottom: 20}]}>
      <Text style={styles.header}>LV Online Shopping</Text>
      <Text style={styles.text}>
        We provide highly qualified modern clothes for you.
      </Text>

      <View style={styles.btnContainer}>
        <TouchableOpacity onPress={handlePress}>
          <Text style={styles.btnTxt}>ABOUT US</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Introduction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#386C5F',
  },
  gap: {
    height: 50,
  },
  backG: {
    width: '100%',
    height: 300,
  },
  header: {
    color: '#7AFFCE',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 60,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 12,
    marginTop: 10,
    marginBottom: 15,
  },
  btnContainer: {
    width: 150,
    borderRadius: 30,
    backgroundColor: '#7AFFCE',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  btnTxt: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#5F00A2',
    paddingVertical: 15,
  },
});
