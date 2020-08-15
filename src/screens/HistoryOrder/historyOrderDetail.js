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
import Success from 'react-native-vector-icons/AntDesign';
import Logo from '../../../assets/images/logo.png';
const {width, height} = Dimensions.get('window');
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
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
];

class HistoryOrderDetail extends Component {
  changScreenSidebar = () => {
    Navigation.mergeOptions('sideMenu', {
      sideMenu: {
        left: {
          visible: true,
        },
      },
    });
  };

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

  backMainScreen = () => {
    Navigation.dismissModal(this.props.componentId);
  };

  onStoreDetail = () => {
    alert('ok');
  };

  renderItem = ({item}) => {
    return (
      <View
        style={{
          flex: 1,
          paddingVertical: 10,
          paddingHorizontal: 10,
          flexDirection: 'row',
          borderBottomWidth: 2,
          borderBottomColor: '#eaeaea',
        }}>
        <View style={{flex: 1}}>
          <Image
            source={{uri: item.image}}
            style={{
              width: 60,
              height: 50,
              borderRadius: 10,
            }}
          />
        </View>

        <View
          style={{
            alignContent: 'flex-end',
          }}>
          <Text
            style={{
              color: '#5a5555',
              fontWeight: 'bold',
              fontSize: 20,
              alignSelf: 'flex-end',
            }}>
            {item.name}
          </Text>
          <Text
            style={{
              marginTop: 5,
              color: 'green',
              alignSelf: 'flex-end',
            }}>
            {item.price}
          </Text>
        </View>
      </View>
    );
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
                padding: 10,
                margin: 10,
                justifyContent: 'center',
                backgroundColor: 'white',
                borderRadius: 50,
                alignItems: 'center',
                maxHeight: 45,
                maxWidth: 45,
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
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: 'white',
                }}>
                Đơn hàng #8535495
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
              borderTopWidth: 10,
              borderTopColor: '#eaeaea',
              backgroundColor: 'white',
              padding: 12,
              borderBottomWidth: 15,
              borderBottomColor: '#eaeaea',
              alignItems: 'center',
              justifyContent: 'center',
              height: 120,
            }}>
            <Success
              name="checkcircleo"
              size={40}
              color="#57f307"
              onPress={() => this.backMainScreen()}
            />
            <Text
              style={{
                marginTop: 10,
                fontWeight: 'bold',
                fontSize: 15,
                fontFamily: Fonts.serif,
              }}>
              {t('da_den_tay_nguoi_nhan')}
            </Text>
          </View>

          <View
            style={{
              backgroundColor: 'white',
              padding: 12,
              height: 120,
              borderBottomWidth: 8,
              borderBottomColor: '#eaeaea',
            }}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
              }}>
              <Text
                style={{
                  flex: 1,
                  fontSize: 15,
                  fontWeight: 'bold',
                  fontFamily: Fonts.serif,
                }}>
                {t('ma_don_hang')}
              </Text>
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 15,
                  fontFamily: Fonts.serif,
                  alignItems: 'flex-end',
                }}>
                4532532532353
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
              }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 'bold',
                  flex: 1,
                  fontFamily: Fonts.serif,
                }}>
                {t('dat_hang_luc')}
              </Text>
              <Text
                style={{
                  marginLeft: 10,
                  alignItems: 'flex-end',
                  fontSize: 15,
                  fontFamily: Fonts.serif,
                }}>
                12-12-1212
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
              }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 'bold',
                  flex: 1,
                  fontFamily: Fonts.serif,
                }}>
                {t('tong_tien_d')}
              </Text>
              <Text
                style={{
                  marginLeft: 10,
                  alignItems: 'flex-end',
                  fontSize: 15,
                  fontFamily: Fonts.serif,
                }}>
                100.000 đ
              </Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: 'white',
              padding: 12,
              flexDirection: 'row',
            }}>
            <View
              style={{
                alignItems: 'center',
              }}>
              <Icon name="dot-circle-o" size={18} color="blue" />
              <View style={styles.dashLine} />
              <View style={styles.dashLine} />
              <View style={styles.dashLine} />
              <View style={styles.dashLine} />
              <View style={styles.dashLine} />
              <View style={styles.dashLine} />
            </View>

            <View style={{flex: 1, marginLeft: 15}}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  fontFamily: Fonts.serif,
                }}>
                Dieu Nail
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: Fonts.serif,
                }}>
                198 Nguyen Cong Tru, Da Nang Cong Tru, Da Nang
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: Fonts.serif,
                  }}>
                  {t('phone_title')}
                </Text>
                <Text
                  style={{
                    marginLeft: 10,
                    fontSize: 15,
                    fontFamily: Fonts.serif,
                  }}>
                  0909090909
                </Text>
              </View>
            </View>

            <View style={{alignContent: 'flex-end', flexDirection: 'row'}}>
              <TouchableWithoutFeedback onPress={this.onStoreDetail}>
                <Text
                  style={{
                    color: 'blue',
                    fontSize: 14,
                    textDecorationLine: 'underline',
                  }}>
                  {t('den_cua_hang')}
                </Text>
              </TouchableWithoutFeedback>
            </View>
          </View>

          <View
            style={{
              backgroundColor: 'white',
              padding: 12,
              borderBottomWidth: 8,
              flexDirection: 'row',
              borderBottomColor: '#eaeaea',
            }}>
            <View style={{marginTop: 3}}>
              <Entypo name="location" size={18} color="#f66" />
            </View>

            <View style={{flex: 1, marginLeft: 15}}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  fontFamily: Fonts.serif,
                }}>
                {t('khach_hang_title')}
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: Fonts.serif,
                }}>
                51 Le Huu Trac, Da Nang
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: Fonts.serif,
                  }}>
                  {t('name_title')}
                </Text>
                <Text
                  style={{
                    marginLeft: 10,
                    fontSize: 15,
                    fontFamily: Fonts.serif,
                  }}>
                  Nguyen Huu Tuan
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: Fonts.serif,
                  }}>
                  {t('phone_title')}
                </Text>
                <Text
                  style={{
                    marginLeft: 10,
                    fontSize: 15,
                    fontFamily: Fonts.serif,
                  }}>
                  0909090909
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              backgroundColor: 'white',
              padding: 12,
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 20,
                fontFamily: Fonts.serif,
              }}>
              {t('dich_vu')}
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

          <View
            style={{
              backgroundColor: 'white',
              padding: 12,
            }}>
            <Text
              style={{
                marginTop: 10,
                fontWeight: 'bold',
                fontSize: 15,
                fontFamily: Fonts.serif,
              }}>
              {t('lien_he_nail_app')}
            </Text>
            <Text
              style={{
                marginTop: 10,
                fontSize: 13,
                fontFamily: Fonts.serif,
              }}>
              {t('mo_ta_ho_tro')}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
              }}>
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: Fonts.serif,
                }}>
                {t('hot_line')}
              </Text>
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 13,
                  fontWeight: 'bold',
                  fontFamily: Fonts.serif,
                }}>
                {t('app_phone')}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
              }}>
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: Fonts.serif,
                }}>
                {t('app_email_title')}
              </Text>
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 13,
                  fontWeight: 'bold',
                  fontFamily: Fonts.serif,
                }}>
                {t('app_email')}
              </Text>
            </View>
          </View>
        </ScrollView>

        <View
          style={{
            borderTopWidth: 3,
            borderTopColor: '#eaeaea',
            height: 70,
            justifyContent: 'center',
          }}>
          <LinearGradient
            colors={['#e511e8', '#F99A7C']}
            start={{x: 0, y: 1}}
            end={{x: 1, y: 0}}
            style={{
              paddingVertical: 10,
              paddingHorizontal: 110,
              borderRadius: 10,
              marginHorizontal: 10,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Success name="reload1" size={20} color="white" />
            <TouchableWithoutFeedback onPress={this.onContinued}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: 'white',
                  textAlign: 'center',
                  fontFamily: Fonts.serif,
                  marginLeft: 10,
                }}>
                Tiếp tục
              </Text>
            </TouchableWithoutFeedback>
          </LinearGradient>
        </View>
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
  dashLine: {
    height: 5,
    width: 1.5,
    marginTop: 6,
    backgroundColor: 'gray',
  },
});

export default HistoryOrderDetail;
