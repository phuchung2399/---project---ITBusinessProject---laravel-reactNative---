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
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Navigation} from 'react-native-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import Logo from '../../../assets/images/logo.png';
import Img from '../../../assets/images/service-img.jpg';
import Items from './components/BookingItems';
import Colors from '../../themers/Colors';
import Fonts from '../../themers/Fonts';
import Location from 'react-native-vector-icons/Entypo';
import SearchItems from './components/SearchItems';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      colorFalseSwitchIsOn: true,
      searchData: [
        {
          name: 'Mai Nail Store',
          image:
            'https://pbs.twimg.com/profile_images/680010220324712449/yoz5DV8l_400x400.jpg',
        },
        {
          name: 'Tuan Spa',
          image:
            'https://pbs.twimg.com/profile_images/680010220324712449/yoz5DV8l_400x400.jpg',
        },
        {
          name: 'Dieu Qouch',
          image:
            'https://pbs.twimg.com/profile_images/680010220324712449/yoz5DV8l_400x400.jpg',
        },
      ],
    };
  }

  changeSwitch = value => {
    this.setState({colorFalseSwitchIsOn: value ? true : false});
  };

  backMainScreen = () => {
    Navigation.dismissModal(this.props.componentId);
  };

  searchSubmit = () => {
    alert('ok');
  };

  onShowDataSearch = item => {
    // alert(item);
  };

  _renderItem = ({item}) => {
    console.log(item.uri);
    return (
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          borderWidth: 4,
          borderColor: 'white',
        }}>
        {/* <Image
          source={{uri: item.image}}
          style={{width: 125, height: 125, borderRadius: 150}}
        /> */}
        <View>
          <Image
            style={{width: 40, height: 40, borderRadius: 50}}
            resizeMode="cover"
            source={{uri: item.image}}
          />
        </View>
        <View
          style={{
            justifyContent: 'center',
            marginHorizontal: 20,
          }}>
          <Text resizeMode="cover">{item.name}</Text>
        </View>
      </View>
    );
  };

  _search(text) {
    let data = [];
    this.state.data_temp.map(function(value) {
      if (value.name.indexOf(text) > -1) {
        data.push(value);
      }
    });
    this.setState({
      data: data,
      search: text,
    });
  }

  render() {
    const searchData = this.state.searchData;

    return (
      <View style={{flex: 1, backgroundColor: '#F99A7C'}}>
        <LinearGradient colors={['#FC5895', '#FC5895', '#F99A7C']}>
          <View
            style={{
              padding: 10,
              flexDirection: 'row',
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
                Tìm kiếm
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
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#f2f2f2',
              borderRadius: 30,
              margin: 15,
              marginHorizontal: 25,
              paddingVertical: 3,
              paddingHorizontal: 10,
            }}>
            <TextInput
              style={styles.textInput}
              placeholder="Tìm kiếm..."
              // onChangeText={text => this.searchFilterFunction(text)}
              // onChangeText={text => this._search(text)}
              autoCapitalize="sentences"
              autoFocus={true}
              autoCorrect={true}
              value={this.state.value}
              editable
              maxLength={40}
              returnKeyType={'search'}
              onSubmitEditing={this.searchSubmit}
            />

            <TouchableOpacity
              onPress={() => this._search('')}
              style={{paddingHorizontal: 10}}>
              <Ionicons name="ios-close" color="gray" size={20} />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <ScrollView style={styles.container}>
          <View
            style={{
              flex: 1,
            }}>
            <View
              style={{
                padding: 10,
              }}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                Tìm kiếm gần đây
              </Text>
            </View>
            <View
              style={{borderBottomWidth: 1, borderBottomColor: Colors.shadow}}
            />
            <View
              style={{
                flexDirection: 'row',
                marginVertical: 10,
                padding: 10,
              }}>
              <FlatList
                data={this.state.searchData}
                extraData={this.state}
                keyExtractor={(item, index) => index.toString()}
                renderItem={this._renderItem}
              />
            </View>

            <View
              style={{
                padding: 10,
              }}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                Tìm kiếm liên quan
              </Text>
            </View>
            <View
              style={{borderBottomWidth: 1, borderBottomColor: Colors.shadow}}
            />
            <SearchItems />
            <SearchItems />
            {/* <SearchItems />
            <SearchItems />
            <SearchItems />
            <SearchItems />
            <SearchItems />
            <SearchItems />
            <SearchItems /> */}
          </View>
        </ScrollView>
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
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
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
  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderColor: '#d9d9d9',
    height: 40,
    borderRadius: 30,
    margin: 10,
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
  },
});
