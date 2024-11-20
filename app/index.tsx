import React, { useEffect, useState } from 'react';
import { BackHandler, View } from 'react-native';
import TabBarMenu from '../components/TabBarMenu';
import LaunchScreen from '../pages/LaunchScreen';
import Home from '../pages/HomeScreen';
import TestNav from '../pages/TestNavigation';
import PlaylistDetail from '../pages/PlaylistDetail';
import PlayAudioScreen from '../pages/PlayAudioScreen';
import ArtistProfile from '../pages/ArtistProfileScreen';
import SearchResults from '../pages/SearchResults';
import Feed from '../pages/FeedScreen';
import FeedComment  from '../pages/FeedComment';
import LibraryScreen  from '../pages/LibraryScreen';
import PlaylistScreen from '../pages/MyPlaylistsScreen';
import SubscriptionPlans from '../pages/SubscriptionPlans';
import LaunchPremiumScreen from '../pages/LaunchPremiumScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('LaunchScreen');
  const [selectedSong, setSelectedSong] = useState(null);
  const [idArtist, setIdArtist] = useState<string | null>(null);
  const [idChart, setIdChart] = useState<string | null>(null);
  const [search, setSearchText] = useState('');

  const navigateToHome = () => {
    setCurrentScreen('Home');
  };

  const navigateToLaunchScreen = () => {
    setCurrentScreen('LaunchScreen');
  };

  const navigateToPlaylistDetail = (id: string) => {
    setCurrentScreen('PlaylistDetail');
    setIdChart(id);
  };

  const navigateToTestNav = () => {
    setCurrentScreen('Search');
  };

  const navigateToPlayAudio = (song: any) => {
    setCurrentScreen('PlayAudioScreen');
    setSelectedSong(song); // Lưu bài hát hiện tại để truyền qua màn hình PlayAudioScreen
  };

  const navigateToArtistProfile = (id: string) => {
    setCurrentScreen('ArtistProfile');
    setIdArtist(id);
  };

  const navigateToSearchResults = (text:string) => {
    setCurrentScreen('Searchresults');
    setSearchText(text)
  };
  const navigateToFeed = () => {
    setCurrentScreen('Feed');
  };
  const navigateToFeedComment = () => {
    setCurrentScreen('Feedcomment');
  };
  const navigateToLibrary = () => {
    setCurrentScreen('Library');
  };
  const navigateToMylist = () => {
    setCurrentScreen('MyList');
  };
  const navigateToSubPlans = () => {
    setCurrentScreen('SubscriptionPlans');
  };
  const navigateToLaunchPremium = () => {
    setCurrentScreen('LaunchPremiumScreen');
  };



  //back hardware button
  useEffect(() => {
    const backAction = () => {
      if (currentScreen === 'Home') {
        navigateToLaunchScreen();
        return true; // Ngăn chặn hành động mặc định của nút quay lại
      }
      return false; // Cho phép hành động mặc định nếu không ở màn hình Home
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove(); // Dọn dẹp listener khi component bị gỡ bỏ
  }, [currentScreen]);

  return (
    <View style={{ flex: 1 }}>

      {/* Nếu currentScreen là LaunchScreen thì render thẻ LauchScreen.tsx đã được import */}
      {/* Biến navigateToHome của LauchScreen.tsx sẽ gọi hàm navigateToHome của index để 
        set currentScreen là Home và render màn hình HomeScreen.tsx*/}
      {currentScreen === 'LaunchScreen' && <LaunchScreen navigateToHome={navigateToHome} navigateToLaunchPremium={navigateToLaunchPremium} />}
      {currentScreen === 'Home' && <Home navigateToPlayListDetail={navigateToPlaylistDetail} navigateToArtistProfile={navigateToArtistProfile}/>}
      {currentScreen === 'PlaylistDetail' && idChart && <PlaylistDetail navigateToHome={navigateToHome} idChart={idChart} navigateToPlayAudio={navigateToPlayAudio} />}
      {currentScreen === 'Search' && <TestNav navigateToSearchResults={navigateToSearchResults}/>}
      {currentScreen === 'PlayAudioScreen' && <PlayAudioScreen navigateToPlayListDetail={navigateToPlaylistDetail} song={selectedSong} />}
      {currentScreen === 'ArtistProfile' && idArtist && <ArtistProfile navigateToHome={navigateToHome} idArtist={idArtist}/>}
      {currentScreen === 'Searchresults' && <SearchResults navigateToSearchResults={navigateToSearchResults} search={search} />}
      {currentScreen === 'Feed' && <Feed navigateToFeedComment={navigateToFeedComment} navigateToFeed={navigateToFeed} />}
      {currentScreen === 'Feedcomment' && <FeedComment navigateFeedComment={navigateToFeedComment} navigateToFeed={navigateToFeed}/>}
      {currentScreen === 'Library' && <LibraryScreen navigateToLibrary={navigateToLibrary} navigateToMylist={navigateToMylist}/>}
      {currentScreen === 'MyList' && <PlaylistScreen navigateToMylist={navigateToMylist}  navigateToLibrary={navigateToLibrary}  />}
      {currentScreen === 'SubscriptionPlans' && <SubscriptionPlans  navigateToHome={navigateToHome} />}
      {currentScreen === 'LaunchPremiumScreen' && <LaunchPremiumScreen   navigateToSubPlans={navigateToSubPlans}  />}
      {/* Các màn hình có tab bar menu */}
      {(currentScreen === 'Home' || currentScreen === 'Library' || currentScreen === 'PlaylistDetail'
        || currentScreen === 'ArtistProfile' || currentScreen === 'Search' || currentScreen === 'Searchresults' 
        || currentScreen === 'Feed' || currentScreen === 'MyList'
      ) && (
        <TabBarMenu
          activeTab={currentScreen}
          onTabPress={(tabName) => {
            if (tabName === 'Home') {
              navigateToHome();
            } else if (tabName === 'Search') {
              navigateToTestNav();
            } else if (tabName === 'Feed') {
              navigateToFeed();
            } else if (tabName === 'Library') {
              navigateToLibrary();
            }
          }}
        />
      )}
    </View>
  );
}
