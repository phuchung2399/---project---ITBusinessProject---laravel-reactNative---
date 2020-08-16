import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  BackHandler,
  Picker,
  ScrollView,
  SafeAreaView,
  AsyncStorage,
  TouchableWithoutFeedback,
  TextInput,
  Switch,
} from 'react-native';
import {connect} from 'react-redux';
import {Navigation} from 'react-native-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import Logo from '../../../assets/images/logo.png';
import Img from '../../../assets/images/service-img.jpg';
import Items from './components/BookingItems';
import Fonts from '../../themers/Fonts';
import {t} from '../../i18n/t';
import Input from './components/TextInput';
import DatePicker from 'react-native-datepicker';
import {createOrder} from '../../redux/orderRedux/action';

class Booking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      colorFalseSwitchIsOn: true,
      note: 'Tôi rất thích làm nail',
      address: 'Sài gòn, Việt Nam',
      order_day: '',
      order_time: '17:00:00',
      total: 4000000.0,
      token: '',
      voucher_name: '',
    };
  }

  getData = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  changeSwitch = value => {
    this.setState({colorFalseSwitchIsOn: value ? true : false});
  };

  backMainScreen = () => {
    Navigation.dismissModal(this.props.componentId);
  };

  renderHeader = () => {
    return (
      <LinearGradient colors={['#FC5895', '#FC5895', '#F99A7C']}>
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

  renderUserInfor = () => {
    const {userData} = this.props;

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
            <Image
              style={{
                width: 80,
                height: 80,
                borderRadius: 60,
              }}
              source={{uri: userData.user.avatar}}
            />
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
            {/* <View
              style={{
                flexDirection: 'row',
                marginBottom: 10,
                alignItems: 'center',
              }}>
              <AntDesign name="clockcircleo" size={20} color="#3AEB76" />

              <View
                style={{
                  backgroundColor: '#E8E8E8',
                  borderRadius: 50,
                  marginHorizontal: 10,
                }}>
                <Text
                  style={{
                    marginHorizontal: 10,
                    fontSize: 15,
                    paddingVertical: 10,
                  }}>
                  8:00 Sáng
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: '#E8E8E8',
                  marginHorizontal: 10,
                  paddingVertical: 10,
                  borderRadius: 50,
                }}>
                <Text style={{marginHorizontal: 10, fontSize: 15}}>
                  25/06/2020
                </Text>
              </View>
            </View> */}
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
              <View>
                <AntDesign
                  name="minuscircleo"
                  size={25}
                  color="black"
                  onPress={() => this.backMainScreen()}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    );
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
              <TextInput
                style={{
                  height: 40,
                  borderColor: '#E8E8E8',
                  borderWidth: 1,
                  borderRadius: 10,
                }}
                placeholder="Nhập mã giảm giá"
              />
            </View>
            <View style={{alignItems: 'flex-end'}}>
              <TouchableWithoutFeedback onPress={this.onSignin}>
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
              </TouchableWithoutFeedback>
            </View>
          </View>
        </View>
      </View>
    );
  };

  renderMethodToPay = () => {
    return (
      <View
        style={{
          borderBottomWidth: 2,
          borderBottomColor: '#FC959C',
        }}>
        <View style={{marginHorizontal: 20, marginVertical: 10}}>
          <Text style={{fontSize: 15, fontWeight: 'bold'}}>
            Phương thức thanh toán
          </Text>

          <View style={{flexDirection: 'row', marginVertical: 5}}>
            <View style={{flex: 1}}>
              <TouchableWithoutFeedback onPress={this.onSignUp}>
                <Text
                  style={{
                    color: 'blue',
                    fontSize: 16,
                    textDecorationLine: 'underline',
                  }}>
                  Thanh toán trực tiếp
                </Text>
              </TouchableWithoutFeedback>
            </View>
            <View>
              <AntDesign name="edit" size={25} color="#3e3e3e" />
            </View>
          </View>
        </View>
      </View>
    );
  };

  renderRadioButton = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginVertical: 10,
          marginHorizontal: 10,
        }}>
        <Text>{t('dat_lam_tai_nha')}</Text>
        <Switch
          onValueChange={value => {
            this.changeSwitch(value);
          }}
          style={{marginBottom: 10}}
          tintColor="#ff0000"
          value={this.state.colorFalseSwitchIsOn}
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={this.state.colorFalseSwitchIsOn ? '#00ff00' : '#0000ff'}
          ios_backgroundColor="#3e3e3e"
        />
      </View>
    );
  };

  componentDidMount() {
    const {userData} = this.props;
    this.setState({
      token: userData.token,
    });
  }

  onBooking = async () => {
    const {arrayServicesSelected, store_id} = this.props;
    const {
      note,
      address,
      order_day,
      order_time,
      total,
      token,
      voucher_name,
    } = this.state;

    const data = {
      address,
      total,
      note,
      voucher_name,
      store: store_id,
      order_time,
      order_day,
      service: arrayServicesSelected,
    };
    console.log(data);
    await this.props.onCreateOrder(data, token);
  };

  render() {
    const {arrayServicesSelected, store_id, userData} = this.props;
    const minDate = new Date();
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 7);

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
              data={arrayServicesSelected}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={this.ItemSeparatorComponent}
            />

            <View style={{marginHorizontal: 20, flexDirection: 'row'}}>
              <View>
                <Text
                  style={{
                    fontSize: 20,
                    marginBottom: 10,
                    borderBottomWidth: 2,
                    borderBottomColor: 'gray',
                  }}>
                  Chon ngay
                </Text>
                <DatePicker
                  style={{
                    width: 200,
                    backgroundColor: '#E8E8E8',
                    borderRadius: 50,
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

              {/* <View
                style={{
                  marginLeft: 10,
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    marginBottom: 10,
                    borderBottomWidth: 2,
                    borderBottomColor: 'gray',
                  }}>
                  Chon gio
                </Text>
                <DatePicker
                  style={{
                    width: 150,
                    backgroundColor: '#E8E8E8',
                    borderRadius: 50,
                  }}
                  date={this.state.date}
                  mode="date"
                  placeholder="Select date"
                  format="DD-MM-YYYY"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  onDateChange={date => {
                    this.setState({date: date});
                  }}
                />
              </View> */}
            </View>

            <View style={{flex: 5, marginHorizontal: 20}}>
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

              {this.renderRadioButton()}
            </View>
          </View>

          {this.renderMethodToPay()}
          {this.renderVoucher()}
        </ScrollView>

        <SafeAreaView>
          <View
            style={{
              marginHorizontal: 10,
              padding: 10,
              flexDirection: 'row',
              backgroundColor: '#F99A7C',
            }}>
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
                Tổng cộng: 40.000 đ
              </Text>
            </View>
            <View style={{alignItems: 'flex-end'}}>
              <TouchableWithoutFeedback onPress={this.onBooking}>
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
              </TouchableWithoutFeedback>
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
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onCreateOrder: (data, token) => {
      dispatch(createOrder(data, token));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Booking);
