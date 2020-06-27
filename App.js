import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  AsyncStorage,
  ActivityIndicator,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import {onChangeIntoMainScreen, onSignIn} from './src/navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import Loading from './src/screens/Loading';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      userName: 'tuan',
    };
  }

  componentDidMount() {
    // this.onShow();
  }

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
    let user = 'tuan,nguyen';
    if (user === '') {
      onSignIn();
    } else {
      onChangeIntoMainScreen();
    }
  };

  onChangeMainScreen = () => {
    // alert(this.state.u);
    onChangeIntoMainScreen();
  };

  render() {
    return (
      <View style={style.container}>
        <View style={style.container}>
          <Loading />
        </View>

        <View
          style={{
            flex: 1,
          }}>
          <TouchableWithoutFeedback onPress={this.onChangeMainScreen}>
            <Text
              style={{
                borderWidth: 1.5,
                borderRadius: 20,
                fontSize: 24,
                fontWeight: 'bold',
                padding: 12,
                textAlign: 'center',
                backgroundColor: '#e511e8',
                borderColor: '#e511e8',
                color: 'white',
              }}>
              Màn hình chính
            </Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
