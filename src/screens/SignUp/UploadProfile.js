import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Input from '../../components/Input';
import {onSignIn} from '../../navigation';
// import IconLogin from '../../../assets/images/login_image.png';
// import {connect} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import Logo from '../../../assets/images/logo.png';
import UploadProfileImage from '../../../assets/images/uploadProfile.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Navigation} from 'react-native-navigation';
import {t} from '../../i18n/t';
const {width, height} = Dimensions.get('window');

class UploadProfile extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      imageProfile: 'uuu',
      errorImageProfile: '',
    };
  }

  onRestart = () => {
    this.setState({
      errorImageProfile: '',
    });
  };

  onSignin = () => {
    onSignIn();
  };

  onSignUp = event => {
    var {imageProfile} = this.state;

    this.onRestart();

    if (imageProfile == '') {
      this.setState({errorImageProfile: 'Choose your profile!'});
    }

    const data = {
      name: this.props.data.name,
      phoneNumber: this.props.data.phoneNumber,
      password: this.props.data.password,
      imageProfile: imageProfile,
    };
    console.log(data);
    // this.props.register(data);
  };

  getData = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  onPress = () => {
    alert('0k');
  };

  render() {
    var {errorImageProfile} = this.state;
    return (
      <View style={{flex: 1, backgroundColor: '#F99A7C'}}>
        <LinearGradient colors={['#FC5895', '#F99A7C']}>
          <SafeAreaView
            style={{
              height: height / 6,
            }}>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
              }}>
              <Text
                animation="zoomInUp"
                style={{
                  fontSize: 50,
                  fontWeight: 'bold',
                  marginTop: 20,
                  color: 'white',
                }}>
                {t('brand_name')}
              </Text>
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
            }}>
            <TouchableOpacity onPress={() => this.onPress()}>
              <Image
                style={{
                  width: 170,
                  height: 170,
                }}
                source={UploadProfileImage}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 20,
                textAlign: 'center',
                marginVertical: 50,
              }}>
              Please upload your real profile
            </Text>
          </View>

          <LinearGradient
            colors={['#e511e8', '#F99A7C']}
            style={{
              paddingVertical: 13,
              paddingHorizontal: 5,
              borderRadius: 25,
            }}>
            <TouchableWithoutFeedback onPress={this.onContinued}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  color: 'white',
                }}>
                {t('txtSignUp')}
              </Text>
            </TouchableWithoutFeedback>
          </LinearGradient>

          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 15}}>
            <Icon
              name="angle-left"
              size={40}
              color="blue"
              onPress={() => this.changScreenSearch()}
            />
            <TouchableWithoutFeedback onPress={this.onSignin}>
              <Text
                style={{
                  color: 'blue',
                  fontSize: 16,
                  fontWeight: 'bold',
                  textDecorationLine: 'underline',
                  marginHorizontal: 12,
                }}>
                Đã có tài khoản
              </Text>
            </TouchableWithoutFeedback>
          </View>
        </Animatable.View>
      </View>
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

export default UploadProfile;
