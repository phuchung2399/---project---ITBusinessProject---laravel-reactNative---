import React, {Component} from 'react';
import {StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import {t} from '../../i18n/t';
import Colors from '../../themers/Colors';

export default class Loading extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text style={styles.Text}>{t('Loading')}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Text: {
    fontSize: 15,
    marginVertical: 15,
    color: Colors.pink,
  },
});
