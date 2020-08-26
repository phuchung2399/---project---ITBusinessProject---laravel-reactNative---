import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Picker,
  Alert,
  TouchableHighlight,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
const {width, height} = Dimensions.get('window');
import {t} from '../../../i18n/t';
import Fonts from '../../../themers/Fonts';
import {get, filter, find, take} from 'lodash';
import NoData from '../../../components/NoData';
import {storageSet} from '../../../checkAsyncStorage';
import {Navigation} from 'react-native-navigation';
import {
  addCart,
  deleteCart,
  addStoreId,
  deleteAllCarts,
  deleteStoreId,
} from '../../../redux/orderRedux/action';
import {connect} from 'react-redux';

var data = [
  {
    name: 'Mai Spa',
    image: require('../asset/namkho.jpg'),
    rating: 3,
    price: '$12',
  },
  {
    name: 'Diu spa',
    image: require('../asset/mitkho.jpg'),
    rating: 5,
    price: '$15',
  },
  {
    name: 'Hung spa',
    image: require('../asset/hutieu.jpg'),
    rating: 4,
    price: '$20',
  },
  {
    name: 'Thinh spa',
    image: require('../asset/cuonlalot.jpg'),
    rating: 2,
    price: '$12',
  },
  {
    name: 'Tuan salon',
    image: require('../asset/cuondiep.jpg'),
    rating: 5,
    price: '$13',
  },
];

class Service extends React.Component {
  constructor(props) {
    super(props);
    this.dataRef = React.createRef();
    this.state = {
      data: data,
      data_temp: '',
      search: '',
      isChangeIcon: false,
      menu: '',
      arrayServicesSelected: [],
      modalVisible: false,
    };
  }

  _rating(item) {
    let rating = [];
    let i = 0;
    for (i = 0; i < item; i++) {
      rating.push(
        <Image
          source={require('../asset/star.png')}
          style={{width: 15, height: 15, marginRight: 3}}
          resizeMode="cover"
        />,
      );
    }
    return rating;
  }

  onAddToCart = item => {
    const recent_store_id = this.props.orders.store_id;
    const cartitems = this.props.orders.cartItems;

    const store_id_clicked = this.props.store_id;

    if (store_id_clicked === recent_store_id || recent_store_id === '') {
      if (cartitems.length < 3) {
        const results = find(cartitems, ['service_id', item.service_id]);
        if (results === undefined) {
          const dataItem = {
            service_id: item.service_id,
            service_name: item.service_name,
            description: item.description,
            price: item.price,
            image: item.image,
            store_id: item.store_id,
          };
          this.props.onAddCart(dataItem);
          this.props.onAddStoreId(this.props.store_id);
        } else {
          Alert.alert('Thông báo', 'Bạn đã thêm dịch vụ này vào giỏ hàng');
        }
      } else {
        Alert.alert('Thông báo', 'Bạn chỉ được chọn 3 dịch vụ');
      }
    } else {
      this.onVerify();
    }
  };

  onVerify = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
    });
  };

  onDeleteCartItems = () => {
    this.props.onDeleteAllCart();
    this.props.onDeleteStoreId();
    Alert.alert('Thông báo', 'Xoá thành công');
    this.setState({
      modalVisible: !this.state.modalVisible,
    });
  };

  onDeleteCart = service_id => {
    this.props.onDeleteCartItem(service_id);
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

  renderItem = ({item}) => {
    return (
      <LinearGradient
        colors={['#b5b1b1', '#e2d5d5']}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0}}
        style={styles.item}>
        <View style={styles.image_container}>
          <Image source={{uri: item.image}} style={styles.image} />
        </View>
        <View style={styles.content}>
          <Text style={styles.name}>{item.service_name}</Text>
          <View style={styles.price_container}>
            <View style={styles.price}>
              <Text style={styles.textPrice}>{item.price}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => this.onAddToCart(item)}
          style={{
            width: 35,
            height: 35,
            backgroundColor: !this.state.isChangeIcon ? '#FC5895' : 'green',
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <AntDesign
            name={!this.state.isChangeIcon ? 'plus' : 'check'}
            color="white"
            size={18}
          />
        </TouchableOpacity>
      </LinearGradient>
    );
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

  _search(text) {
    let data = [];
    this.props.service_temp.map(function(value) {
      if (value.name.indexOf(text) > -1) {
        data.push(value);
      }
    });
    this.setState({
      data: data,
      search: text,
    });
  }

  componentDidMount() {
    const dataServices = this.props.services;
    this.setState({
      data: dataServices,
    });
  }

  renderListService = dataServices => {
    return (
      <View style={styles.flatList}>
        <FlatList
          data={dataServices}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={this.ItemSeparatorComponent}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  };

  render() {
    const dataServices = this.props.services;
    const store_id = this.props.store_id;
    console.log('cua hang', this.props.orders);

    const arrayServicesSelected = this.state.arrayServicesSelected;

    if (
      this.dataRef.current &&
      this.dataRef.current.isLoading &&
      get(dataServices, 'length') <= 0
    ) {
      return (
        <View style={styles.container}>
          <View
            style={{
              height: height / 4,
              marginTop: 10,
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 10,
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}>
            <Text
              style={{fontSize: 20, color: 'gray', fontFamily: Fonts.serif}}>
              {t('loading_message')}
            </Text>
          </View>
        </View>
      );
    } else if (get(dataServices, 'length') > 0) {
      return (
        <View style={styles.container}>
          <View style={styles.section}>
            <TextInput
              placeholder="Search.."
              style={{flex: 1, marginLeft: 10}}
              value={this.state.search}
              onChangeText={text => this._search(text)}
            />
            <TouchableOpacity
              onPress={() => this._search('')}
              style={{paddingHorizontal: 10}}>
              <Ionicons name="ios-close" color="gray" size={20} />
            </TouchableOpacity>
          </View>

          {this.renderListService(dataServices)}

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
                  Hiện tại giỏ hàng của bạn đang có dịch vụ của cửa hàng khác,
                  bạn có muốn xoá giỏ hàng không?
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
    } else {
      return <NoData />;
    }
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    marginBottom: 5,
    backgroundColor: '#F99A7C',
    borderRadius: 200,
  },
  flatList: {
    flex: 1,
    marginTop: 10,
  },
  item: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0.5, height: 0.5},
    shadowOpacity: 0.5,
    shadowRadius: 9,
    elevation: 5,
  },
  image_container: {
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
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  name: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  rating: {
    marginTop: 5,
    flexDirection: 'row',
  },
  button: {
    width: 30,
    height: 30,
    backgroundColor: 'white',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  price_container: {
    flexDirection: 'row',
    marginTop: 10,
  },
  price: {
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 50,
  },
  textPrice: {
    color: 'green',
    fontWeight: 'bold',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 100,
    backgroundColor: '#f2f2f2',
    marginTop: -10,
  },
});

const mapStateToProps = state => {
  return {
    orders: state.orders,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onAddCart: cartItem => {
      dispatch(addCart(cartItem));
    },
    onAddStoreId: store_id => {
      dispatch(addStoreId(store_id));
    },
    onDeleteCartItem: id => {
      dispatch(deleteCart(id));
    },
    onDeleteAllCart: () => {
      dispatch(deleteAllCarts());
    },
    onDeleteStoreId: () => {
      dispatch(deleteStoreId());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Service);
