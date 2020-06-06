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
import {onChangeIntoMainScreen} from './src/navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class App extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.onCheck();
  }

  onCheck = async () => {
    try {
      let user = await AsyncStorage.getItem('user');
      let parsed = JSON.parse(user);
      // alert(parsed.username);
      if (parsed) {
        onChangeIntoMainScreen();
      }
    } catch (error) {
      alert(error);
    }
  };

  onShow = () => {
    // alert('ok');
    onChangeIntoMainScreen();
  };

  changScreenSearch = () => {
    alert('ok');
  };

  componentWillMount() {
    setTimeout(() => {}, 3000);
  }
  render() {
    return (
      <ScrollView>
        {/* <View style={style.container}>
          <ActivityIndicator size="large" color="red " />
        </View> */}

        <View>
          <TouchableWithoutFeedback onPress={this.onShow}>
            <Text
              style={[
                style.button,
                {
                  backgroundColor: '#15d0ef',
                  borderColor: 'white',
                  color: 'white',
                  height: 56,
                },
              ]}>
              Đăng kí
            </Text>
          </TouchableWithoutFeedback>

          <View
            style={{
              marginTop: 16,
              marginBottom: 16,
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}>
            <Icon
              name="left"
              size={30}
              color="#900"
              onPress={() => this.changScreenSearch()}
            />
          </View>
          <View>
            <Icon name="search" size={30} color="blue" />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
