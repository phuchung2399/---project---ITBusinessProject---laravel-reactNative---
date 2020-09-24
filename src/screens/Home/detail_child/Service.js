import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {t} from '../../../i18n/t';
import {get, find} from 'lodash';
import NoData from '../../../components/NoData';
import {
  addCart,
  addStoreId,
  deleteAllCarts,
  deleteStoreId,
} from '../../../redux/orderRedux/action';
import {connect} from 'react-redux';
import ModalComponent from '../../../components/Modal';
import Colors from '../../../themers/Colors';
import {formatPrice} from '../../../formatPrice';

class Service extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
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
              <Text style={styles.textPrice}>
                {formatPrice(item.price, ',', '.')}
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => this.onAddToCart(item)}
          style={styles.btnAdd}>
          <AntDesign name="plus" color="white" size={18} />
        </TouchableOpacity>
      </LinearGradient>
    );
  };

  ItemSeparatorComponent = () => {
    return <View style={styles.Separator} />;
  };

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
          onConfirm={this.onDeleteCartItems}
          message={t('messageExistItems')}
          txtBackButton={t('txt_understand')}
          txtConfirmButton={t('txt_cancel')}
          height={240}
        />
      </>
    );
  };

  render() {
    const dataServices = this.props.services;

    if (get(dataServices, 'length') > 0) {
      return (
        <View style={styles.container}>
          {this.renderListService(dataServices)}
          {this.renderModal()}
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
    borderColor: Colors.white,
    borderRadius: 10,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  name: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 18,
    textTransform: 'capitalize',
  },
  rating: {
    marginTop: 5,
    flexDirection: 'row',
  },
  button: {
    width: 30,
    height: 30,
    backgroundColor: Colors.white,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  price_container: {
    flexDirection: 'row',
    marginTop: 10,
  },
  price: {
    backgroundColor: Colors.white,
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
  Separator: {
    height: 10,
  },
  btnAdd: {
    width: 35,
    height: 35,
    backgroundColor: '#FC5895',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
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

    onDeleteAllCart: () => {
      dispatch(deleteAllCarts());
    },
    onDeleteStoreId: () => {
      dispatch(deleteStoreId());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Service);
