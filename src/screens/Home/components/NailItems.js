import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Navigation} from 'react-native-navigation';
const {width, height} = Dimensions.get('window');
import {connect} from 'react-redux';
import {
  getStoreDetail,
  getStoreServices,
} from '../../../redux/storeRedux/action';

class NailItem extends Component {
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
                store_id: store_id,
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

    var regex = new RegExp(':', 'g'),
      timeStr1 = timeNow,
      timeStr2 = close_time;
    if (
      parseInt(timeStr1.replace(regex, ''), 10) <
        parseInt(timeNow.replace(regex, ''), 10) &&
      parseInt(timeNow.replace(regex, ''), 10) <
        parseInt(timeStr2.replace(regex, ''), 10)
    ) {
      this.setState({
        status: 'Đang mở cửa',
      });
    } else {
      this.setState({
        status: 'Đã đóng cửa',
      });
    }
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
        <TouchableOpacity onPress={() => this.onPress(item.store_id)}>
          <Image source={{uri: item.image}} style={style.styleImage} />
        </TouchableOpacity>
        <Text style={style.styleText}>{this.state.status}</Text>
        <Text style={{color: '#353638', fontWeight: 'bold', fontSize: 20}}>
          {item.store_name}
        </Text>
        <Text style={{color: 'gray', fontSize: 15}} numberOfLines={1}>
          {item.address}
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

const mapStateToProps = state => {
  return {
    stores: state.stores,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onGetStoreDetail: (storeId, token) => {
      dispatch(getStoreDetail(storeId, token));
    },
    // onGetStoresByStar: token => {
    //   dispatch(getStoreByStar(token));
    // },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NailItem);
