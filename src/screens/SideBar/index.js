import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  BackHandler,
  Picker,
  ScrollView,
  SafeAreaView,
  AsyncStorage,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import Icon from 'react-native-vector-icons/AntDesign';
import SideBar from './components/sidebar';
import LinearGradient from 'react-native-linear-gradient';
import Profile from '../../../assets/images/profile.png';

export default class SideBarMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      isShowInfor: false,
      showAlert: false,
    };
  }

  componentDidMount() {
    this.onCheck();
  }

  showAlert = () => {
    this.setState({
      showAlert: true,
    });
  };

  hideAlert = () => {
    this.setState({
      showAlert: false,
    });
  };

  onCheck = async () => {
    try {
      let user = await AsyncStorage.getItem('user');
      let parsed = JSON.parse(user);

      if (parsed) {
        console.log(parsed);
        let UserName = parsed.Data.FullName;
        this.setState({
          userName: UserName,
          isShowInfor: true,
        });
      }
    } catch (error) {
      alert(error);
    }
  };

  onClickPerInfor = () => {
    Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              name: 'PersonalInfor',

              options: {
                topBar: {
                  title: {
                    text: '',
                    alignment: 'center',
                  },
                  visible: false,
                },
              },
            },
          },
        ],
      },
    });
  };

  onSignOut = () => {
    this.showAlert();
  };

  //   onSignIn = () => {
  //     onSignIn();
  //   };

  removeEverything = async () => {
    try {
      await AsyncStorage.clear();
      alert('Log out successfully!');
    } catch (e) {
      alert('Logout failed');
    }
  };

  onClose = () => {
    Navigation.mergeOptions('sideMenu', {
      sideMenu: {
        left: {
          visible: false,
        },
      },
    });
  };

  onSignOut = () => {
    alert('sign out');
  };

  changeProfileScreen = () => {
    // Navigation.showModal({
    //   component: {
    //     name: 'ShowAllBook',
    //   },
    // });
    alert('profile');
  };

  render() {
    const {userName} = this.state;

    const ShowButton = this.state.isShowInfor ? (
      <TouchableWithoutFeedback onPress={this.onSignOut}>
        <Text style={styles.titleOption}>Đăng Xuất</Text>
      </TouchableWithoutFeedback>
    ) : (
      <TouchableWithoutFeedback onPress={this.onSignIn}>
        <Text style={styles.titleOption}>Đăng Nhập</Text>
      </TouchableWithoutFeedback>
    );

    return (
      <View style={{flex: 1, backgroundColor: '#F99A7C'}}>
        <LinearGradient colors={['#FC5895', '#F99A7C']}>
          <SafeAreaView
            style={{
              paddingTop: 10,
              marginHorizontal: 15,
              marginBottom: 10,
            }}>
            <View style={{alignItems: 'flex-end'}}>
              <TouchableOpacity onPress={() => this.onPress()}>
                <Icon
                  name="close"
                  size={30}
                  color="white"
                  onPress={() => this.onClose()}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View style={{flex: 1}}>
                <TouchableOpacity onPress={() => this.changeProfileScreen()}>
                  <Image
                    style={{
                      width: 70,
                      height: 70,
                      borderWidth: 1,
                      borderColor: '#FFF',
                      borderRadius: 60,
                    }}
                    source={Profile}
                  />
                </TouchableOpacity>
              </View>
              <View style={{flex: 2}}>
                <TouchableOpacity onPress={() => this.changeProfileScreen()}>
                  <Text
                    style={{
                      fontSize: 25,
                      fontWeight: 'bold',
                      marginVertical: 8,
                      color: 'white',
                    }}>
                    Tuan Nguyen
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </LinearGradient>

        <View style={styles.container}>
          <SideBar lable={'Ưu đãi'} icon={'switcher'} data={'Ưu đãi'} />
          <SideBar lable={'Book ngay'} icon={'form'} data={'Book ngay'} />
          <SideBar
            lable={'Ưu đãi độc quyền'}
            icon={'alipay-circle'}
            data={'Ưu đãi độc quyền'}
          />
        </View>
        <View style={{backgroundColor: '#f0f0f3'}}>
          <View style={{flexDirection: 'row', marginHorizontal: 15}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
              }}>
              <Icon
                name="setting"
                size={25}
                color="#4290ea"
                onPress={() => this.onSignOut()}
              />
              <TouchableWithoutFeedback onPress={this.onSignOut}>
                <Text
                  style={{
                    fontSize: 15,
                    padding: 15,
                    textAlign: 'center',
                    color: '#4c4c4e',
                  }}>
                  Cài đặt
                </Text>
              </TouchableWithoutFeedback>
            </View>
            <View style={{flex: 1}} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
              }}>
              <Icon
                name="logout"
                size={20}
                color="#4290ea"
                onPress={() => this.onSignOut()}
              />
              <TouchableWithoutFeedback onPress={this.onSignOut}>
                <Text
                  style={{
                    fontSize: 15,
                    padding: 12,
                    textAlign: 'center',
                    color: '#4c4c4e',
                  }}>
                  Đăng xuất
                </Text>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    marginHorizontal: 16,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 5,
    paddingVertical: 25,
    backgroundColor: 'white',
    flex: 1,
  },
  title: {
    fontSize: 25,
  },
  titleOption: {
    fontSize: 20,
    marginTop: 4,
    borderBottomWidth: 1,
    marginVertical: 17,
    borderBottomColor: 'gray',
    color: 'gray',
  },

  back: {
    flex: 1,
    justifyContent: 'center',
  },

  styleViewProfile: {
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  styleImageProfile: {
    borderRadius: 150,
    width: 200,
    height: 200,
  },
});
