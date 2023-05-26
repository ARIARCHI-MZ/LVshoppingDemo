import React, {useState} from 'react';
import {TextInput, StyleSheet, View, useColorScheme, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
{/* <FontAwesomeIcon icon="fa-solid faMagnifyingGlass" /> */}

type SearchBarProps = {
  onSearch: (searchTerm: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({onSearch}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    console.log('Searched Name:', searchTerm);
    onSearch(searchTerm);
  };
  const scheme = useColorScheme();
  const [iconColor, setIconColor] = useState(
    scheme === 'dark' ? 'white' : '#383838'
  );
  return (
    <View style= {styles.container}>
      <TextInput
        placeholder="Search"
        value={searchTerm}
        onChangeText={setSearchTerm}
        style={styles.searchBar}
      />
      <TouchableOpacity onPress={handleSearch}>
        <View style={styles.icon}>
          <FontAwesomeIcon
            style={[styles.iconText, { color: iconColor }]}
            icon={faMagnifyingGlass}
            
          />
        </View>
      </TouchableOpacity>
      {/* <Button title="Search" onPress={handleSearch} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  searchBar: {
    width: "80%",
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
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
});

export default SearchBar;
