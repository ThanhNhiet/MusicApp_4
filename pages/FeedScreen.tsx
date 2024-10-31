import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity,ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import AntDesign from '@expo/vector-icons/AntDesign';

const posts = [
  {
    id: '1',
    user: 'Jessica Gonzalez',
    trackTitle: 'FLOWER',
    image:require('../assets/images/Feed - Audio Listing/Image93.png'), // Thay link ảnh phù hợp
    avatar:require('../assets/images/Feed - Audio Listing/Avatar4.png'),
    likes: 20,
    comments: 3,
    shares: 1,
    plays: 125,
    duration: '05:15',
    time: '3d',
  },
  {
    id: '2',
    user: 'William King',
    trackTitle: 'Me',
    image:require('../assets/images/Feed - Audio Listing/Image94.png'), // Thay link ảnh phù hợp
    avatar:require('../assets/images/Feed - Audio Listing/Avatar5.png'),
    likes: 45,
    comments: 9,
    shares: 2,
    plays: 245,
    duration: '05:15',
    time: '5d',
  },
];

const Feed = () => {
  const renderPost = ({ item }) => (
  <View style={styles.postContainer}>
    <View style={styles.header}>
      <Image style={styles.avatar} source={item.avatar} /> 
      <View style={styles.userInfo}>
        <View style={{flexDirection:'row', alignItems:'center'}}>
          <Text style={styles.userName}>{item.user}</Text>
          <AntDesign name="checkcircleo" size={12} color="blue" style={{marginLeft:5}} />
        </View>
        <Text style={styles.postTime}>Posted a track • {item.time}</Text>
      </View>
    </View>
    <View style={styles.imageContainer}>
      <Image style={styles.postImage} source={item.image} />
      <View style={styles.overlay}>
        <Text style={styles.trackTitle}>{item.trackTitle}</Text>
      <View style={{flexDirection:'row',justifyContent:'space-between'}}>  
        <Text style={styles.userNameOverlay}>{item.user}</Text>
        <View style={{flexDirection:'row',alignItems:'center'}}>
          <SimpleLineIcons name="control-play" size={12} color="white" />
          <Text style={styles.trackStats}>{item.plays} • {item.duration}</Text>
        </View>
      </View>
      </View>
    </View>
    <View style={styles.actions}>
      <TouchableOpacity style={styles.actionButton}>
        <Icon name="heart-outline" size={20} />
        <Text>{item.likes}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton}>
        <Icon name="comment-outline" size={20} />
        <Text>{item.comments}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton}>
        <Icon name="share-outline" size={20} />
        <Text>{item.shares}</Text>
      </TouchableOpacity>
    </View>
  </View>
);


  return (
    <View style={{flex:1}}>
      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
        <Text style={{fontSize:19}}>Feed</Text>
        <Image source={require('../assets/images/Feed - Audio Listing/cast2TV.png')} style={{width:30,height:30,marginRight: 10}}/>
      </View>
      <ScrollView>
        <FlatList
            data={posts}
            renderItem={renderPost}
            keyExtractor={item => item.id}
            style={styles.container}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  postContainer: {
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userInfo: {
    marginLeft: 10,
  },
  userName: {
    fontWeight: 'bold',
  },
  postTime: {
    color: 'grey',
    fontSize: 12,
  },
  imageContainer: {
    position: 'relative',
  },
  postImage: {
    width: '100%',
    height: 200,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Lớp phủ tối
    padding: 10,
  },
  trackTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  userNameOverlay: {
    color: '#fff',
    fontSize: 14,
    marginTop: 4,
  },
  trackStats: {
    color: '#fff',
    fontSize: 12,
    padding: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});


export default Feed;
