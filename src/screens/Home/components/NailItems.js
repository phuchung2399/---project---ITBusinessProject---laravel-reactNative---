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
  onPress = idBook => {
    Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              name: 'Detail',
              passProps: {
                IdBook: idBook,
              },
              options: {
                topBar: {
                  title: {
                    text: '',
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

  changScreenSearch = () => {
    Navigation.showModal({
      component: {
        name: 'Search',
      },
    });
  };

  render() {
    const {item} = this.props;
    return (
      <View
        style={{
          marginHorizontal: 12,
          width: width - 200,
        }}>
        <TouchableOpacity onPress={() => this.onPress(item)}>
          <Image source={{uri: item.imageUrl}} style={style.styleImage} />
        </TouchableOpacity>
        <Text style={style.styleText}>{item.date.en}</Text>
        <Text style={{color: '#353638', fontWeight: 'bold', fontSize: 20}}>
          {item.title}
        </Text>
        <Text style={{color: 'gray', fontSize: 15}} numberOfLines={1}>
          {item.address.en}
        </Text>
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
    width: width - 200,
    height: height / 4,
    backgroundColor: '#ababab',
    borderRadius: 10,
  },
  styleView: {
    flex: 1,
    flexDirection: 'column',
  },
});
