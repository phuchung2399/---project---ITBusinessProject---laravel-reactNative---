import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Picker,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {t} from '../../../i18n/t';
import Colors from '../../../themers/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Success from 'react-native-vector-icons/AntDesign';
import Fonts from '../../../themers/Fonts';
import {get, find, take} from 'lodash';
import {Navigation} from 'react-native-navigation';
import {connect} from 'react-redux';
import _ from 'lodash';
import NoComment from '../../../components/NoComment';
import Avatar from 'react-avatar';
import {storageRemove, storageGet} from '../../../checkAsyncStorage';

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowAllComment: false,
      menu: '',
      user_id: '',
    };
  }

  componentDidMount() {
    this.onGetUserData();
  }

  onGetUserData = async () => {
    try {
      let getUserAccount = await storageGet('user');
      let parsedUser = JSON.parse(getUserAccount);
      if (parsedUser) {
        this.setState({user_id: parsedUser.data.user.user_id});
      }
    } catch (error) {
      console.log(error);
    }
  };

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
    const user_id = this.state.user_id;
    console.log(item.user_id);
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
        <View style={{marginLeft: 20, justifyContent: 'center', marginTop: 5}}>
          <Image source={{uri: item.user[0].avatar}} style={styles.image} />
        </View>
        <View style={{marginLeft: 20, flex: 1, justifyContent: 'center'}}>
          <Text numberOfLines={1} style={styles.name}>
            {item.user[0].user_name}
          </Text>
          <View style={{flexDirection: 'row'}}>{this._rating(item.star)}</View>
          <Text numberOfLines={2} style={styles.comment}>
            {item.title}
          </Text>
        </View>
        {user_id === item.user_id ? (
          <View style={{justifyContent: 'center', flexDirection: 'row'}}>
            <View style={{justifyContent: 'center', marginHorizontal: 13}}>
              <AntDesign
                name="edit"
                size={25}
                color="green"
                onPress={() => this.onEditComment(item.comment_id, item.title)}
              />
            </View>
          </View>
        ) : null}
      </View>
    );
  };

  onEditComment = (comment_id, title) => {
    Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              name: 'UpdateCommentModal',
              passProps: {
                store_id: this.props.store_id,
                comment_id,
                title,
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

  ItemSeparatorComponent = () => {
    return <View style={{height: 30}} />;
  };

  onShowForm = () => {
    Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              name: 'CommentModal',
              passProps: {
                store_id: this.props.store_id,
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
    const commentsData = this.props.comments.dataComments;

    console.log(this.state.user_id);

    if (commentsData === '[]') {
      return <NoComment onShowForm={this.onShowForm} />;
    } else {
      const sortDataComments = _.orderBy(commentsData, 'updated_at', 'desc');
      console.log(sortDataComments);

      return (
        <View style={styles.container}>
          <FlatList
            ref={'FlatList'}
            data={take(
              sortDataComments,
              this.state.isShowAllComment ? sortDataComments.length : 5,
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
              <TouchableOpacity onPress={this.onShowAllComment}>
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
              </TouchableOpacity>
            </View>

            <View style={{width: 150}}>
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
                  Binh Luan
                </Text>
              </TouchableOpacity>
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
    fontSize: 17,
  },
  comment: {
    fontStyle: 'italic',
    marginTop: 5,
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

const mapStateToProps = state => {
  return {
    comments: state.comments,
  };
};

export default connect(mapStateToProps, null)(Comment);
