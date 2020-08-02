import AwesomeAlert from 'react-native-awesome-alerts';
import React, {Component} from 'react';
import {Navigation} from 'react-native-navigation';
import {connect} from 'react-redux';
import {
  Text,
  View,
  Image,
  StyleSheet,
  AsyncStorage,
  FlatList,
  ScrollView,
} from 'react-native';

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlert: this.props.showAlert,
    };
  }

  hideAlert = () => {
    this.setState({
      showAlert: false,
    });
  };

  onHandle = () => {
    alert('pk');
  }

  render() {
    return (

         <AwesomeAlert
          show={this.props.showAlert}
          showProgress={false}
          title="Bạn cần đăng nhập để thực hiện thao tác này?"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          cancelButtonColor="#8be4cb"
          showConfirmButton={true}
          cancelText="Để sau"
          confirmText="Đăng nhập"
          confirmButtonColor="#1d9dd8"
          onCancelPressed={() => {
            this.hideAlert();
          }}
          onConfirmPressed={() => {
            onHandle();
          }}
        />



    );
  }
}
const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#7adaf7',
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 65,
    borderRadius: 50,
    right: 20,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
  },
  showall: {
    alignItems: 'flex-end',
    color: '#1d9dd8',
    flex: 1,
    fontSize: 15,
  },
  category: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  scroll: {
    padding: 10,
    marginBottom: 65,
    paddingBottom: 100,
  },
  bookCount: {
    color: '#ababab',
    paddingLeft: 10,
  },
  topbar: {
    paddingLeft: 15,
    paddingTop: 20.5,
    fontSize: 10.5,
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  search: {
    alignItems: 'flex-end',
  },
  text: {
    fontSize: 22,
    paddingTop: 5,
    flex: 3.5,
  },
  rate: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    color: '#4a4a4a',
    fontSize: 18,
  },
  author: {
    color: '#ababab',
    fontSize: 16,
    width: 150,
  },
});

export default index;