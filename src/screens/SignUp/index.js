import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import Input from '../../components/Input';
import {onSignIn} from '../../navigation';
import IconLogin from '../../../assets/images/login_image.png';
import {connect} from 'react-redux';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      confirmPass: '',
      errorFirstName: '',
      errorLastName: '',
      errorEmail: '',
      errorPhoneNumber: '',
      errorPassword: '',
      errorConfirmPass: '',
    };
  }

  onRestart = () => {
    this.setState({
      errorFirstName: '',
      errorLastName: '',
      errorEmail: '',
      errorPhoneNumber: '',
      errorPassword: '',
      errorConfirmPass: '',
    });
  };

  onSignin = () => {
    onSignIn();
  };

  onHandleSubmit = event => {
    var {
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
      confirmPass,
    } = this.state;

    const formatEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    this.onRestart();

    if (firstName === '') {
      this.setState({errorFirstName: 'Enter first name!'});
    }
    if (lastName === '') {
      this.setState({errorLastName: 'Enter last name!'});
    }
    if (phoneNumber === '') {
      this.setState({errorPhoneNumber: 'Enter phone number!'});
    }
    if (isNaN(phoneNumber)) {
      this.setState({errorPhoneNumber: 'Phone number is not valid!'});
    }
    if (phoneNumber.length > 10) {
      this.setState({errorPhoneNumber: 'Phone number is not valid!'});
    }
    if (phoneNumber.length < 10) {
      this.setState({errorPhoneNumber: 'Phone number is not valid!'});
    }
    if (email === '') {
      this.setState({errorEmail: 'Enter email!'});
    }
    if (formatEmail.test(email) === false) {
      this.setState({errorEmail: 'Email is not valid!'});
    }

    if (password === '') {
      this.setState({errorPassword: 'Enter password!'});
    }
    if (password.length < 8) {
      this.setState({errorPassword: 'Password is not valid!'});
    }
    if (password.length > 64) {
      this.setState({errorPassword: 'Password is not valid!'});
    }
    if (confirmPass != password) {
      this.setState({errorConfirmPass: 'Password does not match!'});
    }

    const data = {
      FirstName: firstName,
      LastName: lastName,
      PhoneNumber: phoneNumber,
      Email: email,
      Password: password,
    };
    // console.log(this.state);
    // this.props.register(data);
  };

  getData = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  render() {
    var {
      errorFirstName,
      errorLastName,
      errorEmail,
      errorPhoneNumber,
      errorPassword,
      errorConfirmPass,
    } = this.state;

    return (
      <ScrollView orientation="vertical">
        <View style={style.styleViewImage}>
          <Image style={style.styleImage} source={IconLogin} />
        </View>
        <View style={style.container}>
          <Input
            getData={e => this.getData('firstName', e)}
            title="Tên đầu tiên *"
            placeholder="Nhập tên đầu tiên..."
            error={errorFirstName}
          />
          <Input
            getData={e => this.getData('lastName', e)}
            title="Tên cuối *"
            placeholder="Nhập tên cuối..."
            error={errorLastName}
          />
          <Input
            getData={e => this.getData('phoneNumber', e)}
            title="Số điện thoại*"
            placeholder="Nhập số điện thoại..."
            error={errorPhoneNumber}
            keyboardType="numeric"
          />
          <Input
            getData={e => this.getData('email', e)}
            title="Email*"
            placeholder="Nhập email..."
            error={errorEmail}
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
            placeholder="Xác nhận mật khẩu ..."
            error={errorConfirmPass}
            returnKeyType="go"
            secureTextEntry={true}
            autoCorrect={false}
          />

          <View style={style.styleViewButton}>
            <TouchableWithoutFeedback onPress={this.onSignin}>
              <Text
                style={{
                  ...style.button,
                  backgroundColor: 'white',
                  borderColor: 'blue',
                  color: 'gray',
                }}>
                Đăng nhập
              </Text>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={this.onHandleSubmit}>
              <Text
                style={{
                  ...style.button,
                  backgroundColor: '#2bb6f9',
                  borderColor: 'blue',
                  color: 'white',
                }}>
                Đăng kí
              </Text>
            </TouchableWithoutFeedback>
          </View>

          <View style={style.styleViewText}>
            <Text style={style.styleTextBottom}>
              Bằng việc xác nhận tạo tài khoản, bạn đã đồng ý với các
              <TouchableWithoutFeedback onPress={this.onLogIn}>
                <Text style={style.styleButtonCommit}>
                  {' '}
                  điều khoản quy định{' '}
                </Text>
              </TouchableWithoutFeedback>
              của chúng tôi
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const style = StyleSheet.create({
  styleViewButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  styleViewText: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginBottom: 50,
    marginHorizontal: 20,
  },
  styleTextBottom: {
    fontSize: 17,
    color: 'gray',
    textAlign: 'center',
  },
  styleButtonCommit: {
    color: '#2bb6f9',
    fontWeight: 'bold',
    fontSize: 17,
  },
  container: {
    justifyContent: 'center',
    marginTop: 40,
  },
  textBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  styleSignUpButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  button: {
    borderWidth: 1.5,
    borderRadius: 12,
    fontSize: 24,
    fontWeight: 'bold',
    padding: 12,
    textAlign: 'center',
    backgroundColor: '#2bb6f9',
    borderColor: 'blue',
    color: 'white',
    flex: 1,
    margin: 10,
  },
  styleViewImage: {
    flex: 2,
    margin: 3,
  },
  styleImage: {
    width: '100%',
    height: 300,
  },
});

export default SignUp;
