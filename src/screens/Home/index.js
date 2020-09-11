import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  FlatList,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import LinearGradient from 'react-native-linear-gradient';
import Carousel from '../../components/Carousel';
import {dummyData} from '../../utils/index';
import {Navigation} from 'react-native-navigation';
import {t} from '../../i18n/t';
import NailItem from './components/NailItems';
import ServiceItem from './components/ServiceItem';
import {get} from 'lodash';
import Fonts from '../../themers/Fonts';
import Colors from '../../themers/Colors';
const {height} = Dimensions.get('window');
import Loading from '../Loading';
import {connect} from 'react-redux';
import {getNewStore, getStoreByStar} from '../../redux/storeRedux/action';
import {getAllSlides} from '../../redux/slideRedux/action';
import {storageGet} from '../../checkAsyncStorage';
import {getAllServices} from '../../redux/serviceRedux/action';
import NoData from '../../components/NoData';
import CartComponent from '../../components/CartComponent';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
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
      console.log(parsedUser);
      if (parsedUser) {
        this.setState({token: parsedUser.data.token}, () => {
          this.props.onGetNewStore(this.state.token);
          this.props.onGetStoresByStar(this.state.token);
          this.props.onGetAllServices(this.state.token);
          this.props.onGetAllSlices(this.state.token);
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

  changScreenSearch = () => {
    Navigation.showModal({
      component: {
        name: 'Search',
      },
    });
  };

  changeScreenShowAll = (data, title) => {
    Navigation.showModal({
      component: {
        name: 'ShowAllStores',
        passProps: {
          data: data,
          title: title,
        },
      },
    });
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

  renderCart = () => {
    return (
      <>
        {this.props.orders.cartItems.length <= 0 ? null : (
          <CartComponent
            changeShopping={this.changeShopping}
            size={this.props.orders.cartItems.length}
          />
        )}
      </>
    );
  };

  renderLoading = () => {
    return (
      <View style={styles.Loading}>
        <Loading />
      </View>
    );
  };

  renderHeader = () => {
    return (
      <View style={styles.viewHeader}>
        <View style={styles.iconSideBar}>
          <Icon
            name="list"
            size={30}
            color="white"
            onPress={() => this.changScreenSidebar()}
          />
        </View>
        <View style={styles.iconSearch}>
          <EvilIcons
            name="search"
            size={30}
            color="white"
            onPress={() => this.changScreenSearch()}
          />
        </View>
      </View>
    );
  };

  renderPageTitle = () => {
    return (
      <LinearGradient colors={['#FC5895', '#F99A7C']}>
        <View style={styles.viewPageTitle}>
          <Text style={styles.txtPageTitle}>{t('home_page')}</Text>
        </View>
      </LinearGradient>
    );
  };

  renderSlide = () => {
    return (
      <View style={styles.viewSlide}>
        <Carousel data={dummyData} />
      </View>
    );
  };

  renderNewStore = arrNewStores => {
    return (
      <>
        <View style={styles.category}>
          <Text style={styles.text}>
            {t('cua_hang_moi_nhat')} ({get(arrNewStores, 'length')})
          </Text>
          <Text
            style={styles.showall}
            onPress={() =>
              this.changeScreenShowAll(arrNewStores, ' Cửa hàng mới nhất')
            }>
            {t('xem_het')}
          </Text>
        </View>
        {arrNewStores.length === 0 ? (
          <NoData />
        ) : (
          <FlatList
            data={arrNewStores}
            keyExtractor={(item, index) => `${index}`}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => {
              return (
                <NailItem
                  item={item}
                  index={index}
                  parentFlatList={this}
                  component={this.props.componentId}
                />
              );
            }}
          />
        )}
        <View style={styles.divider} />
      </>
    );
  };

  renderBestStores = arrStoresByStar => {
    return (
      <>
        <View style={styles.category}>
          <Text style={styles.text}>
            {t('cua_hang_chat_luong')} ({get(arrStoresByStar, 'length')}){' '}
          </Text>
          <Text
            style={styles.showall}
            onPress={() =>
              this.changeScreenShowAll(
                arrStoresByStar,
                'Cửa hàng order nhiều nhất',
              )
            }>
            {t('xem_het')}
          </Text>
        </View>

        {arrStoresByStar.length === 0 ? (
          <NoData />
        ) : (
          <FlatList
            data={arrStoresByStar}
            keyExtractor={(item, index) => `${index}`}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => {
              return (
                <NailItem
                  item={item}
                  index={index}
                  parentFlatList={this}
                  component={this.props.componentId}
                />
              );
            }}
          />
        )}
        <View style={styles.divider} />
      </>
    );
  };

  renderBestServices = servicesList => {
    return (
      <>
        <View style={styles.category}>
          <Text style={styles.text}>Dịch vụ được yêu thích</Text>
        </View>

        {servicesList.length === 0 ? (
          <NoData />
        ) : (
          <FlatList
            data={servicesList}
            renderItem={({item, index}) => (
              <ServiceItem
                item={item}
                index={index}
                parentFlatList={this}
                component={this.props.componentId}
              />
            )}
            horizontal={true}
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
          />
        )}
        <View style={styles.divider} />
      </>
    );
  };

  renderBody = () => {
    const storesData = this.props.stores;
    const newStores = storesData.dataNewStores;
    const storesByStar = storesData.dataStoresByStar;
    const services = this.props.services.services;

    const arrNewStores = Object.keys(newStores).map(key => {
      newStores[key].id = key;
      return newStores[key];
    });

    const arrStoresByStar = Object.keys(storesByStar).map(key => {
      storesByStar[key].id = key;
      return storesByStar[key];
    });

    const servicesList = Object.keys(services).map(key => {
      services[key].id = key;
      return services[key];
    });

    return (
      <View style={styles.viewBody}>
        {this.renderNewStore(arrNewStores)}
        {this.renderBestStores(arrStoresByStar)}
        {this.renderBestServices(servicesList)}
      </View>
    );
  };

  renderData = () => {
    const slicesData = this.props.slices.slides;
    return (
      <View style={styles.Loading}>
        {this.renderHeader()}
        <ScrollView style={styles.Loading}>
          {this.renderPageTitle()}
          {this.renderSlide()}
          {this.renderBody()}
        </ScrollView>
        {this.renderCart()}
      </View>
    );
  };

  render() {
    const that = this;
    const isLoading = this.state.isLoading;
    setTimeout(function() {
      that.setState({isLoading: false});
    }, 10);

    return (
      <>
        {isLoading && this.renderLoading()}
        {!isLoading && this.renderData()}
      </>
    );
  }
}

const styles = StyleSheet.create({
  category: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'center',
    marginTop: 5,
  },
  text: {
    fontSize: 22,
    paddingTop: 5,
    flex: 4,
    color: 'black',
    fontWeight: 'bold',
  },
  showall: {
    alignItems: 'flex-end',
    color: '#1d9dd8',
    flex: 1,
    fontSize: 15,
  },
  divider: {
    backgroundColor: '#eaeaea',
    height: 7,
    marginTop: 10,
  },
  Loading: {
    flex: 1,
  },
  viewHeader: {
    backgroundColor: Colors.pink,
    padding: 10,
    flexDirection: 'row',
  },
  iconSideBar: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  iconSearch: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: 'white',
    borderRadius: 20,
  },
  viewPageTitle: {
    flex: 1,
    alignItems: 'center',
    height: height / 5,
  },
  txtPageTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    marginTop: -10,
    fontFamily: Fonts.serif,
  },
  viewSlide: {
    marginTop: '-25%',
  },
  viewBody: {
    padding: 2,
    paddingBottom: 10,
  },
});

const mapStateToProps = state => {
  return {
    stores: state.stores,
    services: state.services,
    slices: state.slices,
    orders: state.orders,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onGetNewStore: token => {
      dispatch(getNewStore(token));
    },
    onGetStoresByStar: token => {
      dispatch(getStoreByStar(token));
    },
    onGetAllServices: token => {
      dispatch(getAllServices(token));
    },
    onGetAllSlices: token => {
      dispatch(getAllSlides(token));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
