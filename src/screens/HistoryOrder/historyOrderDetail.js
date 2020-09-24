import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import LinearGradient from 'react-native-linear-gradient';
import {t} from '../../i18n/t';
import Icon from 'react-native-vector-icons/FontAwesome';
import Success from 'react-native-vector-icons/AntDesign';
import Logo from '../../../assets/images/logo.png';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Colors from '../../themers/Colors';
import Fonts from '../../themers/Fonts';
import {connect} from 'react-redux';
import {getOrderDetail, cancelOrder} from '../../redux/orderRedux/action';
import {storageGet} from '../../checkAsyncStorage';
import Loading from '../Loading';
import {
  addCart,
  addStoreId,
  deleteAllCarts,
  deleteStoreId,
} from '../../redux/orderRedux/action';
import ModalComponent from '../../components/Modal';
import {formatPrice} from '../../formatPrice';

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

  backMainScreen = () => {
    Navigation.dismissModal(this.props.componentId);
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

  ItemSeparatorComponent = () => {
    return <View style={styles.seperator} />;
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

          <View style={styles.viewTitleHeader}>
            <Text style={styles.txtHeader}>{t('don_hang_cua_ban')}</Text>
          </View>
          <View style={styles.viewLogo}>
            <Image style={styles.logo} source={Logo} />
          </View>
        </View>
      </LinearGradient>
    );
  };

  renderStatusIcon = dataOrderDetail => {
    console.log(dataOrderDetail.status[0].massage);
    if (dataOrderDetail.status[0].massage === 'Đơn đang chờ xác nhận') {
      return <Success name="hourglass" size={40} color={Colors.successful} />;
    } else if (dataOrderDetail.status[0].massage === 'Đã hủy') {
      return (
        <Success name="minuscircleo" size={40} color={Colors.successful} />
      );
    } else if (dataOrderDetail.status[0].massage === 'Đơn bị từ chối') {
      return (
        <Success name="minuscircleo" size={40} color={Colors.successful} />
      );
    } else {
      return (
        <Success name="checkcircleo" size={40} color={Colors.successful} />
      );
    }
  };

  renderStatus = dataOrderDetail => {
    return (
      <Text style={styles.status}>{dataOrderDetail.status[0].massage}</Text>
    );
  };

  onCloseDeleteCart = () => {
    this.setState({
      modalDeleteCart: !this.state.modalDeleteCart,
    });
  };

  renderNotifyExistItems = () => {
    const {modalDeleteCart} = this.state;

    return (
      <>
        <ModalComponent
          modalVisible={modalDeleteCart}
          message={t('messageExistItems')}
          onCancel={this.onCloseDeleteCart}
          onConfirm={this.onDeleteCartItems}
          txtBackButton={t('txt_understand')}
          txtConfirmButton={t('txt_cancel')}
          height={240}
        />
      </>
    );
  };

  onCloseCancelOrder = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
    });
  };

  renderNotifyCancelOrder = () => {
    const {modalVisible} = this.state;
    return (
      <>
        <ModalComponent
          modalVisible={modalVisible}
          message={t('message_cancel_order')}
          onCancel={this.onCloseCancelOrder}
          onConfirm={this.onConfirm}
          txtBackButton={t('txt_back')}
          txtConfirmButton={t('txt_cancel')}
          height={200}
        />
      </>
    );
  };

  onCloseReOrder = () => {
    this.setState({
      modalReorder: !this.state.modalReorder,
    });
  };

  renderNotifyReOrder = () => {
    const {modalReorder} = this.state;

    return (
      <>
        <ModalComponent
          modalVisible={modalReorder}
          message={t('message_sure_order')}
          onCancel={this.onCloseReOrder}
          onConfirm={this.onConfirmReorder}
          txtBackButton={t('txt_back')}
          txtConfirmButton={t('txt_confirm')}
          height={200}
        />
      </>
    );
  };

  renderItem = ({item}) => {
    return (
      <View style={styles.containerItems}>
        <View style={styles.container}>
          <Image source={{uri: item.image}} style={styles.image} />
        </View>

        <View>
          <Text style={styles.item_name}>
            {item.service_name.substring(0, 30)}
          </Text>
          <Text style={styles.price}>
            {formatPrice(item.price, ',', '.')} đ
          </Text>
        </View>
      </View>
    );
  };

  renderButton = dataOrderDetail => {
    return (
      <View style={styles.viewButton}>
        {dataOrderDetail.status[0].massage === 'Đơn đang chờ xác nhận' ? (
          <LinearGradient
            colors={[Colors.red, Colors.orrange]}
            start={{x: 0, y: 1}}
            end={{x: 1, y: 0}}
            style={styles.button}>
            <TouchableOpacity onPress={this.onCancelOrder}>
              <Text style={styles.txtBtn}>{t('huy_don')}</Text>
            </TouchableOpacity>
          </LinearGradient>
        ) : (
          <LinearGradient
            colors={[Colors.blueDark, Colors.blueWhite]}
            start={{x: 0, y: 1}}
            end={{x: 1, y: 0}}
            style={styles.button}>
            <TouchableOpacity onPress={() => this.onReOrder()}>
              <Text style={styles.txtBtn}>{t('dat_lai')}</Text>
            </TouchableOpacity>
          </LinearGradient>
        )}
      </View>
    );
  };

  renderDataOrder = dataOrderDetail => {
    return (
      <View style={styles.containerDataOrder}>
        <View style={styles.viewOrder}>
          <Text style={styles.titleDataOrder}>{t('ma_don_hang')}</Text>
          <Text style={styles.resultDataOrder} numberOfLines={1}>
            {dataOrderDetail.order_id.substring(0, 30)}
          </Text>
        </View>

        <View style={styles.viewOrder}>
          <Text style={styles.titleDataOrder}>{t('dat_hang_luc')}</Text>
          <Text style={styles.resultDataOrder}>
            {dataOrderDetail.order_time} {dataOrderDetail.order_day}
          </Text>
        </View>

        <View style={styles.viewOrder}>
          <Text style={styles.titleDataOrder}>{t('tong_tien_d')}</Text>
          <Text style={styles.resultDataOrder}>{dataOrderDetail.total}  đ</Text>
        </View>

        <View style={styles.viewOrder}>
          <Text style={styles.titleDataOrder}>{t('gia_giam')}</Text>
          <Text
            style={{
              ...styles.resultDataOrder,
              ...{
                color: Colors.red,
                textDecorationLine: 'line-through',
              },
            }}>
            {this.sumTotalPrice() - dataOrderDetail.total} đ
          </Text>
        </View>
      </View>
    );
  };

  renderInforStore = dataOrderDetail => {
    return (
      <View style={styles.viewInfor}>
        <View style={styles.viewDashline}>
          <Icon name="dot-circle-o" size={18} color="blue" />
          <View style={styles.dashLine} />
          <View style={styles.dashLine} />
          <View style={styles.dashLine} />
          <View style={styles.dashLine} />
          <View style={styles.dashLine} />
          <View style={styles.dashLine} />
        </View>

        <View style={styles.infor}>
          <Text style={styles.titleName}>
            {dataOrderDetail.store.store_name}
          </Text>
          <Text style={styles.txtInfor}>{dataOrderDetail.store.address}</Text>

          <View style={styles.row}>
            <Text style={styles.txtInfor}>{t('phone_title')}</Text>
            <Text
              style={{
                ...styles.txtInfor,
                ...{marginLeft: 10},
              }}>
              {dataOrderDetail.store.phone}
            </Text>
          </View>
        </View>

        <View style={{...{alignContent: 'flex-end'}, ...styles.row}}>
          <TouchableWithoutFeedback
            onPress={() =>
              this.onNavigateStore(dataOrderDetail.store.store_id)
            }>
            <Text style={styles.txtGoToStore}>{t('den_cua_hang')}</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  };

  renderInforUser = dataOrderDetail => {
    return (
      <View style={styles.viewInfor}>
        <View style={{marginTop: 3}}>
          <Entypo name="location" size={18} color="#f66" />
        </View>

        <View style={styles.infor}>
          <Text style={styles.titleName}>{t('khach_hang_title')}</Text>

          {dataOrderDetail.address === null ? null : (
            <Text style={styles.txtInfor}>{dataOrderDetail.address}</Text>
          )}

          <View style={styles.row}>
            <Text style={styles.txtInfor}>{t('name_title')}</Text>
            <Text
              style={{
                ...styles.txtInfor,
                ...{marginLeft: 10},
              }}>
              {dataOrderDetail.user[0].user_name}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.txtInfor}>{t('phone_title')}</Text>
            <Text
              style={{
                ...styles.txtInfor,
                ...{marginLeft: 10},
              }}>
              {dataOrderDetail.user[0].phone}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  renderAtHome = dataOrderDetail => {
    return (
      <View style={styles.viewIsAtHome}>
        <Text style={styles.txtStatus}>{t('trang_thai')}</Text>

        <View style={styles.viewAtHome}>
          {dataOrderDetail.at_home === 'Làm tại của hàng' ? (
            <Icon name="motorcycle" size={22} color="black" />
          ) : (
            <AntDesign name="home" size={22} color="black" />
          )}
          <Text style={styles.statusAtHome}>{dataOrderDetail.at_home}</Text>
        </View>
      </View>
    );
  };

  renderListService = dataOrderDetail => {
    return (
      <>
        <Text style={styles.titleService}>{t('dich_vu')}</Text>
        <View style={styles.viewListServices}>
          <FlatList
            data={dataOrderDetail.services}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={this.ItemSeparatorComponent}
          />
        </View>
      </>
    );
  };

  renderStatusOrder = dataOrderDetail => {
    return (
      <View style={styles.viewStatus}>
        {this.renderStatusIcon(dataOrderDetail)}
        {this.renderStatus(dataOrderDetail)}
      </View>
    );
  };

  renderComment = dataOrderDetail => {
    return (
      <View style={styles.viewComment}>
        <TouchableOpacity
          style={styles.btnComment}
          onPress={() =>
            this.onShowFormComment(dataOrderDetail.store.store_id)
          }>
          <Text style={styles.txtComment}>{t('danh_gia')}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  renderInforApp = dataOrderDetail => {
    return (
      <View style={styles.viewAppInfor}>
        <Text style={styles.titleAppInfor}>{t('lien_he_nail_app')}</Text>
        <Text
          style={{
            ...styles.txtAppInfor,
            ...{marginTop: 10},
          }}>
          {t('mo_ta_ho_tro')}
        </Text>
        <View style={styles.viewOrder}>
          <Text style={styles.titleInfor}>{t('hot_line')}</Text>
          <Text style={styles.dataInfor}>{t('app_phone')}</Text>
        </View>

        <View style={styles.viewOrder}>
          <Text style={styles.titleInfor}>{t('app_email_title')}</Text>
          <Text style={styles.dataInfor}>{t('app_email')}</Text>
        </View>
      </View>
    );
  };

  renderLoading = () => {
    return (
      <View style={styles.viewLoading}>
        <Loading />
      </View>
    );
  };

  renderData = dataOrderDetail => {
    return (
      <>
        <ScrollView>
          {this.renderStatusOrder(dataOrderDetail)}
          {this.renderDataOrder(dataOrderDetail)}
          {this.renderInforStore(dataOrderDetail)}
          {this.renderInforUser(dataOrderDetail)}
          {this.renderAtHome(dataOrderDetail)}
          {this.renderListService(dataOrderDetail)}
          {this.renderComment(dataOrderDetail)}
          {this.renderInforApp(dataOrderDetail)}
        </ScrollView>

        {this.renderButton(dataOrderDetail)}
        {this.renderNotifyCancelOrder()}
        {this.renderNotifyReOrder()}
        {this.renderNotifyExistItems()}
      </>
    );
  };

  render() {
    const dataOrderDetail = this.props.orders.dataOrderDetail;

    if (dataOrderDetail.length === 0) {
      return (
        <View style={styles.container}>
          {this.renderHeader()}
          <View style={styles.viewLoading}>
            <Loading />
          </View>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        {this.renderData(dataOrderDetail)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerItems: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#eaeaea',
    marginHorizontal: 10,
  },

  button: {
    paddingVertical: 10,
    paddingHorizontal: 110,
    borderRadius: 10,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  txtBtn: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    fontFamily: Fonts.serif,
    marginLeft: 10,
  },
  viewButton: {
    borderTopWidth: 3,
    borderTopColor: '#eaeaea',
    height: 70,
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 15,
  },
  viewDashline: {
    alignItems: 'center',
  },
  dashLine: {
    height: 5,
    width: 1.5,
    marginTop: 6,
    backgroundColor: 'gray',
  },
  txtGoToStore: {
    color: 'blue',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  seperator: {
    height: 10,
  },
  status: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 15,
    fontFamily: Fonts.serif,
    textTransform: 'capitalize',
  },
  container: {
    flex: 1,
  },
  viewLoading: {
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  viewStatus: {
    borderTopWidth: 10,
    borderTopColor: '#eaeaea',
    backgroundColor: 'white',
    padding: 12,
    borderBottomWidth: 15,
    borderBottomColor: '#eaeaea',
    alignItems: 'center',
    justifyContent: 'center',
    height: 120,
  },
  containerDataOrder: {
    backgroundColor: 'white',
    padding: 12,
    borderBottomWidth: 8,
    borderBottomColor: '#eaeaea',
  },
  viewOrder: {
    flexDirection: 'row',
    marginTop: 5,
  },
  titleDataOrder: {
    flex: 1,
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: Fonts.serif,
  },
  resultDataOrder: {
    marginLeft: 10,
    fontSize: 15,
    fontFamily: Fonts.serif,
    alignItems: 'flex-end',
  },
  viewIsAtHome: {
    backgroundColor: 'white',
    padding: 12,
    borderTopWidth: 8,
    borderTopColor: '#eaeaea',
    borderBottomWidth: 8,
    borderBottomColor: '#eaeaea',
  },
  txtStatus: {
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily: Fonts.serif,
  },
  viewAtHome: {
    flexDirection: 'row',
    marginTop: 7,
  },
  statusAtHome: {
    marginLeft: 13,
    alignItems: 'flex-end',
    fontSize: 16,
    fontFamily: Fonts.serif,
  },
  viewListServices: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: 'white',
    flex: 1,
  },
  titleService: {
    fontWeight: 'bold',
    fontSize: 20,
    backgroundColor: 'white',
    fontFamily: Fonts.serif,
    padding: 12,
  },
  viewComment: {
    backgroundColor: 'white',
    padding: 12,
    borderBottomWidth: 10,
    borderBottomColor: '#eaeaea',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnComment: {
    padding: 15,
    borderColor: 'gray',
    width: 250,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    backgroundColor: '#eaeaea',
    borderRadius: 30,
  },
  txtComment: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  viewAppInfor: {
    backgroundColor: 'white',
    padding: 12,
  },
  titleAppInfor: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 15,
    fontFamily: Fonts.serif,
  },
  txtAppInfor: {
    fontSize: 13,
    fontFamily: Fonts.serif,
  },
  titleInfor: {
    fontSize: 13,
    fontFamily: Fonts.serif,
  },
  dataInfor: {
    marginLeft: 10,
    fontSize: 13,
    fontWeight: 'bold',
    fontFamily: Fonts.serif,
  },
  image: {
    width: 60,
    height: 50,
    borderRadius: 10,
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
  viewTitleHeader: {
    flex: 6,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  txtHeader: {
    fontSize: 20,
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
  item_name: {
    alignSelf: 'flex-end',
    color: '#5a5555',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: Fonts.serif,
    textTransform: 'capitalize',
  },
  price: {
    alignSelf: 'flex-end',
    marginTop: 5,
    color: 'green',
    fontFamily: Fonts.serif,
    fontSize: 15,
  },
  viewInfor: {
    backgroundColor: 'white',
    padding: 12,
    flexDirection: 'row',
  },
  infor: {
    flex: 1,
    marginLeft: 15,
  },
  titleName: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: Fonts.serif,
  },
  txtInfor: {
    fontSize: 15,
    fontFamily: Fonts.serif,
  },
  row: {
    flexDirection: 'row',
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
