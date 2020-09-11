import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TouchableWithoutFeedback,
  Alert,
  Switch,
} from 'react-native';
import {connect} from 'react-redux';
import {Navigation} from 'react-native-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import Logo from '../../../assets/images/logo.png';
import Fonts from '../../themers/Fonts';
import {t} from '../../i18n/t';
import Input from './components/TextInput';
import DatePicker from 'react-native-datepicker';
import {createOrder} from '../../redux/orderRedux/action';
import {applyVoucher} from '../../redux/voucherRedux/action';
import {deleteAllCarts, deleteStoreId} from '../../redux/orderRedux/action';
import {onChangeIntoMainScreen} from '../../navigation';
import TimePicker from 'react-native-24h-timepicker';
import Colors from '../../themers/Colors';
import ModalComponent from '../../components/Modal';

class Booking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      at_home: false,
      note: '',
      address: '',
      order_day: '',
      order_time: '1:10:10',
      total: '',
      token: '',
      voucher_name: '',
      totalDiscount: 0,
      discountPrice: 0,
      disableButton: false,
      dateTimePickerVisible: false,
      dateOrTimeValue: new Date(),
    };
  }

  getData = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  changeSwitch = value => {
    this.setState({at_home: value ? true : false});
  };

  backMainScreen = () => {
    Navigation.dismissModal(this.props.componentId);
  };

  renderHeader = () => {
    return (
      <LinearGradient colors={[Colors.pink, Colors.pink, Colors.orrange]}>
        <View
          style={{
            padding: 10,
            flexDirection: 'row',
            height: 80,
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignContent: 'center',
              backgroundColor: 'white',
              borderRadius: 50,
              alignItems: 'center',
              maxHeight: 40,
              maxWidth: 40,
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
                fontSize: 30,
                fontWeight: 'bold',
                color: 'white',
              }}>
              {t('xac_nhan')}
            </Text>
          </View>
          <View style={{alignItems: 'flex-end', flex: 1}}>
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

  getAvatarDefault = user_name => {
    var getUpperCase = user_name.replace(/[a-z]/g, '');
    let removeSpace = getUpperCase.split(' ').join('');
    var getLastLetters = removeSpace.slice(-2);
    return getLastLetters;
  };

  renderUserInfor = () => {
    const {userData} = this.props;
    console.log(userData);

    if (userData != null) {
      return (
        <View
          style={{
            flexDirection: 'row',
            borderBottomWidth: 2,
            borderBottomColor: '#FC959C',
            padding: 10,
          }}>
          <View style={{paddingHorizontal: 30}}>
            {userData.user.avatar && (
              <Image
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 60,
                }}
                source={{uri: userData.user.avatar}}
              />
            )}

            {!userData.user.avatar && (
              <View
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 60,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: Colors.darkGray,
                }}>
                {userData.user.user_name && (
                  <Text
                    style={{
                      fontSize: 35,
                      color: 'white',
                    }}>
                    {this.getAvatarDefault(userData.user.user_name)}
                  </Text>
                )}
              </View>
            )}
          </View>

          <View style={{marginHorizontal: 5}}>
            <Text
              style={{
                fontSize: 30,
                color: '#FC959C',
                fontFamily: Fonts.serif,
              }}>
              {userData.user.user_name}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Icon
                name="phone"
                size={25}
                color="#3AEB76"
                onPress={() => this.backMainScreen()}
              />
              <Text
                style={{
                  marginHorizontal: 10,
                  color: '#FC959C',
                  fontSize: 15,
                }}>
                {userData.user.phone}
              </Text>
            </View>
          </View>
        </View>
      );
    }
    return null;
  };

  renderItem = ({item}) => {
    return (
      <View style={{flex: 1, marginHorizontal: 10}}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 15,
            padding: 10,
          }}>
          <View>
            <Image
              style={{
                width: 90,
                height: 70,
                borderRadius: 10,
              }}
              source={{uri: item.image}}
            />
          </View>

          <View style={{marginRight: 90, marginTop: -10, marginLeft: 10}}>
            <Text
              style={{
                marginHorizontal: 10,
                color: 'black',
                fontSize: 18,
                fontWeight: 'bold',
                textTransform: 'capitalize',
              }}>
              {item.service_name}
            </Text>
            <Text
              style={{
                margin: 10,
                color: 'black',
                fontSize: 14,
                marginTop: -2,
              }}
              numberOfLines={2}>
              {item.description}
            </Text>
            <View style={{flexDirection: 'row', marginHorizontal: 10}}>
              <View style={{flex: 1}}>
                <Text>{item.price} đ</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  applyVoucher = async () => {
    const {voucher_name, total, token} = this.state;

    return fetch(
      `http://13.124.107.54/api/v1/total-by-voucher?voucher_name=${voucher_name}&total=${total}`,
      {
        method: 'POST',
        body: '',
        headers: {
          Authorization: 'Bearer ' + token,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => response.json())
      .then(responseData => {
        const responeTotal = responseData;
        if (responeTotal.status === 400) {
          Alert.alert('Thông báo', responeTotal.message);
        } else if (responeTotal.status === 404) {
          Alert.alert('Thông báo', responeTotal.message);
        } else {
          Alert.alert('Thông báo', 'Thành công!');
          this.setState({
            discountPrice: responeTotal.data,
            totalDiscount: total - responeTotal.data,
          });
        }
      })
      .catch(error => {
        console.log('Error');
      });
  };

  renderVoucher = () => {
    return (
      <View
        style={{
          borderBottomWidth: 2,
          borderBottomColor: '#FC959C',
        }}>
        <View style={{marginHorizontal: 20, marginTop: 10, marginBottom: 30}}>
          <Text style={{fontSize: 15, fontWeight: 'bold'}}>Mã giảm giá</Text>

          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignContent: 'center',
                marginHorizontal: 10,
              }}>
              <Input
                underlineColorAndroid="transparent"
                placeholder="Nhập mã giảm giá"
                placeholderTextColor="grey"
                borderColor="#E8E8E8"
                height={40}
                title={''}
                getData={e => this.getData('voucher_name', e)}
              />
            </View>
            <View
              style={{
                // alignItems: 'flex-end',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity onPress={this.applyVoucher}>
                <Text
                  style={{
                    borderRadius: 20,
                    fontSize: 15,
                    fontWeight: 'bold',
                    padding: 12,
                    paddingHorizontal: 20,
                    textAlign: 'center',
                    backgroundColor: '#FCB1B6',
                    color: 'black',
                  }}>
                  Áp dụng
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  renderShowPrice = () => {
    return (
      <View
        style={{
          borderBottomWidth: 2,
          borderBottomColor: '#FC959C',
          marginBottom: 50,
        }}>
        <View
          style={{
            marginHorizontal: 20,
            flexDirection: 'row',
            marginVertical: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <FontAwesome name="money" size={20} color="#3e3e3e" />
          <View style={{marginLeft: 10, flex: 1}}>
            <TouchableWithoutFeedback onPress={this.onSignUp}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 16,
                }}>
                Tổng cộng
              </Text>
            </TouchableWithoutFeedback>
          </View>
          <Text
            style={{
              color: 'red',
              fontSize: 16,
            }}>
            {this.state.total} đ
          </Text>
        </View>

        <View
          style={{
            marginHorizontal: 20,
            flexDirection: 'row',
            marginBottom: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Entypo name="price-ribbon" size={20} color="#3e3e3e" />
          <View style={{marginLeft: 10, flex: 1}}>
            <TouchableWithoutFeedback onPress={this.onSignUp}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 16,
                }}>
                Giảm giá
              </Text>
            </TouchableWithoutFeedback>
          </View>
          <Text
            style={{
              color: 'gray',
              fontSize: 16,
              textDecorationLine: 'line-through',
            }}>
            {this.state.totalDiscount} đ
          </Text>
        </View>
      </View>
    );
  };

  renderRadioButton = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginVertical: 15,
          marginHorizontal: 10,
        }}>
        <Text>{t('dat_lam_tai_nha')}</Text>
        <Switch
          onValueChange={value => {
            this.changeSwitch(value);
          }}
          style={{marginBottom: 10}}
          tintColor="#767577"
          value={this.state.at_home}
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={this.state.at_home ? '#00ff00' : 'pink'}
          ios_backgroundColor="#3e3e3e"
        />
      </View>
    );
  };

  componentDidMount() {
    const {userData, total} = this.props;
    this.setState({
      token: userData.token,
      total,
    });
  }

  onChangeNotifyScreen = (store_id, responseData) => {
    Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              name: 'ConfirmOrder',
              passProps: {
                store_id,
                responseData,
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

  onBooking = async () => {
    const {cartItems, store_id} = this.props.orders;
    const {
      note,
      address,
      order_day,
      order_time,
      total,
      token,
      voucher_name,
      at_home,
      discountPrice,
    } = this.state;

    if (order_day === '') {
      Alert.alert('Thông báo', 'Vui lòng chọn ngày giao dịch!');
    } else if (order_time === '') {
      Alert.alert('Thông báo', 'Vui lòng chọn giờ giao dịch!');
    } else {
      let status = 0;

      if (at_home) {
        status = 1;
      } else {
        status = 0;
      }

      let totalPrice = 0;

      if (discountPrice === 0) {
        totalPrice = total;
      } else {
        totalPrice = discountPrice;
      }

      const data = {
        address,
        total: totalPrice,
        note,
        voucher_name,
        store: store_id,
        order_time,
        order_day,
        at_home: status,
        service: cartItems,
      };

      return fetch('http://13.124.107.54/api/v1/order', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          Authorization: 'Bearer ' + token,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(responseData => {
          if (responseData.status === 201) {
            this.setState({disableButton: true}, () => {
              this.onChangeNotifyScreen(store_id, responseData);
            });
          } else if (responseData.status === 400) {
            Alert.alert('Thông báo', responseData.message);
          } else {
            Alert.alert('Thông báo', 'Giờ không hợp lệ');
          }
          console.log('order', responseData);
        })
        .catch(error => {
          console.log('Error');
        });
    }
  };

  onCancel() {
    this.TimePicker.close();
  }

  onConfirm(hour, minute) {
    this.setState({order_time: `${hour}:${minute}` + ':00'});
    this.TimePicker.close();
  }

  onCloseNotifyOrder = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
    });
  };

  render() {
    const {userData} = this.props;
    const minDate = new Date();
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 7);
    const total = this.state.total;

    const cartItems = this.props.orders.cartItems;

    const status_atHome = this.state.at_home;

    const totalApplyVoucher = this.props.vouchers.finalPrice;

    return (
      <View style={{flex: 1, backgroundColor: '#F99A7C'}}>
        {this.renderHeader()}
        <ScrollView style={styles.container}>
          {this.renderUserInfor()}
          <View
            style={{
              borderBottomWidth: 2,
              borderBottomColor: '#FC959C',
            }}>
            <FlatList
              data={cartItems}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={this.ItemSeparatorComponent}
            />

            <View
              style={{
                marginHorizontal: 20,
                flexDirection: 'row',
                borderTopWidth: 2,
                borderTopColor: 'gray',
              }}>
              <View>
                <Text
                  style={{
                    fontSize: 18,
                    marginBottom: 10,
                    marginTop: 10,
                  }}>
                  Chọn ngày
                </Text>
                <DatePicker
                  style={{
                    width: 180,
                  }}
                  date={this.state.order_day}
                  minDate={minDate}
                  maxDate={maxDate}
                  mode="date"
                  placeholder="Select date"
                  format="YYYY-MM-DD"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  onDateChange={date => {
                    this.setState({order_day: date});
                  }}
                />
              </View>

              <View
                style={{
                  marginTop: 10,
                  marginLeft: 10,
                  flex: 1,
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    marginBottom: 10,
                  }}>
                  Chọn thời gian
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderWidth: 1,
                      height: 40,
                      flex: 1,
                    }}>
                    <TouchableOpacity
                      onPress={() => this.TimePicker.open()}
                      style={styles.button}>
                      <Text
                        style={{
                          color: 'black',
                          fontSize: 16,
                          fontWeight: '600',
                        }}>
                        {this.state.order_time}
                      </Text>
                    </TouchableOpacity>

                    <TimePicker
                      ref={ref => {
                        this.TimePicker = ref;
                      }}
                      onCancel={() => this.onCancel()}
                      onConfirm={(hour, minute, second) =>
                        this.onConfirm(hour, minute, second)
                      }
                    />
                  </View>
                  <View style={{alignContent: 'flex-end', marginLeft: 10}}>
                    <Entypo
                      name="clock"
                      size={25}
                      color="black"
                      onPress={() => this.TimePicker.open()}
                    />
                  </View>
                </View>
              </View>
            </View>

            <View style={{flex: 5, marginHorizontal: 20}}>
              <Input
                underlineColorAndroid="transparent"
                placeholder="Thêm nhận xét của bạn"
                placeholderTextColor="grey"
                numberOfLines={2}
                multiline={true}
                height={80}
                title={t('ghi_chu')}
                getData={e => this.getData('note', e)}
              />

              {status_atHome ? (
                <Input
                  underlineColorAndroid="transparent"
                  placeholder="Nhập điạ chỉ"
                  placeholderTextColor="grey"
                  numberOfLines={2}
                  multiline={true}
                  height={50}
                  title={t('dia_chi')}
                  getData={e => this.getData('address', e)}
                />
              ) : null}

              {this.renderRadioButton()}
            </View>
          </View>

          {this.renderVoucher()}
          {this.renderShowPrice()}
        </ScrollView>

        <SafeAreaView>
          <View
            style={{
              marginHorizontal: 5,
              padding: 10,
              flexDirection: 'row',
              backgroundColor: '#F99A7C',
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: 'black',
                }}>
                Tổng cộng:
              </Text>
            </View>

            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: 'black',
                }}>
                {this.state.discountPrice === 0
                  ? total
                  : this.state.discountPrice}
                đ{/* {total} đ */}
              </Text>
            </View>
            <View style={{alignItems: 'flex-end'}}>
              <TouchableOpacity
                onPress={this.onBooking}
                disabled={this.state.disableButton}>
                <Text
                  style={{
                    borderRadius: 20,
                    fontSize: 15,
                    fontWeight: 'bold',
                    padding: 12,
                    paddingHorizontal: 30,
                    textAlign: 'center',
                    backgroundColor: '#FCB1B6',
                    color: 'black',
                  }}>
                  Đặt ngay
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
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

const mapStateToProps = state => {
  return {
    orders: state.orders,
    vouchers: state.vouchers,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onCreateOrder: (data, token) => {
      dispatch(createOrder(data, token));
    },
    onApplyVoucher: (data, token) => {
      dispatch(applyVoucher(data, token));
    },
    onDeleteAllCart: () => {
      dispatch(deleteAllCarts());
    },
    onDeleteStoreId: () => {
      dispatch(deleteStoreId());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Booking);
