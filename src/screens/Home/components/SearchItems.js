import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  BackHandler,
  Picker,
  ScrollView,
  SafeAreaView,
  AsyncStorage,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import Images from '../../../../assets/images/profile.png';

import Colors from '../../../themers/Colors';
import Fonts from '../../../themers/Fonts';
import Location from 'react-native-vector-icons/Entypo';
export default class SearchItems extends Component {
  render() {
    let star = [];

    for (let i = 0; i < 3; i++) {
      star.push(<Icon name="star" size={15} color="#fc9619" />);
    }

    for (let i = 0; i < 5 - 3; i++) {
      star.push(<Icon name="star" size={15} color="#c3c1c1" />);
    }
    return (
      <View
        style={{
          flexDirection: 'row',
          marginVertical: 10,
        }}>
        <View style={{marginHorizontal: 10}}>
          <Image
            style={{
              width: 120,
              height: 90,
              borderRadius: 3,
            }}
            source={Images}
          />
        </View>
        <View
          style={{
            backgroundColor: Colors.shadow,
            flex: 1,
            marginHorizontal: 5,
            borderRadius: 7,
            padding: 10,
          }}>
          <Text
            style={{
              fontFamily: Fonts.serif,
              fontWeight: 'bold',
              fontSize: 20,
            }}>
            Mail Nail
          </Text>

          <View style={{flexDirection: 'row'}}>
            <Location
              name="location-pin"
              size={20}
              color="#3AEB76"
              onPress={() => this.backMainScreen()}
            />
            <Text style={{marginLeft: 5}}>Mail Nail</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}>
              {star}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    marginHorizontal: 16,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 20,
    backgroundColor: 'white',
    flex: 1,
  },
  title: {
    fontSize: 25,
  },
  titleOption: {
    fontSize: 20,
    marginTop: 4,
    borderBottomWidth: 1,
    marginVertical: 17,
    borderBottomColor: 'gray',
    color: 'gray',
  },

  back: {
    flex: 1,
    justifyContent: 'center',
  },

  styleViewProfile: {
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  styleImageProfile: {
    borderRadius: 150,
    width: 200,
    height: 200,
  },
});
