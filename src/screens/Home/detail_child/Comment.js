import React from 'react';
import {View, Text, StyleSheet, FlatList, Image} from 'react-native';

export default class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          name: 'Alex Sander',
          rating: 5,
          comment: 'Good',
          image: require('../asset/avatar1.png'),
        },
        {
          name: 'Trong Thanh',
          rating: 4,
          comment: 'Ok',
          image: require('../asset/avatar2.png'),
        },
        {
          name: 'Huynh Nhu',
          rating: 2,
          comment: 'Bad',
          image: require('../asset/avatar3.png'),
        },
        {
          name: 'Trong That',
          rating: 5,
          comment: 'good food good mood',
          image: require('../asset/avatar4.png'),
        },
        {
          name: 'Ngoc Trai',
          rating: 4,
          comment: 'Very good',
          image: require('../asset/avatar2.png'),
        },
        {
          name: 'Hai Bang',
          rating: 2,
          comment: 'normal',
          image: require('../asset/avatar4.png'),
        },
      ],
    };
  }

  _rating(item) {
    let rating = [];
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
          <Image source={item.image} style={styles.image} />
        </View>
        <View style={{flex: 3, justifyContent: 'center'}}>
          <Text numberOfLines={1} style={styles.name}>
            {item.name}
          </Text>
          <View style={{flexDirection: 'row'}}>
            {this._rating(item.rating)}
          </View>
          <Text numberOfLines={2} style={styles.comment}>
            "{item.comment}"
          </Text>
        </View>
      </View>
    );
  };

  ItemSeparatorComponent = () => {
    return <View style={{height: 30}} />;
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.data}
          renderItem={this.renderItem}
          ItemSeparatorComponent={this.ItemSeparatorComponent}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 20,
    marginBottom: 5,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
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
});
