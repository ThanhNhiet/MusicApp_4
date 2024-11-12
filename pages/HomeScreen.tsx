import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, View, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

export default function Home({ navigateToPlayListDetail, navigateToArtistProfile }: any) {
  const api = "https://6716220e33bc2bfe40bc87df.mockapi.io/api/src";

  type suggestionProps = {
    id: string;
    image: string;
  };
  const [suggestions, setSuggestions] = useState<suggestionProps[]>([]);

  const fetchSuggestion = async () => {
    try {
      const response = await axios.get(api);
      const data = response.data.find((item: any) => item.suggestions);

      if (data && data.suggestions) {
        setSuggestions(data.suggestions);
      }
    } catch (error) {
      console.error("Error fetching songs:", error);
    }
  };

  useEffect(() => {
    fetchSuggestion();
  }, []);


  const charts = [
    { id: '1', name: 'Daily chart-toppers', status: 'update', img: require("../assets/images/Home - Audio Listing/Container 31.png") },
    { id: '2', name: 'Daily chart-toppers', status: 'update', img: require("../assets/images/Home - Audio Listing/Container 32.png") },
    { id: '3', name: 'Daily chart-toppers', status: 'update', img: require("../assets/images/Home - Audio Listing/Container 33.png") },
  ];
  const albums = [
    { id: '1', name: 'ME', artist: 'Jessica Gonzalez', img: require("../assets/images/Home - Audio Listing/Image 45.png") },
    { id: '2', name: 'Magna nost', artist: 'Brian Thomas', img: require("../assets/images/Home - Audio Listing/Image 46.png") },
    { id: '3', name: 'Magna noow', artist: 'Christoph Krammer', img: require("../assets/images/Home - Audio Listing/Image 47.png") },
  ];
  const artists = [
    { id: '1', name: 'Jennifer Wilson', img: require("../assets/images/Home - Audio Listing/Image 39.png") },
    { id: '2', name: 'Elizabeth Hall', img: require("../assets/images/Home - Audio Listing/Image 40.png") },
    { id: '3', name: 'Anthony Thow', img: require("../assets/images/Home - Audio Listing/Image 41.png") },
  ];

  type chartProps = {
    id: string;
    name: string;
    status: string;
    img: any;
  };

  type albumProps = {
    name: string;
    artist: string;
    img: any;
  };

  type artistProps = {
    id: string;
    name: string;
    img: any;
  };

  const Suggestion = ({ id, image }: suggestionProps) => (
    <View style={styles.paddingItem}>
      <TouchableOpacity>
        <Image source={{ uri: image }} style={{ height: 300, width: 300 }} />
      </TouchableOpacity>
    </View>
  );

  const Chart = ({ id, name, status, img }: chartProps) => (
    <View style={styles.paddingItem}>
      <TouchableOpacity onPress={id === '1' ? navigateToPlayListDetail : undefined}>
        <Image source={img} />
      </TouchableOpacity>
      <Text style={{ color: 'gray' }}>{name}</Text>
      <Text style={{ color: 'gray' }}>{status}</Text>
    </View>
  );

  const Album = ({ name, artist, img }: albumProps) => (
    <View style={styles.paddingItem}>
      <TouchableOpacity>
        <Image source={img} />
      </TouchableOpacity>
      <Text style={{ fontWeight: '500' }}>{name}</Text>
      <Text style={{ color: 'gray' }}>{artist}</Text>
    </View>
  );

  const Artist = ({ id, name, img }: artistProps) => (
    <View style={styles.artistContainer}>
      <TouchableOpacity onPress={() => navigateToArtistProfile(id)}>
        <Image source={img} />
      </TouchableOpacity>
      <Text style={{ fontWeight: '500' }}>{name}</Text>
      <TouchableOpacity style={styles.followBtn}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Follow</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollcontainer}>
          <View style={styles.headerContainer}>
            <Image source={require("../assets/images/Home - Audio Listing/Image 36.png")} />
            <View style={styles.rightHeader}>
              <TouchableOpacity>
                <Image source={require("../assets/images/Home - Audio Listing/bell_icon.png")} style={{ height: 25, width: 20 }} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={require("../assets/images/Home - Audio Listing/Avatar 3.png")} style={{ justifyContent: 'flex-end', marginLeft: 10 }} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.welcomeContainer}>
            <Text style={{ color: 'gray' }}>Good morning,</Text>
            <Text style={styles.title}>Ashley Scott</Text>
          </View>

          <View style={styles.searchContainer}>
            <Image source={require("../assets/images/Home - Audio Listing/search_icon.png")} style={{ width: 20, height: 20 }} />
            <TextInput
              style={styles.search}
              placeholder='What you want to listen to'
            />
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Suggestions for you</Text>
            <FlatList
              style={{ marginTop: 5 }}
              horizontal
              data={suggestions}
              renderItem={({ item }: any) => (
                <Suggestion id={item.id} image={item.image} />
              )}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
            />
          </View>

          <View style={styles.sectionContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.sectionTitle}>Charts</Text>
              <TouchableOpacity>
                <Text style={styles.seeAll}>See all</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              horizontal
              data={charts}
              renderItem={({ item }) => (
                <Chart id={item.id} img={item.img} name={item.name} status={item.status} />
              )}
              keyExtractor={item => item.id}
              showsHorizontalScrollIndicator={false}
            />
          </View>

          <View style={styles.sectionContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.sectionTitle}>Trending albums</Text>
              <TouchableOpacity>
                <Text style={styles.seeAll}>See all</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              horizontal
              data={albums}
              renderItem={({ item }) => (
                <Album img={item.img} name={item.name} artist={item.artist} />
              )}
              keyExtractor={item => item.id}
              showsHorizontalScrollIndicator={false}
            />
          </View>

          <View style={[styles.sectionContainer, { height: 300 }]}>
            <View style={styles.titleContainer}>
              <Text style={styles.sectionTitle}>Popular artists</Text>
              <TouchableOpacity>
                <Text style={styles.seeAll}>See all</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              horizontal
              data={artists}
              renderItem={({ item }) => (
                <Artist id={item.id} img={item.img} name={item.name} />
              )}
              keyExtractor={item => item.id}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  scrollcontainer: {
    flexGrow: 1,
    paddingBottom: 60,
  },

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    height: 60,
  },
  logoImage: {
    flex: 1,
    resizeMode: 'contain',
  },
  rightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  welcomeContainer: {
    marginTop: 20,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  searchContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
    alignItems: 'center',
    borderRadius: 30,
    borderWidth: 0.5,
    borderColor: 'gray',
    padding: 5,
  },
  search: {
    marginLeft: 10,
    fontSize: 17,
    color: 'gray',
    height: 30,
    width: '100%',
    // outlineStyle: 'none',
  },

  sectionContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  seeAll: {
    color: 'gray',
  },

  paddingItem: {
    marginRight: 10,
  },

  artistContainer: {
    marginRight: 10,
    alignItems: 'center',
  },
  followBtn: {
    backgroundColor: 'black',
    padding: 12,
    borderRadius: 10,
    marginTop: 5,
    height: 'auto',
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },

  //tab bar menu
  tabBarMenuContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    borderTopWidth: 0.5,
    borderTopColor: 'gray',
  },
  tabBarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon: {
    width: 24,
    height: 24,
    tintColor: 'gray',
  },
  tabLabel: {
    fontSize: 12,
    color: 'gray',
  },
  activeTab: {
    tintColor: 'blue',
    color: 'blue',
  },
});
