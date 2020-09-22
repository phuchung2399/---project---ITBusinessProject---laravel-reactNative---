import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {BallIndicator} from 'react-native-indicators';

export default class Loading extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <View style={styles.container}>
        <BallIndicator color="#fd0799" size={30} />
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
});
