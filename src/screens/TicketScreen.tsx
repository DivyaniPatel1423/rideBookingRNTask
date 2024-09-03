import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Dimensions, Alert } from 'react-native';
import { withNavigation } from '@react-navigation/compat';
import { connect } from 'react-redux';
import { fetchRideDataRequest } from '../redux/actions';

const { height } = Dimensions.get('window');

interface Props {
  navigation: any;
  fetchRideData: () => void;
}

// Class component
class TicketScreen extends Component<Props> {
  componentDidMount() {
    //dispatch for api call
    this.props.fetchRideData();
  }

  handleNavigation = () => {
    this.props.navigation.navigate('Home');
  };

  render() {
    return (
      <ImageBackground
        source={require('../assets/splash-background-image.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <ImageBackground
          source={require('../assets/splash-overlay-image.png')}
          style={styles.overlay}
          resizeMode="cover"
        >
          <View style={styles.container}>
            <Text style={styles.heading}>READY TO GET STARTED?</Text>
            <Text style={styles.subheading}>Choose an option to begin.</Text>

            <TouchableOpacity
              style={styles.button}
              onPress={this.handleNavigation}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Buy Tickets</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </ImageBackground>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  fetchRideData: () => dispatch(fetchRideDataRequest()),
});

export default connect(null, mapDispatchToProps)(withNavigation(TicketScreen));

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    alignItems: 'flex-start',
    paddingHorizontal: 30,
    marginTop: height * 0.1,
  },
  heading: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 10,
  },
  subheading: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'left',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#E5EAF2',
    paddingVertical: 30,
    paddingHorizontal: 15,
    width: '95%',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  buttonText: {
    fontSize: 20,
    color: '#000',
    fontWeight: '600',
    marginLeft: 10,
  },
});
