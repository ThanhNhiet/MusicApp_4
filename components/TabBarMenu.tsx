// components/TabBarMenu.tsx

import React from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';

interface TabBarMenuProps {
  activeTab: string;
  onTabPress: (tabName: string) => void;
}

const TabBarMenu = ({ activeTab, onTabPress }: TabBarMenuProps) => {
  return (
    <View style={styles.tabBarMenuContainer}>
      <TouchableOpacity onPress={() => onTabPress('Home')} style={styles.tabBarItem}>
        <Image source={require('../assets/images/Home - Audio Listing/home_icon.png')} style={[styles.tabIcon, activeTab === 'Home' && styles.activeTab]} />
        <Text style={[styles.tabLabel, activeTab === 'Home' && styles.activeTab]}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onTabPress('Search')} style={styles.tabBarItem}>
        <Image source={require('../assets/images/Home - Audio Listing/search_icon.png')} style={[styles.tabIcon, activeTab === 'Search' && styles.activeTab]} />
        <Text style={[styles.tabLabel, activeTab === 'Search' && styles.activeTab]}>Search</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onTabPress('Feed')} style={styles.tabBarItem}>
        <Image source={require('../assets/images/Home - Audio Listing/feed_icon.png')} style={[styles.tabIcon, activeTab === 'Feed' && styles.activeTab]} />
        <Text style={[styles.tabLabel, activeTab === 'Feed' && styles.activeTab]}>Feed</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onTabPress('Library')} style={styles.tabBarItem}>
        <Image source={require('../assets/images/Home - Audio Listing/library_icon.png')} style={[styles.tabIcon, activeTab === 'Library' && styles.activeTab]} />
        <Text style={[styles.tabLabel, activeTab === 'Library' && styles.activeTab]}>Library</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default TabBarMenu;
