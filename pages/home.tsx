import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

interface HomeProps {
  navigateToLaunchScreen: () => void;
}

export default function Home({ navigateToLaunchScreen }: HomeProps) {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Home Screen!</Text>
      <Text style={styles.subtitle}>This is where your main content will go.</Text>

      <TouchableOpacity style={styles.logoutButton} onPress={navigateToLaunchScreen}>
        <Text style={styles.logoutText}>Back to Launch Screen</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 40,
    textAlign: 'center',
  },
  logoutButton: {
    backgroundColor: '#E0FFFF',
    height: 60,
    width: '100%',
    borderRadius: 30,
    justifyContent: 'center',
  },
  logoutText: {
    color: 'blue',
    fontSize: 18,
    textAlign: 'center',
  },
});
