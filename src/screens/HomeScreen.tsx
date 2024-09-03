import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { selectRide } from '../redux/actions';
import { fetchRides } from '../utills/realmService';

interface Ride {
  id: string;
  name: string;
  price: number;
  image: string;
}

const assetResolver = (imageName: string) => {
  switch (imageName) {
    case 'corkscrew.png':
      return require('../assets/corkscrew.png');
    case 'gate-keeper.png':
      return require('../assets/gate-keeper.png');
    case 'gemini.png':
      return require('../assets/gemini.png');
    case 'maverick.png':
      return require('../assets/maverick.png');

  }
};

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const [rides, setRides] = useState<Ride[]>([]);
  const selectedRides = useSelector((state: any) => state.selectedRides);
  const totalPrice = useSelector((state: any) => state.totalPrice);
  const rideData = useSelector((state: any) => state.rideData);

  useEffect(() => {
    const loadRides = async () => {
      try {
        // Fetch rides from Realm
        const ridesFromDB = await fetchRides();
        setRides(ridesFromDB);
      } catch (error) {
        console.error('Error fetching rides:', error);
      }
    };

    loadRides();
  }, []);
  useEffect(() => {
    console.log("Fetched data from api ", rideData)
  }, [rideData]);


  const handleSelectRide = (ride: Ride) => {
    dispatch(selectRide(ride.id, ride.price));
  };

  const renderItem = ({ item }: { item: Ride }) => (
    <TouchableOpacity style={styles.rideContainer} onPress={() => handleSelectRide(item)}>
      <Image source={assetResolver(item.image)} style={styles.rideImage} />
      <View style={styles.rideInfo}>
        <Text style={styles.rideName}>{item.name}</Text>
        <Text style={styles.ridePrice}>${item.price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={require('../assets/buy-tickets-background.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.header}>Choose Your Rides To Buy Tickets</Text>
        <FlatList
          data={rides}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.list}
        />
        <View style={styles.checkoutContainer}>
          <View style={styles.summaryContainer}>
            <Text style={styles.summaryText}>{selectedRides.length} Rides Added</Text>
            <Text style={styles.totalPrice}>Total: ${totalPrice.toFixed(2)}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
              <Image
                source={require('../assets/back-button.png')}
                style={styles.buttonImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ScanCardScreen', { totalPrice })}>
              <Image
                source={require('../assets/checkout-button.png')}
                style={styles.buttonImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};



const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 15,
    width: '70%',
  },
  list: {
    flexGrow: 1,
  },
  rideContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  rideImage: {
    width: 70,
    height: 70,
    borderRadius: 5,
    marginRight: 10,
  },
  rideInfo: {
    flex: 1,
  },
  rideName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  ridePrice: {
    color: '#f00',
    fontWeight: '600',
  },
  checkoutContainer: {
    marginTop: 'auto',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  summaryContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  summaryText: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 16,
  },
  totalPrice: {
    fontSize: 16,
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonImage: {
    width: '100%',
    height: 50,
  },
});

export default HomeScreen;
