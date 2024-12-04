import React, { useState } from 'react';
import { View, Text,FlatList,TouchableOpacity,TextInput,StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


export default function SearchScreen ({navigateToSearchResults}:any) {
const [searchText,setSearchText] = useState('');
const [filteredData, setFilteredData] = useState<string[]>([]);

  const data = [
    "Me",
    "me illum id aliquip",
    "me lorem",
    "Me Gonzalez",
    "Me irure esse",
    "Me Exercitation",
    "Me Sint aliquip duis deseru"
  ];

  const handleSearch = (text:string) => {
    setSearchText(text);
    if (text) {
      const newData = data.filter(item => item.toLowerCase().includes(text.toLowerCase()));
      setFilteredData(newData);
    } else {
      setFilteredData([]);
    }
  };
  

  const renderItem = ({ item }: { item: string }) => (
    <TouchableOpacity style={styles.item} onPress={()=>navigateToSearchResults(searchText)}>
      <Text>{item}</Text>
    </TouchableOpacity>
  );

  return(
      <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Icon name="search-outline" size={20} color="#00CFFF" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={searchText}
          onChangeText={handleSearch}
        />
        {searchText ? (
          <TouchableOpacity onPress={() => handleSearch('')}>
            <Icon name="close-circle" size={20} color="#888" style={styles.clearIcon} />
          </TouchableOpacity>
        ) : null}
      </View>
      
      <FlatList
        data={filteredData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#00CFFF',
    borderWidth: 1,
    borderRadius: 8,
    margin: 10,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 5,
  },
  input: {
    flex: 1,
    height: 40,
  },
  clearIcon: {
    marginLeft: 5,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});