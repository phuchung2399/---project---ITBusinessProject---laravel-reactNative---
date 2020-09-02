import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import Input from '../../components/Input';
import {onSignIn} from '../../navigation';
import LinearGradient from 'react-native-linear-gradient';
import Logo from '../../../assets/images/logo.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import {t} from '../../i18n/t';
const {height} = Dimensions.get('window');

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_name: '',
      email: '',
      phone: '',
      password: '',
      confirmPass: '',
      errorName: '',
      errorEmail: '',
      errorPhoneNumber: '',
      errorPassword: '',
      errorConfirmPass: '',
    };
  }

  onRestart = () => {
    this.setState({
      errorName: '',
      errorEmail: '',
      errorPhoneNumber: '',
      errorPassword: '',
      errorConfirmPass: '',
    });
  };

  onSignin = () => {
    onSignIn();
  };

  onSignUp = event => {
    var {user_name, email, phone, password, confirmPass} = this.state;
    const formatEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    this.onRestart();

    if (user_name === '') {
      this.setState({errorName: 'Nhập tên!'});
    } else if (email === '') {
      this.setState({errorEmail: 'Nhập email!'});
    } else if (formatEmail.test(email) === false) {
      this.setState({errorEmail: 'Email không hợp lệ!'});
    } else if (phone === '') {
      this.setState({errorPhoneNumber: 'Nhập số điện thoại!'});
    } else if (isNaN(phone)) {
      this.setState({errorPhoneNumber: 'Số điện thoại không hợp lệ!'});
    } else if (phone.length > 10 || phone.length < 10) {
      this.setState({errorPhoneNumber: 'Số điện thoại không hợp lệ!'});
    } else if (password === '') {
      this.setState({errorPassword: 'Nhập password!'});
    } else if (password.length < 8) {
      this.setState({errorPassword: 'Password không hợp lệ!'});
    } else if (password.length > 64) {
      this.setState({errorPassword: 'Password không hợp lệ!'});
    } else if (confirmPass != password) {
      this.setState({errorConfirmPass: 'Password không khớp!'});
    } else {
      const data = {
        user_name,
        email,
        phone,
        password,
        confirm_password: password,
      };
      this.onHandleSignUp(data);
    }
  };

  onHandleSignUp = async dataUser => {
    var data = new FormData();

    data.append('user_name', dataUser.user_name);
    data.append('email', dataUser.email);
    data.append('phone', dataUser.phone);
    data.append('password', dataUser.password);
    data.append('confirm_password', dataUser.password);

    return fetch('http://13.124.107.54/api/v1/user/register', {
      method: 'POST',
      body: data,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => response.json())
      .then(responseData => {
        if (responseData.status === 200) {
          this.onChangeUploadScreen(dataUser);
        } else if (responseData.errors.email) {
          this.setState({
            errorEmail: responseData.errors.email[0],
          });
        } else if (responseData.errors.phone) {
          this.setState({
            errorPhoneNumber: responseData.errors.phone[0],
          });
        }
      })
      .catch(error => {
        console.log('Error', error);
      });
  };

  onChangeUploadScreen = data => {
    Navigation.showModal({
      component: {
        name: 'Announcement',
        passProps: {
          data: data,
        },
      },
    });
  };

  getData = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  renderHeader = () => {
    return (
      <LinearGradient colors={['#FC5895', '#F99A7C', '#F99A7C']}>
        <View style={style.headerView}>
          <Text style={style.txtBrandName}>{t('brand_name')}</Text>
        </View>
      </LinearGradient>
    );
  };

  renderTitle = () => {
    return (
      <>
        <Text
          style={{
            fontSize: 50,
            fontWeight: 'bold',
            textAlign: 'center',
            marginTop: '10%',
            marginBottom: 15,
          }}>
          {t('txtSignUp')}
        </Text>
      </>
    );
  };

  renderInput = () => {
    var {
      errorName,
      errorEmail,
      errorPhoneNumber,
      errorPassword,
      errorConfirmPass,
    } = this.state;
    return (
      <>
        <Input
          getData={e => this.getData('user_name', e)}
          title="Tên đăng nhập *"
          placeholder="Tên đăng nhập..."
          error={errorName}
        />
        <Input
          getData={e => this.getData('email', e)}
          title="Email*"
          placeholder="Nhập email..."
          error={errorEmail}
          keyboardType={'email-address'}
        />
        <Input
          getData={e => this.getData('phone', e)}
          title="Số điện thoại*"
          placeholder="Nhập số điện thoại..."
          error={errorPhoneNumber}
          keyboardType="numeric"
        />
        <Input
          getData={e => this.getData('password', e)}
          title="Mật khẩu *"
          placeholder="Nhập mật khẩu..."
          error={errorPassword}
          returnKeyType="go"
          secureTextEntry={true}
          autoCorrect={false}
        />
        <Input
          getData={e => this.getData('confirmPass', e)}
          title="Xác nhận mật khẩu *"
          placeholder="Xác nhận mật khẩu..."
          error={errorConfirmPass}
          returnKeyType="go"
          secureTextEntry={true}
          autoCorrect={false}
        />
      </>
    );
  };

  renderButtunSignUp = () => {
    return (
      <>
        <LinearGradient
          colors={['#e511e8', '#F99A7C']}
          start={{x: 0, y: 1}}
          end={{x: 1, y: 0}}
          style={style.btnSignUp}>
          <TouchableOpacity onPress={this.onSignUp}>
            <Text style={style.txtSignUp}>{t('txtSignUp')}</Text>
          </TouchableOpacity>
        </LinearGradient>
      </>
    );
  };

  renderButtonBackSignIn = () => {
    return (
      <>
        <View style={style.viewBack}>
          <Icon
            name="angle-left"
            size={40}
            color="blue"
            onPress={() => this.changScreenSearch()}
          />
          <TouchableOpacity onPress={this.onSignin}>
            <Text style={style.txtBack}>{t('txt_da_co_tai_khoan')}</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  renderLogo = () => {
    return (
      <>
        <Image style={style.logo} source={Logo} />
      </>
    );
  };

  render() {
    return (
      <ScrollView style={style.container}>
        {this.renderHeader()}
        <View style={style.ViewContainer}>
          {this.renderTitle()}
          {this.renderInput()}
          {this.renderButtunSignUp()}
          {this.renderButtonBackSignIn()}
        </View>
        {this.renderLogo()}
      </ScrollView>
    );
  }
}

const style = StyleSheet.create({
  headerView: {
    flex: 1,
    alignItems: 'center',
    height: height / 5,
  },
  txtBrandName: {
    fontSize: 50,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: '#F99A7C',
  },
  ViewContainer: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: 'white',
  },
  btnSignUp: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 25,
  },
  logo: {
    width: 150,
    height: 150,
    position: 'absolute',
    right: '30%',
    top: '10%',
    overflow: 'hidden',
  },
  viewBack: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  txtBack: {
    color: 'blue',
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginHorizontal: 12,
  },
  txtSignUp: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    flex: 1,
    margin: 7,
  },
});

export default SignUp;
