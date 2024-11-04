import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// type LaunchScreenProps = {
//   navigateToHome: () => void;
// };

export default function LaunchScreen({ navigateToHome,navigateToLaunchPremium}: any) {

  return (
    <ImageBackground
      source={require('../assets/images/Launch Screen/Image 30.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Image source={require('../assets/images/Launch Screen/Image 33.png')} style={styles.logo} />

        <View style={styles.textContainer}>
          <Text style={styles.mainText}>Your music</Text>
          <Text style={styles.mainText}>Your artists</Text>
        </View>

        <TouchableOpacity style={styles.createAccountButton} onPress={navigateToLaunchPremium}>
          <Text style={styles.createAccountText}>Create an account</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={navigateToHome}
        >
          <Text style={styles.loginText}>I already have an account</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
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
  },
  logo: {
    width: 80,
    height: 80,
    marginTop: 80,
  },
  textContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 60,
  },
  mainText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  createAccountButton: {
    backgroundColor: 'black',
    height: 60,
    width: '100%',
    borderRadius: 30,
    marginBottom: 20,
    justifyContent: 'center',
  },
  createAccountText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loginButton: {
    height: 60,
    width: '100%',
    borderRadius: 30,
    backgroundColor: '#E0FFFF',
    justifyContent: 'center',
  },
  loginText: {
    color: 'blue',
    fontSize: 18,
    textAlign: 'center',
  },
});
