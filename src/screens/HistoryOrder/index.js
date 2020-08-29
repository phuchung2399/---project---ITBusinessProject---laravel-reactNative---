import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
  Alert,
  ScrollView,
  TouchableWithoutFeedback,
  Modal,
  TouchableHighlight,
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {Navigation} from 'react-native-navigation';
import LinearGradient from 'react-native-linear-gradient';
import {t} from '../../i18n/t';
import Icon from 'react-native-vector-icons/FontAwesome';
import Logo from '../../../assets/images/logo.png';
const {width, height} = Dimensions.get('window');
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Fonts from '../../themers/Fonts';
import {connect} from 'react-redux';
import {getAllOrders, cancelOrder} from '../../redux/orderRedux/action';
import {storageRemove, storageGet} from '../../checkAsyncStorage';

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      modalVisible: false,
      order_id: '',
    };
  }

  componentDidMount() {
    this.onGetUserData();
  }

  onGetUserData = async () => {
    try {
      let getUserAccount = await storageGet('user');
      let parsedUser = JSON.parse(getUserAccount);
      if (parsedUser) {
        this.setState({token: parsedUser.data.token}, () => {
          this.props.onGetAllOrders(this.state.token);
        });
      }
    } catch (error) {
      // alert(error);
    }
  };

  changScreenSidebar = () => {
    Navigation.mergeOptions('sideMenu', {
      sideMenu: {
        left: {
          visible: true,
        },
      },
    });
  };

  onContinued = () => {
    Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              name: 'Booking',
              // passProps: {
              //   IdStore: idStore,
              // },
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

  ItemSeparatorComponent = () => {
    return (
      <View
        style={{
          height: 10,
        }}
      />
    );
  };

  onPress = order_id => {
    Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              name: 'HistoryOrderDetail',
              passProps: {
                order_id,
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

  onConfirm = order_id => {
    this.props.onCancelOrder(order_id, this.state.token);
    this.setState({
      order_id: '',
      modalVisible: !this.state.modalVisible,
    });
  };

  onCancelOrder = order_id => {
    this.setState({
      order_id,
      modalVisible: !this.state.modalVisible,
    });
  };

  renderItem = ({item}) => {
    return (
      <LinearGradient
        colors={['#fdf6f6', 'white']}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0}}
        style={{
          flex: 1,
          paddingVertical: 10,
          paddingHorizontal: 10,
          flexDirection: 'row',
          borderRadius: 10,
          borderBottomWidth: 2,
          borderBottomColor: '#eaeaea',
        }}>
        <View style={{width: 100, height: 90}}>
          <TouchableOpacity onPress={() => this.onPress(item.order_id)}>
            <Image
              source={{uri: item.store.image}}
              style={{
                width: '100%',
                height: '100%',
                borderWidth: 5,
                borderColor: 'white',
                borderRadius: 10,
              }}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{flex: 1, justifyContent: 'center', paddingHorizontal: 10}}>
          <TouchableOpacity onPress={() => this.onPress(item.order_id)}>
            <View>
              <Text
                style={{color: '#5a5555', fontWeight: 'bold', fontSize: 18}}>
                {item.store.store_name}
              </Text>

              <View style={{flexDirection: 'row', marginTop: 7}}>
                <Text style={{color: 'gray'}}>{t('dat_hang_luc')}</Text>

                <Text style={{marginLeft: 5, color: 'gray'}}>
                  {item.order_time}
                </Text>
                <Text style={{marginLeft: 10, color: 'gray'}}>
                  {item.order_day}
                </Text>
              </View>

              <View style={{flexDirection: 'row', marginTop: 5}}>
                <Text style={{}}>{t('tong_tien_d')}</Text>

                <Text style={{marginLeft: 10}}>{item.total} đ</Text>
              </View>
              <Text style={{marginTop: 7, color: 'green', fontWeight: 'bold'}}>
                {item.status[0].massage}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {item.status[0].massage === 'Đơn đang chờ xác nhận' ? (
          <View
            style={{
              width: 90,
              height: 30,
              backgroundColor: 'red',
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <TouchableOpacity onPress={() => this.onCancelOrder(item.order_id)}>
              <Text
                style={{color: 'white', fontWeight: 'bold', marginRight: 5}}>
                {t('huy_don')}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={{
              width: 90,
              height: 30,
              backgroundColor: 'blue',
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <TouchableOpacity onPress={() => this.onPress(item.order_id)}>
              <Text
                style={{color: 'white', fontWeight: 'bold', marginRight: 5}}>
                {t('dat_lai')}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </LinearGradient>
    );
  };

  changScreenSidebar = () => {
    Navigation.mergeOptions('sideMenu', {
      sideMenu: {
        left: {
          visible: true,
        },
      },
    });
  };

  renderHeader = () => {
    return (
      <LinearGradient colors={['#FC5895', '#FC5895', '#F99A7C']}>
        <View
          style={{
            flexDirection: 'row',
            padding: 5,
            height: 80,
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignContent: 'center',
            }}>
            <Icon
              name="list"
              size={30}
              color="white"
              onPress={() => this.changScreenSidebar()}
            />
          </View>

          <View
            style={{
              flex: 6,
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <Text
              animation="zoomInUp"
              style={{
                fontSize: 25,
                fontWeight: 'bold',
                color: 'white',
              }}>
              {t('lich_su_giao_dich')}
            </Text>
          </View>
          <View
            style={{
              alignItems: 'flex-end',
              flex: 1,
              justifyContent: 'center',
              alignContent: 'center',
              marginTop: -5,
            }}>
            <Image
              style={{
                width: 50,
                height: 50,
              }}
              source={Logo}
            />
          </View>
        </View>
      </LinearGradient>
    );
  };

  render() {
    const ordersData = this.props.orders.dataOrders;
    console.log('data', this.state.order_id);

    if (ordersData.length === 0) {
      return (
        <View style={{flex: 1}}>
          {this.renderHeader()}

          <View
            style={{
              padding: 12,
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
            }}>
            <Text
              style={{
                fontSize: 20,
                color: 'gray',
                fontFamily: Fonts.serif,
              }}>
              {t('khong_co_don_hang')}
            </Text>
          </View>
        </View>
      );
    } else if (ordersData.length < 0) {
      return (
        <View style={{flex: 1}}>
          <View
            style={{
              padding: 12,
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
            }}>
            <Text
              style={{
                fontSize: 20,
                color: 'gray',
                fontFamily: Fonts.serif,
              }}>
              {t('Loading')}
            </Text>
          </View>
        </View>
      );
    }

    const arrOrderList = Object.keys(ordersData).map(key => {
      ordersData[key].id = key;
      return ordersData[key];
    });
    console.log(arrOrderList);

    return (
      <View style={{flex: 1}}>
        {this.renderHeader()}
        <ScrollView>
          <View
            style={{
              backgroundColor: 'white',
              padding: 12,
              borderBottomWidth: 5,
              borderBottomColor: '#eaeaea',
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 20,
                fontFamily: Fonts.serif,
              }}>
              Lịch sử đơn hàng
            </Text>
          </View>

          <View
            style={{
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              backgroundColor: 'white',
              flex: 1,
            }}>
            <FlatList
              data={arrOrderList}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={this.ItemSeparatorComponent}
            />
          </View>
        </ScrollView>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 22,
              height: 100,
            }}>
            <View
              style={{
                margin: 20,
                backgroundColor: 'white',
                borderRadius: 20,
                padding: 35,
                alignItems: 'center',
                shadowColor: '#000',
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                width: 300,
                height: 200,
              }}>
              <Text
                style={{
                  marginBottom: 18,
                  flex: 1,
                  textAlign: 'center',
                  fontSize: 16,
                  color: '#797777',
                }}>
                Bạn có chắc muốn huỷ giao dịch này không?
              </Text>
              <View style={{flexDirection: 'row'}}>
                <TouchableHighlight
                  style={{
                    backgroundColor: '#F194FF',
                    borderRadius: 20,
                    padding: 10,
                    elevation: 2,
                    width: 100,
                    marginHorizontal: 20,
                  }}
                  onPress={() => {
                    this.setState({
                      modalVisible: !this.state.modalVisible,
                    });
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}>
                    Quay lại
                  </Text>
                </TouchableHighlight>

                <TouchableHighlight
                  style={{
                    backgroundColor: '#2196F3',
                    borderRadius: 20,
                    padding: 10,
                    elevation: 2,
                    width: 100,
                    marginHorizontal: 20,
                  }}
                  onPress={() => {
                    this.onConfirm(this.state.order_id);
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}>
                    Huỷ bỏ
                  </Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  noti: {
    color: '#4a4a4a',
    paddingTop: 15,
    fontSize: 33,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  top: {
    flex: 1,
  },
  bot: {
    flex: 9,
  },
  container: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 20,
    backgroundColor: 'white',
    flex: 1,
  },

  button: {
    margin: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 5,
    backgroundColor: '#AEDEF4',
  },
  text: {
    color: '#fff',
    fontSize: 15,
  },
  divider: {
    backgroundColor: '#eaeaea',
    height: 7,
    marginTop: 10,
  },
});

const mapStateToProps = state => {
  return {
    orders: state.orders,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onGetAllOrders: token => {
      dispatch(getAllOrders(token));
    },
    onCancelOrder: (order_id, token) => {
      dispatch(cancelOrder(order_id, token));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
