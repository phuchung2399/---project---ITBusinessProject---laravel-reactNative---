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
  TouchableWithoutFeedback,
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
import {storageGet} from '../../checkAsyncStorage';
import {connect} from 'react-redux';
import {getStoreDetail} from '../../redux/storeRedux/action';

var data = [
  {
    name: 'Mong tay thiet ke tinh xao',
    image: 'https://saida-nails.de/images/content/studio5.jpg',
    rating: 3,
    price: '12.000 đ',
  },
  {
    name: 'Mong tay thiet ke tinh xao',
    image: 'https://saida-nails.de/images/content/studio5.jpg',
    rating: 5,
    price: '12.000 đ',
  },
];

class index extends Component {
  constructor(props) {
    super(props);
    this.dataRef = React.createRef();
    this.state = {
      dataCartitems: [],
      userData: null,
      total: 0,
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
      // console.log(parsedUser.data);
      if (parsedUser) {
        this.setState(
          {userData: parsedUser.data, token: parsedUser.data.token},
          () => {
            this.props.onGetStoreDetail(this.props.store_id, this.state.token);
          },
        );
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

  onContinued = (arrayServicesSelected, store_id, userData) => {
    Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              name: 'Booking',
              passProps: {
                arrayServicesSelected,
                store_id,
                userData,
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

  ItemSeparatorComponent = () => {
    return (
      <View
        style={{
          height: 10,
        }}
      />
    );
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
          <Image
            source={{uri: item.image}}
            style={{
              width: '100%',
              height: '100%',
              borderWidth: 5,
              borderColor: 'white',
              borderRadius: 10,
            }}
          />
        </View>
        <View
          style={{flex: 1, justifyContent: 'center', paddingHorizontal: 10}}>
          <Text
            style={{
              color: '#5a5555',
              fontWeight: 'bold',
              fontSize: 17,
              fontFamily: Fonts.serif,
              textTransform: 'capitalize',
            }}>
            {item.service_name}
          </Text>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <View
              style={{
                backgroundColor: 'white',
                paddingVertical: 5,
                paddingHorizontal: 15,
                borderRadius: 50,
              }}>
              <Text style={{color: 'green', fontWeight: 'bold'}}>
                {item.price}
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={() =>
            this.props.props.navigation.navigate('DetailScreen', {
              image: item.image,
              price: item.price,
              name: item.name,
            })
          }
          style={{
            width: 30,
            height: 30,
            backgroundColor: 'white',
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <AntDesign name="arrowright" color="green" size={15} />
        </TouchableOpacity>
      </LinearGradient>
    );
  };

  backMainScreen = () => {
    Navigation.dismissModal(this.props.componentId);
  };

  renderDataUser = () => {
    const userData = this.state.userData;

    if (userData != null) {
      return (
        <View
          style={{
            backgroundColor: 'white',
            padding: 12,
            flexDirection: 'row',
            borderBottomWidth: 5,
            borderBottomColor: '#eaeaea',
          }}>
          <View
            style={{
              marginHorizontal: 10,
              justifyContent: 'center',
              alignContent: 'center',
            }}>
            <Image
              style={{
                width: 45,
                height: 45,
                borderRadius: 30,
              }}
              source={{uri: userData.user.avatar}}
              // source={Logo}
            />
          </View>
          <View
            style={{
              marginHorizontal: 10,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 17,
                fontFamily: Fonts.serif,
              }}>
              {userData.user.user_name}
            </Text>
            <Text
              style={{
                fontSize: 17,
                marginHorizontal: 5,
                fontFamily: Fonts.serif,
              }}>
              (bạn)
            </Text>
          </View>
        </View>
      );
    }
    return null;
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
                fontSize: 25,
                fontWeight: 'bold',
                color: 'white',
              }}>
              {t('gio_hang_cua_ban')}
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

  renderStoreData = () => {
    const storeData = this.props.stores.detailStore;

    if (storeData != '') {
      return (
        <View
          style={{
            backgroundColor: 'white',
            padding: 10,
            flexDirection: 'row',
            borderBottomWidth: 10,
            borderBottomColor: '#eaeaea',
            borderTopWidth: 10,
            borderTopColor: '#eaeaea',
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              paddingHorizontal: 10,
            }}>
            <Text style={{color: '#5a5555', fontWeight: 'bold', fontSize: 18}}>
              {storeData.store_name}
            </Text>
            <View style={{flexDirection: 'row', marginTop: 6}}>
              <Text style={{color: '#ababab', fontWeight: 'bold'}}>
                {storeData.address}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() =>
              this.props.props.navigation.navigate('DetailScreen', {})
            }
            style={{
              width: 30,
              height: 30,
              backgroundColor: 'white',
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <AntDesign name="arrowright" color="green" size={15} />
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  };

  renderListCarts = () => {
    const dataCarts = this.props.arrayServicesSelected;
    console.log(dataCarts);
    if (dataCarts.length > 0) {
      return (
        <View
          style={{
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            backgroundColor: 'white',
            flex: 1,
          }}>
          <FlatList
            data={dataCarts}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={this.ItemSeparatorComponent}
          />
        </View>
      );
    }
    return (
      <View
        style={{
          padding: 12,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 50,
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
    );
  };

  render() {
    const {arrayServicesSelected, store_id} = this.props;
    const userData = this.state.userData;

    return (
      <View style={{flex: 1}}>
        {this.renderHeader()}
        <ScrollView>
          {this.renderStoreData()}
          {this.renderDataUser()}
          {this.renderListCarts()}
        </ScrollView>

        <View
          style={{
            paddingVertical: 15,
            borderTopWidth: 2,
            borderTopColor: '#eaeaea',
            flexDirection: 'row',
          }}>
          <View style={{flex: 1, marginHorizontal: 13}}>
            <Text style={{fontSize: 17}}>{t('tong_tien')}</Text>
          </View>
          <View style={{alignItems: 'flex-end', marginHorizontal: 14}}>
            <Text style={{fontWeight: 'bold', fontSize: 17}}>20.000 d</Text>
          </View>
        </View>

        <LinearGradient
          colors={['#e511e8', '#F99A7C']}
          start={{x: 0, y: 1}}
          end={{x: 1, y: 0}}
          style={{
            paddingVertical: 10,
            paddingHorizontal: 110,
            borderRadius: 5,
            marginHorizontal: 10,
            justifyContent: 'center',
          }}>
          <TouchableWithoutFeedback
            onPress={() =>
              this.onContinued(arrayServicesSelected, store_id, userData)
            }>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: 'white',
                textAlign: 'center',
                fontFamily: Fonts.serif,
              }}>
              Tiếp tục
            </Text>
          </TouchableWithoutFeedback>
        </LinearGradient>
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
    stores: state.stores,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onGetStoreDetail: (storeId, token) => {
      dispatch(getStoreDetail(storeId, token));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
