import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  Image, 
  ScrollView,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function SearchScreen ({navigateToSearchResults,search}) {
  const [searchText,setSearchText] = useState(search);
  const [filteredData,setFilteredData] = useState([]);
  const tabs = ['All', 'Tracks', 'Albums', 'Artists']; 
  const data = [
    "Me",
    "me illum id aliquip",
    "me lorem",
    "Me Gonzalez",
    "Me irure esse",
    "Me Exercitation",
    "Me Sint aliquip duis deseru"
  ];
  const handleSearch = (text) => {
    setSearchText(text);
    if (text) {
      const newData = data.filter(item => item.toLowerCase().includes(text.toLowerCase()));
      setFilteredData(newData);
    } else {
      setFilteredData([]);
    }
  };
  const searchResults = [
    {
      id: 1,
      name: 'Mer Watson',
      followers: '1,234K Followers',
      duration: '',
      image:require('../assets/images/Audio Listing - Search Results/Image85.png')
    },
    {
      id: 2,
      name: 'Me',
      artist: 'Jessica Gonzalez',
      duration: '5:36',
      followers: '2.1M',
      image:require('../assets/images/Audio Listing - Search Results/Image83.png')
    },
    {
      id: 3,
      name: 'Me Inc',
      artist: 'Anthony Taylor',
      duration: '03:35',
      followers: '81M',
      image:require('../assets/images/Audio Listing - Search Results/Image84.png')
    },
    {
      id: 4,
      name: 'Dozz me',
      artist: 'Brian Bailey',
      duration: '04:39',
      followers: '93M',
      image:require('../assets/images/Audio Listing - Search Results/Image86.png')
    },
    {
      id: 5,
      name: 'Eastss me',
      artist: 'Anthony Taylor',
      duration: '07:48',
      followers: '9M',
      image:require('../assets/images/Audio Listing - Search Results/Image87.png')
    },
    {
      id: 6,
      name: 'Me Ali',
      artist: 'Anthony Taylor',
      duration: '07:48',
      followers: '9M',
      image:require('../assets/images/Audio Listing - Search Results/Image88.png')
    },
    {
      id: 7,
      name: 'Me quis a',
      artist: 'Anthony Taylor',
      duration: '07:48',
      followers: '9M',
      image:require('../assets/images/Audio Listing - Search Results/Image89.png')
    },
    {
      id: 8,
      name: 'Me light',
      artist: 'Anthony Taylor',
      duration: '07:48',
      followers: '9M',
      image:require('../assets/images/Audio Listing - Search Results/Image90.png')
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Bar */}
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
      {/* Tabs */}
      <View>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.tabsContainer}
      >
        {tabs.map((tab, index) => (
          <TouchableOpacity 
            key={index}
            style={[
              styles.tab,
              index === 0 && styles.activeTab
            ]}
          >
            <Text style={[
              styles.tabText,
              index === 0 && styles.activeTabText
            ]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      </View>
      {/* Results List */}
      <ScrollView style={{margin:10}}>
      {searchResults.filter(item => item.duration =='') // Lọc các mục có `duration` khác null
         .map(item => (
            <View key={item.id} style={styles.resultItem}>
              <Image
                source={item.image} // Thêm dấu ngoặc {} và `uri` cho hình ảnh
                style={styles.thumbnail}
              />
              <View style={styles.resultInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                {item.artist && (
                  <Text style={styles.artistName}>{item.artist}</Text>
                )}
                <Text style={styles.followersText}>
                  {item.followers} {item.duration && `• ${item.duration}`}
                </Text>
              </View>
              <TouchableOpacity style={styles.moreButton1}>
                <Text style={styles.moreButtonText}>Follow</Text>
              </TouchableOpacity>
            </View>
          ))}
        {searchResults.filter(item => item.duration !=='') // Lọc các mục có `duration` khác null
         .map(item => (
            <View key={item.id} style={styles.resultItem}>
              <Image
                source={item.image} // Thêm dấu ngoặc {} và `uri` cho hình ảnh
                style={styles.thumbnail}
              />
              <View style={styles.resultInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                {item.artist && (
                  <Text style={styles.artistName}>{item.artist}</Text>
                )}
                <Text style={styles.followersText}>
                  {item.followers} {item.duration && `• ${item.duration}`}
                </Text>
              </View>
              <TouchableOpacity style={styles.moreButton}>
                <Text style={styles.moreButtonText}>•••</Text>
              </TouchableOpacity>
            </View>
          ))}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text>Feed</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text>Library</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#1DB954',
  },
  tabText: {
    color: '#666',
    fontSize: 16,
  },
  activeTabText: {
    color: '#1DB954',
    fontWeight: '600',
  },
  resultItem: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius:0,
    marginRight: 12,
  },
  resultInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
  },
  artistName: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  followersText: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  moreButton1: {
    padding: 8,
    borderRadius:20,
    borderWidth:1
  },
  moreButton: {
    padding: 8
  },
  moreButtonText: {
    color: '#666',
    fontSize: 16,
  },
  bottomNav: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingVertical: 10,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  },
});

