import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React,{useState} from 'react';

type GenderProps = {
  onPress: (genderName: string) => void;
};

const GenderCat: React.FC<GenderProps> = ({onPress}) => {
  const [selectedGenderFilter, setSelectedGenderFilter] = useState('');
  const handleGenderSelected = (genderName: string) => {
    console.log('Selected Gender:', genderName);
    setSelectedGenderFilter(genderName);
    onPress(genderName);
  };
  return (
    <View>
      <ScrollView horizontal={true}>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => handleGenderSelected('All')}>
            <Text style={styles.btnTxt}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleGenderSelected('Women')}>
            <Text style={styles.btnTxt}>Women</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleGenderSelected('Men')}>
            <Text style={styles.btnTxt}>Men</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleGenderSelected('Kids')}>
            <Text style={styles.btnTxt}>Kids</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default GenderCat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 30,
    paddingVertical: 15,
  },
  shadow: {
    shadowColor: '#B0B0B0',
    shadowOpacity: 0.5,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 5,
    elevation: 15, // required for Android
    marginBottom: 15, // add bottom margin to account for shadow
    marginRight: 15, // add right margin to account for shadow
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
  },
});
 