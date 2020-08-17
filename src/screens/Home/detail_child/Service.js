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
  TouchableWithoutFeedback,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
const {width, height} = Dimensions.get('window');
import {t} from '../../../i18n/t';
import Fonts from '../../../themers/Fonts';
import {get, filter} from 'lodash';
import NoData from '../../../components/NoData';
import {storageSet} from '../../../checkAsyncStorage';
import {Navigation} from 'react-native-navigation';
import {
  addCart,
  deleteCart,
  addStoreId,
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
    // this.setState({
    //   isChangeIcon: !this.state.isChangeIcon,
    // });
    // this.setState({
    //   isChangeIcon: !this.state.isChangeIcon,
    // });

    const {arrayServicesSelected} = this.state;

    const recent_store_id = this.props.orders.store_id;
    const store_id_clicked = this.props.store_id;

    if (store_id_clicked === recent_store_id || recent_store_id === '') {
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
      alert('o dc add');
    }

    // arrayServicesSelected.push(dataItem);
    // this.setState({
    //   arrayServicesSelected,
    // });
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
              passProps: {
                // arrayServicesSelected,
                // store_id,
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

  renderItem = ({item}) => {
    // console.log(item);
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
          {/* <View style={styles.rating}>{this._rating(item.rating)}</View> */}
          <View style={styles.price_container}>
            <View style={styles.price}>
              <Text style={styles.textPrice}>{item.price}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => this.onAddToCart(item)}
          style={{
            width: 30,
            height: 30,
            backgroundColor: !this.state.isChangeIcon ? '#FC5895' : 'green',
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <AntDesign
            name={!this.state.isChangeIcon ? 'plus' : 'check'}
            color="white"
            size={15}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.onDeleteCart(item.service_id)}
          style={{
            width: 30,
            height: 30,
            backgroundColor: !this.state.isChangeIcon ? 'blue' : 'green',
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <AntDesign name="check" color="white" size={15} />
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
              <TouchableWithoutFeedback onPress={() => this.changeShopping()}>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Service);
