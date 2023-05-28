import {StyleSheet, Image} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';

const HomeBtn = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image source={require('../../img/logo.jpg')} />
    </TouchableOpacity>
  );
};

export default HomeBtn;

const styles = StyleSheet.create({});
