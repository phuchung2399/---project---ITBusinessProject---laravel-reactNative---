import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import Fonts from '../../../themers/Fonts';
import Colors from '../../../themers/Colors';
import {t} from '../../../i18n/t';

export default class Information extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const detailStore = this.props.detailStore;
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 5,
          }}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
              fontFamily: Fonts.serif,
            }}>
            {t('phone_title')}
          </Text>
          <Text
            style={{
              marginLeft: 10,
              fontSize: 15,
              fontFamily: Fonts.serif,
            }}>
            {detailStore.phone}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginTop: 5,
          }}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
              fontFamily: Fonts.serif,
            }}>
            {t('gio_mo_cua')}
          </Text>
          <Text
            style={{
              marginLeft: 10,
              fontSize: 15,
              fontFamily: Fonts.serif,
            }}>
            {detailStore.open_time}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginTop: 5,
          }}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',

              fontFamily: Fonts.serif,
            }}>
            {t('gio_dong_cua')}
          </Text>
          <Text
            style={{
              marginLeft: 10,

              fontSize: 15,
              fontFamily: Fonts.serif,
            }}>
            {detailStore.close_time}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginTop: 5,
          }}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',

              fontFamily: Fonts.serif,
            }}>
            {t('app_email_title')}
          </Text>
          <Text
            style={{
              marginLeft: 10,
              marginRight: 10,
              fontSize: 15,
              fontFamily: Fonts.serif,
            }}>
            {detailStore.email}
          </Text>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 20,
    borderRadius: 35,
    padding: 13,
    marginHorizontal: 10,
  },
});
