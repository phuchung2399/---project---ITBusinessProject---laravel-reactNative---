import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import iconProfile from '../../../../assets/images/profile_icon.png';
const {width, height} = Dimensions.get('window');
import {Navigation} from 'react-native-navigation';

class UserReview extends Component {
  onPress = idBook => {
    Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              name: 'Detail',
              passProps: {
                IdBook: idBook,
              },
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

  render() {
    const {image, name, orderCount, extraInfor} = this.props;

    const showImage =
      image === '' ? (
        <Image source={iconProfile} style={styles.image} />
      ) : (
        <Image source={{uri: image}} style={styles.image} />
      );

    return (
      <View style={styles.showflast}>
        {showImage}
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.infor}>
          {orderCount} {extraInfor}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  showflast: {
    width: width / 3,
    marginVertical: 20,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  name: {
    color: '#4a4a4a',
    fontSize: 18,
  },
  infor: {
    color: '#ababab',
    fontSize: 16,
  },
  image: {
    width: 115,
    height: 115,
    borderRadius: 150,
  },
});
export default UserReview;
