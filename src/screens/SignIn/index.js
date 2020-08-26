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
  Dimensions,
} from 'react-native';
import Input from '../../components/Input';
import Logo from '../../../assets/images/logo.png';
import LinearGradient from 'react-native-linear-gradient';
import {t} from '../../i18n/t';
import {logIn} from '../../redux/userRedux/action';

const {width, height} = Dimensions.get('window');

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      phoneNumber: '0967258205',
      password: '123456789',
      // phoneNumber: '0779763016',
      // password: 'tuannui123',
      errorPhoneNumber: '',
      errorPassword: '',
    };
  }

  onRestart = () => {
    this.setState({
      errorPhoneNumber: '',
      errorPassword: '',
    });
  };

  onSignUp = () => {
    onSignUp();
  };

  onSignin = event => {
    var {phoneNumber, password} = this.state;
    let phone = phoneNumber.replace('.', '');
    this.onRestart();

    if (phoneNumber === '') {
      this.setState({errorPhoneNumber: 'Nhập số điện thoại!'});
    } else if (phoneNumber.length < 10 || phoneNumber.length > 10) {
      this.setState({errorPhoneNumber: 'Số điện thoại không hợp lệ!'});
    } else if (isNaN(phoneNumber)) {
      this.setState({errorPhoneNumber: 'Số điện thoại không hợp lệ!'});
    } else if (password === '') {
      this.setState({errorPassword: 'Nhập password!'});
    } else if (password.length < 8) {
      this.setState({errorPassword: 'Pasword không hợp lệ!'});
    } else if (password.length > 64) {
      this.setState({errorPassword: 'Pasword không hợp lệ!'});
    } else {
      var userAccount = {
        phone,
        password,
      };
      this.props.onLogInUser(userAccount);
    }
  };

  getData = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  render() {
    var {errorPhoneNumber, errorPassword} = this.state;
    return (
      <ScrollView style={{flex: 1, backgroundColor: '#F99A7C'}}>
        <LinearGradient colors={['#FC5895', '#F99A7C']}>
          <SafeAreaView
            style={{
              height: height / 4,
            }}>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 50,
                  fontWeight: 'bold',
                  marginTop: 10,
                  color: 'white',
                }}>
                {t('brand_name')}
              </Text>
            </View>
          </SafeAreaView>
        </LinearGradient>

        <View
          style={{
            flex: 1,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            paddingHorizontal: 20,
            paddingVertical: 30,
            backgroundColor: 'white',
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '18%',
              marginBottom: 20,
            }}>
            <Text style={{fontSize: 40, fontWeight: 'bold'}}>
              {t('txtLogin')}
            </Text>
          </View>

          <View style={{flex: 2, paddingHorizontal: 10}}>
            <Input
              getData={e => this.getData('phoneNumber', e)}
              title="Số điện thoại*"
              placeholder="Nhập số điện thoại..."
              error={errorPhoneNumber}
              keyboardType="numeric"
            />
            <Input
              getData={e => this.getData('password', e)}
              title=""
              placeholder="Mật khẩu"
              error={
                this.props.userData.error != ''
                  ? this.props.userData.error
                  : errorPassword
              }
              returnKeyType="go"
              secureTextEntry={true}
              autoCorrect={false}
              ref={'txtPassword'}
              // value={this.state.password}
            />

            <TouchableWithoutFeedback onPress={this.onSignin}>
              <Text
                style={{
                  ...style.button,
                  backgroundColor: '#e511e8',
                  borderColor: '#e511e8',
                  color: 'white',
                }}>
                Đăng nhập
              </Text>
            </TouchableWithoutFeedback>
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              marginTop: 10,
              flexDirection: 'row',
            }}>
            <TouchableWithoutFeedback onPress={this.onSignUp}>
              <Text
                style={{
                  color: 'blue',
                  fontSize: 16,
                  textDecorationLine: 'underline',
                  marginHorizontal: 12,
                  padding: 15,
                  fontWeight: 'bold',
                }}>
                Đăng kí
              </Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={this.onSignUp}>
              <Text
                style={{
                  color: 'blue',
                  marginHorizontal: 12,
                  fontSize: 16,
                  textDecorationLine: 'underline',
                  fontWeight: 'bold',
                }}>
                Quên mật khẩu?
              </Text>
            </TouchableWithoutFeedback>
          </View>

          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 15,
            }}>
            <View
              style={{
                flexDirection: 'row',
                margin: 5,
              }}>
              <View>
                <Text>_________________________ </Text>
              </View>
              <View>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                  Đăng kí với
                </Text>
              </View>
              <View>
                <Text> _________________________</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginVertical: 15,
              }}>
              <View>
                <TouchableOpacity onPress={() => this.onPress()}>
                  <Image
                    source={require('../../../assets/images/facebook_icon.png')}
                    style={{
                      width: 35,
                      height: 35,
                      backgroundColor: '#ababab',
                      marginHorizontal: 12,
                      borderRadius: 20,
                    }}
                  />
                </TouchableOpacity>
              </View>
              <View>
                <Text style={{fontSize: 20}}> or</Text>
              </View>
              <View>
                <TouchableOpacity onPress={() => this.onPress()}>
                  <Image
                    source={require('../../../assets/images/google_icon.jpg')}
                    style={{
                      width: 35,
                      height: 35,
                      backgroundColor: '#ababab',
                      marginHorizontal: 12,
                      borderRadius: 20,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View
          easing="ease-out"
          iterationCount="infinite"
          style={{
            position: 'absolute',
            right: '30%',
            top: '12%',
            overflow: 'hidden',
          }}>
          <Image
            style={{
              width: 170,
              height: 170,
            }}
            source={Logo}
          />
        </View>
      </ScrollView>
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
    marginTop: 15,
  },

  styleViewText: {},
  styleButtonSignUp: {},
});

const mapStateToProps = state => {
  return {
    userData: state.user,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onLogInUser: userAccount => {
      dispatch(logIn(userAccount));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
