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

  render() {
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
              backgroundColor: 'white',
              borderWidth: 0.5,
              borderColor: '#d9d9d9',
              borderRadius: 30,
              margin: 15,
              marginHorizontal: 25,
            }}>
            <TextInput
              style={styles.textInput}
              placeholder="Tìm kiếm..."
              // onChangeText={text => this.searchFilterFunction(text)}
              autoCapitalize="sentences"
              // autoFocus={true}
              autoCorrect={true}
              value={this.state.value}
              editable
              maxLength={40}
              returnKeyType={'search'}
              onSubmitEditing={this.searchSubmit}
            />

            <View style={{marginRight: 10}}>
              <Icon
                name="search"
                size={20}
                color="#5f5f5f"
                onPress={() => this.searchSubmit()}
              />
            </View>
          </View>
        </LinearGradient>

        <ScrollView style={styles.container}>
          <View
            style={{
              flex: 1,
            }}>
            <SearchItems />
            <SearchItems />
            <SearchItems />
            <SearchItems />
            <SearchItems />
            <SearchItems />
            <SearchItems />
            <SearchItems />
            <SearchItems />
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
  },
});
