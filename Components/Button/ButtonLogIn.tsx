import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LogIn from '../loginForm/LogIn';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';


const ButtonLogIn = () => {
  const navigation = useNavigation()
  return (
    
    <TouchableOpacity onPress={() => navigation.navigate('LogIn')}>
                  <View>
                    <Text>LogIn</Text>
                  </View>

                </TouchableOpacity>
  );
};

export default ButtonLogIn;

const styles = StyleSheet.create({});
