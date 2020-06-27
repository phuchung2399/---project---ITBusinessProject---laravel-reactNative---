import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  BackHandler,
  Picker,
  ScrollView,
  SafeAreaView,
  AsyncStorage,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import Img from '../../../../assets/images/service-img.jpg';

export default class BookingItems extends Component {
  render() {
    return (
      <View style={{flex: 1, marginHorizontal: 10}}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 15,
            padding: 10,
          }}>
          <View>
            <Image
              style={{
                width: 90,
                height: 70,
                borderRadius: 10,
              }}
              source={Img}
            />
          </View>

          <View style={{marginRight: 90, marginTop: -10, marginLeft: 10}}>
            <Text
              style={{
                marginHorizontal: 10,
                color: 'black',
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              Móng tay thiết kế tinh xảo
            </Text>
            <Text
              style={{
                margin: 10,
                color: 'black',
                fontSize: 14,
                marginTop: -2,
              }}>
              Công nghệ mạ vàng xịn xò đến từ Nhật Bản
            </Text>
            <View style={{flexDirection: 'row', marginHorizontal: 10}}>
              <View style={{flex: 1}}>
                <Text>40.000 d</Text>
              </View>
              <View>
                <AntDesign
                  name="minuscircleo"
                  size={25}
                  color="black"
                  onPress={() => this.backMainScreen()}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    marginHorizontal: 16,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 20,
    backgroundColor: 'white',
    flex: 1,
  },
  title: {
    fontSize: 25,
  },
  titleOption: {
    fontSize: 20,
    marginTop: 4,
    borderBottomWidth: 1,
    marginVertical: 17,
    borderBottomColor: 'gray',
    color: 'gray',
  },

  back: {
    flex: 1,
    justifyContent: 'center',
  },

  styleViewProfile: {
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  styleImageProfile: {
    borderRadius: 150,
    width: 200,
    height: 200,
  },
});
