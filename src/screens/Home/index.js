import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  FlatList,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import Logo from '../../../assets/images/logo.png';
import Carousel from '../../components/Carousel';
import {dummyData} from '../../utils/index';
import {Navigation} from 'react-native-navigation';
import {t} from '../../i18n/t';
import demodata from './../../utils/DemoData';
import NailItem from './components/NailItems';
import ReviewData from '../../utils/ReviewData';
import UserReview from './components/UserReview';
import {get, filter} from 'lodash';
import Fonts from '../../themers/Fonts';
import Colors from '../../themers/Colors';
const {width, height} = Dimensions.get('window');
import Loading from '../Loading';
import {connect} from 'react-redux';
import {getNewStore, getStoreByStar} from '../../redux/storeRedux/action';
import {storageRemove, storageGet} from '../../checkAsyncStorage';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      userName: '',
      isShowInfor: false,
      showAlert: false,
      token: '',
    };
  }

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

  onPress = idBook => {
    Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              name: 'Booking',
              // passProps: {
              //   IdStore: idStore,
              // },
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

  componentDidMount() {
    this.onGetUserData();
  }

  onGetUserData = async () => {
    try {
      let getUserAccount = await storageGet('user');
      let parsedUser = JSON.parse(getUserAccount);
      if (parsedUser) {
        this.setState({token: parsedUser.data.token}, () => {
          this.props.onGetNewStore(this.state.token);
          this.props.onGetStoresByStar(this.state.token);
        });
      }
    } catch (error) {
      // alert(error);
    }
  };

  render() {
    const that = this;
    const isLoading = this.state.isLoading;
    const storesData = this.props.stores;
    const newStores = storesData.dataNewStores;
    const storesByStar = storesData.dataStoresByStar;
    const userToken = this.state.token;

    setTimeout(function() {
      that.setState({isLoading: false});
    }, 1000);

    if (isLoading) {
      return (
        <View style={{flex: 1}}>
          <Loading loadingText="Loading..." />
        </View>
      );
    } else {
      return (
        <View style={{flex: 1}}>
          <View
            style={{
              backgroundColor: '#FC5895',
              padding: 10,
              flexDirection: 'row',
            }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignContent: 'center',
              }}>
              <Icon
                name="list"
                size={30}
                color="white"
                onPress={() => this.changScreenSidebar()}
              />
            </View>
            <View
              style={{
                alignItems: 'flex-end',
                justifyContent: 'center',
                borderWidth: 0.5,
                borderColor: 'white',
                borderRadius: 20,
              }}>
              <EvilIcons
                name="search"
                size={30}
                color="white"
                onPress={() => this.changScreenSearch()}
              />
            </View>
          </View>
          <ScrollView
            style={{
              flex: 1,
            }}>
            <LinearGradient colors={['#FC5895', '#F99A7C']}>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  height: height / 5,
                }}>
                <Text
                  animation="zoomInUp"
                  style={{
                    fontSize: 40,
                    fontWeight: 'bold',
                    color: 'white',
                    marginTop: -10,
                    fontFamily: Fonts.serif,
                  }}>
                  {t('home_page')}
                </Text>
              </View>
            </LinearGradient>

            <View style={{marginTop: '-25%'}}>
              <Carousel data={dummyData} />
            </View>
            <View style={{padding: 2, paddingBottom: 10}}>
              <View style={styles.category}>
                <Text style={styles.text}>
                  {t('cua_hang_moi_nhat')} ({get(newStores, 'length')})
                </Text>
                <Text
                  style={styles.showall}
                  onPress={() =>
                    this.changeScreenShowAll(newStores, ' Cửa hàng mới nhất')
                  }>
                  {t('xem_het')}
                </Text>
              </View>
              <FlatList
                data={newStores}
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
              <View
                style={{backgroundColor: '#eaeaea', height: 7, marginTop: 10}}
              />

              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  padding: 10,
                  justifyContent: 'center',
                  marginTop: 5,
                }}>
                <Text style={styles.text}>
                  {t('cua_hang_chat_luong')} ({get(storesByStar, 'length')}){' '}
                </Text>
                <Text
                  style={styles.showall}
                  onPress={() =>
                    this.changeScreenShowAll(
                      storesByStar,
                      'Cửa hàng order nhiều nhất',
                    )
                  }>
                  {' '}
                  {t('xem_het')}
                </Text>
              </View>
              <FlatList
                data={storesByStar}
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
              <View
                style={{backgroundColor: '#eaeaea', height: 7, marginTop: 10}}
              />
              <View style={styles.category}>
                <Text style={styles.text}>Top 10 khách hàng tốt nhất</Text>
              </View>
              <FlatList
                data={ReviewData}
                renderItem={({item}) => (
                  <UserReview
                    image={item.image}
                    name={item.name}
                    orderCount={item.orderCount}
                    extraInfor={'lượt order'}
                  />
                )}
                horizontal={true}
                keyExtractor={(item, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
              />
              <View
                style={{backgroundColor: '#eaeaea', height: 7, marginTop: 10}}
              />
              <View style={styles.category}>
                <Text style={styles.text}>Top 5 người nhận xét nổi bật</Text>
              </View>
              <FlatList
                data={ReviewData}
                renderItem={({item}) => (
                  <UserReview image={item.image} name={item.name} />
                )}
                horizontal={true}
                keyExtractor={(item, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
              />
              <View
                style={{backgroundColor: '#eaeaea', height: 7, marginTop: 10}}
              />
            </View>
          </ScrollView>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  category: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'center',
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
});

const mapStateToProps = state => {
  return {
    stores: state.stores,
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
