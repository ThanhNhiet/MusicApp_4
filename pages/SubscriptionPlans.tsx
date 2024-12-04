import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function LaunchScreen({ navigateToHome }: any) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    require('../assets/images/Subscription Plans/Container110.png'), // Update with actual image paths
    require('../assets/images/Subscription Plans/Container112.png'),
  ];

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <ScrollView>
      <ImageBackground
        source={require('../assets/images/Subscription Plans/Image116.png')}
        style={styles.backgroundImage}
      >
        <View style={styles.container}>
          <Image source={require('../assets/images/Subscription Plans/Unlimitedmusic selections.png')} style={styles.logo} />
          
          {/* Display the current image from the images array */}
          <Image source={images[currentIndex]} style={styles.contentImage} />
          
          {/* Navigation Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity  onPress={previousImage}>
              <Text style={styles.buttonText}>•</Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress={nextImage}>
              <Text style={styles.buttonText}>•</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={navigateToHome}>
          <Image source={require('../assets/images/Subscription Plans/Button17.png')}/>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    marginTop: -40,  // Move the entire container up
  },
  logo: {
    width: '100%',      
    height: 80,         
    marginTop: 40,
    resizeMode: 'contain', 
  },
  contentImage: {
    width: '100%',       
    height: 485,        
    marginTop: 5,
    resizeMode: 'contain',
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '80%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
