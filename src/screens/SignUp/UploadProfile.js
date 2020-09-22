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
  Platform,
} from 'react-native';
import Input from '../../components/Input';
import {onSignIn} from '../../navigation';
// import IconLogin from '../../../assets/images/login_image.png';
// import {connect} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Logo from '../../../assets/images/logo.png';
import UploadProfileImage from '../../../assets/images/profile_icon.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import Check from 'react-native-vector-icons/AntDesign';
import {Navigation} from 'react-native-navigation';
import {t} from '../../i18n/t';
import ImagePicker from 'react-native-image-picker';
const {width, height} = Dimensions.get('window');
import {addUser} from '../../redux/userRedux/action';
import {connect} from 'react-redux';

class UploadProfile extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      disableButton: true,
      imageProfile: null,
      isShowText: true,
    };
  }

  onSignin = () => {
    onSignIn();
  };

  handleChoosePhoto = () => {
    const options = {
      title: 'Select Avatar',
      customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.uri) {
        this.setState({imageProfile: response, disableButton: false});
      }
    });
  };

  handleUploadPhoto = async event => {
    event.preventDefault();

    const {imageProfile} = this.state;
    const {user_name, email, phone, password} = this.props.data;

    console.log(imageProfile);
    var data = new FormData();

    // data.append('avatar', 'data:image/jpeg;base64,' + imageProfile.data);

    data.append('photo', {
      uri: imageProfile.uri,
      type: 'image/jpeg',
      name: 'testPhotoName',
    });
    data.append('user_name', user_name);
    data.append('email', email);
    data.append('phone', phone);
    data.append('password', password);
    data.append('confirm_password', password);

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
        console.log('responeTotal', responseData);
      })
      .catch(error => {
        console.log('Error', error);
      });
  };

  render() {
    var {imageProfile, disableButton} = this.state;

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
            <TouchableOpacity onPress={() => this.handleChoosePhoto()}>
              {imageProfile === null ? (
                <Image
                  style={{
                    width: 250,
                    borderRadius: 190,
                    height: 250,
                  }}
                  source={UploadProfileImage}
                />
              ) : (
                <Image
                  source={{uri: imageProfile.uri}}
                  style={{width: 250, height: 250, borderRadius: 190}}
                />
              )}
            </TouchableOpacity>

            {imageProfile === null ? (
              <Text
                style={{
                  fontSize: 20,
                  textAlign: 'center',
                  marginVertical: 50,
                }}>
                Vui lòng chọn ảnh đại diện
              </Text>
            ) : (
              <View
                style={{
                  marginVertical: 20,
                }}>
                <Check name="checkcircleo" size={80} color="green" />
              </View>
            )}
          </View>

          <LinearGradient
            colors={['#e511e8', '#F99A7C']}
            start={{x: 0, y: 1}}
            end={{x: 1, y: 0}}
            style={{
              paddingVertical: 13,
              paddingHorizontal: 5,
              borderRadius: 25,
            }}>
            <TouchableOpacity
              onPress={this.handleUploadPhoto}
              disabled={disableButton}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  color: 'white',
                }}>
                {t('txtSignUp')}
              </Text>
            </TouchableOpacity>
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

const mapStateToProps = state => {
  return {
    userData: state.user,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onRegister: userAccount => {
      dispatch(addUser(userAccount));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadProfile);
