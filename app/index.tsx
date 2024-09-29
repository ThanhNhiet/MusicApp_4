import React, { useEffect, useState } from 'react';
import { BackHandler, View } from 'react-native';
import LaunchScreen from '../pages/LaunchScreen';
import Home from '../pages/Home';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('LaunchScreen');

  const navigateToHome = () => {
    setCurrentScreen('Home');
  };

  const navigateToLaunchScreen = () => {
    setCurrentScreen('LaunchScreen');
  };

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
      {currentScreen === 'LaunchScreen' && <LaunchScreen navigateToHome={navigateToHome} />}
      {currentScreen === 'Home' && <Home navigateToLaunchScreen={navigateToLaunchScreen} />}
    </View>
  );
}
