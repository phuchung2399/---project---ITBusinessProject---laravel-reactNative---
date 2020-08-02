import React, {Component} from 'react';
import {Text, View, Dimensions, Image, ScrollView} from 'react-native';
import {storageGet} from '../../checkAsyncStorage';
import Icon from 'react-native-vector-icons/FontAwesome';
const {width, height} = Dimensions.get('window');
import {Navigation} from 'react-native-navigation';
import Logo from '../../../assets/images/logo.png';
import {t} from '../../i18n/t';
import LinearGradient from 'react-native-linear-gradient';
import Fonts from '../../themers/Fonts';
import Colors from '../../themers/Colors';

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
              // backgroundColor: 'red',
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
            paddingHorizontal: 5,
            paddingVertical: 25,
            backgroundColor: 'white',
            margin: 20,
            flex: 1,
          }}>
          <View style={{alignItems: 'center', marginTop: '-23%'}}>
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
          </View>
          <View
            style={{
              marginHorizontal: 20,
              padding: 10,
              borderBottomWidth: 1,
              borderBottomColor: Colors.darkGray,
              marginTop: 10,
            }}>
            <Text
              style={{
                fontSize: 22,
                color: '#827d7d',
                fontFamily: Fonts.serif,
              }}>
              Tên
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontFamily: Fonts.serif,
              }}>
              {userInfor.user_name}
            </Text>
          </View>
          <View
            style={{
              marginHorizontal: 20,
              padding: 10,
              borderBottomWidth: 1,
              marginTop: 10,
              borderBottomColor: Colors.darkGray,
            }}>
            <Text
              style={{
                fontSize: 22,
                color: '#827d7d',
                fontFamily: Fonts.serif,
              }}>
              Số điện thoại
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontFamily: Fonts.serif,
              }}>
              {userInfor.phone}
            </Text>
          </View>

          <View
            style={{
              marginHorizontal: 20,
              padding: 10,
              borderBottomWidth: 1,
              marginTop: 10,
              borderBottomColor: Colors.darkGray,
            }}>
            <Text
              style={{
                fontSize: 22,
                color: '#827d7d',
                fontFamily: Fonts.serif,
              }}>
              Email
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontFamily: Fonts.serif,
              }}>
              {userInfor.email}
            </Text>
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
