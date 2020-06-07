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
import Logo from '../../../assets/images/logo.png';

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

    // const showImageProfile = this.state.isShowInfor ? (
    //   <Image source={ImageProfile} style={styles.styleImageProfile} />
    // ) : (
    //   <Text />
    // );

    // const showTabInforPerson = this.state.isShowInfor ? (
    //   <View style={styles.viewRow}>
    //     <View style={styles.viewIcon}>
    //       <Icon name="ic-profile" size={25} color="#979797" />
    //     </View>
    //     <View style={{flex: 5}}>
    //       <TouchableWithoutFeedback onPress={() => this.onClickPerInfor()}>
    //         <Text style={styles.titleOption}>Thông tin cá nhân</Text>
    //       </TouchableWithoutFeedback>
    //     </View>
    //   </View>
    // ) : (
    //   <Text />
    // );

    // const showTabChangePass = this.state.isShowInfor ? (
    //   <View style={styles.viewRow}>
    //     <View style={styles.viewIcon}>
    //       <Icon name="ic-password" size={25} color="#979797" />
    //     </View>
    //     <View style={{flex: 5}}>
    //       <TouchableWithoutFeedback onPress={this.onSetting}>
    //         <Text style={styles.titleOption}>Đổi mật khẩu</Text>
    //       </TouchableWithoutFeedback>
    //     </View>
    //   </View>
    // ) : (
    //   <Text />
    // );

    return (
      <View style={{flex: 1, backgroundColor: '#F99A7C'}}>
        <LinearGradient colors={['#FC5895', '#F99A7C']}>
          <SafeAreaView
            style={{
              padding: 16,
              paddingTop: 48,
            }}>
            <Image
              style={{
                width: 80,
                height: 80,
                borderWidth: 1,
                borderColor: '#FFF',
                borderRadius: 40,
              }}
              source={Logo}
            />
            <Text
              style={{
                fontSize: 50,
                fontWeight: 'bold',
                marginVertical: 8,
                color: 'white',
              }}>
              Nails
            </Text>
          </SafeAreaView>
        </LinearGradient>

        <View style={styles.container}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#dedada',
              borderWidth: 0.5,
              borderColor: '#000',
              height: 40,
              borderRadius: 15,
              margin: 10,
            }}>
            <TextInput
              style={{flex: 1}}
              placeholder="Tìm kiếm!"
              onChangeText={text => this.searchFilterFunction(text)}
              autoCorrect={false}
              value={this.state.value}
            />

            <Icon
              name="search1"
              size={26}
              color="#5f5f5f"
              onPress={() => this.onPress()}
            />
          </View>
          <SideBar lable={'Trang cá nhân'} icon={'user'} />
          <SideBar lable={'Ưu đãi'} icon={'switcher'} />
          <SideBar lable={'Book ngay'} icon={'form'} />
          <SideBar lable={'Ưu đãi độc quyền'} icon={'alipay-circle'} />
          <SideBar lable={'Đăng nhập'} icon={'login'} />
          <SideBar lable={'Đăng kí'} icon={'logout'} />
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
    paddingHorizontal: 20,
    paddingVertical: 30,
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
