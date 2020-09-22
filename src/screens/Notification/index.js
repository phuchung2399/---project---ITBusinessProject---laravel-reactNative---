import React, {Component} from 'react';
import {Text, StyleSheet, View, FlatList, Image} from 'react-native';
import NotifyData from '../../utils/NotificationData';
import {Navigation} from 'react-native-navigation';
import LinearGradient from 'react-native-linear-gradient';
import {t} from '../../i18n/t';
import Icon from 'react-native-vector-icons/FontAwesome';
import Logo from '../../../assets/images/logo.png';
import NotifyItems from './components/NotifyItems';
import {connect} from 'react-redux';
import {getNotificationOfUser} from '../../redux/notificationRedux/action';
import {storageGet} from '../../checkAsyncStorage';
import Fonts from '../../themers/Fonts';
import Colors from '../../themers/Colors';

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
    };
  }

  componentDidMount() {
    this.onGetUserData();
  }

  onGetUserData = async () => {
    try {
      let getUserAccount = await storageGet('user');
      let parsedUser = JSON.parse(getUserAccount);
      if (parsedUser) {
        this.setState({token: parsedUser.data.token}, () => {
          this.props.onGetNotification(this.state.token);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  changScreenSidebar = () => {
    Navigation.mergeOptions('sideMenu', {
      sideMenu: {
        left: {
          visible: true,
        },
      },
    });
  };

  renderHeader = () => {
    return (
      <>
        <LinearGradient colors={[Colors.pink, Colors.pink, Colors.orrange]}>
          <View style={styles.viewHeader}>
            <View style={styles.viewOption}>
              <Icon
                name="list"
                size={30}
                color="white"
                onPress={() => this.changScreenSidebar()}
              />
            </View>

            <View style={styles.viewTitle}>
              <Text style={styles.title}>{t('thong_bao')}</Text>
            </View>

            <View style={styles.viewLogo}>
              <Image style={styles.logo} source={Logo} />
            </View>
          </View>
        </LinearGradient>
      </>
    );
  };

  renderNoData = () => {
    return (
      <View style={styles.viewNodata}>
        <Text style={styles.txtNodata}>{t('khong_co_thong_bao')}</Text>
      </View>
    );
  };

  renderListNotis = notificationsData => {
    return (
      <>
        <View style={styles.viewFlastList}>
          <FlatList
            data={notificationsData}
            renderItem={({item}) => <NotifyItems item={item} />}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </>
    );
  };

  render() {
    const notificationsData = this.props.notifications.dataNotification
      .notifications;
    console.log(notificationsData);
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        {notificationsData === null && this.renderNoData()}
        {notificationsData != null && this.renderListNotis(notificationsData)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewHeader: {
    flexDirection: 'row',
    padding: 5,
  },
  viewOption: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  viewTitle: {
    flex: 6,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  viewLogo: {
    alignItems: 'flex-end',
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  logo: {
    width: 50,
    height: 50,
  },
  viewFlastList: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: 'white',
    flex: 1,
  },
  viewNodata: {
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  txtNodata: {
    fontSize: 20,
    color: 'gray',
    fontFamily: Fonts.serif,
  },
});

const mapStateToProps = state => {
  return {
    notifications: state.notifications,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onGetNotification: token => {
      dispatch(getNotificationOfUser(token));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
