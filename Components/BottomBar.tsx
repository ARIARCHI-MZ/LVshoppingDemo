import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
// import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

import SearchBar from './Search/SearchBar';

type BottomBarProps = {
  onSearch: (searchTerm: string) => void;
};

const BottomBar: React.FC<BottomBarProps> = ({ onSearch }) => {
  const handleSearch = (searchTerm: string) => {
    console.log('Searched Name in bottom bar:', searchTerm);
    onSearch(searchTerm);
  };

  const navigation = useNavigation();

  // const handleShop = () => {
  //   navigation.navigate('Shopping');
  // };

  const scheme = useColorScheme();
  const [backgroundColor, setBackgroundColor] = useState(
    scheme === 'dark' ? '#383838' : 'white'
  );
  // const [iconColor, setIconColor] = useState(
  //   scheme === 'dark' ? 'white' : '#383838'
  // );

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {/* <TouchableOpacity style={styles.logIn} onPress={handleShop}>
        <View style={styles.icon}>
          <FontAwesomeIcon
            style={[styles.iconText, { color: iconColor }]}
            icon={faCartShopping}
          />
        </View>
      </TouchableOpacity> */}
      <View style={styles.searchBar}>
        <SearchBar onSearch={handleSearch} />
      </View>
    </View>
  );
};

export default BottomBar;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBar: {
    width: '100%',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  // icon: {
  //   borderRadius: 20,
  //   marginLeft: 20,
  //   marginRight: 10,
  //   justifyContent: 'center',
  //   alignContent: 'center',
  // },
  // iconText: {
  //   fontSize: 16,
  //   margin: 15,
  //   padding: 10,
  // },
});