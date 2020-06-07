import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

export default class sidebar extends Component {
  render() {
    const {lable, icon} = this.props;
    return (
      <View style={styles.viewRow}>
        <View style={styles.viewIcon}>
          <Icon name={icon} size={25} color="#979797" />
        </View>
        <View style={{flex: 5}}>
          <TouchableWithoutFeedback onPress={this.onSetting}>
            <Text style={styles.titleOption}>{lable}</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    height: 70,
    marginHorizontal: 20,
    alignItems: 'center',
    borderBottomColor: '#b3acac',
  },
  viewIcon: {
    flex: 1,
    justifyContent: 'center',
  },
});
