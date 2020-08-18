import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

export default class sidebar extends Component {
  onPress = () => {
    this.props.onPress();
  };

  render() {
    const {lable, icon, data} = this.props;
    return (
      <View style={styles.viewRow}>
        <View style={styles.viewIcon}>
          <Icon name={icon} size={25} color="#4290ea" />
        </View>
        <View style={{flex: 5}}>
          <TouchableOpacity onPress={() => this.onPress()}>
            <Text style={styles.titleOption}>{lable}</Text>
          </TouchableOpacity>
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
