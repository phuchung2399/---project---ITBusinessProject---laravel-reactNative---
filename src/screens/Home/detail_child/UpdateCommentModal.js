import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  Platform,
  Image,
  Dimensions,
  TouchableOpacity,
  View,
  Textarea,
  ScrollView,
  Alert,
  TouchableWithoutFeedback,
  AsyncStorage,
  TouchableHighlight,
} from 'react-native';
import {storageRemove, storageGet} from '../../../checkAsyncStorage';
import Modal from 'react-native-modalbox';
import Icon from 'react-native-vector-icons/FontAwesome';
// import {onSignIn} from '../../navigation';
import {connect} from 'react-redux';
import {Navigation} from 'react-native-navigation';
import {editComment} from '../../../redux/commentRedux/action';
import {getStoreDetail} from '../../../redux/storeRedux/action';
import LinearGradient from 'react-native-linear-gradient';
const {width, height} = Dimensions.get('window');
import {t} from '../../../i18n/t';
var screen = Dimensions.get('window');
import Colors from '../../../themers/Colors';
import Fonts from '../../../themers/Fonts';
import Logo from '../../../../assets/images/logo.png';

class UpdateCommentModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      star1: false,
      star2: false,
      star3: false,
      star4: false,
      star5: false,
      rank: '',
      comment: '',
      token: '',
    };
  }

  showAddModal = () => {
    this.refs.myModal.open();
  };

  onResetStar = () => {
    this.setState({
      rank: '',
      star1: false,
      star2: false,
      star3: false,
      star4: false,
      star5: false,
    });
  };

  onClickStar1 = () => {
    this.onResetStar();
    this.setState({
      rank: 1,
      star1: true,
    });
  };

  onClickStar2 = () => {
    this.onResetStar();
    this.setState({
      rank: 2,
      star1: true,
      star2: true,
    });
  };
  onClickStar3 = () => {
    this.onResetStar();
    this.setState({
      rank: 3,
      star1: true,
      star2: true,
      star3: true,
    });
  };
  onClickStar4 = () => {
    this.onResetStar();
    this.setState({
      rank: 4,
      star1: true,
      star2: true,
      star3: true,
      star4: true,
    });
  };
  onClickStar5 = () => {
    this.onResetStar();
    this.setState({
      rank: 5,
      star1: true,
      star2: true,
      star3: true,
      star4: true,
      star5: true,
    });
  };

  onSubmit = () => {
    Alert.alert('Thông báo', 'Cập nhật bình luận thành công!');

    let {comment, rank} = this.state;
    const {store_id, comment_id} = this.props;

    let token = this.state.token;

    var commentData = {
      star: rank,
      title: comment,
      store_id,
    };
    this.props.onUpdateComment(comment_id, commentData, token);
    this.backMainScreen();
  };

  onCheck = () => {
    let {comment, rank} = this.state;

    if (rank === '') {
      Alert.alert('Thông báo', 'Vui lòng đánh giá sao!');
    } else if (comment === '') {
      Alert.alert('Thông báo', 'Vui lòng nhập nội dung đánh giá!');
    } else {
      this.onVerify();
    }
  };

  onVerify = () => {
    Alert.alert(
      'Xác nhận',
      'Bạn có chắc muốn thay đổi bình luận không?',
      [
        {
          text: 'Quay lại',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => this.onSubmit()},
        ,
      ],
      {cancelable: false},
    );
  };

  backMainScreen = () => {
    Navigation.dismissModal(this.props.componentId);
  };

  onGetUserData = async () => {
    try {
      let getUserAccount = await storageGet('user');
      let parsedUser = JSON.parse(getUserAccount);
      if (parsedUser) {
        this.setState(
          {token: parsedUser.data.token, comment: this.props.title},
          () => {
            this.props.onGetStoreDetail(this.props.store_id, this.state.token);
          },
        );
      }
    } catch (error) {
      console.log('comment add ', error);
    }
  };

  componentDidMount() {
    this.onGetUserData();
  }

  render() {
    const {star1, star2, star3, star4, star5} = this.state;
    const {detailStore} = this.props.stores;

    const {store_id, comment_id, title} = this.props;

    console.log('detailStore', this.state.comment, this.state.rank);

    return (
      <ScrollView>
        <View style={{flex: 1, backgroundColor: Colors.orrange}}>
          <LinearGradient colors={[Colors.pink, Colors.pink, Colors.orrange]}>
            <View
              style={{
                padding: 10,
                flexDirection: 'row',
                height: height / 5,
                // backgroundColor: 'red',
              }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignContent: 'center',
                  backgroundColor: 'white',
                  borderRadius: 50,
                  alignItems: 'center',
                  maxHeight: 40,
                  maxWidth: 40,
                }}>
                <Icon
                  name="chevron-left"
                  size={25}
                  color="black"
                  onPress={() => this.backMainScreen()}
                />
              </View>

              <View
                style={{
                  flex: 6,
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  animation="zoomInUp"
                  style={{
                    fontSize: 30,
                    fontWeight: 'bold',
                    color: 'white',
                  }}>
                  {detailStore.store_name}
                </Text>
              </View>
              <View style={{alignItems: 'flex-end', flex: 1}}>
                <Image
                  style={{
                    width: 50,
                    height: 50,
                  }}
                  source={Logo}
                />
              </View>
            </View>
          </LinearGradient>
          <View
            style={{
              borderTopLeftRadius: 50,
              borderTopRightRadius: 50,
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
              paddingHorizontal: 5,
              paddingVertical: 25,
              backgroundColor: 'white',
              margin: 20,
              flex: 1,
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: 400,
              }}>
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  color: 'black',
                }}>
                Đánh giá
              </Text>

              <View style={style.rank}>
                <TouchableWithoutFeedback onPress={this.onClickStar1}>
                  <Icon
                    name="star"
                    size={30}
                    style={
                      star1 === true
                        ? style.colorStarActive
                        : style.colorStarDisActive
                    }
                  />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={this.onClickStar2}>
                  <Icon
                    name="star"
                    size={30}
                    style={
                      star2 === true
                        ? style.colorStarActive
                        : style.colorStarDisActive
                    }
                  />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={this.onClickStar3}>
                  <Icon
                    name="star"
                    size={30}
                    style={
                      star3 === true
                        ? style.colorStarActive
                        : style.colorStarDisActive
                    }
                  />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={this.onClickStar4}>
                  <Icon
                    name="star"
                    size={30}
                    style={
                      star4 === true
                        ? style.colorStarActive
                        : style.colorStarDisActive
                    }
                  />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={this.onClickStar5}>
                  <Icon
                    name="star"
                    size={30}
                    style={
                      star5 === true
                        ? style.colorStarActive
                        : style.colorStarDisActive
                    }
                  />
                </TouchableWithoutFeedback>
              </View>

              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                }}>
                <Text style={style.styleTitle}>Bình luận </Text>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                  }}>
                  <TextInput
                    style={style.textArea}
                    underlineColorAndroid="transparent"
                    placeholder="Nhập nội dung nhận xét ở đây ..."
                    placeholderTextColor="grey"
                    numberOfLines={3}
                    multiline={true}
                    value={this.state.comment}
                    onChangeText={text => this.setState({comment: text})}
                    returnKeyType={'search'}
                    onSubmitEditing={this.onCheck}
                    autoCapitalize="sentences"
                    autoFocus={true}
                    autoCorrect={true}
                    editable
                  />
                </View>
              </View>

              <TouchableHighlight onPress={this.onCheck}>
                <Text style={style.styleButtonAdd}>Thay đổi nhận xét</Text>
              </TouchableHighlight>
            </View>
          </View>

          <LinearGradient colors={['#F99A7C', '#FC5895']}>
            <View
              style={{
                padding: 10,
                flexDirection: 'row',
                height: 122,
              }}
            />
          </LinearGradient>
        </View>
      </ScrollView>
    );
  }
}

const style = StyleSheet.create({
  styleTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  rank: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  styleButtonAdd: {
    fontSize: 18,
    color: 'white',
    padding: 10,
    height: 50,
    borderRadius: 6,
    backgroundColor: 'orange',
  },

  textArea: {
    borderColor: 'gray',
    borderWidth: 1,
    height: 100,
    marginVertical: 20,
    width: 300,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  colorStarDisActive: {
    color: '#979797',
  },
  colorStarActive: {
    color: '#fc9619',
  },
});

const mapStateToProps = state => {
  return {
    stores: state.stores,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onUpdateComment: (comment_id, data, token) => {
      dispatch(editComment(comment_id, data, token));
    },
    onGetStoreDetail: (storeId, token) => {
      dispatch(getStoreDetail(storeId, token));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateCommentModal);
