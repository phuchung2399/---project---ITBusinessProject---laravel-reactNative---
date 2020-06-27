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

export default class Item extends Component {
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
      <View style={{margin: 15}}>
        <TouchableOpacity onPress={() => this.onPress(item)}>
          <Image source={{uri: item.imageUrl}} style={style.styleImage} />
        </TouchableOpacity>
        <Text style={style.styleText}>{item.date.en}</Text>
        <Text style={{color: 'black', fontWeight: 'bold', fontSize: 20}}>
          {item.title}
        </Text>
        <Text style={{color: 'gray', fontSize: 15}}>{item.address.en}</Text>
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
    fontSize: 17,
  },
  styleImage: {
    // width: '100%',
    // height: 200,
    // borderRadius: 12,

    width: width - 40,
    height: height / 4,
    borderRadius: 10,
  },
  styleView: {
    flex: 1,
    flexDirection: 'column',
  },
});
