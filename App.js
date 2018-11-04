import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import firebase from 'expo-firebase-app';
import 'expo-firebase-auth';
import 'expo-firebase-analytics';
import 'expo-firebase-database';

export default class App extends React.Component {
  state = { isSignedIn: false };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(auth => {
      if (!auth) {
        firebase.auth().signInAnonymously();
      }

      this.setState({ isSignedIn: !!auth });
    });
  }

  render() {
    if (this.state.isSignedIn) {
      return (
        <View style={styles.container}>
          <Text>You are In!!!</Text>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Text>You are out :p</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
