import React, { useState } from 'react';
import { View } from 'react-native';
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

  return (
    <View style={{ flex: 1 }}>
      {currentScreen === 'LaunchScreen' && <LaunchScreen navigateToHome={navigateToHome} />}
      {currentScreen === 'Home' && <Home navigateToLaunchScreen={navigateToLaunchScreen} />}
    </View>
  );
}
