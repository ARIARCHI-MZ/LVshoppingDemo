import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  useColorScheme,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React, {useState} from 'react';
import TopBar from '../TopBar';
const AboutUs = () => {
  const scheme = useColorScheme();
  const [backgroundColor, setBackgroundColor] = useState(
    scheme === 'dark' ? '#383838' : 'white',
  );
  const handleReact = () => {
    const websiteUrl = 'https://ariarchi-mz.github.io/ReactDemos/';
    Linking.openURL(websiteUrl);
  };
  const handleLinkedIn = () => {
    const websiteUrl = 'https://www.linkedin.com/in/maryam-zahraee-493b2395';
    Linking.openURL(websiteUrl);
  };
  const handlePersonal = () => {
    const websiteUrl = 'https://ariarchi-mz.github.io/ARIARCHI-CV.github.oi/';
    Linking.openURL(websiteUrl);
  };
  return (
    <SafeAreaView style={[styles.container, {backgroundColor}]}>
      <View style={[styles.topB, {backgroundColor}]}>
        <TopBar />
      </View>
      <ScrollView style={styles.scroll}>
        <View>
          <Text style={styles.topic}>About Me</Text>
          <Text style={styles.text}>My name is Maryam Zahraie</Text>
          <Text style={styles.text}>
            I am the react developer of this application, LV Online Shopping is
            a demo application , created by react native, which is adopted for both dark and light mode.
          </Text>
          <Text style={styles.text}>some nots about the application:</Text>
          <Text style={styles.text}>
            Gender Selection and Category Selection filter the whole products,
            based on gender or category.
          </Text>
          <Text style={styles.text}>
            The search icon filters the whole products, based on gender or
            category, or title. The entered name will be normalized with
            lowercase.
          </Text>
          <Text style={styles.text}>
            The login page, which launches with both the menu and the user icon,
            has password creation tools that the user can select how many
            characters, want and with which kind of digits. Both Login Yup
            limitation and Password Generation Yup have a limit on the number of
            digits which is between 4 and 16.
          </Text>
          <TouchableOpacity onPress={handlePersonal}>
            <Text style={styles.btnTxt}>Personal website</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLinkedIn}>
            <Text style={styles.btnTxt}>LinkedIn profile</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleReact}>
            <Text style={styles.btnTxt}>React demo</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AboutUs;

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
  topic: {
    marginTop: 70,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    marginHorizontal: 20,
  },
  btnTxt: {
    fontSize: 13,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    borderRadius: 30,
    paddingVertical: 10,
    color: '#5F00A2',
    backgroundColor: '#7AFFCE',
    marginRight: 20,
    elevation: 4,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowColor: '#888888',
    shadowRadius: 4,
    marginTop: 10,
    width: 200,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  text: {
    marginHorizontal: 20,
  },
});
