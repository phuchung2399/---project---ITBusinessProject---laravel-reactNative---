import React, {Component} from 'react';
import {
  Dimensions,
  Image,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Clipboard,
} from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import {t} from '../../i18n/t';
import Logo from '../../../assets/images/logo.png';
import {Navigation} from 'react-native-navigation';
import {connect} from 'react-redux';
import {storageRemove, storageGet} from '../../checkAsyncStorage';
import {getAllVouchers} from '../../redux/voucherRedux/action';
import Fonts from '../../themers/Fonts';
const window = Dimensions.get('window');
import moment from 'moment';

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
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
          this.props.onGetAllVouchers(this.state.token);
        });
      }
    } catch (error) {
      // alert(error);
    }
  };

  backMainScreen = () => {
    Navigation.dismissModal(this.props.componentId);
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
              {t('ma_giam_gia')}
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

  renderBody = () => {
    const dataVouchers = this.props.vouchers.dataAllVouchers;
    console.log(dataVouchers.length);
    if (dataVouchers.length === 0) {
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
              {t('khong_co_ma')}
            </Text>
          </View>
        </View>
      );
    }

    if (dataVouchers.length < 0) {
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
              {t('loading')}
            </Text>
          </View>
        </View>
      );
    }

    const arrDataVouchers = Object.keys(dataVouchers).map(key => {
      dataVouchers[key].id = key;
      return dataVouchers[key];
    });

    return <ScrollView>{this.renderListVouchers(arrDataVouchers)}</ScrollView>;
  };

  renderListVouchers = arrDataVouchers => {
    return (
      <View
        style={{
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          backgroundColor: 'white',
          flex: 1,
        }}>
        <FlatList
          data={arrDataVouchers}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={this.ItemSeparatorComponent}
        />
      </View>
    );
  };

  renderItem = ({item}) => {
    console.log(item);
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
          <TouchableOpacity onPress={() => this.onPress()}>
            <Image
              source={Logo}
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
          <TouchableOpacity onPress={() => this.onPress()}>
            <View>
              <Text
                style={{color: '#5a5555', fontWeight: 'bold', fontSize: 18}}>
                {t('ma_giam_gia_title')}
              </Text>

              <Text style={{color: 'gray', fontSize: 18, color: 'red'}}>
                {item.voucher_name}
              </Text>

              <View style={{flexDirection: 'row', marginTop: 5}}>
                <Text style={{fontWeight: 'bold', fontSize: 16}}>
                  {t('so_tien_giam')}
                </Text>

                <Text style={{marginLeft: 7, fontWeight: 'bold', fontSize: 16}}>
                  {item.price} đ
                </Text>
              </View>
              <Text style={{marginTop: 7, color: 'gray', fontWeight: 'bold'}}>
                {/* {item.created_at} */}
                {moment(item.created_at).calendar()}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

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
          <TouchableOpacity onPress={() => this.onApply(item.voucher_name)}>
            <Text style={{color: 'white', fontWeight: 'bold', marginRight: 5}}>
              {t('ap_dung')}
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  };

  onApply = voucher_name => {
    alert('Đã copy');
    Clipboard.setString(voucher_name);
  };

  render() {
    return (
      <View style={{flex: 1}}>
        {this.renderHeader()}
        {this.renderBody()}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    vouchers: state.vouchers,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onGetAllVouchers: token => {
      dispatch(getAllVouchers(token));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
