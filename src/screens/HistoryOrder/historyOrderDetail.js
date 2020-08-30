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
  Modal,
  TouchableHighlight,
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
import {
  addCart,
  addStoreId,
  deleteAllCarts,
  deleteStoreId,
} from '../../redux/orderRedux/action';

class HistoryOrderDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      discountPrice: 0,
      modalVisible: false,
      modalReorder: false,
      modalDeleteCart: false,
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
          this.props.onGetDetailOrder(this.props.order_id, this.state.token);
        });
      }
    } catch (error) {
      console.log(error);
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

  backMainScreen = () => {
    Navigation.dismissModal(this.props.componentId);
  };

  onStoreDetail = () => {
    alert('ok');
  };

  onNavigateStore = store_id => {
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

  renderItem = ({item}) => {
    return (
      <View
        style={{
          paddingVertical: 10,
          paddingHorizontal: 10,
          flexDirection: 'row',
          borderBottomWidth: 2,
          borderBottomColor: '#eaeaea',
          marginHorizontal: 10,
        }}>
        <View
          style={{
            flex: 1,
          }}>
          <Image
            source={{uri: item.image}}
            style={{
              width: 60,
              height: 50,
              borderRadius: 10,
            }}
          />
        </View>

        <View>
          <Text
            style={{
              alignSelf: 'flex-end',
              color: '#5a5555',
              fontWeight: 'bold',
              fontSize: 16,
              fontFamily: Fonts.serif,
              textTransform: 'capitalize',
            }}>
            {item.service_name.substring(0, 30)}
          </Text>
          <Text
            style={{
              alignSelf: 'flex-end',
              marginTop: 5,
              color: 'green',
              fontFamily: Fonts.serif,
              fontSize: 15,
            }}>
            {item.price}
          </Text>
        </View>
      </View>
    );
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
              padding: 10,
              margin: 10,
              justifyContent: 'center',
              backgroundColor: 'white',
              borderRadius: 50,
              alignItems: 'center',
              maxHeight: 45,
              maxWidth: 45,
            }}>
            <Icon
              name="chevron-left"
              size={25}
              color="black"
              onPress={() => this.backMainScreen()}
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
                fontSize: 20,
                fontWeight: 'bold',
                color: 'white',
              }}>
              {t('don_hang_cua_ban')}
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

  onConfirm = () => {
    this.props.onCancelOrder(this.props.order_id, this.state.token);
    this.setState({
      modalVisible: !this.state.modalVisible,
    });
  };

  onCancelOrder = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
    });
  };

  onShowFormComment = store_id => {
    Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              name: 'CommentModal',
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

  onReOrder = () => {
    const dataOrderDetail = this.props.orders.dataOrderDetail;
    const recent_store_id = this.props.orders.store_id;
    const store_id_clicked = dataOrderDetail.store.store_id;
    if (store_id_clicked === recent_store_id || recent_store_id === '') {
      this.setState({
        modalReorder: !this.state.modalReorder,
      });
    } else {
      this.onVerify();
    }
  };

  onVerify = () => {
    this.setState({
      modalDeleteCart: !this.state.modalDeleteCart,
    });
  };

  onConfirmReorder = () => {
    const dataOrderDetail = this.props.orders.dataOrderDetail;
    const store_id_clicked = dataOrderDetail.store.store_id;

    const dataItems = dataOrderDetail.services;
    dataItems.forEach(service => this.props.onAddCart(service));
    this.props.onAddStoreId(store_id_clicked);
    this.changeShopping();
  };

  changeShopping = () => {
    Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              name: 'Cart',
              passProps: {},
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

  sumTotalPrice = () => {
    const dataOrderServices = this.props.orders.dataOrderDetail.services;

    if (dataOrderServices.length > 0) {
      var totalPrice = dataOrderServices.reduce(function(prev, cur) {
        return prev + parseInt(cur.price);
      }, 0);
    }
    return totalPrice;
  };

  onDeleteCartItems = () => {
    this.props.onDeleteAllCart();
    this.props.onDeleteStoreId();
    Alert.alert('Thông báo', 'Xoá thành công');

    this.setState({modalDeleteCart: !this.state.modalDeleteCart}, () => {
      this.onConfirmReorder();
    });
  };

  renderStatusIcon = dataOrderDetail => {
    if (dataOrderDetail.status[0].massage === 'Đơn đang chờ xác nhận') {
      return (
        <Success
          name="hourglass"
          size={40}
          color="#57f307"
          onPress={() => this.backMainScreen()}
        />
      );
    } else if (dataOrderDetail.status[0].massage === 'Đã hủy') {
      return (
        <Success
          name="minuscircleo"
          size={40}
          color="#57f307"
          onPress={() => this.backMainScreen()}
        />
      );
    } else {
      return (
        <Success
          name="checkcircleo"
          size={40}
          color="#57f307"
          onPress={() => this.backMainScreen()}
        />
      );
    }
  };

  renderStatus = dataOrderDetail => {
    return (
      <Text
        style={{
          marginTop: 10,
          fontWeight: 'bold',
          fontSize: 15,
          fontFamily: Fonts.serif,
          textTransform: 'capitalize',
        }}>
        {dataOrderDetail.status[0].massage}
      </Text>
    );
  };

  render() {
    const dataOrderDetail = this.props.orders.dataOrderDetail;
    if (dataOrderDetail.length === 0) {
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
            <Loading loadingText="Loading..." />
          </View>
        </View>
      );
    }
    return (
      <View style={{flex: 1}}>
        {this.renderHeader()}
        <ScrollView>
          <View
            style={{
              borderTopWidth: 10,
              borderTopColor: '#eaeaea',
              backgroundColor: 'white',
              padding: 12,
              borderBottomWidth: 15,
              borderBottomColor: '#eaeaea',
              alignItems: 'center',
              justifyContent: 'center',
              height: 120,
            }}>
            {this.renderStatusIcon(dataOrderDetail)}
            {this.renderStatus(dataOrderDetail)}
          </View>

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
              }}>
              <Text
                style={{
                  flex: 1,
                  fontSize: 15,
                  fontWeight: 'bold',
                  fontFamily: Fonts.serif,
                }}>
                {t('ma_don_hang')}
              </Text>
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 15,
                  fontFamily: Fonts.serif,
                  alignItems: 'flex-end',
                }}
                numberOfLines={1}>
                {dataOrderDetail.order_id.substring(0, 30)}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
              }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 'bold',
                  flex: 1,
                  fontFamily: Fonts.serif,
                }}>
                {t('dat_hang_luc')}
              </Text>
              <Text
                style={{
                  marginLeft: 10,
                  alignItems: 'flex-end',
                  fontSize: 15,
                  fontFamily: Fonts.serif,
                }}>
                {dataOrderDetail.order_time} {dataOrderDetail.order_day}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
              }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 'bold',
                  flex: 1,
                  fontFamily: Fonts.serif,
                }}>
                {t('tong_tien_d')}
              </Text>
              <Text
                style={{
                  marginLeft: 10,
                  alignItems: 'flex-end',
                  fontSize: 15,
                  fontFamily: Fonts.serif,
                }}>
                {dataOrderDetail.total}  đ
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
              }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 'bold',
                  flex: 1,
                  fontFamily: Fonts.serif,
                }}>
                {t('gia_giam')}
              </Text>
              <Text
                style={{
                  marginLeft: 10,
                  alignItems: 'flex-end',
                  fontSize: 15,
                  color: 'red',
                  textDecorationLine: 'line-through',
                  fontFamily: Fonts.serif,
                }}>
                {this.sumTotalPrice() - dataOrderDetail.total} đ
              </Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: 'white',
              padding: 12,
              flexDirection: 'row',
            }}>
            <View
              style={{
                alignItems: 'center',
              }}>
              <Icon name="dot-circle-o" size={18} color="blue" />
              <View style={styles.dashLine} />
              <View style={styles.dashLine} />
              <View style={styles.dashLine} />
              <View style={styles.dashLine} />
              <View style={styles.dashLine} />
              <View style={styles.dashLine} />
            </View>

            <View style={{flex: 1, marginLeft: 15}}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  fontFamily: Fonts.serif,
                }}>
                {dataOrderDetail.store.store_name}
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: Fonts.serif,
                }}>
                {dataOrderDetail.store.address}
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: Fonts.serif,
                  }}>
                  {t('phone_title')}
                </Text>
                <Text
                  style={{
                    marginLeft: 10,
                    fontSize: 15,
                    fontFamily: Fonts.serif,
                  }}>
                  {dataOrderDetail.store.phone}
                </Text>
              </View>
            </View>

            <View style={{alignContent: 'flex-end', flexDirection: 'row'}}>
              <TouchableWithoutFeedback
                onPress={() =>
                  this.onNavigateStore(dataOrderDetail.store.store_id)
                }>
                <Text
                  style={{
                    color: 'blue',
                    fontSize: 14,
                    textDecorationLine: 'underline',
                  }}>
                  {t('den_cua_hang')}
                </Text>
              </TouchableWithoutFeedback>
            </View>
          </View>

          <View
            style={{
              backgroundColor: 'white',
              padding: 12,
              borderBottomWidth: 8,
              flexDirection: 'row',
              borderBottomColor: '#eaeaea',
            }}>
            <View style={{marginTop: 3}}>
              <Entypo name="location" size={18} color="#f66" />
            </View>

            <View style={{flex: 1, marginLeft: 15}}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  fontFamily: Fonts.serif,
                }}>
                {t('khach_hang_title')}
              </Text>

              {dataOrderDetail.address === null ? null : (
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: Fonts.serif,
                  }}>
                  {dataOrderDetail.address}
                </Text>
              )}

              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: Fonts.serif,
                  }}>
                  {t('name_title')}
                </Text>
                <Text
                  style={{
                    marginLeft: 10,
                    fontSize: 15,
                    fontFamily: Fonts.serif,
                  }}>
                  {dataOrderDetail.user[0].user_name}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: Fonts.serif,
                  }}>
                  {t('phone_title')}
                </Text>
                <Text
                  style={{
                    marginLeft: 10,
                    fontSize: 15,
                    fontFamily: Fonts.serif,
                  }}>
                  {dataOrderDetail.user[0].phone}
                </Text>
              </View>
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
                fontWeight: 'bold',
                fontSize: 20,
                fontFamily: Fonts.serif,
              }}>
              {t('trang_thai')}
            </Text>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 7,
              }}>
              {dataOrderDetail.at_home === 'Làm tại của hàng' ? (
                <Icon name="motorcycle" size={22} color="black" />
              ) : (
                <AntDesign name="home" size={22} color="black" />
              )}

              <Text
                style={{
                  marginLeft: 13,
                  alignItems: 'flex-end',
                  fontSize: 16,
                  fontFamily: Fonts.serif,
                }}>
                {dataOrderDetail.at_home}
              </Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: 'white',
              padding: 12,
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 20,
                fontFamily: Fonts.serif,
              }}>
              {t('dich_vu')}
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
              data={dataOrderDetail.services}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={this.ItemSeparatorComponent}
            />
          </View>

          <View
            style={{
              backgroundColor: 'white',
              padding: 12,
              borderBottomWidth: 10,
              borderBottomColor: '#eaeaea',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                padding: 15,
                borderColor: 'gray',
                width: 250,
                justifyContent: 'center',
                alignItems: 'center',
                height: 40,
                backgroundColor: '#eaeaea',
                borderRadius: 30,
              }}
              onPress={() =>
                this.onShowFormComment(dataOrderDetail.store.store_id)
              }>
              <Text
                style={{fontSize: 14, textAlign: 'center', fontWeight: 'bold'}}>
                {t('danh_gia')}
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              backgroundColor: 'white',
              padding: 12,
            }}>
            <Text
              style={{
                marginTop: 10,
                fontWeight: 'bold',
                fontSize: 15,
                fontFamily: Fonts.serif,
              }}>
              {t('lien_he_nail_app')}
            </Text>
            <Text
              style={{
                marginTop: 10,
                fontSize: 13,
                fontFamily: Fonts.serif,
              }}>
              {t('mo_ta_ho_tro')}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
              }}>
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: Fonts.serif,
                }}>
                {t('hot_line')}
              </Text>
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 13,
                  fontWeight: 'bold',
                  fontFamily: Fonts.serif,
                }}>
                {t('app_phone')}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
              }}>
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: Fonts.serif,
                }}>
                {t('app_email_title')}
              </Text>
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 13,
                  fontWeight: 'bold',
                  fontFamily: Fonts.serif,
                }}>
                {t('app_email')}
              </Text>
            </View>
          </View>
        </ScrollView>

        <View
          style={{
            borderTopWidth: 3,
            borderTopColor: '#eaeaea',
            height: 70,
            justifyContent: 'center',
          }}>
          {dataOrderDetail.status[0].massage === 'Đơn đang chờ xác nhận' ? (
            <LinearGradient
              colors={['red', '#F99A7C']}
              start={{x: 0, y: 1}}
              end={{x: 1, y: 0}}
              style={{
                paddingVertical: 10,
                paddingHorizontal: 110,
                borderRadius: 10,
                marginHorizontal: 10,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <TouchableOpacity onPress={this.onCancelOrder}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: 'white',
                    textAlign: 'center',
                    fontFamily: Fonts.serif,
                    marginLeft: 10,
                  }}>
                  {t('huy_don')}
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          ) : (
            <LinearGradient
              colors={['blue', '#767fef']}
              start={{x: 0, y: 1}}
              end={{x: 1, y: 0}}
              style={{
                paddingVertical: 10,
                paddingHorizontal: 110,
                borderRadius: 10,
                marginHorizontal: 10,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <TouchableOpacity onPress={() => this.onReOrder()}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: 'white',
                    textAlign: 'center',
                    fontFamily: Fonts.serif,
                    marginLeft: 10,
                  }}>
                  {t('dat_lai')}
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          )}
        </View>

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
                    this.onConfirm();
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

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalReorder}>
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
                Bạn có chắc muốn giao dịch lại không?
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
                      modalReorder: !this.state.modalReorder,
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
                    this.onConfirmReorder();
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}>
                    Xác nhận
                  </Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalDeleteCart}>
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
                height: 240,
              }}>
              <Text
                style={{
                  marginBottom: 18,
                  flex: 1,
                  textAlign: 'center',
                  fontSize: 16,
                  color: '#797777',
                }}>
                Hiện tại giỏ hàng của bạn đang có dịch vụ của cửa hàng khác, bạn
                có muốn xoá giỏ hàng không?
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
                      modalDeleteCart: !this.state.modalDeleteCart,
                    });
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}>
                    Đã hiểu
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
                    this.onDeleteCartItems();
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
  dashLine: {
    height: 5,
    width: 1.5,
    marginTop: 6,
    backgroundColor: 'gray',
  },
});

const mapStateToProps = state => {
  return {
    orders: state.orders,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onGetDetailOrder: (order_id, token) => {
      dispatch(getOrderDetail(order_id, token));
    },
    onCancelOrder: (order_id, token) => {
      dispatch(cancelOrder(order_id, token));
    },
    onAddCart: cartItem => {
      dispatch(addCart(cartItem));
    },
    onAddStoreId: store_id => {
      dispatch(addStoreId(store_id));
    },
    onDeleteAllCart: () => {
      dispatch(deleteAllCarts());
    },
    onDeleteStoreId: () => {
      dispatch(deleteStoreId());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoryOrderDetail);
