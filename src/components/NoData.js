import React, {Component} from 'react';
import {StyleSheet, View, Text, Image, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
import UpdateDataImage from '../../assets/images/updatedata.jpg';
import Colors from '../themers/Colors';
import {t} from '../i18n/t';
import Fonts from '../themers/Fonts';
import AntDesign from 'react-native-vector-icons/AntDesign';

class NoData extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={UpdateDataImage} style={styles.styleImage} />
        {/* <AntDesign
          name="barchart"
          size={50}
          color="gray"
          onPress={() => this.backMainScreen()}
        /> */}
        <Text style={styles.styleText}>{t('du_lieu_thi_cong')}</Text>
        <Text style={styles.styleText}>{t('du_lieu_cap_nhat_som')}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: height / 4,
    marginHorizontal: 12,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 2,
    borderColor: Colors.darkGray,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    textAlign: 'center',
    backgroundColor: 'white',
  },

  styleImage: {
    width: 100,
    height: 100,
    backgroundColor: '#ababab',
    borderRadius: 10,
    marginBottom: 10,
  },
  styleText: {
    fontSize: 15,
    color: Colors.darkGray,
    fontFamily: Fonts.serif,
  },
});

export default NoData;
