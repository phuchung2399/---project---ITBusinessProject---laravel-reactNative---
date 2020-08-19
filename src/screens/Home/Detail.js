import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Image,
} from 'react-native';
import CardIcon from 'react-native-vector-icons/AntDesign';

import Fonts from '../../themers/Fonts';
import {Navigation} from 'react-native-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import ImageDemo from '../../../assets/images/imagedemo.jpg';
import Logo from '../../../assets/images/logo.png';
import Service from './detail_child/Service';
import Information from './detail_child/Information';
import Comment from './detail_child/Comment';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';
import ScrollableTabView from 'rn-collapsing-tab-bar';
const {width, height} = Dimensions.get('window');
import {storageRemove, storageGet} from '../../checkAsyncStorage';
import {getStoreDetail, getStoreServices} from '../../redux/storeRedux/action';
import {getAllComments} from '../../redux/commentRedux/action';
import CartComponent from '../../components/CartComponent';

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
    };
  }

  backMainScreen = () => {
    Navigation.dismissModal(this.props.componentId);
  };

  componentDidMount() {
    this.onGetUserData();
  }

  onGetUserData = async () => {
    try {
      let getUserAccount = await storageGet('user');
      let parsedUser = JSON.parse(getUserAccount);
      if (parsedUser) {
        this.setState({token: parsedUser.data.token}, () => {
          this.props.onGetStoreDetail(this.props.store_id, this.state.token);
          this.props.onGetAllComment(this.props.store_id, this.state.token);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  changeShopping = (idbasket, token) => {
    Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              name: 'Cart',
              passProps: {
                // token: token,
                // idbasket: idbasket,
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

  render() {
    const {detailStore} = this.props.stores;
    const dataServices = detailStore.services;
    console.log('orders', this.props.orders);

    let star = [];
    for (let i = 0; i < detailStore.rank; i++) {
      star.push(<Icon name="star" size={20} color="white" />);
    }
    for (let i = 0; i < 5 - detailStore.rank; i++) {
      star.push(<Icon name="star" size={20} color="#c3c1c1" />);
    }

    return (
      <View style={{flex: 1, backgroundColor: '#F99A7C'}}>
        <View
          style={{
            // padding: 10,
            flexDirection: 'row',
            height: height / 3,
          }}>
          <ImageBackground
            // source={{uri: detailStore.image}}
            source={ImageDemo}
            style={{
              flex: 1,
              resizeMode: 'cover',
              justifyContent: 'center',
              flexDirection: 'row',
              height: height / 3,
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
                flex: 1,
              }}
            />

            {this.props.orders.cartItems.length <= 0 ? (
              <View
                style={{
                  justifyContent: 'center',
                  alignContent: 'flex-end',
                  marginTop: 5,
                  alignItems: 'center',
                  paddingRight: 10,
                  paddingTop: 7,
                  marginRight: 5,
                  width: 50,
                  height: 50,
                }}>
                <Image
                  style={{
                    width: 50,
                    height: 50,
                  }}
                  source={Logo}
                />
              </View>
            ) : (
              <View
                style={{
                  margin: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'white',
                  borderRadius: 50,
                  borderWidth: 2,
                  borderColor: '#7adaf7',
                  paddingRight: 10,
                  paddingTop: 7,
                  marginRight: 5,
                  width: 50,
                  height: 50,
                }}>
                <TouchableOpacity onPress={() => this.changeShopping()}>
                  <View
                    style={{
                      position: 'absolute',
                      height: 20,
                      width: 20,
                      borderRadius: 15,
                      backgroundColor: 'rgba(95,197,123,0.8)',
                      right: -5,
                      bottom: 20,
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 2000,
                    }}>
                    <Text style={{color: 'white', fontWeight: 'bold'}}>
                      {this.props.orders.cartItems.length}
                    </Text>
                  </View>

                  <CardIcon
                    name="shoppingcart"
                    size={35}
                    color="#7adaf7"
                    onPress={() => this.changeShopping()}
                  />
                </TouchableOpacity>
              </View>
            )}
          </ImageBackground>
        </View>

        <ScrollView style={{marginTop: -30}}>
          <LinearGradient
            colors={['#f75799', '#F99A7C', '#F99A7C', '#F99A7C']}
            style={{
              // flex: 1,
              backgroundColor: 'red',
              borderTopLeftRadius: 35,
              borderTopRightRadius: 35,
              paddingVertical: 20,
            }}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: 30,
                  color: 'black',
                  fontFamily: Fonts.serif,
                }}>
                {detailStore.store_name}
              </Text>
              <View style={{flexDirection: 'row'}}>{star}</View>
            </View>

            <View
              style={{
                marginHorizontal: 20,
                marginVertical: 10,
              }}>
              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Entypo
                  name="location-pin"
                  size={25}
                  color="white"
                  onPress={() => this.backMainScreen()}
                />
                <Text
                  style={{
                    marginHorizontal: 20,
                    fontSize: 20,
                    color: 'black',
                    fontFamily: Fonts.serif,
                  }}>
                  {detailStore.address}
                </Text>
              </View>

              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Entypo
                  name="back-in-time"
                  size={20}
                  color="white"
                  onPress={() => this.backMainScreen()}
                />
                <Text
                  style={{
                    fontSize: 20,
                    marginHorizontal: 20,
                    color: 'black',
                    fontFamily: Fonts.serif,
                  }}>
                  8:00 - 20:00
                </Text>
              </View>
            </View>

            <View style={styles.tabbar}>
              <ScrollableTabView
                initialPage={0}
                tabBarActiveTextColor="white"
                tabBarUnderlineStyle="white"
                tabBarInactiveTextColor="black"
                tabBarTextStyle={{fontFamily: 'Roboto', fontSize: 20}}
                borderRadius="20">
                <Service
                  tabLabel="Dịch vụ"
                  props={this.props}
                  services={dataServices}
                  store_id={detailStore.store_id}
                />
                <Comment
                  tabLabel=" Bình luận"
                  props={this.props}
                  store_id={detailStore.store_id}
                />
                <Information
                  tabLabel="Thông tin"
                  props={this.props}
                  detailStore={detailStore}
                />
              </ScrollableTabView>
            </View>
          </LinearGradient>
        </ScrollView>

        {this.props.orders.cartItems.length <= 0 ? null : (
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
              <TouchableWithoutFeedback onPress={this.changeShopping}>
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
        )}
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingVertical: 20,
  },

  tabbar: {
    flex: 1,
    // marginTop: width * 0.1,
    paddingHorizontal: 10,
  },
});

const mapStateToProps = state => {
  return {
    stores: state.stores,
    comments: state.comments,
    orders: state.orders,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onGetStoreDetail: (storeId, token) => {
      dispatch(getStoreDetail(storeId, token));
    },
    onGetAllComment: (storeId, token) => {
      dispatch(getAllComments(storeId, token));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
