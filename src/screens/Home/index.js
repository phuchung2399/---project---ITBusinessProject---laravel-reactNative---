import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import Logo from '../../../assets/images/logo.png';
import Carousel from '../../components/Carousel';
import {dummyData} from '../../utils/index';
import {Navigation} from 'react-native-navigation';
import {t} from '../../i18n/t';
import demodata from './../../utils/DemoData';
import NailItem from './components/NailItems';
import ReviewData from '../../utils/ReviewData';
import UserReview from './components/UserReview';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      isShowInfor: false,
      showAlert: false,
    };
  }

  changScreenSidebar = () => {
    Navigation.mergeOptions('sideMenu', {
      sideMenu: {
        left: {
          visible: true,
        },
      },
    });
  };

  changScreenSearch = () => {
    Navigation.showModal({
      component: {
        name: 'Search',
      },
    });
  };

  onPress = idBook => {
    Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              name: 'Booking',
              // passProps: {
              //   IdBook: idBook,
              // },
              options: {
                topBar: {
                  title: {
                    text: '',
                    alignment: 'center',
                  },
                  visible: false,
                },
              },
            },
          },
        ],
      },
    });
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            backgroundColor: '#FC5895',
            padding: 16,
            flexDirection: 'row',
          }}>
          <View
            style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
            <Icon
              name="list"
              size={30}
              color="white"
              onPress={() => this.changScreenSidebar()}
            />
          </View>
          <View
            style={{
              alignItems: 'flex-end',
              justifyContent: 'center',
              borderWidth: 0.5,
              borderColor: 'white',
              borderRadius: 20,
            }}>
            <EvilIcons
              name="search"
              size={30}
              color="white"
              onPress={() => this.changScreenSearch()}
            />
          </View>
        </View>
        <ScrollView
          style={{
            flex: 1,
            marginTop: -10,
            paddingBottom: 100,
          }}>
          <LinearGradient colors={['#FC5895', '#F99A7C', '#F99A7C', '#F99A7C']}>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                height: 200,
              }}>
              <Text
                animation="zoomInUp"
                style={{
                  fontSize: 50,
                  fontWeight: 'bold',
                  color: 'white',
                  marginTop: -10,
                }}>
                {t('home_page')}
              </Text>
            </View>
          </LinearGradient>

          <View style={{marginTop: '-30%'}}>
            <Carousel data={dummyData} />
          </View>
          <View style={{padding: 10, paddingBottom: 10}}>
            <View style={styles.category}>
              <Text style={styles.text}>Cửa hàng mới nhất</Text>
              <Text style={styles.showall}>Xem hết</Text>
            </View>
            <FlatList
              data={demodata}
              keyExtractor={(item, index) => `${index}`}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => {
                return (
                  <NailItem
                    item={item}
                    index={index}
                    parentFlatList={this}
                    component={this.props.componentId}
                  />
                );
              }}
            />

            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                padding: 10,
                justifyContent: 'center',
                marginTop: 10,
              }}>
              <Text style={styles.text}>Cửa hàng mới nhất</Text>
              <Text style={styles.showall}>Xem hết</Text>
            </View>
            <FlatList
              data={demodata}
              keyExtractor={(item, index) => `${index}`}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => {
                return (
                  <NailItem
                    item={item}
                    index={index}
                    parentFlatList={this}
                    component={this.props.componentId}
                  />
                );
              }}
            />

            <View style={styles.category}>
              <Text style={styles.text}>Top 10 khách hàng tốt nhất</Text>
            </View>
            <FlatList
              data={ReviewData}
              renderItem={({item}) => (
                <UserReview
                  image={item.image}
                  name={item.name}
                  orderCount={item.orderCount}
                  extraInfor={'lượt order'}
                />
              )}
              horizontal={true}
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
            />
            <View style={styles.category}>
              <Text style={styles.text}>Top 5 người nhận xét nổi bật</Text>
            </View>
            <FlatList
              data={ReviewData}
              renderItem={({item}) => (
                <UserReview image={item.image} name={item.name} />
              )}
              horizontal={true}
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  category: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'center',
  },
  text: {
    fontSize: 22,
    paddingTop: 5,
    flex: 4,
    color: 'black',
    fontWeight: 'bold',
  },
  showall: {
    alignItems: 'flex-end',
    color: '#1d9dd8',
    flex: 1,
    fontSize: 15,
  },
});
