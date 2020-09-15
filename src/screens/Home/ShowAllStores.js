import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import ShowAllStoreItems from './components/ShowAllStoreItems';
import Logo from '../../../assets/images/logo.png';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fonts from '../../themers/Fonts';
import Colors from '../../themers/Colors';
import Loading from '../Loading';

export default class ShowAllStores extends Component {
  backMainScreen = () => {
    Navigation.dismissModal(this.props.componentId);
  };

  renderHeader = () => {
    const {title} = this.props;
    return (
      <LinearGradient colors={[Colors.pink, Colors.pink, Colors.orrange]}>
        <View style={styles.containerHeader}>
          <View style={styles.viewIconBack}>
            <FontAwesome
              name="chevron-left"
              size={25}
              color="black"
              onPress={() => this.backMainScreen()}
            />
          </View>
          <View style={styles.viewTitle}>
            <Text style={styles.txtTitle} numberOfLines={1}>
              {title}
            </Text>
          </View>
          <View style={styles.viewLogo}>
            <Image style={styles.logo} source={Logo} />
          </View>
        </View>
      </LinearGradient>
    );
  };

  renderLoading = () => {
    return (
      <View style={styles.viewLoading}>
        <Loading />
      </View>
    );
  };

  renderData = data => {
    return (
      <ScrollView>
        <View style={styles.viewData}>
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

  renderBody = () => {
    const {data} = this.props;
    return (
      <>
        {data.length <= 0 && this.renderLoading()}
        {data.length > 0 && this.renderData(data)}
      </>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        {this.renderBody()}
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

  containerHeader: {
    flexDirection: 'row',
    padding: 5,
    height: 80,
  },
  viewIconBack: {
    flex: 1,
    padding: 10,
    margin: 10,
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 50,
    alignItems: 'center',
    maxHeight: 45,
    maxWidth: 45,
  },
  viewTitle: {
    flex: 6,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  txtTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: Fonts.serif,
  },
  viewLogo: {
    alignItems: 'flex-end',
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: -5,
  },
  logo: {
    width: 50,
    height: 50,
  },
  viewLoading: {
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  viewData: {
    marginTop: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
