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

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      grant_type: 'password',
      email: '',
      password: '',
      errorEmail: '',
      errorPassword: '',
    };
  }

  onRestart = () => {
    this.setState({
      errorEmail: '',
      errorPassword: '',
    });
  };

  onSignUp = () => {
    onSignUp();
  };

  onSignin = event => {
    var {email, password} = this.state;
    const formatEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    this.onRestart();

    if (email === '') {
      this.setState({errorEmail: 'Nhập Email!'});
    }

    if (formatEmail.test(email) === false) {
      this.setState({errorEmail: 'Email is not valid!'});
    }
    if (password === '') {
      this.setState({errorPassword: 'Nhập password!'});
    }
    if (password.length < 8) {
      this.setState({errorPassword: 'Pasword không hợp lệ!'});
    }
    if (password.length > 64) {
      this.setState({errorPassword: 'Pasword không hợp lệ!'});
    } else {
      var user = {
        grant_type: this.state.grant_type,
        email: this.state.email,
        password: this.state.password,
      };
      // console.log(user);

      //   this.props.onLogInUser(user);
    }
  };

  getData = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  render() {
    var {errorEmail, errorPassword} = this.state;
    return (
      <ScrollView style={{flex: 1, backgroundColor: '#F99A7C'}}>
        <LinearGradient colors={['#FC5895', '#F99A7C']}>
          <SafeAreaView
            style={{
              height: 190,
            }}>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
              }}>
              <Animatable.Text
                animation="zoomInUp"
                style={{
                  fontSize: 50,
                  fontWeight: 'bold',
                  marginTop: 20,
                  color: 'white',
                }}>
                Nails
              </Animatable.Text>
            </View>
          </SafeAreaView>
        </LinearGradient>

        <Animatable.View
          animation="pulse"
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
              marginTop: '15%',
              marginBottom: 20,
            }}>
            <Animatable.Text style={{fontSize: 50, fontWeight: 'bold'}}>
              Đăng nhập
            </Animatable.Text>
          </View>

          <View style={{flex: 2, paddingHorizontal: 10}}>
            <Input
              getData={e => this.getData('email', e)}
              title=""
              placeholder="Tên đăng nhập"
              autoCorrect={false}
              keyboardType="email-address"
              // onSubmitEditing={() => this.ref.txtPassword.focus()}
              error={errorEmail}
            />
            <Input
              getData={e => this.getData('password', e)}
              title=""
              placeholder="Mật khẩu"
              error={errorPassword}
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
                margin: 10,
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
          {/* </View> */}
        </Animatable.View>

        <Animatable.View
          animation="pulse"
          easing="ease-out"
          iterationCount="infinite"
          style={{
            position: 'absolute',
            right: '30%',
            top: '14%',
            overflow: 'hidden',
          }}>
          <Image
            style={{
              width: 170,
              height: 170,
            }}
            source={Logo}
          />
        </Animatable.View>
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
  },

  styleViewText: {},
  styleButtonSignUp: {},
});

export default SignIn;
