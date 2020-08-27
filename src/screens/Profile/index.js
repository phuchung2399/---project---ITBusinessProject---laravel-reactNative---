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
import AntDesign from 'react-native-vector-icons/AntDesign';
const {width, height} = Dimensions.get('window');
import {Navigation} from 'react-native-navigation';
import Logo from '../../../assets/images/logo.png';
import {t} from '../../i18n/t';
import LinearGradient from 'react-native-linear-gradient';
import Fonts from '../../themers/Fonts';
import Colors from '../../themers/Colors';
import Avatar from 'react-avatar';

export default class Profile extends Component {
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
    console.log(this.state.user);
    const userInfor = this.state.user;
    return (
      <View style={{flex: 1, backgroundColor: '#F99A7C'}}>
        <LinearGradient colors={['#FC5895', '#FC5895', '#F99A7C']}>
          <View
            style={{
              padding: 10,
              flexDirection: 'row',
              height: height / 5,
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
                  fontSize: 30,
                  fontWeight: 'bold',
                  color: 'white',
                }}>
                {t('trang_ca_nhan')}
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
            margin: 20,
            flex: 1,
          }}>
          <View
            style={{alignItems: 'center', marginTop: '-17%', marginBottom: 12}}>
            {userInfor.avatar && (
              <Image
                style={{
                  width: 150,
                  height: 150,
                  borderWidth: 2,
                  borderColor: 'pink',
                  borderRadius: 80,
                }}
                source={{uri: userInfor.avatar}}
              />
            )}

            {/* {!userInfor.avatar && (
              <Avatar githubHandle="sitebase" size={150} round="20px" />
            )} */}
          </View>

          <View
            style={{
              borderTopWidth: 5,
              borderTopColor: '#eaeaea',
              backgroundColor: 'white',
              padding: 12,
              borderBottomWidth: 10,
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
                  fontSize: 17,
                  fontWeight: 'bold',
                  fontFamily: Fonts.serif,
                }}>
                {t('thong_tin_ca_nhan')}
              </Text>

              <View style={{alignContent: 'flex-end', flexDirection: 'row'}}>
                <TouchableWithoutFeedback
                  onPress={() => this.onNavigateStore()}>
                  <Text
                    style={{
                      color: 'green',
                      fontSize: 14,
                      // textDecorationLine: 'underline',
                    }}>
                    {t('thay_doi')}
                  </Text>
                </TouchableWithoutFeedback>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 7,
              }}>
              <AntDesign
                name="user"
                size={22}
                color="black"
                onPress={() => this.backMainScreen()}
              />
              <Text
                style={{
                  marginLeft: 10,
                  alignItems: 'flex-end',
                  fontSize: 15,
                  fontFamily: Fonts.serif,
                }}>
                {userInfor.user_name}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 8,
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
                }}>
                {userInfor.email}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 8,
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
                  color: '#827d7d',
                }}>
                {t('chua_cap_nhat')}
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
                {t('phone_title')}
              </Text>

              <View style={{alignContent: 'flex-end', flexDirection: 'row'}}>
                <TouchableWithoutFeedback
                  onPress={() => this.onNavigateStore()}>
                  <Text
                    style={{
                      color: 'green',
                      fontSize: 14,
                      // textDecorationLine: 'underline',
                    }}>
                    {t('thay_doi')}
                  </Text>
                </TouchableWithoutFeedback>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
              }}>
              <AntDesign
                name="phone"
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
                }}>
                {userInfor.phone}
              </Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: 'white',
              padding: 12,
              borderBottomWidth: 7,
              borderBottomColor: '#eaeaea',
              flexDirection: 'row',
              marginTop: 5,
            }}>
            <AntDesign
              name="lock1"
              size={20}
              color="black"
              onPress={() => this.backMainScreen()}
            />

            <Text
              style={{
                marginLeft: 10,
                flex: 1,
                alignItems: 'flex-end',
                fontSize: 15,
                fontFamily: Fonts.serif,
              }}>
              {t('doi_mat_khau')}
            </Text>

            <AntDesign
              name="right"
              size={22}
              color="black"
              onPress={() => this.backMainScreen()}
            />
          </View>
        </View>

        <LinearGradient colors={['#F99A7C', '#FC5895']}>
          <View
            style={{
              padding: 10,
              flexDirection: 'row',
              height: height / 11,
            }}
          />
        </LinearGradient>
      </View>
    );
  }
}
