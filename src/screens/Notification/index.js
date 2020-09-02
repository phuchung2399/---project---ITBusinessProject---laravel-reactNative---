import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  AsyncStorage,
  TouchableWithoutFeedback,
  ScrollView,
  Dimensions,
  Alert,
  Image,
} from 'react-native';
import NotifyData from '../../utils/NotificationData';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {Navigation} from 'react-native-navigation';
import LinearGradient from 'react-native-linear-gradient';
import {t} from '../../i18n/t';
import Icon from 'react-native-vector-icons/FontAwesome';
import Logo from '../../../assets/images/logo.png';
import NotifyItems from './components/NotifyItems';
const {width, height} = Dimensions.get('window');
import {connect} from 'react-redux';
import {getNotificationOfUser} from '../../redux/notificationRedux/action';
import {storageRemove, storageGet} from '../../checkAsyncStorage';
import Fonts from '../../themers/Fonts';
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
        <LinearGradient colors={['#FC5895', '#FC5895', '#F99A7C']}>
          <View
            style={{
              flexDirection: 'row',
              padding: 5,
            }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
              }}>
              <Icon
                name="list"
                size={30}
                color="white"
                onPress={() => this.changScreenSidebar()}
              />
            </View>

            <View
              style={{
                flex: 6,
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <Text
                animation="zoomInUp"
                style={{
                  fontSize: 30,
                  fontWeight: 'bold',
                  color: 'white',
                }}>
                {t('thong_bao')}
              </Text>
            </View>
            <View
              style={{
                alignItems: 'flex-end',
                flex: 1,
                justifyContent: 'center',
                alignContent: 'center',
              }}>
              <Image
                style={{
                  width: 50,
                  height: 50,
                }}
                source={Logo}
              />
            </View>
          </View>
        </LinearGradient>
      </>
    );
  };
  render() {
    const notificationsData = this.props.notifications.dataNotification;
    if (notificationsData === null) {
      return (
        <View style={{flex: 1}}>
          {this.renderHeader()}

          <View
            style={{
              padding: 12,
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
            }}>
            <Text
              style={{
                fontSize: 20,
                color: 'gray',
                fontFamily: Fonts.serif,
              }}>
              {t('khong_co_thong_bao')}
            </Text>
          </View>
        </View>
      );
    }

    return (
      <View style={{flex: 1, backgroundColor: '#F99A7C'}}>
        {this.renderHeader()}

        <View
          style={{
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            backgroundColor: 'white',
            flex: 1,
          }}>
          <FlatList
            data={NotifyData}
            renderItem={({item}) => (
              <NotifyItems
                description={item.description}
                image={item.image}
                time={item.time}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  noti: {
    color: '#4a4a4a',
    paddingTop: 15,
    fontSize: 33,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  top: {
    flex: 1,
  },
  bot: {
    flex: 9,
  },
  container: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 20,
    backgroundColor: 'white',
    flex: 1,
  },

  button: {
    margin: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 5,
    backgroundColor: '#AEDEF4',
  },
  text: {
    color: '#fff',
    fontSize: 15,
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
