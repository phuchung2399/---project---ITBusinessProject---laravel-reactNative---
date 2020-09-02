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
import {getStoreDetail} from '../../../redux/storeRedux/action';

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

    return (
      <View style={style.container}>
        <TouchableOpacity onPress={() => this.onPress(item.store_id)}>
          <Image source={{uri: item.image}} style={style.styleImage} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.onPress(item.store_id)}>
          <Text style={style.styleText}>{this.state.status}</Text>
          <Text style={style.storeName}>{item.store_name}</Text>
          <Text style={style.address} numberOfLines={1}>
            {item.address}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    marginHorizontal: 12,
    width: width - 200,
  },
  storeName: {
    color: '#353638',
    fontWeight: 'bold',
    fontSize: 20,
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
  address: {
    color: 'gray',
    fontSize: 15,
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
