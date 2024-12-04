import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, ImageBackground, StyleSheet, View,TouchableOpacity,Text} from 'react-native';

export default function LaunchPremiumScreen ({ navigateToSubPlans }: any) {

  return (
    
      <ImageBackground
        source={require('../assets/images/Launch Screen - Premium/Image 112.png')}
        style={styles.backgroundImage}
         
      >
        <View style={styles.container}>
          <View>
            <Image source={require('../assets/images/Launch Screen - Premium/Image 113.png')} style={styles.logo} />
          </View>
          <View>
          <Image source={require('../assets/images/Launch Screen - Premium/Welcome toPremium.png')}  style={{marginTop:200}}/>
          </View>
          <View style={{flexDirection:'row',alignItems:'center'}}>
          <TouchableOpacity>
              <Text style={styles.buttonText}>•</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.buttonText}>•</Text>
            </TouchableOpacity>
            <TouchableOpacity >
              <Text style={styles.buttonText}>•</Text>
            </TouchableOpacity>
          </View>
          <View style={{ }}>
          <TouchableOpacity onPress={navigateToSubPlans}>
            <Image source={require('../assets/images/Launch Screen - Premium/Button 14.png')} style={{marginTop:10}} resizeMode="cover"/>
          </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',          // Adjust width to control the size of the background image
    height: '100%',         // Adjust height as needed  // Center content inside the image background
  },
  container: {
    flexDirection:'column',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 80,
    height: 80,
    marginTop: 5,
  },
   buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});