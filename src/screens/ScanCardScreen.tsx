import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';
import { RouteProp } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
enum ScreenState {
  Scan,
  ScanFailed,
  Thanks,
  PaperTicketPrint
}

type RootStackParamList = {
  ScanCardScreen: { totalPrice: number };
};

type ScanCardScreenRouteProp = RouteProp<RootStackParamList, 'ScanCardScreen'>;


const ScanCardScreen = () => {
  const route = useRoute<ScanCardScreenRouteProp>();
  //props for total amount
  // const { totalPrice } = route.params;

  //price for reducer data
  const totalPrice = useSelector((state: any) => state.totalPrice);

  const tax = 1.00;
  const finalTotal = totalPrice + tax;
  const [screenState, setScreenState] = useState<ScreenState>(ScreenState.Scan);

  const renderContent = () => {
    switch (screenState) {
      case ScreenState.Scan:
        return (
          <>
            {/* Lottie Animation */}
            <LottieView
              source={require('../assets/scan-animation.json')}
              autoPlay
              loop
              style={styles.lottie}
            />

            <Text style={styles.title}>PAY WITH YOUR CARD</Text>
            <Text style={[styles.subtitle, { width: '50%' }]}>Please tap, Swipe Or Insert Your Card</Text>

            <View style={styles.cardDetailsBackground}>
              <View style={styles.cardDetailsContainer}>
                <View style={styles.totalContainer}>
                  <Text style={styles.cardtitle}>Subtotal:</Text>
                  <Text style={styles.cardtitle}>Rs. ${totalPrice.toFixed(2)}</Text>
                </View>
                <View style={styles.totalContainer}>
                  <Text style={styles.cardtitle}>Tax:</Text>
                  <Text style={styles.cardtitle}>Rs. {tax.toFixed(2)}</Text>
                </View>
                <View style={styles.totalContainer}>
                  <Text style={styles.cardtotal}>Total:</Text>
                  <Text style={styles.cardtotal}>Rs. {finalTotal.toFixed(2)}</Text>
                </View>
              </View>
            </View>

            <TouchableOpacity style={styles.cancelButton} onPress={() => setScreenState(ScreenState.ScanFailed)}>
              <Image
                source={require('../assets/cancel-button.png')}
                style={styles.cancelButtonImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </>
        );
      case ScreenState.ScanFailed:
        return (
          <>
            <Image source={require('../assets/payment-failed.png')} style={styles.icon} />
            <Text style={styles.title}>PAYMENT FAILED</Text>
            <Text style={styles.subtitle}>Please Try Again</Text>

            <TouchableOpacity style={styles.cancelButtonFixed} onPress={() => setScreenState(ScreenState.Thanks)}>
              <Image
                source={require('../assets/cancel-button.png')}
                style={styles.cancelButtonImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </>
        );
      case ScreenState.Thanks:
        return (
          <>
            <Text style={styles.title}>THANK YOU</Text>
            <Text style={styles.subtitle}>Your Payment Is Successful</Text>

            <TouchableOpacity style={styles.cardDetailsBackground}
              onPress={() => setScreenState(ScreenState.PaperTicketPrint)}>
              <View style={styles.cardDetailsContainer}>
                <View style={styles.totalContainer}>
                  <Text style={styles.cardtitle}>Subtotal:</Text>
                  <Text style={styles.cardtitle}>Rs. ${totalPrice.toFixed(2)}</Text>
                </View>
                <View style={styles.totalContainer}>
                  <Text style={styles.cardtitle}>Tax:</Text>
                  <Text style={styles.cardtitle}>Rs. {tax.toFixed(2)}</Text>
                </View>
                <View style={styles.totalContainer}>
                  <Text style={styles.cardtotal}>Total:</Text>
                  <Text style={styles.cardtotal}>Rs. {finalTotal.toFixed(2)}</Text>
                </View>
              </View>
            </TouchableOpacity>

          </>
        );
      case ScreenState.PaperTicketPrint:
        return (
          <>
            <LottieView
              source={require('../assets/printing.json')}
              loop
              autoPlay
              style={styles.lottie}
            />

            <Text style={styles.title}>ENJOY YOUR RIDE!</Text>
            <Text style={styles.subtitle}>Please Pickup Your Printed Tickets.</Text>

          </>
        );
    }
  };

  return (
    <View style={styles.container}>
      {renderContent()}
    </View>
  );
};

export default ScanCardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A9D1F3',
    padding: 20,
  },
  icon: {
    width: 90,
    height: 90,
    top: 120,
    position: 'absolute',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#002F6C',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#001F3F',
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  lottie: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: 30,
  },
  cancelButton: {
    alignSelf: 'center',
    marginTop: 40,
  },
  cancelButtonFixed: {
    position: 'absolute',
    bottom: 50,
    zIndex: 1,
    alignSelf: 'center',
  },
  cancelButtonImage: {
    width: 120,
    height: 120,
  },
  cardDetailsBackground: {
    width: '90%',
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  cardDetailsContainer: {
    width: '100%',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  cardtitle: {
    fontSize: 14,
    color: 'black',
  },
  cardtotal: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold'
  },
});