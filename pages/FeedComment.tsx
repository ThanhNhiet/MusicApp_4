import React from 'react';
import { View, Text, Image, TextInput, FlatList, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';

const comments = [
  {
    id: '1',
    name: 'Sally Rooney',
    comment: 'Do duis cul 😍',
    time: '17h',
    likes: 1,
    replies: [],
    avatar: require('../assets/images/Feed - Comment on an Audio/Avatar8.png'),
  },
  {
    id: '2',
    name: 'Jason',
    comment: 'Minim magna exc 😍',
    time: '48m',
    likes: 1,
    replies: [
      {
        id: '1',
        name: 'Michael Key',
        link: '@Jason Smith',
        comment: 'Deserunt officia consectetur adipisci',
        time: '40m',
        likes: 2,
        avatar: require('../assets/images/Feed - Comment on an Audio/Avatar11.png')
      }
    ],
    avatar: require('../assets/images/Feed - Comment on an Audio/Avatar9.png')
  },
  {
    id: '3',
    name: 'Liam Pham',
    comment: 'Commodo 🔥',
    time: '48m',
    likes: 1,
    replies: [
      {
        id: '1',
        name: 'Kiran Glaucus',
        link: '',
        comment: 'Esse consequat cillum ex',
        time: '40m',
        likes: 1,
        avatar: require('../assets/images/Feed - Comment on an Audio/Avatar9.png')
      }
    ],
    avatar: require('../assets/images/Feed - Comment on an Audio/Avatar11.png')
  },
];

export default function FeedComment({navigateToFeed,navigateFeedComment}:any) {
  const renderReplies = (replies:any) => (
    replies.map((reply:any) => (
      <View key={reply.id} style={[styles.commentContainer, styles.replyContainer]}>
        <Image source={reply.avatar} style={styles.avatar} />
        <View style={styles.commentContent}>
          <View style={styles.commentRow}>
            <Text style={styles.commentName}>{reply.name}</Text>
            {reply.link ? <Text style={styles.commentLink}>{reply.link}</Text> : null}
            <Text style={styles.commentText}>{reply.comment}</Text>
          </View>
          <View style={styles.commentMeta}>
            <Text style={styles.time}>{reply.time}</Text>
            <Text style={styles.likes}>{reply.likes} like</Text>
            <Text style={styles.reply}>Reply</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.likeButton}>
          <AntDesign name="like2" size={18} color="black" />
        </TouchableOpacity>
      </View>
    ))
  );

  const renderItem = ({ item }: { item: typeof comments[0] }) => (
    <View>
      <View style={styles.commentContainer}>
        <Image source={item.avatar} style={styles.avatar} />
        <View style={styles.commentContent}>
          <View style={styles.commentRow}>
            <Text style={styles.commentName}>{item.name}</Text>
            <Text style={styles.commentText}>{item.comment}</Text>
          </View>
          <View style={styles.commentMeta}>
            <Text style={styles.time}>{item.time}</Text>
            <Text style={styles.likes}>{item.likes} like</Text>
            <Text style={styles.reply}>Reply</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.likeButton}>
          <AntDesign name="like2" size={18} color="black" />
        </TouchableOpacity>
      </View>
      {renderReplies(item.replies)}
    </View>
  );

  return (
    
      <View style={styles.container}>
        <FlatList
          data={comments}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ListHeaderComponent={
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
              <Text style={styles.header}>{comments.length} comments</Text>
              <TouchableOpacity onPress={navigateToFeed}>
                <Image source={require('../assets/images/Feed - Comment on an Audio/prev.png')} style={{height:30,width:30}}/>
              </TouchableOpacity>
            </View>}
        />
        <View style={styles.inputContainer}>
          <Image source={require('../assets/images/Feed - Comment on an Audio/Avatar13.png')} style={styles.avatar} />
          <TextInput
            style={styles.input}
            placeholder="Write a comment..."
          />
          <MaterialCommunityIcons name="emoticon-sad-outline" size={18} color="black" />
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  replyContainer: {
    marginLeft: 50, // Thụt vào cho replies
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  commentContent: {
    flex: 1,
    marginLeft: 8,
  },
  commentRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  commentName: {
    fontWeight: 'bold',
    color: 'black',
    marginRight: 4,
  },
  commentLink: {
    color: '#007bff',
    marginRight: 4,
  },
  commentText: {
    marginVertical: 4,
  },
  commentMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    fontSize: 12,
    color: '#888',
    marginRight: 16,
  },
  likes: {
    fontSize: 12,
    color: '#888',
    marginRight: 16,
  },
  reply: {
    fontSize: 12,
    color: '#888',
  },
  likeButton: {
    marginLeft: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  input: {
    flex: 1,
    padding: 8,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 16,
  },
});
