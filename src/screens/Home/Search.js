import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  BackHandler,
  Picker,
  ScrollView,
  SafeAreaView,
  AsyncStorage,
  TouchableWithoutFeedback,
  TextInput,
  Switch,
  Dimensions,
} from 'react-native';
import {get, filter, find, take} from 'lodash';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {storageGet} from '../../checkAsyncStorage';
import {Navigation} from 'react-native-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import Logo from '../../../assets/images/logo.png';
import Img from '../../../assets/images/service-img.jpg';
import Items from './components/BookingItems';
import Colors from '../../themers/Colors';
import Fonts from '../../themers/Fonts';
import Location from 'react-native-vector-icons/Entypo';
import SearchItems from './components/SearchItems';
import {searchStore, addKey, deleteKey} from '../../redux/searchRedux/action';
import {getAllStores} from '../../redux/storeRedux/action';
import {connect} from 'react-redux';
import {t} from '../../i18n/t';
import Loading from '../Loading';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      text: '',
      colorFalseSwitchIsOn: true,
      key: '',
      data: [],
      isShowRecentSearch: true,
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
          this.props.onGetAllStores(this.state.token);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  changeSwitch = value => {
    this.setState({colorFalseSwitchIsOn: value ? true : false});
  };

  backMainScreen = () => {
    Navigation.dismissModal(this.props.componentId);
  };

  searchSubmit = () => {
    const {key, token} = this.state;
    if (key != '') {
      this.setState({isShowRecentSearch: false}, () => {
        this.props.onSearchStore(key, token);
        this.onAddKeyWord(key);
      });
    }
  };

  onAddKeyWord = keyword => {
    const keys = this.props.dataSearch.recentSearchData;
    const results = find(keys, ['key', keyword]);
    if (results === undefined) {
      const key = {
        key: keyword,
      };
      this.props.onAddKey(key);
    }
  };

  onRecentSearch = key => {
    this.setState({key}, () => {
      this.searchSubmit();
    });
  };

  _renderItem = ({item}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          borderBottomWidth: 1,
          borderColor: 'white',
          borderBottomColor: 'gray',
          height: 40,
          marginTop: 10,
        }}>
        <View
          style={{
            flex: 1,
          }}>
          <TouchableOpacity onPress={() => this.onRecentSearch(item.key)}>
            <Text resizeMode="cover" style={{fontSize: 15, marginLeft: 10}}>
              {item.key}
              {/* {item.store_name} */}
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            marginRight: 20,
          }}>
          <AntDesign
            name="close"
            size={20}
            color="black"
            onPress={() => this.onDeleteKey(item.key)}
          />
        </View>
      </View>
    );
  };

  onDeleteKey = key => {
    this.props.onDeleteKey(key);
  };

  _search = text => {
    this.setState({
      key: text,
    });

    // const dataStore = this.props.stores.dataAllStores;

    // const newData = dataStore.filter(item => {
    //   const itemData = `${item.store_name.toUpperCase()}
    //   ${item.store_name.first.toUpperCase()} ${item.store_name.last.toUpperCase()}`;

    //   const textData = text;

    //   return itemData.indexOf(textData) > -1;
    //});

    // this.setState({data: newData});
  };

  onRestart = () => {
    this.setState({
      key: '',
      isShowRecentSearch: true,
    });
  };

  renderHeader = () => {
    return (
      <LinearGradient colors={['#FC5895', '#FC5895', '#F99A7C']}>
        <View
          style={{
            padding: 10,
            flexDirection: 'row',
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignContent: 'center',
              backgroundColor: 'white',
              borderRadius: 50,
              alignItems: 'center',
              maxHeight: 40,
              maxWidth: 40,
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
              flex: 6,
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <Text
              animation="zoomInUp"
              style={{
                fontSize: 30,
                fontWeight: 'bold',
                color: 'white',
              }}>
              Tìm kiếm
            </Text>
          </View>
          <View style={{alignItems: 'flex-end', flex: 1}}>
            <Image
              style={{
                width: 50,
                height: 50,
              }}
              source={Logo}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f2f2f2',
            borderRadius: 30,
            margin: 15,
            marginHorizontal: 25,
            paddingVertical: 3,
            paddingHorizontal: 10,
          }}>
          <TextInput
            style={styles.textInput}
            placeholder="Tìm kiếm..."
            onChangeText={text => this._search(text)}
            autoCapitalize="sentences"
            autoFocus={true}
            autoCorrect={true}
            value={this.state.key}
            editable
            maxLength={40}
            returnKeyType={'search'}
            onSubmitEditing={this.searchSubmit}
          />

          <TouchableOpacity
            onPress={() => this.onRestart()}
            style={{paddingHorizontal: 10}}>
            <Ionicons name="ios-close" color="gray" size={20} />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  };

  onPress = store_id => {
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

  renderItem = ({index, item}) => {
    let star = [];

    for (let i = 0; i < item.rank; i++) {
      star.push(<Icon name="star" size={20} color="#fc9619" />);
    }

    for (let i = 0; i < 5 - item.rank; i++) {
      star.push(<Icon name="star" size={20} color="#c3c1c1" />);
    }

    return (
      <LinearGradient
        colors={['#fdf6f6', 'white']}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0}}
        style={{
          flex: 1,
          paddingVertical: 10,
          paddingHorizontal: 10,
          flexDirection: 'row',
          borderRadius: 10,
          borderBottomWidth: 2,
          borderBottomColor: '#eaeaea',
        }}>
        <View style={{width: 100, height: 90}}>
          <TouchableOpacity onPress={() => this.onPress(item.store_id)}>
            <Image
              source={{uri: item.image}}
              style={{
                width: '100%',
                height: '100%',
                borderWidth: 5,
                borderColor: 'white',
                borderRadius: 10,
              }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{flex: 1, justifyContent: 'center', paddingHorizontal: 10}}>
          <TouchableOpacity onPress={() => this.onPress(item.store_id)}>
            <View>
              <View
                style={{
                  flex: 1,

                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    color: '#5a5555',
                    fontWeight: 'bold',
                    fontSize: 18,
                    flex: 1,
                  }}>
                  {item.store_name}
                </Text>
                {index < 5 ? (
                  <Text
                    style={{color: 'red', fontWeight: 'bold', fontSize: 15}}>
                    Ad
                  </Text>
                ) : null}
              </View>

              <Text style={{color: 'gray'}}>{item.address}</Text>

              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    marginTop: 7,
                    color: 'green',
                    fontWeight: 'bold',
                    flex: 1,
                  }}>
                  {star}
                </Text>

                <Text style={{color: 'red', fontSize: 15}}>Đang mở cửa</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  };

  renderRecentSearch = () => {
    const keys = this.props.dataSearch.recentSearchData;
    console.log(keys);

    const dataStore = this.props.stores.dataAllStores;
    return (
      <View
        style={{
          flex: 1,
        }}>
        <View
          style={{
            padding: 10,
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            Tìm kiếm gần đây
          </Text>
        </View>
        <View
          style={{borderBottomWidth: 1, borderBottomColor: Colors.shadow}}
        />
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 10,
            padding: 10,
          }}>
          <FlatList
            data={keys}
            extraData={this.state}
            keyExtractor={(item, index) => index.toString()}
            renderItem={this._renderItem}
          />
        </View>
      </View>
    );
  };

  renderListDataSearch = () => {
    const seachData = this.props.dataSearch.dataStoresSearch;

    if (seachData.length === 0) {
      return (
        <View
          style={{
            padding: 12,
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            marginTop: 50,
          }}>
          <Text
            style={{
              fontSize: 20,
              color: 'gray',
              fontFamily: Fonts.serif,
            }}>
            {t('khong_co_ket_qua')}
          </Text>
        </View>
      );
    } else if (seachData.length < 0) {
      <Loading />;
    }
    const arrDataSearch = Object.keys(seachData).map(key => {
      seachData[key].id = key;
      return seachData[key];
    });

    return (
      <View
        style={{
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          backgroundColor: 'white',
          flex: 1,
        }}>
        <FlatList
          data={arrDataSearch}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={this.ItemSeparatorComponent}
        />
      </View>
    );
  };

  render() {
    const seachData = this.props.dataSearch.dataStoresSearch;
    const isShowRecentSearch = this.state.isShowRecentSearch;

    const dataStore = this.props.stores.dataAllStores;
    console.log('dataStore', dataStore);

    return (
      <View style={{flex: 1, backgroundColor: '#F99A7C'}}>
        {this.renderHeader()}
        <ScrollView style={styles.container}>
          {isShowRecentSearch && this.renderRecentSearch()}
          {!isShowRecentSearch && this.renderListDataSearch()}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    marginHorizontal: 16,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: 'white',
    flex: 1,
  },
  title: {
    fontSize: 25,
  },
  titleOption: {
    fontSize: 20,
    marginTop: 4,
    borderBottomWidth: 1,
    marginVertical: 17,
    borderBottomColor: 'gray',
    color: 'gray',
  },

  back: {
    flex: 1,
    justifyContent: 'center',
  },

  styleViewProfile: {
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  styleImageProfile: {
    borderRadius: 150,
    width: 200,
    height: 200,
  },
  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderColor: '#d9d9d9',
    height: 40,
    borderRadius: 30,
    margin: 10,
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
  },
});

const mapStateToProps = state => {
  return {
    dataSearch: state.searchDatas,
    stores: state.stores,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onSearchStore: (key, token) => {
      dispatch(searchStore(key, token));
    },
    onDeleteKey: key => {
      dispatch(deleteKey(key));
    },
    onAddKey: key => {
      dispatch(addKey(key));
    },
    onGetAllStores: token => {
      dispatch(getAllStores(token));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
