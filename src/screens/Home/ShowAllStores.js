import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Navigation} from 'react-native-navigation';
import {get} from 'lodash';
import ShowAllStoreItems from './components/ShowAllStoreItems';
import Logo from '../../../assets/images/logo.png';
import LinearGradient from 'react-native-linear-gradient';
import {t} from '../../i18n/t';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fonts from '../../themers/Fonts';
import Loading from '../Loading';

export default class ShowAllStores extends Component {
  componentDidMount() {
    // console.log(this.props.data);
  }

  backMainScreen = () => {
    Navigation.dismissModal(this.props.componentId);
  };

  renderHeader = () => {
    const {title} = this.props;

    return (
      <LinearGradient colors={['#FC5895', '#FC5895', '#F99A7C']}>
        <View
          style={{
            flexDirection: 'row',
            padding: 5,
            height: 80,
          }}>
          <View
            style={{
              flex: 1,
              padding: 10,
              margin: 10,
              justifyContent: 'center',
              backgroundColor: 'white',
              borderRadius: 50,
              alignItems: 'center',
              maxHeight: 45,
              maxWidth: 45,
            }}>
            <FontAwesome
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
                fontSize: 20,
                fontWeight: 'bold',
                color: 'white',
              }}>
              {title}
            </Text>
          </View>
          <View
            style={{
              alignItems: 'flex-end',
              flex: 1,
              justifyContent: 'center',
              alignContent: 'center',
              marginTop: -5,
            }}>
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
    );
  };

  renderBody = data => {
    console.log(data.length);
    if (data.length <= 0) {
      return (
        <View
          style={{
            padding: 12,
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}>
          <Loading loadingText="Loading..." />
        </View>
      );
    }

    return (
      <ScrollView>
        <View
          style={{
            marginTop: '5%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <FlatList
            data={data}
            renderItem={({item, index}) => {
              return (
                <ShowAllStoreItems
                  item={item}
                  index={index}
                  parentFlatList={this}
                  component={this.props.componentId}
                />
              );
            }}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </ScrollView>
    );
  };

  render() {
    const {title, data} = this.props;

    return (
      <View style={styles.container}>
        {this.renderHeader()}
        {this.renderBody(data)}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    color: '#262626',
    fontSize: 20,
    paddingTop: 10,
  },
  viewIcon: {
    justifyContent: 'center',
    flex: 1,
  },
  book: {
    flex: 0.5,
  },
});
