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
} from 'react-native';
import Input from '../../components/Input';
import Logo from '../../../assets/images/logo.png';

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
      <ScrollView style={{flex: 1}}>
        <SafeAreaView style={{height: 350, backgroundColor: 'pink'}}>
          <View
            style={{
              flex: 1,
              marfinTop: 50,
              marginRight: 20,
              marginLeft: 20,
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 50, fontWeight: 'bold'}}>Nails</Text>
            <Image style={{width: 170, height: 170}} source={Logo} />
          </View>
        </SafeAreaView>
        {/* <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 30, fontWeight: 'bold'}}>Đăng nhập</Text>
        </View>

        <View style={{flex: 1, margin: 10}}>
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
            marginTop: 30,
            flexDirection: 'row',
          }}>
          <TouchableWithoutFeedback onPress={this.onSignUp}>
            <Text
              style={{
                color: 'blue',
                fontSize: 15,
                textDecorationLine: 'underline',
                marginHorizontal: 12,
                padding: 15,
              }}>
              Đăng kí
            </Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={this.onSignUp}>
            <Text
              style={{
                color: 'blue',
                marginHorizontal: 12,
                fontSize: 15,
                textDecorationLine: 'underline',
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
              margin: 10,
            }}>
            <View>
              <Text>_________________________</Text>
            </View>
            <View>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                Đăng kí với
              </Text>
            </View>
            <View>
              <Text>_________________________</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              margin: 10,
              marginBottom: 40,
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
        </View> */}
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
