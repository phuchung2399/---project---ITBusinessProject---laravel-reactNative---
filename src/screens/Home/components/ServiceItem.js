import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TouchableHighlight,
  Dimensions,
} from 'react-native';
import iconProfile from '../../../../assets/images/profile_icon.png';
const {width, height} = Dimensions.get('window');
import {Navigation} from 'react-native-navigation';
import {formatPrice} from '../../../formatPrice';

class ServiceItem extends Component {
  constructor(props) {
    super(props);
    this.dataRef = React.createRef();
    this.state = {
      modalVisible: false,
    };
  }

  onPress = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
    });
  };

  onChangeStore = store_id => {
    Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              name: 'Detail',
              passProps: {
                store_id: store_id,
              },
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
    const {item} = this.props;
    const showImage =
      item.image === '' ? (
        <Image source={iconProfile} style={styles.image} />
      ) : (
        <Image source={{uri: item.image}} style={styles.image} />
      );

    return (
      <>
        <View style={styles.showflast}>
          <TouchableOpacity onPress={() => this.onPress()}>
            {showImage}

            <View style={styles.textView}>
              <Text style={styles.itemTitle} numberOfLines={1}>
                {item.service_name}
              </Text>
              <Text style={styles.itemPrice}>
                {formatPrice(item.price, ',', '.')} đ
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 22,
              height: 130,
            }}>
            <View
              style={{
                margin: 20,
                backgroundColor: 'white',
                borderRadius: 20,
                padding: 35,
                shadowColor: '#000',
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                width: 300,
                height: 340,
              }}>
              {item.image === '' ? (
                <Image
                  source={iconProfile}
                  style={{
                    width: '100%',
                    height: height / 4,
                    shadowOpacity: 0.5,
                    borderRadius: 10,
                  }}
                />
              ) : (
                <Image
                  source={{uri: item.image}}
                  style={{
                    width: '100%',
                    height: 150,
                    shadowOpacity: 0.5,
                    borderRadius: 10,
                  }}
                />
              )}

              <Text
                style={{
                  marginTop: 10,
                  textAlign: 'center',
                  fontSize: 18,
                  color: '#797777',
                }}
                numberOfLines={1}>
                {item.service_name}
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 16,
                  color: 'red',
                }}>
                {formatPrice(item.price, ',', '.')} đ
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableHighlight
                  style={{
                    backgroundColor: '#F194FF',
                    borderRadius: 20,
                    padding: 10,
                    elevation: 2,
                    width: 120,
                    marginHorizontal: 10,
                  }}
                  onPress={() => {
                    this.setState({
                      modalVisible: !this.state.modalVisible,
                    });
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}>
                    Quay lại
                  </Text>
                </TouchableHighlight>

                <TouchableHighlight
                  style={{
                    backgroundColor: '#2196F3',
                    borderRadius: 20,
                    padding: 10,
                    marginHorizontal: 10,
                    elevation: 2,
                    width: 120,
                  }}
                  onPress={() => {
                    this.onChangeStore(item.store_id);
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}>
                    Đến cửa hàng
                  </Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </Modal>
      </>
    );
  }
}

const styles = StyleSheet.create({
  showflast: {
    width: width / 3,
    flex: 1,
    height: height / 5,
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0.5, height: 0.5},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },

  textView: {
    position: 'absolute',
    bottom: 10,
    margin: 10,
    left: 5,
  },

  image: {
    width: '100%',
    height: height / 5,
    shadowOpacity: 0.5,
    borderRadius: 10,
  },
  itemTitle: {
    color: 'white',
    fontSize: 22,
    shadowColor: '#000',
    shadowOffset: {width: 0.8, height: 0.8},
    shadowOpacity: 1,
    shadowRadius: 3,
    marginBottom: 5,
    fontWeight: 'bold',
    elevation: 5,
  },
  itemPrice: {
    color: 'white',
    fontSize: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0.8, height: 0.8},
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5,
  },
});
export default ServiceItem;
