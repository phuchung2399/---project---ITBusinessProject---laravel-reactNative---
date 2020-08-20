import React, {Component} from 'react';
import {StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import {t} from '../../i18n/t';
import Colors from '../../themers/Colors';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';

export default class Loading extends Component {
  constructor() {
    super();
  }

  render() {
    const {loadingText} = this.props;

    return (
      <View style={styles.container}>
        <BallIndicator color="#fd0799" size={30} />
        {/* <Text style={styles.Text}>{loadingText}</Text> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Text: {
    fontSize: 15,
    marginVertical: 15,
    color: Colors.pink,
  },
});
