import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import CardIcon from 'react-native-vector-icons/AntDesign';
import Loading from '../../screens/Loading';
import Fonts from '../../themers/Fonts';
import {Navigation} from 'react-native-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Logo from '../../../assets/images/logo.png';
import Service from './detail_child/Service';
import Information from './detail_child/Information';
import Comment from './detail_child/Comment';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';
import ScrollableTabView from 'rn-collapsing-tab-bar';
const {height} = Dimensions.get('window');
import {storageGet} from '../../checkAsyncStorage';
import {getStoreDetail} from '../../redux/storeRedux/action';
import {getAllComments} from '../../redux/commentRedux/action';
import Colors from '../../themers/Colors';

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      status: '',
      timeNow: '',
    };
  }

  backMainScreen = () => {
    Navigation.dismissModal(this.props.componentId);
  };

  componentDidMount() {
    this.onGetUserData();
    this.getCurrentTime();
  }

  getCurrentTime = () => {
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    this.setState({timeNow: hours + ':' + min + ':' + sec}, () => {
      this.compareTime();
    });
  };

  compareTime = () => {
    const {detailStore} = this.props.stores;

    const {open_time, close_time} = detailStore;
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
    const dataServices = this.props.orders.cartItems;
    if (dataServices.length > 0) {
      var totalPrice = dataServices.reduce(function(prev, cur) {
        return prev + parseInt(cur.price);
      }, 0);
    }
    return totalPrice;
  };

  renderLoading = () => {
    return (
      <View style={styles.viewLoading}>
        <Loading />
      </View>
    );
  };

  renderStoreImage = detailStore => {
    return (
      <View style={styles.viewImage}>
        <ImageBackground
          source={{uri: detailStore.image}}
          style={styles.ImageBackground}>
          <View style={styles.iconBack}>
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
            <View style={styles.viewLogo}>
              <Image style={styles.logo} source={Logo} />
            </View>
          ) : (
            <View style={styles.viewCart}>
              <TouchableOpacity onPress={() => this.changeShopping()}>
                <View style={styles.cart}>
                  <Text style={styles.cartLength}>
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
    );
  };

  renderInforData = (detailStore, dataServices) => {
    let star = [];
    for (let i = 0; i < detailStore.rank; i++) {
      star.push(<Icon name="star" size={20} color="white" />);
    }
    for (let i = 0; i < 5 - detailStore.rank; i++) {
      star.push(<Icon name="star" size={20} color="#c3c1c1" />);
    }

    return (
      <ScrollView style={styles.ScrollView}>
        <LinearGradient
          colors={[Colors.pink, Colors.orrange, Colors.orrange, Colors.orrange]}
          style={styles.liner}>
          <View style={styles.viewStoreName}>
            <Text style={styles.txtStoreName}>{detailStore.store_name}</Text>
            <View style={{flexDirection: 'row'}}>{star}</View>
          </View>

          <View style={styles.viewStoreInfor}>
            <View style={styles.viewAddress}>
              <Entypo name="location-pin" size={25} color="white" />
              <Text style={styles.address}>{detailStore.address}</Text>
            </View>

            <View style={styles.viewTime}>
              <Entypo
                name="back-in-time"
                size={20}
                color="white"
                onPress={() => this.backMainScreen()}
              />
              <Text style={styles.status}>{this.state.status}</Text>
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
    );
  };

  renderPrice = () => {
    return (
      <>
        {this.props.orders.cartItems.length <= 0 ? null : (
          <View style={styles.viewFooter}>
            <View style={styles.viewTotal}>
              <Text style={styles.txtTotal}>
                Tổng cộng: {this.sumTotalPrice()} đ
              </Text>
            </View>
            <View style={styles.viewButton}>
              <TouchableOpacity onPress={this.changeShopping}>
                <Text style={styles.textButton}>Đặt ngay</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </>
    );
  };

  render() {
    const {detailStore} = this.props.stores;
    const dataServices = detailStore.services;

    if (detailStore.length <= 0) {
      return this.renderLoading();
    }
    return (
      <View style={styles.viewBody}>
        {this.renderStoreImage(detailStore)}
        {this.renderInforData(detailStore, dataServices)}
        {this.renderPrice()}
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.error,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingVertical: 20,
  },
  cartLength: {
    color: 'white',
    fontWeight: 'bold',
  },
  viewLoading: {
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  tabbar: {
    flex: 1,
    paddingHorizontal: 10,
  },
  viewBody: {
    flex: 1,
    backgroundColor: Colors.orrange,
  },
  viewImage: {
    flexDirection: 'row',
    height: height / 3,
  },
  ImageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    flexDirection: 'row',
    height: height / 3,
  },
  iconBack: {
    flex: 1,
    padding: 10,
    margin: 10,
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderRadius: 50,
    alignItems: 'center',
    maxHeight: 45,
    maxWidth: 45,
  },
  viewLogo: {
    justifyContent: 'center',
    alignContent: 'flex-end',
    marginTop: 5,
    alignItems: 'center',
    paddingRight: 10,
    paddingTop: 7,
    marginRight: 5,
    width: 50,
    height: 50,
  },
  logo: {
    width: 50,
    height: 50,
  },
  viewCart: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: Colors.blue,
    paddingRight: 10,
    paddingTop: 7,
    marginRight: 5,
    width: 50,
    height: 50,
  },
  cart: {
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
  },
  viewFooter: {
    marginHorizontal: 10,
    padding: 10,
    flexDirection: 'row',
    backgroundColor: Colors.orrange,
  },
  viewTotal: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  txtTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  viewButton: {
    alignItems: 'flex-end',
  },
  textButton: {
    borderRadius: 20,
    fontSize: 15,
    fontWeight: 'bold',
    padding: 12,
    paddingHorizontal: 30,
    textAlign: 'center',
    backgroundColor: '#FCB1B6',
    color: 'black',
  },
  liner: {
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingVertical: 20,
  },
  viewStoreName: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtStoreName: {
    fontSize: 30,
    color: 'black',
    fontFamily: Fonts.serif,
  },
  viewStoreInfor: {
    marginHorizontal: 20,
    justifyContent: 'center',
    marginVertical: 10,
  },
  viewAddress: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  address: {
    marginHorizontal: 18,
    fontSize: 20,
    color: 'black',
    fontFamily: Fonts.serif,
  },
  viewTime: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  status: {
    fontSize: 20,
    marginHorizontal: 20,
    color: 'white',
    fontFamily: Fonts.serif,
  },
  ScrollView: {
    marginTop: -30,
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
