import React from 'react';
import { Image, StyleSheet, Text, TextInput, View, FlatList, TouchableOpacity, ScrollView } from 'react-native';

interface HomeProps {
  navigateToLaunchScreen: () => void;
}

export default function Home({ navigateToLaunchScreen }: HomeProps) {

  const suggestions = [
    { id: '1', img: require("../assets/images/Home - Audio Listing/Container 26.png") },
    { id: '2', img: require("../assets/images/Home - Audio Listing/Container 27.png") },
  ];
  const charts = [
    { id: '1', name: 'Daily chart-toppers', status: 'update', img: require("../assets/images/Home - Audio Listing/Container 31.png") },
    { id: '2', name: 'Daily chart-toppers', status: 'update', img: require("../assets/images/Home - Audio Listing/Container 32.png") },
    { id: '3', name: 'Daily chart-toppers', status: 'update', img: require("../assets/images/Home - Audio Listing/Container 33.png") },
  ];

  type chartProps = {
    name: string;
    status: string;
    img: any;
  };

  const Suggestion = ({ img }: any ) => (
    <View style={styles.paddingItem}>
      <Image source={img} />
    </View>
  );

  const Chart = ({ name, status, img }: chartProps) => (
    <View style={styles.paddingItem}>
      <Image source={img} />
      <Text style={{color: 'gray'}}>{name}</Text>
      <Text>{status}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={require("../assets/images/Home - Audio Listing/Image 36.png")} />
        <View style={styles.rightHeader}>
          <TouchableOpacity>
            <Image source={require("../assets/images/Home - Audio Listing/bell.png")} style={{ height: 25, width: 20 }} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require("../assets/images/Home - Audio Listing/Avatar 3.png")} style={{ justifyContent: 'flex-end', marginLeft: 10}} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.welcomeContainer}>
        <Text style={{ color: 'gray' }}>Good morning,</Text>
        <Text style={styles.title}>Ashley Scott</Text>
      </View>

      <View style={styles.searchContainer}>
        <Image source={require("../assets/images/Home - Audio Listing/search.png")} style={{ width: 20, height: 20 }} />
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
          renderItem={({ item }) => (
            <Suggestion img={item.img} />
          )}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View style={styles.sectionContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.sectionTitle}>Charts</Text>
          <Text style={styles.seeAll}>See all</Text>
        </View>
        <FlatList
          horizontal
          data={charts}
          renderItem={({ item }) => (
            <Chart img={item.img} name={item.name} status={item.status}/>
          )}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {/* Tương tự cho các danh mục như "Charts", "Trending albums" */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
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
    outlineStyle: 'none',
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
});
