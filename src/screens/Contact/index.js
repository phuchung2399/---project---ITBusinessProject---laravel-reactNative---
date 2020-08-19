import React, {Component} from 'react';
import {
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {storageGet} from '../../checkAsyncStorage';
import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
const {width, height} = Dimensions.get('window');
import {Navigation} from 'react-native-navigation';
import Logo from '../../../assets/images/logo.png';
import {t} from '../../i18n/t';
import LinearGradient from 'react-native-linear-gradient';
import Fonts from '../../themers/Fonts';
import Colors from '../../themers/Colors';

export default class index extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
    };
  }

  componentDidMount() {
    this.getUserInfor();
  }

  getUserInfor = async () => {
    try {
      let getUserAccount = await storageGet('user');
      let parsedUser = JSON.parse(getUserAccount);
      if (parsedUser) {
        this.setState({user: parsedUser.data.user});
      }
    } catch (error) {
      // alert(error);
    }
  };

  backMainScreen = () => {
    Navigation.dismissModal(this.props.componentId);
  };

  render() {
    const userInfor = this.state.user;
    return (
      <View style={{flex: 1, backgroundColor: '#F99A7C'}}>
        <LinearGradient colors={['#FC5895', '#FC5895', '#F99A7C']}>
          <View
            style={{
              padding: 10,
              flexDirection: 'row',
              height: 80,
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
              }}>
              <Text
                animation="zoomInUp"
                style={{
                  fontSize: 23,
                  fontWeight: 'bold',
                  color: 'white',
                  fontFamily: Fonts.serif,
                }}>
                {t('lien_he_app')}
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
        </LinearGradient>

        <View
          style={{
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
            backgroundColor: 'white',
            margin: 15,
            flex: 1,
          }}>
          <View style={{alignItems: 'center', marginTop: 13, marginBottom: 12}}>
            <Image
              style={{
                width: 150,
                height: 150,
                borderWidth: 2,
                borderColor: 'pink',
                borderRadius: 80,
              }}
              source={Logo}
            />
          </View>

          <View
            style={{
              borderTopWidth: 5,
              borderTopColor: '#eaeaea',
              backgroundColor: 'white',
              padding: 12,
              borderBottomWidth: 5,
              borderBottomColor: '#eaeaea',
            }}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
                marginBottom: 5,
              }}>
              <Text
                style={{
                  flex: 1,
                  fontSize: 15,
                  fontFamily: Fonts.serif,
                }}>
                {t('des')}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
                marginBottom: 5,
              }}>
              <Text
                style={{
                  flex: 1,
                  fontSize: 17,
                  fontWeight: 'bold',
                  fontFamily: Fonts.serif,
                }}>
                {t('tong_dai_txt')}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
              }}>
              <Feather
                name="phone-call"
                size={22}
                color="black"
                onPress={() => this.backMainScreen()}
              />
              <Text
                style={{
                  marginLeft: 10,
                  alignItems: 'flex-end',
                  fontSize: 15,
                  color: 'blue',
                  fontFamily: Fonts.serif,
                }}>
                1900.909.980
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
              }}>
              <AntDesign
                name="mail"
                size={20}
                color="black"
                onPress={() => this.backMainScreen()}
              />
              <Text
                style={{
                  marginLeft: 10,
                  alignItems: 'flex-end',
                  fontSize: 15,
                  fontFamily: Fonts.serif,
                  color: 'blue',
                }}>
                hotrothenail@beauty.vn
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
              }}>
              <AntDesign
                name="profile"
                size={20}
                color="black"
                onPress={() => this.backMainScreen()}
              />
              <Text
                style={{
                  marginLeft: 10,
                  alignItems: 'flex-end',
                  fontSize: 15,
                  fontFamily: Fonts.serif,
                  color: 'blue',
                }}>
                https://www.facebook.com/TheNailVN
              </Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: 'white',
              padding: 12,
              borderBottomWidth: 7,
              borderBottomColor: '#eaeaea',
            }}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  flex: 1,
                  fontSize: 17,
                  fontWeight: 'bold',
                  fontFamily: Fonts.serif,
                }}>
                {t('tong_dai_ho_tro')}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
              }}>
              <Feather name="phone-call" size={20} color="black" />
              <Text
                style={{
                  marginLeft: 10,
                  alignItems: 'flex-end',
                  fontSize: 15,
                  fontFamily: Fonts.serif,
                  color: 'blue',
                }}>
                1900.678.098
              </Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: 'white',
              padding: 12,
              borderBottomWidth: 7,
              borderBottomColor: '#eaeaea',
            }}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  flex: 1,
                  fontSize: 17,
                  fontWeight: 'bold',
                  fontFamily: Fonts.serif,
                }}>
                {t('tong_dai_support_store')}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
              }}>
              <Feather name="phone-call" size={20} color="black" />
              <Text
                style={{
                  marginLeft: 10,
                  alignItems: 'flex-end',
                  fontSize: 15,
                  fontFamily: Fonts.serif,
                  color: 'blue',
                }}>
                1900.678.098
              </Text>
            </View>
          </View>

          <Text
            style={{
              fontSize: 14,
              colo: 'gray',
              textAlign: 'center',
              fontFamily: Fonts.serif,
              marginTop: 17,
            }}>
            Xin cảm ơn!
          </Text>
        </View>

        <LinearGradient colors={['#F99A7C', '#FC5895']}>
          <View
            style={{
              padding: 10,
              flexDirection: 'row',
              height: 30,
            }}
          />
        </LinearGradient>
      </View>
    );
  }
}
