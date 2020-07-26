import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  AsyncStorage,
  ActivityIndicator,
} from 'react-native';
import {onChangeIntoMainScreen, onSignIn} from './src/navigation';
import Intro from './src/screens/Intro';
import { storageGet } from './src/checkAsyncStorage';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      isIntro: true,
      user: '',
    };
  }

  componentDidMount() {
    this.onCheckUserSignedIn();
  }

  onCheckExistAccount = (userAccount) => {
    console.log(userAccount);
    if (userAccount === '') {
      onSignIn();
    } else {
      onChangeIntoMainScreen();
    }
  };

  onCheckUserSignedIn = async () => {
    try {
      let getUserAccount = await storageGet('user');
      let parsedUser = JSON.parse(getUserAccount);
      if (parsedUser) {
        this.setState({ user: parsedUser });
      }
    } catch (error) {
      // alert(error);
    }
  };

  render() {
    const that = this;
    const isShowIntro = this.state.isIntro;
    const userAccount = this.state.user;
    setTimeout(function() {
      that.setState({isIntro: false});
    }, 1500);

    // return <Intro loadingText="Loading..." />;
    if (isShowIntro) {
      return <Intro loadingText="Loading..." />;
    }
    else {
      return <View>{this.onCheckExistAccount(userAccount)}</View>;
    }

  }
}
