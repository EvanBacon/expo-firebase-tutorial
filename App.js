import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Permissions } from 'expo';
import firebase from 'expo-firebase-app';
import 'expo-firebase-auth';
import 'expo-firebase-analytics';
import 'expo-firebase-database';

import 'expo-firebase-messaging';
import 'expo-firebase-instance-id';

export default class App extends React.Component {
  state = { isSignedIn: false };

  async componentDidMount() {
    firebase.auth().onAuthStateChanged(auth => {
      if (!auth) {
        firebase.auth().signInAnonymously();
      }
      this.setState({ isSignedIn: !!auth });
    });



    //// WHATS AFTER THIS ........



    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (status !== 'granted') return;

    this.unsubscribe = firebase.messaging().onMessage(message => {
      console.log(message);
      alert('hey message');
    });

    const token = await firebase.iid().getToken();
    console.log({ token });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    if (this.state.isSignedIn) {
      return (
        <View style={styles.container}>
          <Text>You're in!</Text>
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

/*

// Lol this sends notifications to my phone...

curl -X POST --header "Authorization: key=AAAAwmiC5Jk:APA91bFvU8TtJE5ce7YnyUD5ceZBjQkL2tD3ugj8TqMvPZnhGYOPE1xbeFX34Owri-nSTnjxkRkZeODU0H810kL4CvPil_ZTp8MLJA_vYjQPfxRQUyNNkp9txGHmqoIIuzxE09jZscMo"     --Header "Content-Type: application/json"     https://fcm.googleapis.com/fcm/send     -d "{\"to\":\"e1A1b7d6bxs:APA91bGOIaPUwbkX9tuaS0oPP-qhj178dwjlAZSCAeMFw7otMoBzQXqXkDthDt1GTi9XXe9FQt82Q-XYgzp6sbjxUoLx45J6t6Y4YmpTNIbHVw1pBqe4T6fG3nR1K0UoYbSQddUSxbGR\",\"message\":{\"body\":\"Tickle\"}}"
curl -X POST --header "Authorization: key=AAAAwmiC5Jk:APA91bFvU8TtJE5ce7YnyUD5ceZBjQkL2tD3ugj8TqMvPZnhGYOPE1xbeFX34Owri-nSTnjxkRkZeODU0H810kL4CvPil_ZTp8MLJA_vYjQPfxRQUyNNkp9txGHmqoIIuzxE09jZscMo"     --Header "Content-Type: application/json"     https://fcm.googleapis.com/fcm/send     -d "{\"to\":\"f3ABaTkqFSo:APA91bGiVivNDO0Yfp9_6XohRQELAr7sOGCKbHe0iVx9aFmHCtKoLL0fA_10AWEr-NeZyCPRHn1m2WskPcCVNE2TjgKkscEsthGorHd9fR1PVHx4ztDWVTYESwWxipWrhgpZFcg4TyKG\",\"message\":{\"body\":\"Tickle\"}}"

curl -X POST --header "Authorization: key=AAAAwmiC5Jk:APA91bFvU8TtJE5ce7YnyUD5ceZBjQkL2tD3ugj8TqMvPZnhGYOPE1xbeFX34Owri-nSTnjxkRkZeODU0H810kL4CvPil_ZTp8MLJA_vYjQPfxRQUyNNkp9txGHmqoIIuzxE09jZscMo"     --Header "Content-Type: application/json"     https://fcm.googleapis.com/fcm/send     -d "{\"to\":\"f3ABaTkqFSo:APA91bGiVivNDO0Yfp9_6XohRQELAr7sOGCKbHe0iVx9aFmHCtKoLL0fA_10AWEr-NeZyCPRHn1m2WskPcCVNE2TjgKkscEsthGorHd9fR1PVHx4ztDWVTYESwWxipWrhgpZFcg4TyKG\",\"notification\":{\"body\":\"Tickle\"}}"

*/
