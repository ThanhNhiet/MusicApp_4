import React, { useEffect, useState } from 'react';
import { BackHandler, View } from 'react-native';
import TabBarMenu from '../components/TabBarMenu';
import LaunchScreen from '../pages/LaunchScreen';
import Home from '../pages/HomeScreen';
import TestNav from '../pages/TestNavigation';
import PlaylistDetail from '../pages/PlaylistDetail';
import PlayAudioScreen from '../pages/PlayAudioScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('LaunchScreen');
  const [selectedSong, setSelectedSong] = useState(null);

  const navigateToHome = () => {
    setCurrentScreen('Home');
  };

  const navigateToLaunchScreen = () => {
    setCurrentScreen('LaunchScreen');
  };

  const navigateToPlaylistDetail = () => {
    setCurrentScreen('PlaylistDetail');
  };

  const navigateToTestNav = () => {
    setCurrentScreen('Search');
  };

  const navigateToPlayAudio = (song: any) => {
    setCurrentScreen('PlayAudioScreen');
    setSelectedSong(song); // Lưu bài hát hiện tại để truyền qua màn hình PlayAudioScreen
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
      {currentScreen === 'LaunchScreen' && <LaunchScreen navigateToHome={navigateToHome} />}

      {currentScreen === 'Home' && <Home navigateToPlayListDetail={navigateToPlaylistDetail} />}
      {currentScreen === 'PlaylistDetail' && <PlaylistDetail navigateToHome={navigateToHome} navigateToPlayAudio={navigateToPlayAudio} />}
      {currentScreen === 'Search' && <TestNav />}
      {currentScreen === 'PlayAudioScreen' && <PlayAudioScreen navigateToPlayListDetail={navigateToPlaylistDetail} song={selectedSong} />}

      {/* Các màn hình có tab bar menu */}
      {(currentScreen === 'Home' || currentScreen === 'Search' || currentScreen === 'PlaylistDetail') && (
        <TabBarMenu
          activeTab={currentScreen}
          onTabPress={(tabName) => {
            if (tabName === 'Home') {
              navigateToHome();
            } else if (tabName === 'Search') {  {/* Test nút search trên tabName */}
              navigateToTestNav();
            }
          }}
        />
      )}
    </View>
  );
}
