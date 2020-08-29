import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {Navigation} from 'react-native-navigation';
import LinearGradient from 'react-native-linear-gradient';
import {t} from '../../i18n/t';
import Icon from 'react-native-vector-icons/FontAwesome';
import Success from 'react-native-vector-icons/AntDesign';
import Logo from '../../../assets/images/logo.png';
const {width, height} = Dimensions.get('window');
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Fonts from '../../themers/Fonts';
import {connect} from 'react-redux';
import {getOrderDetail, cancelOrder} from '../../redux/orderRedux/action';
import {storageRemove, storageGet} from '../../checkAsyncStorage';
import Loading from '../Loading';
import {addCart, deleteCart, addStoreId} from '../../redux/orderRedux/action';
import {onChangeIntoMainScreen} from '../../navigation';
import {
  deleteAllCarts,
  deleteStoreId,
  getAllOrders,
} from '../../redux/orderRedux/action';
import {getStoreDetail} from '../../redux/storeRedux/action';

class HistoryOrderDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_name: '',
      token: '',
      isLoading: true,
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
        this.setState(
          {
            user_name: parsedUser.data.user.user_name,
            token: parsedUser.data.token,
          },
          () => {
            this.props.onGetAllOrders(this.state.token);
            this.props.onGetStoreDetail(this.props.store_id, this.state.token);
          },
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  onHistoryOrder = () => {
    this.props.onDeleteAllCart();
    this.props.onDeleteStoreId();
    Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              name: 'HistoryOrder',
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

  onNavigateStore = store_id => {
    this.props.onDeleteAllCart();
    this.props.onDeleteStoreId();
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

  renderHeader = () => {
    return (
      <LinearGradient colors={['#FC5895', '#FC5895', '#F99A7C']}>
        <View
          style={{
            flexDirection: 'row',
            padding: 5,
            height: 80,
          }}
        />
      </LinearGradient>
    );
  };

  onBackHome = () => {
    this.props.onDeleteAllCart();
    this.props.onDeleteStoreId();
    onChangeIntoMainScreen();
  };

  render() {
    const {detailStore} = this.props.stores;
    const that = this;

    setTimeout(function() {
      that.setState({isLoading: false});
    }, 100);

    if (this.state.isLoading) {
      return (
        <View style={{flex: 1}}>
          <Loading loadingText="Loading..." />
        </View>
      );
    }
    return (
      <View style={{flex: 1}}>
        {this.renderHeader()}

        <ScrollView>
          <LinearGradient colors={['#F99A7C', '#FC5895']}>
            <View
              style={{
                padding: 12,
                borderBottomWidth: 15,
                borderBottomColor: '#eaeaea',
                alignItems: 'center',
                justifyContent: 'center',
                height: 200,
              }}>
              <View
                style={{
                  width: 70,
                  height: 70,
                  backgroundColor: 'white',
                  borderRadius: 70,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Success
                  name="checkcircleo"
                  size={65}
                  color="#57f307"
                  onPress={() => this.backMainScreen()}
                />
              </View>

              <Text
                style={{
                  marginTop: 10,
                  fontWeight: 'bold',
                  fontSize: 20,
                  fontFamily: Fonts.serif,
                  // textTransform: 'capitalize',
                  color: 'white',
                }}>
                Đặt hàng thành công
              </Text>
            </View>
          </LinearGradient>

          <View
            style={{
              backgroundColor: 'white',
              padding: 12,
              // height: 120,
              borderBottomWidth: 8,
              borderBottomColor: '#eaeaea',
            }}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: 80,
                borderBottomWidth: 3,
                borderBottomColor: '#eaeaea',
              }}>
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 20,
                  fontFamily: Fonts.serif,
                  fontWeight: 'bold',
                }}
                numberOfLines={1}>
                Xin chào!
              </Text>
            </View>

            <Text
              style={{
                fontWeight: 'bold',
                marginLeft: 10,
                marginTop: 10,
                fontSize: 25,
                fontFamily: Fonts.serif,
                textAlign: 'center',
              }}>
              {this.state.user_name}
            </Text>
          </View>

          <View
            style={{
              backgroundColor: 'white',
              padding: 12,
              borderBottomWidth: 8,
              flexDirection: 'row',
              borderBottomColor: '#eaeaea',
            }}>
            <View style={{flex: 1, marginLeft: 15}}>
              <Text
                style={{
                  fontSize: 16,
                  textAlign: 'center',
                  fontFamily: Fonts.serif,
                  color: '#797777',
                }}>
                Đơn hàng của bạn đang được gửi đến
              </Text>
              <Text
                style={{
                  fontSize: 17,
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontFamily: Fonts.serif,
                  color: '#FC5895',
                }}>
                {detailStore.store_name}.{' '}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  textAlign: 'center',
                  fontFamily: Fonts.serif,
                  color: '#797777',
                }}>
                Bạn sẽ nhận thông báo ngay sau khi có xác nhận từ cửa hàng
              </Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: 'white',
              padding: 12,
              borderBottomWidth: 8,
              borderBottomColor: '#eaeaea',
            }}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: Fonts.serif,
                color: '#797777',
                textAlign: 'center',
              }}>
              {/* {t('trang_thai')} */}
              Chúc bạn có 1 trải nghiệm vui vẻ tại
            </Text>
            <Text
              style={{
                fontSize: 19,
                textAlign: 'center',
                fontWeight: 'bold',
                fontFamily: Fonts.serif,
                color: '#FC5895',
              }}>
              {detailStore.store_name}
            </Text>
          </View>

          <View
            style={{
              borderTopWidth: 3,
              borderTopColor: '#eaeaea',
              height: 200,
              justifyContent: 'center',
            }}>
            <View
              style={{
                paddingVertical: 10,
                paddingHorizontal: 110,
                borderRadius: 10,
                marginHorizontal: 10,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                marginBottom: 10,
                borderWidth: 2,
                borderColor: '#FC5895',
              }}>
              <TouchableOpacity onPress={this.onHistoryOrder}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    fontFamily: Fonts.serif,
                    marginLeft: 10,
                    color: '#FC5895',
                  }}>
                  {t('xem_chi_tiet')}
                </Text>
              </TouchableOpacity>
            </View>

            <LinearGradient
              colors={['#FC5895', '#F99A7C']}
              start={{x: 0, y: 1}}
              end={{x: 1, y: 0}}
              style={{
                paddingVertical: 10,
                paddingHorizontal: 105,
                borderRadius: 10,
                marginHorizontal: 10,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <TouchableOpacity onPress={() => this.onBackHome()}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: 'white',
                    textAlign: 'center',
                    fontFamily: Fonts.serif,
                  }}>
                  {t('man_hinh_chinh')}
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </ScrollView>
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
});

const mapStateToProps = state => {
  return {
    orders: state.orders,
    vouchers: state.vouchers,
    stores: state.stores,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onGetAllOrders: token => {
      dispatch(getAllOrders(token));
    },
    onDeleteAllCart: () => {
      dispatch(deleteAllCarts());
    },
    onDeleteStoreId: () => {
      dispatch(deleteStoreId());
    },
    onGetStoreDetail: (storeId, token) => {
      dispatch(getStoreDetail(storeId, token));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoryOrderDetail);
