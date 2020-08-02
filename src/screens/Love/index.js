import React, {Component} from 'react';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  Platform,
  Animated,
  ScrollView,
  ImageBackground,
} from 'react-native';
import ImageDemo from '../../../assets/images/imagedemo.jpg';
import Icon from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const HEADER_MIN_HEIGHT = 50;
const HEADER_MAX_HEIGHT = 200;

export default class Love extends Component {
  constructor() {
    super();
    this.scrollYAnimatedValue = new Animated.Value(0);
    this.array = [];
  }

  componentWillMount() {
    for (var i = 1; i <= 75; i++) {
      this.array.push(i);
    }
  }

  render() {
    const headerHeight = this.scrollYAnimatedValue.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp',
    });

    const headerBackgroundColor = this.scrollYAnimatedValue.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: ['#e91e63', '#1DA1F2'],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{paddingTop: HEADER_MAX_HEIGHT}}
          scrollEventThrottle={16}
          onScroll={Animated.event([
            {nativeEvent: {contentOffset: {y: this.scrollYAnimatedValue}}},
          ])}>
          <View style={styles.item}>
            <Text style={styles.itemText}>Row No : </Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemText}>Row No : </Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemText}>Row No : </Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemText}>Row No : </Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemText}>Row No : </Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemText}>Row No : </Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemText}>Row No : </Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemText}>Row No : </Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemText}>Row No : </Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemText}>Row No : </Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemText}>Row No : </Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemText}>Row No : </Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemText}>Row No : </Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemText}>Row No : </Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemText}>Row No : </Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemText}>Row No : </Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemText}>Row No : </Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemText}>Row No : </Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemText}>Row No : </Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemText}>Row No : </Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemText}>Row No : </Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemText}>Row No : </Text>
          </View>
        </ScrollView>

        <Animated.View
          style={[
            styles.animatedHeaderContainer,
            {height: headerHeight, backgroundColor: headerBackgroundColor},
          ]}>
          <Text style={styles.headerText}>Animated Header</Text>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  animatedHeaderContainer: {
    position: 'absolute',
    top: Platform.OS == 'ios' ? 20 : 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 22,
  },
  item: {
    backgroundColor: '#ff9e80',
    margin: 8,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    color: 'black',
    fontSize: 16,
  },
});
