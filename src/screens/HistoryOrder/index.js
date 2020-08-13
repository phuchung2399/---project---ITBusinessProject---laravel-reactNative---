import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {Navigation} from 'react-native-navigation';
import LinearGradient from 'react-native-linear-gradient';
import {t} from '../../i18n/t';
import Icon from 'react-native-vector-icons/FontAwesome';
import Logo from '../../../assets/images/logo.png';
const {width, height} = Dimensions.get('window');
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Fonts from '../../themers/Fonts';

var data = [
  {
    name: 'Co van banh mi ga',
    image: 'https://saida-nails.de/images/content/studio5.jpg',
    rating: 3,
    price: '12.000 đ',
  },
  {
    name: 'Nail mai',
    image: 'https://saida-nails.de/images/content/studio5.jpg',
    rating: 5,
    price: '12.000 đ',
  },
  {
    name: 'Huu Tuan Nail',
    image: 'https://saida-nails.de/images/content/studio5.jpg',
    rating: 4,
    price: '12.000 đ',
  },
  {
    name: 'Mong tay thiet ke tinh xao',
    image: 'https://saida-nails.de/images/content/studio5.jpg',
    rating: 2,
    price: '12.000 đ',
  },
  {
    name: 'Mong tay thiet ke tinh xao',
    image: 'https://saida-nails.de/images/content/studio5.jpg',
    rating: 5,
    price: '12.000 đ',
  },
];

class index extends Component {
  changScreenSidebar = () => {
    Navigation.mergeOptions('sideMenu', {
      sideMenu: {
        left: {
          visible: true,
        },
      },
    });
  };

  // onContinued = () => {
  //   alert('ok');
  // };

  onContinued = () => {
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

  ItemSeparatorComponent = () => {
    return (
      <View
        style={{
          height: 10,
        }}
      />
    );
  };

  renderItem = ({item}) => {
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
        </View>
        <View
          style={{flex: 1, justifyContent: 'center', paddingHorizontal: 10}}>
          <Text style={{color: '#5a5555', fontWeight: 'bold', fontSize: 18}}>
            {item.name}
          </Text>
          <Text style={{color: '#5a5555', fontSize: 15}}>{item.name}</Text>

          <Text style={{marginTop: 10, color: 'green', fontWeight: 'bold'}}>
            {item.price}
          </Text>
        </View>

        <View
          style={{
            width: 90,
            height: 30,
            backgroundColor: 'blue',
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Text style={{color: 'white', fontWeight: 'bold', marginRight: 5}}>
            Đã giao
          </Text>
          <AntDesign name="checkcircleo" color="white" size={20} />
        </View>
      </LinearGradient>
    );
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

  render() {
    return (
      <View style={{flex: 1}}>
        <LinearGradient colors={['#FC5895', '#FC5895', '#F99A7C']}>
          <View
            style={{
              flexDirection: 'row',
              padding: 5,
              height: 80,
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
                flex: 6,
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <Text
                animation="zoomInUp"
                style={{
                  fontSize: 25,
                  fontWeight: 'bold',
                  color: 'white',
                }}>
                {t('lich_su_giao_dich')}
              </Text>
            </View>
            <View
              style={{
                alignItems: 'flex-end',
                flex: 1,
                justifyContent: 'center',
                alignContent: 'center',
                marginTop: -5,
              }}>
              <Image
                style={{
                  width: 50,
                  height: 50,
                }}
                source={Logo}
              />
            </View>
          </View>
        </LinearGradient>

        <ScrollView>
          <View
            style={{
              backgroundColor: 'white',
              padding: 12,
              borderBottomWidth: 5,
              borderBottomColor: '#eaeaea',
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 20,
                fontFamily: Fonts.serif,
              }}>
              Lịch sử đơn hàng
            </Text>
          </View>

          <View
            style={{
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              backgroundColor: 'white',
              flex: 1,
            }}>
            <FlatList
              data={data}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={this.ItemSeparatorComponent}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  noti: {
    color: '#4a4a4a',
    paddingTop: 15,
    fontSize: 33,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  top: {
    flex: 1,
  },
  bot: {
    flex: 9,
  },
  container: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 20,
    backgroundColor: 'white',
    flex: 1,
  },

  button: {
    margin: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 5,
    backgroundColor: '#AEDEF4',
  },
  text: {
    color: '#fff',
    fontSize: 15,
  },
  divider: {
    backgroundColor: '#eaeaea',
    height: 7,
    marginTop: 10,
  },
});

export default index;
