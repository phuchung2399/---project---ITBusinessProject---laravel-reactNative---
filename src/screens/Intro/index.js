import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  AsyncStorage,
  FlatList,
  ImageBackground,
  Animated,
} from 'react-native';
import {onSignIn} from '../../navigation';
import {connect} from 'react-redux';
// import {logOut} from '../../redux/userRedux/actions';
import iconProfile from '../../../assets/images/Home/imageLibrary.png';
import iconLibrary from '../../../assets/images/Home/library.jpg';
import Icon from 'react-native-vector-icons/thebook-appicon';
import Book from '../../component/Book';
import {Navigation} from 'react-native-navigation';
import ScrollableTabView from 'rn-collapsing-tab-bar';
import ImageProfile from '../../../assets/images/Profile/khuyenmai.png';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      email: '',
      phoneNumber: '',
      gender: '',
      scrollY: new Animated.Value(0),
    };
  }

  onLogOut = () => {
    this.props.onLogOutUser();
    onSignIn();
    this.removeEverything();
  };

  removeEverything = async () => {
    try {
      await AsyncStorage.clear();
      alert('Log out successfully!');
    } catch (e) {
      alert('Logout failed');
    }
  };

  componentDidMount() {
    this.onCheck();
  }

  onCheck = async () => {
    try {
      let user = await AsyncStorage.getItem('user');
      let parsed = JSON.parse(user);

      // console.log(username, email, phoneNumber, gender);

      if (parsed) {
        let fullName = parsed.Data.FullName;
        let email = parsed.Data.Email;
        let phoneNumber = parsed.Data.PhoneNumber;
        let gender = parsed.Data.Gender;
        this.setState({
          fullName: fullName,
          email: email,
          phoneNumber: phoneNumber,
          gender: gender,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  onPress = () => {
    Navigation.mergeOptions('sideMenu', {
      sideMenu: {
        right: {
          visible: true,
        },
      },
    });
  };

  render() {
    return (
      <Animated.ScrollView
        stickyHeaderIndices={[1]}
        onScroll={Animated.event([
          {nativeEvent: {contentOffset: {y: this.state.scrollY}}},
        ])}>
        <View style={style.container}>
          <ImageBackground source={iconProfile} style={style.imageBack}>
            <View style={style.viewText}>
              <Text style={style.text1}>The Books</Text>
              <Text style={style.text2}>www.thebook.com</Text>
              <Text style={style.text3}>
                Think back over your life. Think about the people that had a
                positive influence on you. If your past ...
              </Text>
              <Text style={style.text4}>Think back over your life</Text>
            </View>
            <View style={style.viewIcon}>
              <View style={style.iconButton}>
                <Icon name="ic-instagram" size={30} color="white" />
              </View>
              <View style={style.iconButton}>
                <Icon name="ic-facebook" size={30} color="white" />
              </View>
              <View style={style.iconButton}>
                <Icon name="ic-youtube" size={30} color="white" />
              </View>
            </View>
            <View style={style.viewIconText}>
              <View style={style.iconButton}>
                <Text style={style.texttime}>OPEN</Text>
                <Text style={style.texttime}>8am</Text>
              </View>
              <View style={style.iconButton}>
                <Image style={style.Image} source={iconLibrary} />
              </View>
              <View style={style.iconButton}>
                <Text style={style.texttime}>CLOSE</Text>
                <Text style={style.texttime}>6pm</Text>
              </View>
            </View>
            <View style={style.container2}>
              <View style={style.viewbutton}>
                <View style={style.viewIcon2}>
                  <Icon name="ic-phone" size={20} color="white" />
                </View>
                <View style={style.viewPhone}>
                  <Text style={style.texttime}>Phone</Text>
                  <Text style={style.textPhone}>(+84) 000 00 000)</Text>
                </View>
              </View>

              <View style={style.viewbutton}>
                <View style={style.viewIcon2}>
                  <Icon name="ic-solid-direction" size={20} color="white" />
                </View>
                <View style={style.viewPhone}>
                  <Text style={{color: 'white'}}>Address</Text>
                  <Text style={style.textPhone}>20 Cao Thắng</Text>
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>

        <ScrollableTabView>
          <View style={{margin: 25}} name="tab1" tabLabel="Hình Ảnh">
            <Image source={ImageProfile} style={style.styleImageProfile} />
          </View>
          <View style={style.viewTab} name="tab2" tabLabel="Sự Kiện">
            <Text style={style.styleText}>Chưa có sự kiện</Text>
          </View>
          <View style={style.viewTab} name="tab3" tabLabel="Khuyến Mãi">
            <Text style={style.styleText}>Chưa có khuyến mãi</Text>
          </View>
        </ScrollableTabView>
      </Animated.ScrollView>
    );
  }
}

const style = StyleSheet.create({
  styleImageProfile: {
    width: '100%',
    height: 200,
  },

  viewIcon: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 100,
  },
  iconButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  container2: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  imageBack: {
    width: '100%',
    height: 500,
  },
  viewText: {
    alignItems: 'center',
    marginHorizontal: 30,
    marginVertical: 10,
  },
  text1: {
    color: 'white',
    fontSize: 30,
  },
  text2: {
    color: 'white',
    fontSize: 15,
    marginTop: 10,
  },
  text3: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 10,
  },
  text4: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
  viewIconText: {
    flexDirection: 'row',
    marginVertical: 20,
    alignContent: 'center',
    alignItems: 'center',
  },
  texttime: {
    color: 'white',
  },
  Image: {
    width: 120,
    height: 120,
    borderRadius: 90,
    borderWidth: 3,
    borderColor: 'white',
  },
  viewbutton: {
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: 'white',
    width: 190,
    height: 70,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  viewIcon2: {
    borderWidth: 2,
    borderColor: 'white',
    padding: 10,
    borderRadius: 50,
  },
  viewPhone: {
    marginLeft: 6,
  },
  textPhone: {
    color: 'white',
    fontWeight: 'bold',
  },
  styleText: {
    alignItems: 'center',
    marginVertical: 20,
    justifyContent: 'center',
  },
  viewTab: {
    alignItems: 'center',
  },
});

const mapStateToProps = state => {
  return {
    userData: state.user,
    book: state.bookReducer,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onLogOutUser: () => {
      dispatch(logOut());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
