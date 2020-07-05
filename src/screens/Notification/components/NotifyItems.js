import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import fonts from '../../../themers/Fonts';
const {width, height} = Dimensions.get('window');

class NotifyItems extends Component {
  constructor(props) {
    super(props);
  }

  onPress = () => {
    alert('0k');
  };
  render() {
    const {description, image, time} = this.props;

    return (
      <View style={{borderBottomWidth: 2, borderBottomColor: '#eaeaea'}}>
        <View style={{flexDirection: 'row', padding: 15}}>
          <View style={{flex: 1}}>
            <TouchableOpacity onPress={() => this.onPress()}>
              <Image
                source={{uri: image}}
                style={{
                  width: width / 5,
                  height: height / 10,
                  borderRadius: 20,
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={{flex: 3, justifyContent: 'center'}}>
            <TouchableOpacity onPress={() => this.onPress()}>
              <Text
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  color: '#5f5c5c',
                  fontSize: 17,
                }}
                numberOfLines={2}>
                {description}
              </Text>
            </TouchableOpacity>

            <Text style={{color: '#7f7f7f', fontSize: 15}}>{time} giờ</Text>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  right: {},
  title: {
    color: '#4a4a4a',
    fontSize: 23,
    flex: 1,
  },
  date: {
    fontSize: 17,
    color: '#ababab',
    //alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  row_title: {},
  detail: {},
});
export default NotifyItems;
