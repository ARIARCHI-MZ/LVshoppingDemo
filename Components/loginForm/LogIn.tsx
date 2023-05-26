import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  useColorScheme,
} from 'react-native';
import React, {useState} from 'react';
import PasswordGeneration from './PasswordGeneration';
import * as Yup from 'yup';
import TopBar from '../TopBar';
import BottomBar from "../BottomBar";

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(4, 'you have to write at least 4 character.')
    .max(16, 'you have to write max 16 character.')
    .required('this filed is required.'),
  email: Yup.string()
    .email('The email must be valid.')
    .required('This is a required field.'),
  firstName: Yup.string().required('This field is required.'),
  lastName: Yup.string().required('This field is required.'),
  userName: Yup.string().required('This field is required.'),
});
const LogIn = () => {
  const scheme = useColorScheme();
  const [backgroundColor, setBackgroundColor] = useState(
    scheme === `dark` ? "#383838" : "white"
  )
  return (
    <SafeAreaView style={[styles.container , {backgroundColor}]}>
      <View style={[styles.topB , {backgroundColor}]}>
      <TopBar/>
      </View>
      <ScrollView>
        <View>
          <TopBar />
          <Text> page logIn</Text>
          <PasswordGeneration />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LogIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topB: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    zIndex: 1,
  },
});
