import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {t} from '../../../i18n/t';
import Colors from '../../../themers/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fonts from '../../../themers/Fonts';
import {take} from 'lodash';
import {Navigation} from 'react-native-navigation';
import {connect} from 'react-redux';
import _ from 'lodash';
import NoComment from '../../../components/NoComment';
import {storageGet} from '../../../checkAsyncStorage';
import star from '../../../../assets/images/star2.png';
import Logo from '../../../../assets/images/logo.png';

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowAllComment: false,
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
          source={star}
          style={{width: 15, height: 15, marginRight: 3}}
          resizeMode="cover"
        />,
      );
    }
    return rating;
  }

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

  renderItem = ({item}) => {
    const user_id = this.state.user_id;
    return (
      <View style={styles.viewItem}>
        <View style={styles.viewImage}>
          {item.user[0].avatar ? (
            <Image source={{uri: item.user[0].avatar}} style={styles.image} />
          ) : (
            <Image source={Logo} style={styles.image} />
          )}
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

  render() {
    const commentsData = this.props.comments.dataComments;

    if (commentsData === '[]') {
      return <NoComment onShowForm={this.onShowForm} />;
    } else {
      const sortDataComments = _.orderBy(commentsData, 'updated_at', 'desc');

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

          <View style={styles.viewButton}>
            <View style={{width: 150}}>
              <TouchableOpacity onPress={this.onShowAllComment}>
                <Text
                  style={{
                    ...styles.button,
                    ...{
                      marginRight: 10,
                      backgroundColor: this.state.isShowAllComment
                        ? '#FCB1B6'
                        : 'blue',
                      color: this.state.isShowAllComment ? 'black' : 'white',
                    },
                  }}>
                  {this.state.isShowAllComment ? 'Thu gọn' : 'Xem thêm'}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{width: 150}}>
              <TouchableOpacity onPress={this.onShowForm}>
                <Text
                  style={{
                    ...styles.button,
                    ...{
                      backgroundColor: '#FCB1B6',
                      color: 'black',
                      marginLeft: 10,
                    },
                  }}>
                  Bình luận
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
  viewImage: {
    marginLeft: 20,
    justifyContent: 'center',
    marginTop: 5,
  },
  button: {
    borderRadius: 20,
    fontSize: 15,
    fontWeight: 'bold',
    padding: 12,
    paddingHorizontal: 30,
    textAlign: 'center',
  },
  viewItem: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#eaeaea',
    marginVertical: -10,
  },
  viewButton: {
    marginHorizontal: 10,
    marginTop: 20,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
});

const mapStateToProps = state => {
  return {
    comments: state.comments,
  };
};

export default connect(mapStateToProps, null)(Comment);
