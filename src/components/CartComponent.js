import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import CardIcon from 'react-native-vector-icons/AntDesign';
import {connect} from 'react-redux';
import Colors from '../themers/Colors';

class CartComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
    };
  }

  changeShopping = () => {
    this.props.changeShopping();
  };

  render() {
    const {size} = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.changeShopping()}>
          <View style={styles.viewNumberItem}>
            <Text style={styles.text}>{size}</Text>
          </View>

          <CardIcon
            name="shoppingcart"
            size={35}
            color="#7adaf7"
            onPress={() => this.changeShopping()}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#7adaf7',
    position: 'absolute',
    bottom: 40,
    borderRadius: 50,
    right: 20,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    paddingRight: 10,
    paddingTop: 10,
    marginRight: 5,
  },
  viewNumberItem: {
    position: 'absolute',
    height: 25,
    width: 25,
    borderRadius: 15,
    backgroundColor: 'rgba(95,197,123,0.8)',
    right: -8,
    bottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2000,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});

const mapStateToProps = state => {
  return {
    stores: state.stores,
    comments: state.comments,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    // onGetStoreDetail: (storeId, token) => {
    //   dispatch(getStoreDetail(storeId, token));
    // },
    // onGetAllComment: (storeId, token) => {
    //   dispatch(getAllComments(storeId, token));
    // },
  };
};

export default connect(null, null)(CartComponent);
