import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
// import data from '../../utils/Data';
import {Navigation} from 'react-native-navigation';
const {width, height} = Dimensions.get('window');
import Fonts from '../../../themers/Fonts';

export default class ShowAllStoreItems extends Component {
  onPress = item => {
    Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              name: 'Detail',
              passProps: {
                data: item,
              },
              options: {
                topBar: {
                  title: {
                    text: item.title,
                    alignment: 'center',
                  },
                  visible: false,
                },
              },
            },
          },
        ],
      },
    });
  };

  render() {
    const {item} = this.props;
    return (
      <View
        style={{
          marginBottom: 15,
          paddingHorizontal: 2,
          flex: 1,
          width: width - 40,
          backgroundColor: 'white',
          margin: 10,
          borderRadius: 10,
          shadowColor: '#000',
          shadowOffset: {width: 0.5, height: 0.5},
          shadowOpacity: 0.5,
          shadowRadius: 3,
          elevation: 5,
        }}>
        <TouchableOpacity onPress={() => this.onPress(item)}>
          <Image source={{uri: item.image}} style={style.styleImage} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.onPress(item)}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 7,
              marginHorizontal: 20,
            }}>
            <Text
              style={{
                color: 'black',
                fontWeight: 'bold',
                fontSize: 20,
                flex: 1,
                fontFamily: Fonts.serif,
              }}>
              {item.store_name.substring(0, 60)}
            </Text>
            <Text style={style.styleText}>dang hoat dong</Text>
          </View>

          <Text
            style={{
              color: 'gray',
              marginHorizontal: 20,
              fontSize: 15,
              marginBottom: 10,
            }}>
            {item.address.substring(0, 60)}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const style = StyleSheet.create({
  styleFlatListItem: {
    fontSize: 16,
    color: 'red',
    padding: 10,
  },
  styleText: {
    color: 'red',
    fontSize: 15,
    alignItems: 'center',
    alignContent: 'center',
  },
  styleImage: {
    width: '100%',
    height: 180,
    borderRadius: 10,
  },
  styleView: {
    flex: 1,
    flexDirection: 'column',
  },
});
