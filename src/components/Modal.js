import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableHighlight, Modal} from 'react-native';
import {t} from '../i18n/t';

class index extends Component {
  onCancel = () => {
    this.props.onCancel();
  };

  onVerify = () => {
    this.props.onVerify();
  };

  render() {
    const {modalVisible} = this.props;

    return (
      <View style={styles.container}>
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.viewModal}>
            <View style={styles.modal}>
              <Text style={styles.text_confirm}>
                {t('confirm_text_singout')}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <TouchableHighlight
                  style={styles.buttonCancel}
                  onPress={() => {
                    this.onCancel();
                  }}>
                  <Text style={styles.txtCancel}>Quay lại</Text>
                </TouchableHighlight>

                <TouchableHighlight
                  style={styles.btnConfirm}
                  onPress={() => {
                    this.onVerify();
                  }}>
                  <Text style={styles.txtSignOut}>Đăng xuất</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F99A7C',
  },

  viewModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    height: 100,
  },
  modal: {
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
    height: 200,
  },
  text_confirm: {
    marginBottom: 18,
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    color: '#797777',
  },
  buttonCancel: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 100,
    marginHorizontal: 20,
  },
  txtCancel: {
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
  txtSignOut: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default index;
