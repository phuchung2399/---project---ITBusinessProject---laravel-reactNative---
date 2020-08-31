import React, {Component} from 'react';
import {
  Dimensions,
  Image,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet,
  Clipboard,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import {t} from '../../i18n/t';
import Logo from '../../../assets/images/logo.png';
import {Navigation} from 'react-native-navigation';
import {connect} from 'react-redux';
import {storageGet} from '../../checkAsyncStorage';
import {getAllVouchers} from '../../redux/voucherRedux/action';
import Fonts from '../../themers/Fonts';
import moment from 'moment';
import Colors from '../../themers/Colors';
import Loading from '../Loading';
import Swipeout from 'react-native-swipeout';
const {width} = Dimensions.get('window');

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      isLoading: true,
      activeRowKey: null,
      numberOfRefresh: 0,
      isChecked: false,
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
          this.props.onGetAllVouchers(this.state.token);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  backMainScreen = () => {
    Navigation.dismissModal(this.props.componentId);
  };

  onApply = voucher_name => {
    Alert.alert(' Thông báo', 'Đã copy');
    Clipboard.setString(voucher_name);
  };

  renderHeader = () => {
    return (
      <LinearGradient colors={['#FC5895', '#FC5895', '#F99A7C']}>
        <View style={styles.containerHeader}>
          <View style={styles.iconBack}>
            <Icon
              name="chevron-left"
              size={25}
              color="black"
              onPress={() => this.backMainScreen()}
            />
          </View>

          <View style={styles.title}>
            <Text style={styles.titleText}>{t('ma_giam_gia')}</Text>
          </View>
          <View style={styles.viewLogo}>
            <Image style={styles.logo} source={Logo} />
          </View>
        </View>
      </LinearGradient>
    );
  };

  renderListVouchers = arrDataVouchers => {
    return (
      <View style={styles.viewBody}>
        <FlatList
          data={arrDataVouchers}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={this.ItemSeparatorComponent}
        />
      </View>
    );
  };

  renderItem = ({item}) => {
    const swipeSettings = {
      autoClose: true,
      onClose: (secId, rowId, direction) => {
        this.setState({activeRowKey: null});
      },
      right: [
        {
          onPress: () => {
            this.onApply(item.voucher_name);
          },
          component: (
            <View style={styles.item}>
              <View style={styles.inItem}>
                <Icon name="copyright" style={styles.icon} />
              </View>
            </View>
          ),
          backgroundColor: 'white',
        },
      ],
    };

    return (
      <Swipeout {...swipeSettings} backgroundColor="white">
        <LinearGradient
          colors={['#fdf6f6', 'white']}
          start={{x: 0, y: 1}}
          end={{x: 1, y: 0}}
          style={styles.swipeout}>
          <View style={styles.viewImage}>
            <Image source={Logo} style={styles.defaultImage} />
          </View>
          <View style={styles.viewText}>
            <View>
              <Text style={styles.titleVoucher}>{t('ma_giam_gia_title')}</Text>
              <Text style={styles.voucherName}>{item.voucher_name}</Text>
              <View style={styles.viewPrice}>
                <Text style={styles.priceTitle}>{t('so_tien_giam')}</Text>
                <Text style={styles.price}>{item.price} đ</Text>
              </View>
              <Text style={styles.time}>
                {moment(item.created_at).calendar()}
              </Text>
            </View>
          </View>
        </LinearGradient>
      </Swipeout>
    );
  };

  renderLoading = () => {
    return (
      <View style={styles.container}>
        <Loading />
      </View>
    );
  };

  renderMessageNoData = () => {
    return (
      <View style={styles.container}>
        <View style={styles.viewNoData}>
          <Text style={styles.textNoData}>{t('khong_co_ma')}</Text>
        </View>
      </View>
    );
  };

  renderData = dataVouchers => {
    const arrDataVouchers = Object.keys(dataVouchers).map(key => {
      dataVouchers[key].id = key;
      return dataVouchers[key];
    });

    return <ScrollView>{this.renderListVouchers(arrDataVouchers)}</ScrollView>;
  };

  renderBody = () => {
    const that = this;
    const dataVouchers = this.props.vouchers.dataAllVouchers;
    const isLoading = this.state.isLoading;

    setTimeout(function() {
      that.setState({isLoading: false});
    }, 100);

    return (
      <>
        {isLoading === true && this.renderLoading()}
        {dataVouchers.length === 0 && this.renderMessageNoData()}
        {dataVouchers.length != 0 && this.renderData(dataVouchers)}
      </>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        {this.renderBody()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  inItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fd0799',
  },
  icon: {
    fontSize: (width * 6) / 100,
    color: 'white',
  },
  containerHeader: {
    flexDirection: 'row',
    padding: 5,
    height: 80,
  },
  iconBack: {
    flex: 1,
    padding: 10,
    margin: 10,
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 50,
    alignItems: 'center',
    maxHeight: 45,
    maxWidth: 45,
  },
  title: {
    flex: 6,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  viewLogo: {
    alignItems: 'flex-end',
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: -5,
  },
  logo: {
    width: 50,
    height: 50,
  },
  viewNoData: {
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  textNoData: {
    fontSize: 20,
    color: 'gray',
    fontFamily: Fonts.serif,
  },
  viewBody: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: 'white',
    flex: 1,
  },
  swipeout: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    borderRadius: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#eaeaea',
  },
  defaultImage: {
    width: '100%',
    height: '100%',
    borderWidth: 5,
    borderColor: 'white',
    borderRadius: 10,
  },
  viewImage: {
    width: 100,
    height: 90,
  },
  viewText: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  titleVoucher: {
    color: '#5a5555',
    fontWeight: 'bold',
    fontSize: 18,
  },
  voucherName: {
    fontSize: 18,
    color: 'red',
  },
  viewPrice: {
    flexDirection: 'row',
    marginTop: 5,
  },
  priceTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  price: {
    marginLeft: 7,
    fontWeight: 'bold',
    fontSize: 16,
  },
  time: {
    marginTop: 7,
    color: 'gray',
    fontWeight: 'bold',
  },
});

const mapStateToProps = state => {
  return {
    vouchers: state.vouchers,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onGetAllVouchers: token => {
      dispatch(getAllVouchers(token));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
