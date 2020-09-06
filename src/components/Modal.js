import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableHighlight, Modal} from 'react-native';

class index extends Component {
  onCancel = () => {
    this.props.onCancel();
  };

  onConfirm = () => {
    this.props.onConfirm();
  };

  render() {
    const {
      modalVisible,
      message,
      txtBackButton,
      txtConfirmButton,
      height,
    } = this.props;

    return (
      <>
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.container}>
            <View style={{...styles.viewContainer, ...{height: height}}}>
              {message && <Text style={styles.message}>{message}</Text>}
              <View style={styles.viewButton}>
                {txtBackButton && (
                  <TouchableHighlight
                    style={styles.buttonBack}
                    onPress={() => {
                      this.onCancel();
                    }}>
                    <Text style={styles.txtBack}>{txtBackButton}</Text>
                  </TouchableHighlight>
                )}

                {txtConfirmButton && (
                  <TouchableHighlight
                    style={styles.btnConfirm}
                    onPress={() => {
                      this.onConfirm();
                    }}>
                    <Text style={styles.txtConfirm}>{txtConfirmButton}</Text>
                  </TouchableHighlight>
                )}
              </View>
            </View>
          </View>
        </Modal>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    height: 100,
  },
  viewContainer: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 300,
    // height: 200,
  },
  message: {
    marginBottom: 18,
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    color: '#797777',
  },
  viewButton: {
    flexDirection: 'row',
  },
  buttonBack: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 100,
    marginHorizontal: 20,
  },
  txtBack: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  btnConfirm: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 100,
    marginHorizontal: 20,
  },
  txtConfirm: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default index;
