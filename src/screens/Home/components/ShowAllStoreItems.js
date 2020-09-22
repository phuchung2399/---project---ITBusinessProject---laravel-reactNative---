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
import Icon from 'react-native-vector-icons/FontAwesome';

export default class ShowAllStoreItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeNow: '',
      status: '',
    };
  }

  onPress = store_id => {
    Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              name: 'Detail',
              passProps: {
                store_id,
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

  componentDidMount() {
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    this.setState({timeNow: hours + ':' + min + ':' + sec}, () => {
      this.compareTime();
    });
  }

  compareTime = () => {
    const {open_time, close_time} = this.props.item;
    const timeNow = this.state.timeNow;

    if (timeNow > open_time && timeNow < close_time) {
      this.setState({
        status: 'Đang mở cửa',
      });
    } else {
      this.setState({
        status: 'Đã đóng cửa',
      });
    }
  };

  render() {
    const {item} = this.props;
    let star = [];

    for (let i = 0; i < item.rank; i++) {
      star.push(<Icon name="star" size={20} color="#ffa600" />);
    }
    for (let i = 0; i < 5 - item.rank; i++) {
      star.push(<Icon name="star" size={20} color="#c3c1c1" />);
    }
    console.log(item);

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
        <TouchableOpacity onPress={() => this.onPress(item.store_id)}>
          <Image source={{uri: item.image}} style={style.styleImage} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.onPress(item.store_id)}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              marginHorizontal: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View style={{flexDirection: 'row'}}>{star}</View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginTop: 7,
              marginHorizontal: 20,
              justifyContent: 'center',
              alignContent: 'center',
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
            <Text style={style.styleText}>{this.state.status}</Text>
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
