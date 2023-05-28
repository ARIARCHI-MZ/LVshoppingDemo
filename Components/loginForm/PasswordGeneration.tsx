import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import * as Yup from 'yup';
import {Formik} from 'formik';

const validationSchema = Yup.object().shape({
  passwordLenght: Yup.number()
    .min(4, 'you have to write at least 4 character.')
    .max(16, 'you have to write max 16 character.')
    .required('this filed is required.'),
});

export default function PasswordGeneration() {
  const [password, setPassword] = useState('');
  const [isPasswordGen, setIsPasswordGen] = useState(false);
  const [lowercase, setLowercase] = useState(true);
  const [uppercase, setUppercase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);

  const generatePasswordString = (passwordLenght: number) => {
    let characterList = '';
    const uppercaseChar = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChar = 'abcdefghijklmnopqrstuvwxyz';
    const numbersChar = '1234567890';
    const symbolsChar = '%@:?+*()';
    if (uppercase) {
      characterList += uppercaseChar;
    }
    if (lowercase) {
      characterList += lowercaseChar;
    }
    if (numbers) {
      characterList += numbersChar;
    }
    if (symbols) {
      characterList += symbolsChar;
    }
    const passwordResult = createPassword(characterList, passwordLenght);
    setPassword(passwordResult);
    setIsPasswordGen(true);
  };

  const createPassword = (characterList: string, passwordLenght: number) => {
    let result = '';
    for (let i = 0; i < passwordLenght; i++) {
      const characterIndex = Math.round(Math.random() * characterList.length);
      result += characterList.charAt(characterIndex);
    }
    return result;
  };

  const resetPassword = () => {
    setPassword('');
    setIsPasswordGen(false);
    setLowercase(true);
    setUppercase(false);
    setNumbers(false);
    setSymbols(false);
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.title}>Generate an automatic password. </Text>
          <Formik
            initialValues={{passwordLenght: ''}}
            validationSchema={validationSchema}
            onSubmit={values => {
              console.log(values);
              generatePasswordString(Number(values.passwordLenght));
            }}>
            {({
              values,
              errors,
              touched,
              isValid,
              handleChange,
              handleSubmit,
              handleReset,
            }) => (
              <>
                <View style={styles.fieldWrapper}>
                  <View>
                    <Text style={styles.label}> Password Lenght </Text>
                  </View>
                  <TextInput
                    style={styles.input}
                    value={values.passwordLenght}
                    onChangeText={handleChange('passwordLenght')}
                    placeholder=" Ex. 12 "
                    keyboardType="numeric"
                  />
                  {touched.passwordLenght && errors.passwordLenght && (
                    <Text style={styles.errorText}>
                      {errors.passwordLenght}
                    </Text>
                  )}
                </View>
                <View style={styles.fieldWrapper}>
                  <Text style={styles.label}> Include lowercase </Text>
                  <BouncyCheckbox
                    isChecked={lowercase}
                    onPress={() => {
                      setLowercase(!lowercase);
                    }}
                    fillColor="#7AFFCE"
                  />
                </View>
                <View style={styles.fieldWrapper}>
                  <Text style={styles.label}> Include uppercase </Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={uppercase}
                    onPress={() => {
                      setUppercase(!uppercase);
                    }}
                    fillColor="#7AFFCE"
                  />
                </View>
                <View style={styles.fieldWrapper}>
                  <Text style={styles.label}> Include numbers </Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={numbers}
                    onPress={() => {
                      setNumbers(!numbers);
                    }}
                    fillColor="#7AFFCE"
                  />
                </View>
                <View style={styles.fieldWrapper}>
                  <Text style={styles.label}> Include symbols </Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    isChecked={symbols}
                    onPress={() => {
                      setSymbols(!symbols);
                    }}
                    fillColor="#7AFFCE"
                  />
                </View>
                <View style={styles.btnForm}>
                  <TouchableOpacity
                    style={styles.btnPr}
                    disabled={!isValid}
                    onPress={handleSubmit}>
                    <Text style={styles.btnTxt}> Generate password </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.btnSc}
                    onPress={() => {
                      handleReset();
                      resetPassword();
                    }}>
                    <Text style={styles.btnTxt}> Reset </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
          <View>
            {isPasswordGen ? (
              <View style={[styles.card, styles.cardElevated]}>
                <Text style={styles.decTxtR}> Result</Text>
                <Text style={styles.decTxt}> Press to Copy </Text>
                <Text style={styles.resTxt} selectable={true}> {password} </Text>
              </View>
            ) : null}
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    fontSize: 24,
    padding: 15,
    fontWeight: '600',
    marginBottom: 15,
    color: '#7AFFCE',
    backgroundColor: '#386C5F',
  },
  resTxt: {
    backgroundColor: "#FFFFFF",
    color: "#5C02A0",
    fontWeight: "900",
    borderColor: "#5C02A0",
    padding: 15,
    margin: 20
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: '#316A7D',
  },
  decTxtR: {
    fontSize: 16,
    fontWeight: "900",
  },
  decTxt: {
    fontSize: 12,

  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
    alignItems: "center",
  },
  cardElevated: {
    backgroundColor: '#316A7D',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#7AFFCE',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color: '#000',
  },
  fieldWrapper: {
    margin: 10,
    padding: 10,
    borderColor: '#A6A6A6',
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 1,
  },
  label: {
    fontSize: 14,
    paddingBottom: 5,
  },
  input: {
    width: '100%',
    borderColor: '#A6A6A6',
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: '#A6A6A6',
  },
  errorText: {
    fontSize: 10,
    color: '#FF3333',
    paddingTop: 5,
  },
  btnPr: {
    padding: 20,
    backgroundColor: '#4BD9C6',
    borderRadius: 20,
    margin: 10,
    width: '33%',
    shadowColor: '#4CAF50',
    shadowOpacity: 0.8,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
    textAlign: "center",
  },
  btnTxt: {
    color: '#5C02A0',
  },
  btnSc: {
    padding: 20,
    backgroundColor: '#2FB3B6',
    borderRadius: 20,
    justifyContent: "center",
    margin: 10,
  },
  btnForm: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
});
