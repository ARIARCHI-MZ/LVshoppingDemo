import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  useColorScheme,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import PasswordGeneration from './PasswordGeneration';
import * as Yup from 'yup';
import TopBar from '../TopBar';
import {TextInput} from 'react-native-gesture-handler';
import {useFormik} from 'formik';

const LogIn = () => {
  const scheme = useColorScheme();
  const [backgroundColor, setBackgroundColor] = useState(
    scheme === `dark` ? '#383838' : 'white',
  );
  const [passwordVisible, setPasswordVisible] = useState(false);

  const passwordApear = () => {
    setPasswordVisible(!passwordVisible);
  };

  // ...
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
  });
  const initialValues = {
    firstName: '',
    lastName: "",
    email: "",
    password: "",
  };
  // Display thank you message
  const onSubmit = async (values: typeof initialValues) => {
    try {
      await validationSchema.validate(values, {abortEarly: false});
      // Display thank you message
      Alert.alert('Dear' + values.firstName + 'Thank you for joining us!');
    } catch (error) {
      // Validation error occurred
      const errors = {};
      error.inner.forEach(e => {
        errors[e.path] = e.message;
      });
      Alert.alert('Validation Error', error.message);
    }
  };
  const formik = useFormik({
    validationSchema: validationSchema,
    initialValues,
    onSubmit,
  });

  return (
    <SafeAreaView style={[styles.container, {backgroundColor}]}>
      <View style={[styles.topB, {backgroundColor}]}>
        <TopBar />
      </View>
      <ScrollView>
        <View>
          <Text style={styles.topic}>
            Please fill out the form to become one of your LV shopping members
          </Text>
          <View>
            <TextInput
              value={formik.values.firstName}
              onChangeText={formik.handleChange('firstName')}
              onBlur={formik.handleBlur('firstName')}
              placeholder="First Name*"
              style={styles.input}
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <Text style={styles.error}>{formik.errors.firstName}</Text>
            )}
            <TextInput
              value={formik.values.lastName}
              onChangeText={formik.handleChange('lastName')}
              onBlur={formik.handleBlur('lastName')}
              placeholder="Last Name*"
              style={styles.input}
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <Text style={styles.error}>{formik.errors.lastName}</Text>
            )}
            <TextInput
              value={formik.values.email}
              onChangeText={formik.handleChange('email')}
              onBlur={formik.handleBlur('email')}
              placeholder="Email*"
              style={styles.input}
            />
            {formik.touched.email && formik.errors.email && (
              <Text style={styles.error}>{formik.errors.email}</Text>
            )}
            <TextInput
              value={formik.values.password}
              onChangeText={formik.handleChange('password')}
              onBlur={formik.handleBlur('password')}
              placeholder="Password*"
              style={styles.input}
            />
            {formik.touched.password && formik.errors.password && (
              <Text style={styles.error}>{formik.errors.password}</Text>
            )}
            <Text style={styles.text}>Or you can use our password creation tool. </Text>
            <TouchableOpacity onPress={passwordApear}>
            <Text style={styles.passwordBtn}>Password Generation</Text>
          </TouchableOpacity>
          {passwordVisible && <PasswordGeneration />}
          </View>
          <TouchableOpacity onPress={formik.handleSubmit}>
            <Text style={styles.processBtn}>SUBMIT</Text>
          </TouchableOpacity>
          
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
  topic: {
    fontSize: 16,
    marginHorizontal: 20,
    marginTop: 60,
  },
  text: {
    fontSize: 12,
    marginHorizontal: 20,
marginVertical: 10,
  },
  processBtn: {
    left: 0,
    right: 0,
    zIndex: 1,
    color: '#5F00A2',
    backgroundColor: '#7AFFCE',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 15,
    paddingBottom: 20,

  },
   passwordBtn: {
    color: '#5F00A2',
    backgroundColor: '#2FB3B6',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 12,
    width: 220,
    marginVertical: 10,
    marginLeft: 20,
    borderRadius: 40,
  },
  error: {
    color: '#D60000',
    paddingLeft: 20,
    fontSize: 12,
  },
  input: {
    fontSize: 14,
    backgroundColor: '#9B9B9B',
    marginTop: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});
