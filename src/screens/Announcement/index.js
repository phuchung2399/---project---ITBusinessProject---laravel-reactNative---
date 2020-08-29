import React, {Component} from 'react';
import {onSignUp} from './../../navigation';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import facebook_Icon from '../../../assets/images/facebook_icon.png';
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
} from 'react-native';
import Input from '../../components/Input';
import Logo from '../../../assets/images/logo.png';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import dl_Appstore from '../../../assets/images/dl_Appstore.png';
import {onSignIn} from '../../navigation';
import {t} from '../../i18n/t';

class Announcement extends Component {
  constructor(props) {
    super(props);
  }

  onSignUp = () => {
    alert('0k');
  };

  onSignin = () => {
    onSignIn();
  };

  render() {
    const dataUser = this.props.data;
    return (
      <LinearGradient colors={['#FC5895', '#F99A7C']}>
        <ScrollView style={{height: '100%'}}>
          <View
            style={{
              alignItems: 'center',
              flex: 1,
            }}>
            <Animatable.Text
              animation="zoomInUp"
              style={{
                fontSize: 50,
                fontWeight: 'bold',
                marginTop: 20,
                color: 'white',
              }}>
              {t('brand_name')}
            </Animatable.Text>
            <Text
              animation="zoomInUp"
              style={{
                fontSize: 35,
                fontWeight: 'bold',
                color: 'white',
              }}>
              Announcement
            </Text>
          </View>
          <Animatable.View
            animation="pulse"
            easing="ease-out"
            iterationCount="infinite"
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              padding: 20,
            }}>
            <Image
              style={{
                width: 170,
                height: 170,
              }}
              source={Logo}
            />
          </Animatable.View>
          <View
            style={{
              alignItems: 'center',
              flex: 1,
              marginVertical: 15,
            }}>
            <Text
              animation="zoomInUp"
              style={{
                fontSize: 35,
                fontWeight: 'bold',
                color: 'white',
              }}>
              Xin chào
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              marginHorizontal: 25,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {dataUser && (
              <Text
                animation="zoomInUp"
                style={{
                  fontSize: 22,
                  fontWeight: 'bold',
                  color: 'white',
                  textAlign: 'center',
                }}>
                {dataUser.user_name}
              </Text>
            )}
          </View>
          <View
            style={{
              flex: 1,
              marginHorizontal: 25,
              marginVertical: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              animation="zoomInUp"
              style={{
                fontSize: 17,
                fontWeight: 'bold',
                color: 'white',
                textAlign: 'center',
              }}>
              Vui lòng xác nhận tại khoản tại email vừa đăng kí
            </Text>
          </View>
          <View
            style={{
              flex: 2,
              justifyContent: 'center',
              paddingHorizontal: '20%',
              paddingVertical: 15,
            }}>
            <TouchableOpacity onPress={this.onSignin}>
              <Text
                style={{
                  borderWidth: 1,
                  borderRadius: 20,
                  fontSize: 24,
                  fontWeight: 'bold',
                  padding: 12,
                  textAlign: 'center',
                  backgroundColor: '#FC5895',
                  borderColor: 'pink',
                  color: 'white',
                }}>
                Đăng nhập ngay
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              marginVertical: '5%',
            }}>
            <View>
              <TouchableOpacity>
                <Image
                  source={require('../../../assets/images/dl_Appstore.png')}
                  style={{
                    width: 110,
                    height: 40,
                    marginHorizontal: 20,
                    borderRadius: 10,
                  }}
                />
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity>
                <Image
                  source={require('../../../assets/images/dl-gg.png')}
                  style={{
                    width: 115,
                    height: 42,
                    marginHorizontal: 20,
                    borderRadius: 10,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    );
  }
}

const style = StyleSheet.create({
  button: {
    borderWidth: 1.5,
    borderRadius: 20,
    fontSize: 24,
    fontWeight: 'bold',
    padding: 12,
    textAlign: 'center',
    flex: 1,
  },

  styleViewText: {},
  styleButtonSignUp: {},
});

export default Announcement;
