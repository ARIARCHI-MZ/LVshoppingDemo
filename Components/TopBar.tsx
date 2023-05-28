import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  useColorScheme,
  Text,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import {faUser, faBars, faAnglesLeft} from '@fortawesome/free-solid-svg-icons';

const TopBar = () => {
  //background and text color
  const scheme = useColorScheme();
  const [backgroundColor, setBackgroundColor] = useState(
    scheme === 'dark' ? '#383838' : 'white',
  );
  const [iconColor, setIconColor] = useState(
    scheme === 'dark' ? 'white' : '#383838',
  );
  // page navigation
  const navigation = useNavigation();

  const handleLoginPress = () => {
    navigation.navigate('LogIn');
  };

  const handleHomePress = () => {
    navigation.navigate('Home');
  };

  const [isMenuVisible, setMenuVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const handleMenuPress = () => {
    setMenuVisible(!isMenuVisible);
  };

  const handleOptionPress = (screenName: string) => {
    navigation.navigate(screenName);
    setSelectedOption(screenName);
  };
  return (
    <View style={[styles.container, {backgroundColor}]}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.logIn}
        onPress={handleLoginPress}>
        <View style={styles.icon}>
          <FontAwesomeIcon
            style={(styles.iconText, {color: iconColor})}
            icon={faUser}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.7} onPress={handleHomePress}>
        <Image source={require('../img/logo.jpg')} style={styles.logo} />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.logIn}
        onPress={handleMenuPress}>
        <View style={styles.icon}>
          <FontAwesomeIcon
            style={[styles.iconText, {color: iconColor}]}
            icon={faBars}
          />
        </View>
      </TouchableOpacity>
      {isMenuVisible && (
        <Modal visible={isMenuVisible} transparent animationType="fade">
          <View style={styles.overlay}>
            <View style={[styles.containerMenu, {backgroundColor}]}>
              <TouchableOpacity onPress={() => handleOptionPress('Home')}>
                <Text style={styles.option}>Home</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleOptionPress('LogIn')}>
                <Text style={styles.option}>LogIn</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleOptionPress('About')}>
                <Text style={styles.option}>About us</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleMenuPress}>
                <FontAwesomeIcon
                  style={[styles.iconText, {color: iconColor}]}
                  icon={faAnglesLeft}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flex: 1,
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    height: 50,
    width: 170,
    backgroundColor: '#7AFFCE',
  },
  logIn: {
    width: 75,
  },
  icon: {
    borderRadius: 20,
    marginLeft: 20,
    marginRight: 10,
    justifyContent: 'center',
    alignContent: 'center',
  },
  iconText: {
    fontSize: 16,
    margin: 15,
    padding: 10,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'relative',
  },
  containerMenu: {
    width: 200,
    backgroundColor: 'white',
    position: 'absolute',
    top: 50,
    right: 0,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  option: {
    fontSize: 18,
    marginBottom: 8,
  },
  closeButton: {
    backgroundColor: '#eaeaea',
    borderRadius: 8,
    padding: 8,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default TopBar;
