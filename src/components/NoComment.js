import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
const {width, height} = Dimensions.get('window');
import UpdateDataImage from '../../assets/images/updatedata.jpg';
import Colors from '../themers/Colors';
import {t} from '../i18n/t';
import Fonts from '../themers/Fonts';
import Icon from 'react-native-vector-icons/FontAwesome';

class NoComment extends Component {
  onShowForm = () => {
    this.props.onShowForm();
  };

  render() {
    return (
      <View style={styles.container}>
        <Icon
          name="comments-o"
          size={50}
          color="gray"
          onPress={() => this.backMainScreen()}
        />
        <Text style={styles.styleText}>{t('no_data')}</Text>
        <View style={{width: 150, marginTop: 15}}>
          <TouchableOpacity onPress={this.onShowForm}>
            <Text
              style={{
                borderRadius: 20,
                fontSize: 15,
                fontWeight: 'bold',
                marginLeft: 10,
                padding: 12,
                paddingHorizontal: 30,
                textAlign: 'center',
                backgroundColor: '#FCB1B6',
                color: 'black',
              }}>
              Bình luận
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: height / 4,
    marginHorizontal: 12,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 2,
    borderColor: Colors.darkGray,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    textAlign: 'center',
    backgroundColor: 'white',
  },

  styleImage: {
    width: 100,
    height: 100,
    backgroundColor: '#ababab',
    borderRadius: 10,
    marginBottom: 10,
  },
  styleText: {
    fontSize: 15,
    color: Colors.darkGray,
    fontFamily: Fonts.serif,
    marginTop: 20,
  },
});

export default NoComment;
