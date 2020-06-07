import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import Logo from '../../../assets/images/logo.png';

export default class Home extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            backgroundColor: '#FC5895',
            paddingLeft: 15,
            paddingTop: 10,
            fontSize: 10.5,
            flexDirection: 'row',
          }}>
          <View
            style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
            <Icon
              name="list"
              size={30}
              color="white"
              onPress={() => this.changScreenFilter()}
            />
          </View>
          <View style={{alignItems: 'flex-end'}}>
            <Image
              style={{
                width: 50,
                height: 50,
              }}
              source={Logo}
            />
          </View>
        </View>
        <ScrollView
          style={{
            flex: 1,
          }}>
          <LinearGradient colors={['#FC5895', '#F99A7C']}>
            <SafeAreaView
              style={{
                height: 120,
              }}>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                }}>
                <Animatable.Text
                  animation="zoomInUp"
                  style={{
                    fontSize: 50,
                    fontWeight: 'bold',
                    color: 'white',
                  }}>
                  Home
                </Animatable.Text>
              </View>
            </SafeAreaView>
          </LinearGradient>
          <View style={{backgroundColor: 'blue', height: 100}}>
            <Text>f</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}
