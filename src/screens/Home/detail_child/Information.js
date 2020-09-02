import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Linking,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import Fonts from '../../../themers/Fonts';
import Colors from '../../../themers/Colors';
import {t} from '../../../i18n/t';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';

export default class Information extends React.Component {
  constructor(props) {
    super(props);
  }

  onCallToStore = storePhoneNumber => {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${storePhoneNumber}`;
    } else {
      phoneNumber = `telprompt:${storePhoneNumber}`;
    }
    Linking.openURL(phoneNumber);
  };

  renderHeader = detailStore => {
    return (
      <View style={style.viewHeader}>
        <Text
          style={{
            flex: 1,
            textAlign: 'center',
            fontSize: 19,
            fontWeight: 'bold',
            fontFamily: Fonts.serif,
          }}>
          {t('thong_tin_cua_hang')}
        </Text>
      </View>
    );
  };

  renderStorePhone = detailStore => {
    return (
      <View style={style.viewContainer}>
        <View style={style.viewIcon}>
          <Text
            style={{
              flex: 1,
              fontSize: 17,
              fontWeight: 'bold',
              fontFamily: Fonts.serif,
            }}>
            {t('phone_title')}
          </Text>

          <View style={{alignContent: 'flex-end', flexDirection: 'row'}}>
            <TouchableWithoutFeedback
              onPress={() => this.onCallToStore(detailStore.phone)}>
              <Text
                style={{
                  color: 'green',
                  fontSize: 16,
                }}>
                {t('goi_ngay')}
              </Text>
            </TouchableWithoutFeedback>
          </View>
        </View>

        <View style={style.viewIcon}>
          <Feather
            name="phone-call"
            size={20}
            color="black"
            onPress={() => this.backMainScreen()}
          />
          <Text style={style.text}>{detailStore.phone}</Text>
        </View>
      </View>
    );
  };

  renderStoreEmail = detailStore => {
    return (
      <View style={style.viewContainer}>
        <Text style={style.title}>{t('email')}</Text>

        <View style={style.viewIcon}>
          <AntDesign
            name="mail"
            size={20}
            color="black"
            onPress={() => this.backMainScreen()}
          />
          <Text style={style.text}>{detailStore.email}</Text>
        </View>
      </View>
    );
  };

  renderOpenTime = detailStore => {
    return (
      <View style={style.viewContainer}>
        <Text style={style.title}>{t('gio_mo_cua')}</Text>

        <View style={style.viewIcon}>
          <AntDesign
            name="clockcircleo"
            size={20}
            color="black"
            onPress={() => this.backMainScreen()}
          />
          <Text style={style.text}>{detailStore.open_time}</Text>
        </View>
      </View>
    );
  };

  renderCloseTime = detailStore => {
    return (
      <View style={style.viewContainer}>
        <Text style={style.title}>{t('gio_dong_cua')}</Text>

        <View style={style.viewIcon}>
          <Entypo
            name="back-in-time"
            size={22}
            color="black"
            onPress={() => this.backMainScreen()}
          />
          <Text style={style.text}>{detailStore.close_time}</Text>
        </View>
      </View>
    );
  };

  render() {
    const detailStore = this.props.detailStore;
    return (
      <View style={style.container}>
        {this.renderHeader(detailStore)}
        {this.renderStorePhone(detailStore)}
        {this.renderStoreEmail(detailStore)}
        {this.renderOpenTime(detailStore)}
        {this.renderCloseTime(detailStore)}
      </View>
    );
  }
}

var style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 20,
    borderRadius: 35,
    padding: 13,
    marginHorizontal: 10,
  },
  viewContainer: {
    backgroundColor: 'white',
    padding: 6,
    borderBottomWidth: 7,
    borderBottomColor: '#eaeaea',
  },
  title: {
    marginTop: 5,
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: Fonts.serif,
  },
  viewIcon: {
    flexDirection: 'row',
    marginTop: 7,
    marginBottom: 5,
  },
  text: {
    marginLeft: 10,
    alignItems: 'flex-end',
    fontSize: 15,
    fontFamily: Fonts.serif,
  },
  viewHeader: {
    backgroundColor: 'white',
    padding: 12,
    borderBottomWidth: 7,
    borderBottomColor: '#eaeaea',
    justifyContent: 'center',
    marginBottom: 10,
  },
});
