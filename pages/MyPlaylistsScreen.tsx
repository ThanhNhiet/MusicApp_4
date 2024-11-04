import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const playlists = [
  {
    id: 1,
    title: 'Ipsum sit nulla',
    artist: 'Ashley Scott',
    songs: '12 songs',
    image: require('../assets/images/My Playlists/Image110.png'), // Đảm bảo có ảnh tương tự trong thư mục
  },
  {
    id: 2,
    title: 'Occaecat aliq',
    artist: 'Jose Garcia',
    songs: '4 songs',
    image: require('../assets/images/My Playlists/Image111.png'), // Đảm bảo có ảnh tương tự trong thư mục
  },
];

export default function MyPlaylistsScreen ({navigateToLibrary}:any) {
  const renderItem = ({ item }:any) => (
    <TouchableOpacity style={styles.playlistItem}>
      <Image source={item.image} style={styles.thumbnail} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.artist}>{item.artist} • {item.songs}</Text>
      </View>
      <Icon name="chevron-forward" size={20} color="#000" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
        <TouchableOpacity onPress={navigateToLibrary}>
            <Image source={require('../assets/images/My Playlists/prev.png')} style={{height:30,width:30}}/>
        </TouchableOpacity>
        <Text style={{fontSize:16,textAlign:'center'}}>Playlists</Text>
        <TouchableOpacity>   
            <Image source={require('../assets/images/My Playlists/cast2TV.png')} style={{height:30,width:30}}/>
        </TouchableOpacity>
      </View>  
      <Text style={styles.header}>Your playlists</Text>
      <FlatList
        data={playlists}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
      <TouchableOpacity style={styles.addButton}>
        <Image source={require('../assets/images/My Playlists/Icon Button5.png')}/>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  playlistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  artist: {
    fontSize: 14,
    color: '#888',
  },
  addButton: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    backgroundColor: '#000',
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

