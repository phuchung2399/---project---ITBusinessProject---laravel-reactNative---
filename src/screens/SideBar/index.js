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
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import Icon from 'react-native-vector-icons/AntDesign';
import SideBar from './components/sidebar';

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
      <View style={{backgroundColor: 'white', flex: 1}}>
        <SafeAreaView>
          <View style={styles.header}>
            <Text style={styles.title}>Nails</Text>
          </View>

          <ScrollView>
            <View style={styles.container}>
              <View style={styles.styleViewProfile}>
                {/* {showImageProfile} */}
                <Text style={{fontSize: 25}}>{userName}</Text>
              </View>
              {/* {showTabInforPerson}
              {showTabChangePass} */}
              <SideBar lable={'Trang cá nhân'} icon={'profile'} />
              <SideBar lable={'Ưu đãi'} icon={'profile'} />
              <SideBar lable={'Book ngay'} icon={'profile'} />
              <SideBar lable={'Ưu đãi độc quyền'} icon={'profile'} />
              <SideBar lable={'Đăng nhập'} icon={'profile'} />
              <SideBar lable={'Đăng kí'} icon={'profile'} />
            </View>
          </ScrollView>
        </SafeAreaView>
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
    marginHorizontal: 16,
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
