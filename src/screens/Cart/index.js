import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import LinearGradient from 'react-native-linear-gradient';
import {t} from '../../i18n/t';
import Icon from 'react-native-vector-icons/FontAwesome';
import Logo from '../../../assets/images/logo.png';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fonts from '../../themers/Fonts';
import {storageGet} from '../../checkAsyncStorage';
import {connect} from 'react-redux';
import {getStoreDetail} from '../../redux/storeRedux/action';
import {deleteCart} from '../../redux/orderRedux/action';
import Colors from '../../themers/Colors';
import ModalComponent from '../../components/Modal';

class index extends Component {
  constructor(props) {
    super(props);
    this.dataRef = React.createRef();
    this.state = {
      userData: null,
      total: 0,
      token: '',
      modalVisible: false,
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
          {userData: parsedUser.data, token: parsedUser.data.token},
          () => {
            this.props.onGetStoreDetail(
              this.props.orders.store_id,
              this.state.token,
            );
          },
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  onContinued = (userData, dataCarts, total) => {
    const carts = this.props.orders.cartItems;
    if (carts.length <= 0) {
      this.setState({
        modalVisible: !this.state.modalVisible,
      });
    } else {
      this.onChangeBooking(userData, dataCarts, total);
    }
  };

  onChangeBooking = (userData, dataCarts, total) => {
    Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              name: 'Booking',
              passProps: {
                userData,
                dataCarts,
                total,
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

  getAvatarDefault = user_name => {
    var getUpperCase = user_name.replace(/[a-z]/g, '');
    let removeSpace = getUpperCase.split(' ').join('');
    var getLastLetters = removeSpace.slice(-2);
    return getLastLetters;
  };

  ItemSeparatorComponent = () => {
    return <View style={styles.separator} />;
  };

  renderItem = ({item}) => {
    return (
      <LinearGradient
        colors={['#fdf6f6', 'white']}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0}}
        style={styles.viewItem}>
        <View style={styles.viewImage}>
          <Image source={{uri: item.image}} style={styles.image} />
        </View>
        <View style={styles.viewInforItem}>
          <Text style={styles.service_name}>{item.service_name}</Text>

          <View style={styles.viewPrice}>
            <Text style={styles.priceItem}>{item.price}</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => this.onDeleteCart(item.service_id)}
          style={styles.btnDelete}>
          <AntDesign name="minuscircleo" color="green" size={18} />
        </TouchableOpacity>
      </LinearGradient>
    );
  };

  backMainScreen = () => {
    Navigation.dismissModal(this.props.componentId);
  };

  onDeleteCart = service_id => {
    this.props.onDeleteCartItem(service_id);
  };

  renderHeader = () => {
    return (
      <LinearGradient colors={[Colors.pink, Colors.pink, Colors.orrange]}>
        <View style={styles.viewHeader}>
          <View style={styles.viewIconBack}>
            <Icon
              name="chevron-left"
              size={25}
              color="black"
              onPress={() => this.backMainScreen()}
            />
          </View>

          <View style={styles.viewTitle}>
            <Text style={styles.title}>{t('gio_hang_cua_ban')}</Text>
          </View>

          <View style={styles.viewLogo}>
            <Image style={styles.logo} source={Logo} />
          </View>
        </View>
      </LinearGradient>
    );
  };

  renderDataUser = () => {
    const userData = this.state.userData;

    if (userData != null) {
      return (
        <View style={styles.viewUserData}>
          <View style={styles.viewProfile}>
            {userData.user.avatar && (
              <Image
                style={styles.imageProfile}
                source={{uri: userData.user.avatar}}
              />
            )}

            {!userData.user.avatar && (
              <View style={styles.viewDefaultAvatar}>
                {userData.user.user_name && (
                  <Text style={styles.txtAvatar}>
                    {this.getAvatarDefault(userData.user.user_name)}
                  </Text>
                )}
              </View>
            )}
          </View>

          <View style={styles.viewUserName}>
            <Text
              style={{
                ...styles.txtName,
                ...{fontWeight: 'bold'},
              }}>
              {userData.user.user_name}
            </Text>
            <Text
              style={{
                ...styles.txtName,
                ...{marginHorizontal: 5},
              }}>
              (bạn)
            </Text>
          </View>
        </View>
      );
    }
    return null;
  };

  renderStoreData = () => {
    const storeData = this.props.stores.detailStore;

    if (storeData != '') {
      return (
        <View style={styles.viewStoreData}>
          <View style={styles.viewStoreDataContainer}>
            <Text style={styles.store_name}>{storeData.store_name}</Text>

            <Text style={styles.address}>{storeData.address}</Text>
          </View>
        </View>
      );
    }
    return null;
  };

  renderListCarts = () => {
    const dataCarts = this.props.orders.cartItems;
    if (dataCarts.length > 0) {
      return (
        <View style={styles.FlatList}>
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
      <View style={styles.viewNodata}>
        <Text style={styles.txtNodata}>{t('khong_co_du_lieu')}</Text>
      </View>
    );
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

  onCancel = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
    });
  };

  renderModal = () => {
    const {modalVisible} = this.state;
    return (
      <>
        <ModalComponent
          modalVisible={modalVisible}
          onCancel={this.onCancel}
          onConfirm={this.backMainScreen}
          message={t('notify_null_cart')}
          txtBackButton={t('txt_understand')}
          txtConfirmButton={t('back')}
          height={220}
        />
      </>
    );
  };

  renderTotalPrice = dataServices => {
    return (
      <View style={styles.viewTotalPrice}>
        <View style={styles.viewTextTotal}>
          <Text style={styles.titleTotal}>{t('tong_tien')}</Text>
        </View>
        <View style={styles.viewtextPrice}>
          {dataServices.length > 0 ? (
            <Text style={styles.price}> {this.sumTotalPrice()} đ</Text>
          ) : null}
        </View>
      </View>
    );
  };

  renderButton = (userData, dataCarts) => {
    return (
      <LinearGradient
        colors={[Colors.pink, Colors.orrange]}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0}}
        style={styles.viewListService}>
        <TouchableOpacity
          onPress={() =>
            this.onContinued(userData, dataCarts, this.sumTotalPrice())
          }>
          <Text style={styles.txtBtn}>Tiếp tục</Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  };

  render() {
    const userData = this.state.userData;
    const dataServices = this.props.orders.cartItems;
    const dataCarts = this.props.orders.cartItems;

    return (
      <View style={styles.container}>
        {this.renderHeader()}

        <ScrollView>
          {this.renderStoreData()}
          {this.renderDataUser()}
          {this.renderListCarts()}
        </ScrollView>

        {this.renderTotalPrice(dataServices)}
        {this.renderButton(userData, dataCarts)}
        {this.renderModal()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewTotalPrice: {
    paddingVertical: 15,
    borderTopWidth: 2,
    borderTopColor: '#eaeaea',
    flexDirection: 'row',
  },
  viewTextTotal: {
    flex: 1,
    marginHorizontal: 13,
  },
  viewtextPrice: {
    alignItems: 'flex-end',
    marginHorizontal: 14,
  },
  titleTotal: {
    fontSize: 17,
  },
  price: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  viewListService: {
    paddingVertical: 10,
    paddingHorizontal: 110,
    borderRadius: 5,
    marginHorizontal: 10,
    justifyContent: 'center',
  },
  txtBtn: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    fontFamily: Fonts.serif,
  },
  separator: {
    height: 10,
  },
  viewUserData: {
    backgroundColor: 'white',
    padding: 12,
    flexDirection: 'row',
    borderBottomWidth: 5,
    borderBottomColor: '#eaeaea',
  },
  viewStoreData: {
    backgroundColor: 'white',
    padding: 10,
    flexDirection: 'row',
    borderBottomWidth: 10,
    borderBottomColor: '#eaeaea',
    borderTopWidth: 10,
    borderTopColor: '#eaeaea',
  },
  viewProfile: {
    marginHorizontal: 10,
    justifyContent: 'center',
    alignContent: 'center',
  },
  imageProfile: {
    width: 45,
    height: 45,
    borderRadius: 30,
  },
  viewDefaultAvatar: {
    width: 45,
    height: 45,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.darkGray,
  },
  txtAvatar: {
    fontSize: 25,
    color: 'white',
  },
  viewUserName: {
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  txtName: {
    fontSize: 17,
    fontFamily: Fonts.serif,
  },
  viewHeader: {
    flexDirection: 'row',
    padding: 5,
    height: 80,
  },
  viewIconBack: {
    flex: 1,
    padding: 10,
    margin: 10,
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 50,
    alignItems: 'center',
    maxHeight: 45,
    maxWidth: 45,
  },
  viewTitle: {
    flex: 6,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
  viewLogo: {
    alignItems: 'flex-end',
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: -5,
  },
  logo: {
    width: 50,
    height: 50,
  },
  viewStoreDataContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  store_name: {
    color: '#5a5555',
    fontWeight: 'bold',
    fontSize: 18,
  },
  address: {
    color: '#ababab',
    fontWeight: 'bold',
    marginTop: 7,
  },
  FlatList: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: 'white',
    flex: 1,
  },
  viewNodata: {
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  txtNodata: {
    fontSize: 20,
    color: 'gray',
    fontFamily: Fonts.serif,
  },
  viewItem: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    borderRadius: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#eaeaea',
  },
  viewImage: {
    width: 100,
    height: 90,
  },
  image: {
    width: '100%',
    height: '100%',
    borderWidth: 5,
    borderColor: 'white',
    borderRadius: 10,
  },
  btnDelete: {
    width: 30,
    height: 30,
    backgroundColor: 'white',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewInforItem: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  service_name: {
    color: '#5a5555',
    fontWeight: 'bold',
    fontSize: 17,
    fontFamily: Fonts.serif,
    textTransform: 'capitalize',
  },
  viewPrice: {
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 50,
    flexDirection: 'row',
    marginTop: 10,
  },
  priceItem: {
    color: 'green',
    fontWeight: 'bold',
  },
});

const mapStateToProps = state => {
  return {
    stores: state.stores,
    orders: state.orders,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onGetStoreDetail: (storeId, token) => {
      dispatch(getStoreDetail(storeId, token));
    },
    onDeleteCartItem: id => {
      dispatch(deleteCart(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
