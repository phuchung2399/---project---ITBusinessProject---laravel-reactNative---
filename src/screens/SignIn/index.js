import React, {Component} from 'react';
import {onSignUp} from './../../navigation';
import facebook_Icon from '../../../assets/images/facebook_icon.png';
import googleIcon from '../../../assets/images/google_icon.jpg';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import Input from '../../components/Input';
import Logo from '../../../assets/images/logo.png';
import LinearGradient from 'react-native-linear-gradient';
import {t} from '../../i18n/t';
import Fonts from '../../themers/Fonts';
import Colors from '../../themers/Colors';
const {height} = Dimensions.get('window');
import * as config from '../../api/config';
import {storageSet} from '../../checkAsyncStorage';
import {onChangeIntoMainScreen} from '../../navigation';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: '0967258205',
      password: '123456789',
      // phoneNumber: '0765301358',
      // password: '123123123',
      // phoneNumber: '',
      // password: '',
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

    var userAccount = {
      phone,
      password,
    };
    this.onHandleSignIn(userAccount);
  };

  onHandleSignIn = async dataUser => {
    return fetch(`${config.API_URL}/api/v1/user/login`, {
      method: 'POST',
      body: JSON.stringify(dataUser),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseData => {
        if (responseData.errors) {
          const errors = responseData.errors;
          if (errors.phone) {
            this.setState({errorPhoneNumber: errors.phone[0]});
          }
          if (errors.password) {
            this.setState({errorPassword: errors.password[0]});
          }
        } else if (responseData.data) {
          const response = responseData.data;
          console.log(responseData.data.store);
          let number = responseData.data.user.user_id;
          if (response.status && response.status === 200) {
            try {
              storageSet('user', JSON.stringify(responseData));
              storageSet('number', String(number));
            } catch (e) {
              console.log('Login failed', e);
            }
            onChangeIntoMainScreen();
          }
        } else if (responseData.status) {
          if (responseData.status === 400) {
            this.setState({errorPassword: responseData.message});
          }
        }
      })
      .catch(error => {
        console.log('Error', error);
      });
  };

  getData = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  onPress = () => {
    Alert.alert('Thông báo!', 'Chưa hỗ trợ');
  };

  onForgotPass = () => {
    Alert.alert('Thông báo!', 'Chưa hỗ trợ');
  };

  renderHeader = () => {
    return (
      <LinearGradient colors={[Colors.pink, Colors.orrange]}>
        <View style={style.headerView}>
          <Text style={style.branchText}>{t('brand_name')}</Text>
        </View>
      </LinearGradient>
    );
  };

  renderLogo = () => {
    return (
      <View style={style.viewLogo}>
        <Image style={style.logo} source={Logo} />
      </View>
    );
  };

  renderFooter = () => {
    return (
      <View style={style.containerFooter}>
        <View style={style.line}>
          <Text>{t('line')} </Text>
          <Text style={style.signUpWith}>{t('dang_ki_voi')}</Text>
          <Text>{t('line')}</Text>
        </View>
        <View style={style.line}>
          <TouchableOpacity onPress={() => this.onPress()}>
            <Image source={facebook_Icon} style={style.imageIcon} />
          </TouchableOpacity>
          <Text style={style.signUpWith}> or</Text>
          <TouchableOpacity onPress={() => this.onPress()}>
            <Image source={googleIcon} style={style.imageIcon} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  renderButton = () => {
    return (
      <>
        <TouchableOpacity onPress={this.onSignin}>
          <Text style={style.button}>{t('txtLogin')}</Text>
        </TouchableOpacity>
        <View style={style.viewMethodSignUp}>
          <TouchableOpacity onPress={this.onSignUp}>
            <Text style={style.methodSignUp}>{t('txtSignUp')}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onForgotPass}>
            <Text style={style.methodSignUp}>{t('forgot_pass')}</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  renderInput = () => {
    const {errorPhoneNumber, errorPassword} = this.state;

    return (
      <>
        <Text style={style.title}>{t('txtLogin')}</Text>
        <Input
          getData={e => this.getData('phoneNumber', e)}
          title="Số điện thoại*"
          placeholder="Nhập số điện thoại..."
          error={errorPhoneNumber}
          keyboardType="numeric"
          onSubmitEditing={this.onSignin}
        />
        <Input
          getData={e => this.getData('password', e)}
          title=""
          placeholder="Nhập mật khẩu..."
          error={errorPassword}
          returnKeyType="go"
          secureTextEntry={true}
          autoCorrect={false}
          ref={'txtPassword'}
          onSubmitEditing={this.onSignin}
        />
      </>
    );
  };

  render() {
    return (
      <ScrollView style={style.scroolView}>
        {this.renderHeader()}
        <View style={style.viewInput}>
          {this.renderInput()}
          {this.renderButton()}
          {this.renderFooter()}
        </View>
        {this.renderLogo()}
      </ScrollView>
    );
  }
}

const style = StyleSheet.create({
  button: {
    backgroundColor: '#e511e8',
    borderColor: '#e511e8',
    color: Colors.white,
    borderWidth: 1.5,
    borderRadius: 20,
    fontSize: 24,
    fontWeight: 'bold',
    padding: 12,
    textAlign: 'center',
    flex: 1,
  },
  scroolView: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerView: {
    flex: 1,
    height: height / 5,
    alignItems: 'center',
  },
  branchText: {
    fontSize: 50,
    fontWeight: 'bold',
    marginTop: 5,
    color: Colors.white,
    fontFamily: Fonts.serif,
  },
  viewLogo: {
    position: 'absolute',
    right: '30%',
    top: '12%',
    overflow: 'hidden',
  },
  logo: {
    width: 170,
    height: 170,
  },
  imageIcon: {
    width: 35,
    height: 35,
    marginHorizontal: 12,
    borderRadius: 20,
  },
  containerFooter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  line: {
    flexDirection: 'row',
    margin: 5,
  },
  signUpWith: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  viewInput: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: Colors.white,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    marginTop: 80,
    marginBottom: 20,
  },
  methodSignUp: {
    color: 'blue',
    fontSize: 16,
    textDecorationLine: 'underline',
    marginHorizontal: 12,
    padding: 15,
    fontWeight: 'bold',
  },
  viewMethodSignUp: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginTop: 5,
    flexDirection: 'row',
  },
});

export default SignIn;
