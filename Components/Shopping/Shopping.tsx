import {
  StyleSheet,
  Text,
  View,
  useColorScheme,
  SafeAreaView,
  ScrollView,
  Image,
  Alert,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {RouteProp} from '@react-navigation/native';
import TopBar from '../TopBar';
import * as yup from 'yup';
import {useFormik} from 'formik';

const schema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  phoneNumber: yup.string().required('Phone number is required'),
  address: yup.string().required('Address is required'),
  cardNumber: yup
    .string()
    .length(16, 'Card number must be 16 digits')
    .required('Card number is required'),
  expiryM: yup
    .number()
    .min(1, 'Expiry Month must be between 1 and 12')
    .max(12, 'Expiry Month must be between 1 and 12')
    .required('Expiry Month is required'),
  expiryY: yup
  .number()
  .min(2023, 'Expiry Year must be 2023 or later')
  .required('Expiry Year is required'),
  cvv: yup
    .string()
    .length(3, 'CVV must be 3 digits')
    .required('CVV is required'),
});

type RootStackParamList = {
  ProductFullInfo: undefined;
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

type ShoppingProps = {
  route: RouteProp<RootStackParamList, 'Shopping'>;
};
const Shopping: React.FC<ShoppingProps> = ({route}) => {
  const {
    productId,
    selectedColor,
    selectedSize,
    productGender,
    productImage,
    productCategory,
    productTitle,
    productPrice,
  } = route.params;
  // color mode
  const scheme = useColorScheme();
  const [backgroundColor, setBackgroundColor] = useState(
    scheme === 'dark' ? '#383838' : 'white',
  );

  // yap schem
  const initialValues = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: '',
    cardNumber: '',
    expiryM: '',
    expiryY: '',
    cvv: '',
  };


  // Display thank you message
  const onSubmit = async (values: typeof initialValues) => {
    try {
      await schema.validate(values, {abortEarly: false});
      // Display thank you message
      Alert.alert('Thank you', 'Your payment has been processed successfully!');
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
    initialValues,
    validationSchema: schema,
    onSubmit,
  });
  return (
    <SafeAreaView style={[styles.container, {backgroundColor}]}>
      <View style={[styles.topB, {backgroundColor}]}>
        <TopBar />
      </View>
      <ScrollView style={styles.scroll}>
        <View style={styles.darkDiv}></View>
        <Text style={styles.topic}>
          Please check the details of Your Selected product
        </Text>
        <View style={styles.card}>
          <Image source={productImage} key={productId} style={styles.image} />
          <View style={styles.details}>
            <View>
              <Text style={styles.title}>
                {productGender} {productCategory} {productTitle}
              </Text>
              <Text style={styles.price}> ${productPrice}</Text>
              <View style={styles.sizeContainer}>
                <Text style={styles.ProductSizaTxt}> Product Details : </Text>
                <Text style={styles.size}> {selectedSize} </Text>
                <View style={styles.colorsCard}>
                  <View
                    style={[
                      styles.productColor,
                      {backgroundColor: selectedColor},
                    ]}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.topic}>Please import your payment details :</Text>
          <TextInput
            value={formik.values.firstName}
            onChangeText={formik.handleChange('firstName')}
            onBlur={formik.handleBlur('firstName')}
            placeholder="Enter your first name.*"
            style={styles.input}
          />
          {formik.touched.firstName && formik.errors.firstName && (
            <Text style={styles.error}>{formik.errors.firstName}</Text>
          )}
          <TextInput
            value={formik.values.lastName}
            onChangeText={formik.handleChange('lastName')}
            onBlur={formik.handleBlur('lastName')}
            placeholder="Enter your last name.*"
            style={styles.input}
          />
          {formik.touched.lastName && formik.errors.lastName && (
            <Text style={styles.error}>{formik.errors.lastName}</Text>
          )}
          <TextInput
            value={formik.values.phoneNumber}
            onChangeText={formik.handleChange('phoneNumber')}
            onBlur={formik.handleBlur('phoneNumber')}
            placeholder="Enter your phone number.*"
            keyboardType="phone-pad"
            style={styles.input}
          />
          {formik.touched.phoneNumber && formik.errors.phoneNumber && (
            <Text style={styles.error}>{formik.errors.phoneNumber}</Text>
          )}
          <TextInput
            value={formik.values.address}
            onChangeText={formik.handleChange('address')}
            onBlur={formik.handleBlur('address')}
            placeholder="Enter your address.*"
            style={styles.input}
          />
          {formik.touched.address && formik.errors.address && (
            <Text style={styles.error}>{formik.errors.address}</Text>
          )}
          <TextInput
            value={formik.values.cardNumber}
            onChangeText={formik.handleChange('cardNumber')}
            onBlur={formik.handleBlur('cardNumber')}
            placeholder="Enter your card number.*"
            keyboardType="numeric"
            style={styles.input}
          />
          {formik.touched.cardNumber && formik.errors.cardNumber && (
            <Text style={styles.error}>{formik.errors.cardNumber}</Text>
          )}
          <View style={styles.sizeContainer}>
            <TextInput
              value={formik.values.expiryM}
              onChangeText={formik.handleChange('expiryM')}
              placeholder=" MM "
              keyboardType="numeric"
              style={styles.input}
            />

            <TextInput
              value={formik.values.expiryY}
              onChangeText={formik.handleChange('expiryY')}
              placeholder="YYYY"
              keyboardType="numeric"
              style={styles.input}
            />
          </View>
          {formik.touched.expiryM && formik.errors.expiryM && (
            <Text style={styles.error}>{formik.errors.expiryM}</Text>
          )}
          {formik.touched.expiryY && formik.errors.expiryY && (
            <Text style={styles.error}>{formik.errors.expiryY}</Text>
          )}
          <TextInput
            value={formik.values.cvv}
            onChangeText={formik.handleChange('cvv')}
            placeholder="Enter the CVV"
            keyboardType="numeric"
            secureTextEntry
            style={styles.input}
          />
          {formik.touched.cvv && formik.errors.cvv && (
            <Text style={styles.error}>{formik.errors.cvv}</Text>
          )}
          {/* <Button title="Pay" onPress={formik.handleSubmit} /> */}
          <View style={styles.darkDiv} />
        </View>
      </ScrollView>
      <TouchableOpacity onPress={formik.handleSubmit}>
        <Text style={styles.processBtn}>PAY</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Shopping;

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
    height: 60,
    borderBottomColor: '#ccc',
  },
  topic: {
    fontSize: 16,
    marginHorizontal: 20,
    marginTop: 10,
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    margin: 20,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#BFBFBF',
  },
  image: {
    width: 140,
    height: 140,
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
  productColor: {
    width: 20,
    height: 20,
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 20,
    borderRadius: 30,
  },

  ProductSizaTxt: {
    fontSize: 10,
    marginLeft: 20,
    marginTop: 8,
  },
  ProductClrTxt: {
    fontSize: 10,
    marginLeft: 20,
    marginTop: 18,
  },
  price: {
    fontSize: 18,
    marginLeft: 16,
    fontWeight: 'bold',
  },
  sizeContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  size: {
    fontSize: 16,
  },
  label: {
    fontSize: 14,
    marginLeft: 20,
  },
  input: {
    fontSize: 14,
    backgroundColor: '#9B9B9B',
    marginTop: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
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
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 15,
    paddingBottom: 20,
  },
  error: {
    color: '#D60000',
    paddingLeft: 20,
    fontSize: 12,
  },
});
