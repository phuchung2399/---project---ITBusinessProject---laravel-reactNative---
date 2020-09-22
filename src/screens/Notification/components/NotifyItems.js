import React, {Component} from 'react';
import {View, Image, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Logo from '../../../../assets/images/logo.png';

class NotifyItems extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {item} = this.props;

    return (
      <View style={{borderBottomWidth: 2, borderBottomColor: '#eaeaea'}}>
        <View style={{flexDirection: 'row', padding: 15}}>
          <View style={{flex: 1}}>
            <TouchableOpacity>
              <Image
                source={Logo}
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 20,
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={{flex: 3, justifyContent: 'center'}}>
            <TouchableOpacity>
              <Text
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  color: '#5f5c5c',
                  fontSize: 17,
                }}
                numberOfLines={2}>
                {item.content.massage}
              </Text>
            </TouchableOpacity>
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
