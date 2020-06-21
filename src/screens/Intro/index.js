import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import Logo from '../../../assets/images/logo.png';
import Icon from 'react-native-vector-icons/Entypo';
import Message from 'react-native-vector-icons/MaterialCommunityIcons';
import Chrome from 'react-native-vector-icons/FontAwesome';
import Instagram from 'react-native-vector-icons/AntDesign';
import Colors from '../../themers/Colors';
import Fonts from '../../themers/Fonts';

export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.viewImage}>
          <Image style={styles.image} source={Logo} />
        </View>
        <View style={styles.viewBottom}>
          <Text style={styles.text}>Nail</Text>
          <View style={styles.viewIcon}>
            <View style={styles.icon}>
              <Icon
                name="facebook-with-circle"
                size={25}
                color={Colors.darkGray}
              />
            </View>
            <View style={styles.icon}>
              <Message
                name="facebook-messenger"
                size={25}
                color={Colors.darkGray}
              />
            </View>
            <View style={styles.icon}>
              <Chrome name="chrome" size={23} color={Colors.darkGray} />
            </View>
            <View style={styles.icon}>
              <Icon
                name="youtube-with-circle"
                size={25}
                color={Colors.darkGray}
              />
            </View>
            <View style={styles.icon}>
              <Instagram name="instagram" size={25} color={Colors.darkGray} />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  viewImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 140,
    height: 140,
  },
  viewBottom: {
    marginVertical: 30,
  },
  text: {
    fontSize: 45,
    textAlign: 'center',
    color: Colors.gray,
    fontFamily: Fonts.serif,
  },
  viewIcon: {
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'row',
  },
  icon: {
    marginHorizontal: 5,
  },
});
