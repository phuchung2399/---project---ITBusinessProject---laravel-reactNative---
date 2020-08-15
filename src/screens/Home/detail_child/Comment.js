import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import {t} from '../../../i18n/t';
import Colors from '../../../themers/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import Success from 'react-native-vector-icons/AntDesign';
import Fonts from '../../../themers/Fonts';
import {get, find, take} from 'lodash';

export default class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowAllComment: false,
    };
  }

  onShowAllComment = () => {
    this.setState({
      isShowAllComment: !this.state.isShowAllComment,
    });
  };

  _rating(item) {
    let rating = [];
    let i = 0;
    for (i = 0; i < item; i++) {
      rating.push(
        <Image
          source={require('../asset/star2.png')}
          style={{width: 15, height: 15, marginRight: 3}}
          resizeMode="cover"
        />,
      );
    }
    return rating;
  }

  renderItem = ({item}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center',
          borderBottomWidth: 2,
          borderBottomColor: '#eaeaea',
          marginVertical: -10,
        }}>
        <View style={{flex: 1, justifyContent: 'center', marginTop: 5}}>
          <Image source={{uri: item.user[0].avatar}} style={styles.image} />
        </View>
        <View style={{flex: 3, justifyContent: 'center'}}>
          <Text numberOfLines={1} style={styles.name}>
            {item.user[0].user_name}
          </Text>
          <View style={{flexDirection: 'row'}}>{this._rating(item.star)}</View>
          <Text numberOfLines={2} style={styles.comment}>
            {item.title}
          </Text>
        </View>
      </View>
    );
  };

  ItemSeparatorComponent = () => {
    return <View style={{height: 30}} />;
  };

  onShowForm = () => {
    this.refs.addModal.showAddModal();
  };

  render() {
    const commentsData = this.props.commentsData;
    console.log(commentsData);
    if (commentsData === '[]') {
      return (
        <View style={styles.viewNodata}>
          <Text style={styles.textNoData}>{t('no_data')}</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <FlatList
            // data={commentsData}
            data={take(
              commentsData,
              this.state.isShowAllComment ? commentsData.length : 2,
            )}
            renderItem={this.renderItem}
            ItemSeparatorComponent={this.ItemSeparatorComponent}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
          />

          <View
            style={{
              marginHorizontal: 10,
              marginTop: 20,
              padding: 10,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{width: 150}}>
              <TouchableWithoutFeedback onPress={this.onShowAllComment}>
                <Text
                  style={{
                    borderRadius: 20,
                    fontSize: 15,
                    fontWeight: 'bold',
                    padding: 12,
                    paddingHorizontal: 30,
                    textAlign: 'center',
                    marginRight: 10,
                    backgroundColor: this.state.isShowAllComment
                      ? '#FCB1B6'
                      : 'blue',
                    color: this.state.isShowAllComment ? 'black' : 'white',
                  }}>
                  {this.state.isShowAllComment ? 'Thu gon' : 'Xem them'}
                </Text>
              </TouchableWithoutFeedback>
            </View>

            <View style={{width: 150}}>
              <TouchableWithoutFeedback onPress={this.onShowForm}>
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
                  Binh Luan
                </Text>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </View>
      );
    }
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 20,
    borderRadius: 35,
  },
  item: {
    flexDirection: 'row',
    // padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#eaeaea',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: 'green',
  },
  name: {
    color: 'green',
    fontWeight: 'bold',
  },
  comment: {
    fontStyle: 'italic',
    // marginTop: 5,
  },
  viewNodata: {
    flex: 1,
    marginHorizontal: 12,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 2,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    textAlign: 'center',
    backgroundColor: 'white',
    borderColor: Colors.darkGray,
  },
  textNoData: {
    fontSize: 17,
    color: Colors.darkGray,
  },
});
