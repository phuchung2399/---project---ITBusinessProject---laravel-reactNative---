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
import Colors from '../../themers/Colors';
import Fonts from '../../themers/Fonts';
import {connect} from 'react-redux';
import {getAllOrders, cancelOrder} from '../../redux/orderRedux/action';
import {storageGet} from '../../checkAsyncStorage';
import ModalComponent from '../../components/Modal';

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      modalVisible: false,
      order_id: '',
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
          this.props.onGetAllOrders(this.state.token);
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

  onPress = order_id => {
    Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              name: 'HistoryOrderDetail',
              passProps: {
                order_id,
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

  onConfirm = () => {
    const {order_id} = this.state;

    this.props.onCancelOrder(order_id, this.state.token);
    this.setState({
      order_id: '',
      modalVisible: !this.state.modalVisible,
    });
  };

  onCancelOrder = order_id => {
    this.setState({
      order_id,
      modalVisible: !this.state.modalVisible,
    });
  };

  ItemSeparatorComponent = () => {
    return <View style={styles.separator} />;
  };

  renderHeader = () => {
    return (
      <LinearGradient colors={[Colors.pink, Colors.pink, Colors.orrange]}>
        <View style={styles.containerHeader}>
          <View style={styles.sideBarOptions}>
            <Icon
              name="list"
              size={30}
              color="white"
              onPress={() => this.changScreenSidebar()}
            />
          </View>

          <View style={styles.viewTitle}>
            <Text animation="zoomInUp" style={styles.title}>
              {t('lich_su_giao_dich')}
            </Text>
          </View>
          <View style={styles.viewLogo}>
            <Image style={styles.logo} source={Logo} />
          </View>
        </View>
      </LinearGradient>
    );
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
          onConfirm={this.onConfirm}
          message={t('message_cancel_order')}
          txtBackButton={t('txt_back')}
          txtConfirmButton={t('txt_cancel')}
          height={200}
        />
      </>
    );
  };

  renderItem = ({item}) => {
    return (
      <LinearGradient
        colors={['#fdf6f6', Colors.white]}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0}}
        style={styles.containerListItem}>
        <View style={styles.viewImage}>
          <TouchableOpacity onPress={() => this.onPress(item.order_id)}>
            <Image source={{uri: item.store.image}} style={styles.image} />
          </TouchableOpacity>
        </View>

        <View style={styles.viewInfor}>
          <TouchableOpacity onPress={() => this.onPress(item.order_id)}>
            <View>
              <Text style={styles.name}>{item.store.store_name}</Text>

              <View style={styles.viewTime}>
                <Text style={styles.txtTitleTime}>{t('dat_hang_luc')}</Text>

                <Text style={styles.order_time}>{item.order_time}</Text>
                <Text style={styles.order_day}>{item.order_day}</Text>
              </View>

              <View style={styles.viewTotal}>
                <Text>{t('tong_tien_d')}</Text>

                <Text style={styles.total}>{item.total} đ</Text>
              </View>
              <Text style={styles.status}>{item.status[0].massage}</Text>
            </View>
          </TouchableOpacity>
        </View>

        {item.status[0].massage === 'Đơn đang chờ xác nhận' ? (
          <View
            style={{
              ...styles.button,
              backgroundColor: Colors.red,
            }}>
            <TouchableOpacity onPress={() => this.onCancelOrder(item.order_id)}>
              <Text style={styles.txtButton}>{t('huy_don')}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={{
              ...styles.button,
              backgroundColor: Colors.blue,
            }}>
            <TouchableOpacity onPress={() => this.onPress(item.order_id)}>
              <Text style={styles.txtButton}>{t('dat_lai')}</Text>
            </TouchableOpacity>
          </View>
        )}
      </LinearGradient>
    );
  };

  renderNoData = () => {
    return (
      <View style={styles.viewNoData}>
        <Text style={styles.textNoData}>{t('khong_co_don_hang')}</Text>
      </View>
    );
  };

  renderLoading = () => {
    return (
      <View style={styles.viewLoading}>
        <Text style={styles.txtLoading}>{t('Loading')}</Text>
      </View>
    );
  };

  renderListItems = ordersData => {
    const arrOrderList = Object.keys(ordersData).map(key => {
      ordersData[key].id = key;
      return ordersData[key];
    });

    return (
      <>
        <ScrollView>
          <Text style={styles.txtHistory}>{t('history')}</Text>
          <View style={styles.viewListOrder}>
            <FlatList
              data={arrOrderList}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={this.ItemSeparatorComponent}
            />
          </View>
        </ScrollView>

        {this.renderModal()}
      </>
    );
  };

  render() {
    const ordersData = this.props.orders.dataOrders;

    return (
      <View style={styles.container}>
        {this.renderHeader()}
        {ordersData.length === 0 && this.renderNoData()}
        {ordersData.length < 0 && this.renderLoading()}
        {ordersData.length > 0 && this.renderListItems(ordersData)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerHeader: {
    flexDirection: 'row',
    padding: 5,
    height: 80,
  },
  sideBarOptions: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
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
  viewNoData: {
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  textNoData: {
    fontSize: 20,
    color: 'gray',
    fontFamily: Fonts.serif,
  },
  viewLoading: {
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  txtLoading: {
    fontSize: 20,
    color: 'gray',
    fontFamily: Fonts.serif,
  },
  container: {
    flex: 1,
  },
  txtHistory: {
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily: Fonts.serif,
    padding: 12,
    borderBottomWidth: 5,
    borderBottomColor: '#eaeaea',
  },
  viewListOrder: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: 'white',
    flex: 1,
  },
  separator: {
    height: 10,
  },
  containerListItem: {
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
  name: {
    color: '#5a5555',
    fontWeight: 'bold',
    fontSize: 18,
  },
  viewInfor: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  viewTime: {
    flexDirection: 'row',
    marginTop: 7,
  },
  txtTitleTime: {
    color: 'gray',
  },
  order_time: {
    marginLeft: 5,
    color: 'gray',
  },
  order_day: {
    marginLeft: 10,
    color: 'gray',
  },
  viewTotal: {
    flexDirection: 'row',
    marginTop: 5,
  },
  total: {
    marginLeft: 10,
  },
  status: {
    marginTop: 7,
    color: 'green',
    fontWeight: 'bold',
  },
  button: {
    width: 90,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  txtButton: {
    color: 'white',
    fontWeight: 'bold',
    marginRight: 5,
  },
});

const mapStateToProps = state => {
  return {
    orders: state.orders,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onGetAllOrders: token => {
      dispatch(getAllOrders(token));
    },
    onCancelOrder: (order_id, token) => {
      dispatch(cancelOrder(order_id, token));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
