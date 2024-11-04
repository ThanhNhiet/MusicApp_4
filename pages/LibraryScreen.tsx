import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView,SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

const songsData = [
  {
    id: 1,
    name: 'Mer Watson',
    followers: '1,234K Followers',
    duration: '',
    image: require('../assets/images/My Library/Image107.png'),
    icon:'',
    NumberSong:'',
    isPlaylist:false
  },
  {
    id: 2,
    title: 'FLOWER',
    artist: 'Jessica Gonzalez',
    followers: '2.1M',
    duration: '3:36',
    liked: true,
    image: require('../assets/images/My Library/Image101.png'),
    icon:'',
    NumberSong:'',
    isPlaylist:true
  },
  {
    id: 3,
    title: 'Shape of You',
    artist: 'Anthony Taylor',
    followers: '68M',
    duration: '03:35',
    liked: true,
    image: require('../assets/images/My Library/Image102.png'),
    icon:'',
    NumberSong:'',
    isPlaylist:true
  },
  {
    id: 4,
    title: 'Blinding Lights',
    artist: 'Ashley Scott',
    followers: '',
    duration: '',
    image: require('../assets/images/My Library/Image103.png'),
    icon:require('../assets/images/My Library/prev.png'),
    NumberSong:'4 songs',
    isPlaylist:false
  },
  {
    id: 5,
    title: 'Levitating',
    artist: 'Anthony Taylor',
    followers: '9M',
    duration: '07:48',
    liked: true,
    image: require('../assets/images/My Library/Image104.png'),
    icon:'',
    NumberSong:'',
    isPlaylist:true
  },
  {
    id: 6,
    title: 'Astronaut in the Ocean',
    artist: 'Pedro Moreno',
    followers: '23M',
    duration: '03:36',
    liked: true,
    image: require('../assets/images/My Library/Image105.png'),
    icon:'',
    NumberSong:'',
    isPlaylist:true
  },
  {
    id: 7,
    title: 'Dynamite',
    artist: 'Elena Jimenez',
    followers: '10M',
    duration: '06:22',
    liked: true,
    image: require('../assets/images/My Library/Image106.png'),
    icon:'',
    NumberSong:'',
    isPlaylist:true
  },
];

export default function LibraryScreen ({navigateToMylist}:any) {
  function chuyenman (tab:string){
    if (tab == 'Playlists'){
      navigateToMylist();
    } else{
      console.log('man khac');
    }

  }
  const taps = ['Playlists', 'Artists', 'Albums', 'Podcasts'];
  return (
    <SafeAreaView style={styles.container1}>
    
    <View style={{flexDirection:'row',justifyContent:'space-between',marginLeft:5,alignItems:'center'}}>
      <Text style={styles.header}>Your Library</Text>
      <TouchableOpacity>
        <Ionicons name="search" size={25} color="gray" />
      </TouchableOpacity>
    </View>  
      <View style={{flexDirection:'row'}}>
        {taps.map((tab, index) => (
          <TouchableOpacity 
            key={index}
            style={[
              styles.tab,
              index === 0 && styles.activeTab
            ]}
            onPress ={()=>chuyenman(tab)}
          >
            <Text style={[
              styles.tabText,
              index === 0 && styles.activeTabText
            ]}>
              <Text>{tab}</Text>
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView style={{ margin: 10 }}>
        {songsData.map(item => {
          // Kiểm tra điều kiện để quyết định phần tử nào sẽ được hiển thị
          if (item.duration == null  && item.isPlaylist == false && item.NumberSong != null) {
            return (
              <View key={item.id} style={styles.resultItem}>
                <Image source={item.image} style={styles.thumbnail} />
                <View style={styles.resultInfo}>
                  <Text style={styles.itemName}>{item.name || item.title}</Text>
                  {item.artist && <Text style={styles.artistName}>{item.artist}</Text>}
                  <Text style={styles.followersText}>
                    {item.followers}
                  </Text>
                </View>
                <TouchableOpacity style={styles.moreButton1}>
                  <Text style={styles.moreButtonText}>Follow</Text>
                </TouchableOpacity>
              </View>
            );
          } else if ( item.NumberSong != null && item.isPlaylist == false) {
            return (
              <View key={item.id} style={styles.resultItem}>
                <Image source={item.image} style={styles.thumbnail} />
                <View style={styles.resultInfo}>
                  <Text style={styles.itemName}>{item.name || item.title}</Text>
                  {item.artist && (
                    <Text style={styles.artistName}>
                      {item.artist} • {item.NumberSong}
                    </Text>
                  )}
                </View>
                <TouchableOpacity style={styles.moreButton2}>
                  <Image source={item.icon} style={{ height: 20, width: 20 }} />
                </TouchableOpacity>
              </View>
            );
          } else if (item.duration != null && item.isPlaylist == true) {
            return (
              <View key={item.id} style={styles.resultItem}>
                <Image source={item.image} style={styles.thumbnail} />
                <View style={styles.resultInfo}>
                  <Text style={styles.itemName}>{item.name || item.title}</Text>
                  {item.artist && <Text style={styles.artistName}>{item.artist}</Text>}
                  <Text style={styles.followersText}>
                    <SimpleLineIcons name="control-play" size={12} color="black" style={{marginVertical:4}}/>
                    {item.followers} {item.duration && `• ${item.duration}`}
                  </Text>
                </View> 
                    <Icon
                      name={item.liked ? 'heart' : 'heart-outline'}
                      size={20}
                      color={item.liked ? 'blue' : '#aaa'}
                    />
                </View>
            );
          }
          return null; // Nếu không thỏa điều kiện nào, không render gì
        })}
      </ScrollView>
    
</SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: '#fff',
  },
 
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  tab: {
    paddingHorizontal: 13,
    paddingVertical:5,
    marginRight: 8,
  },
  tabText:{
      color: '#666',
    fontSize: 16,
  },
  resultItem: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
  },
  thumbnail: {
    width: 50,
    height: 50,
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
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor:'black'
  },
  moreButton2: {
    padding: 8,
  },
   moreButtonText: {
    fontSize: 16,
    color:'white'
  },
  activeTab: {
    //borderBottomWidth: 2,
    //borderBottomColor: '#1DB954',
  },
  activeTabText: {
    //color: '#1DB954',
    fontWeight: '600',
  },
});

