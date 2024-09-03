import React, { useEffect } from 'react';
import { Text, ImageBackground, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const { height } = Dimensions.get('window');
import { addRides } from '../utills/realmService';

//data for insert in realm database
const RIDES = [
  { id: '1', name: 'Corkscrew', price: 15.0, image: 'corkscrew.png' },
  { id: '2', name: 'Gate Keeper', price: 15.0, image: 'gate-keeper.png' },
  { id: '3', name: 'Gemini', price: 15.0, image: 'gemini.png' },
  { id: '4', name: 'Maverick', price: 15.0, image: 'maverick.png' },
];
//functional component
const SplashScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  useEffect(() => {
    const addRidesToDB = async () => {
      try {
        // add rides data in Realm
        await addRides(RIDES);
      } catch (error) {
        console.error('Error addid rides:', error);
      }
    };

    addRidesToDB();
  }, []);

  return (
    <ImageBackground
      source={require('../assets/splash-background-image.png')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <ImageBackground
        source={require('../assets/splash-overlay-image.png')}
        style={styles.overlay}
        resizeMode="cover">

        <TouchableOpacity
          style={styles.centeredContainer}
          onPress={() => navigation.navigate('TicketScreen')}
          activeOpacity={0.8}
        >
          <Image
            source={require('../assets/start-icon.png')}
            style={styles.icon}
            resizeMode="contain"
          />
          <Text style={styles.tapToStartText}>Tap to Start</Text>
        </TouchableOpacity>
      </ImageBackground>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  centeredContainer: {
    alignItems: 'center',
    marginTop: height * 0.7,
  },
  icon: {
    width: 70,
    height: 70,
    marginBottom: 10,
  },
  tapToStartText: {
    fontSize: 22,
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default SplashScreen;
