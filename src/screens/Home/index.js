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
import Carousel from '../../components/Carousel';
import {dummyData} from '../../utils/index';
import {Navigation} from 'react-native-navigation';
export default class Home extends Component {
  changScreenFilter = () => {
    Navigation.mergeOptions('SideBarMenu', {
      SideBarMenu: {
        left: {
          visible: true,
        },
      },
    });
  };
  render() {
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            backgroundColor: '#FC5895',
            padding: 5,
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
          <LinearGradient colors={['#FC5895', '#F99A7C', '#F99A7C', '#F99A7C']}>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                height: 200,
              }}>
              <Animatable.Text
                animation="zoomInUp"
                style={{
                  fontSize: 50,
                  fontWeight: 'bold',
                  color: 'white',
                  marginTop: -10,
                }}>
                Home
              </Animatable.Text>
            </View>
          </LinearGradient>

          <View style={{marginTop: '-30%'}}>
            <Carousel data={dummyData} />
          </View>
        </ScrollView>
      </View>
    );
  }
}
