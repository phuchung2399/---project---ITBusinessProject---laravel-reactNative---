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
  Switch,
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import Logo from '../../../assets/images/logo.png';
import Img from '../../../assets/images/service-img.jpg';
import Items from './components/BookingItems';

export default class Booking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      colorFalseSwitchIsOn: true,
    };
  }

  changeSwitch = value => {
    this.setState({colorFalseSwitchIsOn: value ? true : false});
  };

  backMainScreen = () => {
    Navigation.dismissModal(this.props.componentId);
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#F99A7C'}}>
        <LinearGradient colors={['#FC5895', '#FC5895', '#F99A7C']}>
          <View
            style={{
              padding: 10,
              flexDirection: 'row',
              height: 80,
            }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignContent: 'center',
                backgroundColor: 'white',
                borderRadius: 50,
                alignItems: 'center',
                maxHeight: 40,
                maxWidth: 40,
              }}>
              <Icon
                name="chevron-left"
                size={25}
                color="black"
                onPress={() => this.backMainScreen()}
              />
            </View>

            <View
              style={{
                flex: 6,
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <Text
                animation="zoomInUp"
                style={{
                  fontSize: 30,
                  fontWeight: 'bold',
                  color: 'white',
                }}>
                Xác nhận
              </Text>
            </View>
            <View style={{alignItems: 'flex-end', flex: 1}}>
              <Image
                style={{
                  width: 50,
                  height: 50,
                }}
                source={Logo}
              />
            </View>
          </View>
        </LinearGradient>

        <ScrollView style={styles.container}>
          <View
            style={{
              flexDirection: 'row',
              borderBottomWidth: 2,
              borderBottomColor: '#FC959C',
            }}>
            <View style={{paddingHorizontal: 30}}>
              <Image
                style={{
                  width: 60,
                  height: 60,
                }}
                source={Logo}
              />
            </View>

            <View style={{marginHorizontal: 5}}>
              <Text
                style={{
                  fontSize: 30,
                  color: '#FC959C',
                  fontFamily: 'sans-serif',
                }}>
                Hung cute
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Icon
                  name="phone"
                  size={25}
                  color="#3AEB76"
                  onPress={() => this.backMainScreen()}
                />
                <Text
                  style={{
                    marginHorizontal: 10,
                    color: '#FC959C',
                    fontSize: 15,
                  }}>
                  0909090909
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginBottom: 10,
                  alignItems: 'center',
                }}>
                <AntDesign name="clockcircleo" size={20} color="#3AEB76" />

                <View
                  style={{
                    backgroundColor: '#E8E8E8',
                    borderRadius: 50,
                    marginHorizontal: 10,
                  }}>
                  <Text
                    style={{
                      marginHorizontal: 10,
                      fontSize: 15,
                      paddingVertical: 10,
                    }}>
                    8:00 Sáng
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: '#E8E8E8',
                    marginHorizontal: 10,
                    paddingVertical: 10,
                    borderRadius: 50,
                  }}>
                  <Text style={{marginHorizontal: 10, fontSize: 15}}>
                    25/06/2020
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              borderBottomWidth: 2,
              borderBottomColor: '#FC959C',
            }}>
            <Items />

            <View style={{flex: 5, marginHorizontal: 20}}>
              <Text style={{fontSize: 25}}>Ghi chú</Text>
              <View
                style={{
                  borderColor: '#E8E8E8',
                  borderWidth: 2,
                  padding: 5,
                }}>
                <TextInput
                  style={{
                    height: 100,
                    justifyContent: 'flex-start',
                    textAlignVertical: 'top',
                  }}
                  underlineColorAndroid="transparent"
                  placeholder="Thêm nhận xét của bạn"
                  placeholderTextColor="grey"
                  numberOfLines={5}
                  multiline={true}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: 10,
                  marginHorizontal: 10,
                }}>
                <Text>Đặt làm tại nhà</Text>
                <Switch
                  onValueChange={value => {
                    this.changeSwitch(value);
                  }}
                  style={{marginBottom: 10}}
                  tintColor="#ff0000"
                  value={this.state.colorFalseSwitchIsOn}
                  trackColor={{false: '#767577', true: '#81b0ff'}}
                  thumbColor={
                    this.state.colorFalseSwitchIsOn ? '#00ff00' : '#0000ff'
                  }
                  ios_backgroundColor="#3e3e3e"
                />
              </View>
            </View>
          </View>

          <View
            style={{
              borderBottomWidth: 2,
              borderBottomColor: '#FC959C',
            }}>
            <View style={{marginHorizontal: 20, marginVertical: 10}}>
              <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                Phương thức thanh toán
              </Text>

              <View style={{flexDirection: 'row', marginVertical: 5}}>
                <View style={{flex: 1}}>
                  <TouchableWithoutFeedback onPress={this.onSignUp}>
                    <Text
                      style={{
                        color: 'blue',
                        fontSize: 16,
                        textDecorationLine: 'underline',
                      }}>
                      Thanh toán trực tiếp
                    </Text>
                  </TouchableWithoutFeedback>
                </View>
                <View>
                  <AntDesign name="edit" size={25} color="#3e3e3e" />
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              borderBottomWidth: 2,
              borderBottomColor: '#FC959C',
            }}>
            <View
              style={{marginHorizontal: 20, marginTop: 10, marginBottom: 30}}>
              <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                Mã giảm giá
              </Text>

              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignContent: 'center',
                    marginHorizontal: 10,
                  }}>
                  <TextInput
                    style={{
                      height: 40,
                      borderColor: '#E8E8E8',
                      borderWidth: 1,
                      borderRadius: 10,
                    }}
                    placeholder="Nhập mã giảm giá"
                  />
                </View>
                <View style={{alignItems: 'flex-end'}}>
                  <TouchableWithoutFeedback onPress={this.onSignin}>
                    <Text
                      style={{
                        borderRadius: 20,
                        fontSize: 15,
                        fontWeight: 'bold',
                        padding: 12,
                        paddingHorizontal: 20,
                        textAlign: 'center',
                        backgroundColor: '#FCB1B6',
                        color: 'black',
                      }}>
                      Áp dụng
                    </Text>
                  </TouchableWithoutFeedback>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        <SafeAreaView>
          <View
            style={{
              marginHorizontal: 10,
              padding: 10,
              flexDirection: 'row',
              backgroundColor: '#F99A7C',
            }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: 'black',
                }}>
                Tổng cộng: 40.000 đ
              </Text>
            </View>
            <View style={{alignItems: 'flex-end'}}>
              <TouchableWithoutFeedback onPress={this.onSignin}>
                <Text
                  style={{
                    borderRadius: 20,
                    fontSize: 15,
                    fontWeight: 'bold',
                    padding: 12,
                    paddingHorizontal: 30,
                    textAlign: 'center',
                    backgroundColor: '#FCB1B6',
                    color: 'black',
                  }}>
                  Đặt ngay
                </Text>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </SafeAreaView>
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
