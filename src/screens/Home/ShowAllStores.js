import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Navigation} from 'react-native-navigation';
import {get} from 'lodash';
import NailItem from '../Home/components/NailItems';

export default class ShowAllStores extends Component {
  componentDidMount() {
    console.log(this.props.data);
  }

  backMainScreen = () => {
    Navigation.dismissModal(this.props.componentId);
  };

  render() {
    const {title, data} = this.props;
    console.log('ok');
    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.viewIcon}>
            <Icon
              name="ios-arrow-back"
              size={25}
              color="#5f5f5f"
              onPress={() => this.backMainScreen()}
            />
          </View>

          <View
            style={{
              flex: 15,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.title}>{title}</Text>
          </View>
        </View>

        <View>
          <FlatList
            data={data}
            renderItem={({item, index}) => {
              return (
                <NailItem
                  item={item}
                  index={index}
                  parentFlatList={this}
                  component={this.props.componentId}
                />
              );
            }}
            numColumns={2}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingBottom: 80,
  },

  title: {
    color: '#262626',
    fontSize: 20,
    paddingTop: 10,
  },
  viewIcon: {
    justifyContent: 'center',
    flex: 1,
  },
  book: {
    flex: 0.5,
  },
});
