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

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      isIntro: true,
      userName: 'tuan',
    };
  }

  // componentDidMount() {
  //   this.onCheck();
  // }

  // onCheck = async () => {
  //   try {
  //     let user = await AsyncStorage.getItem('user');
  //     let parsed = JSON.parse(user);
  //     if (parsed) {
  //       onChangeIntoMainScreen();
  //     } else {
  //       onSignIn();
  //     }
  //   } catch (error) {
  //     // alert(error);
  //   }
  // };

  onCheck = () => {
    let user = '';
    if (user === 'hu') {
      onSignIn();
    } else {
      onChangeIntoMainScreen();
    }
  };

  render() {
    const that = this;
    const isShowIntro = this.state.isIntro;

    setTimeout(function() {
      that.setState({isIntro: false});
    }, 1500);

    if (isShowIntro) {
      return <Intro loadingText="Loading..." />;
    } else {
      return <View>{this.onCheck()}</View>;
    }
  }
}
