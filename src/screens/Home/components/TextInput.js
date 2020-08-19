import React, {Component} from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';
import Fonts from '../../../themers/Fonts';

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
  }

  getData = value => {
    this.props.getData(value);
  };

  render() {
    const {error} = this.props;
    return (
      <View
        style={{
          marginTop: 10,
        }}>
        {this.props.title === '' ? null : (
          <Text style={{fontSize: 25, fontFamily: Fonts.serif}}>
            {this.props.title}
          </Text>
        )}

        <View
          style={{
            borderColor: '#E8E8E8',
            borderWidth: 2,
            padding: 5,
            marginTop: 5,
          }}>
          <TextInput
            style={{
              height: this.props.height,
              justifyContent: 'flex-start',
              textAlignVertical: 'top',
            }}
            {...this.props}
            value={this.state.value}
            onChangeText={text => this.getData(text)}
          />
        </View>
      </View>
    );
  }
}
const style = StyleSheet.create({
  styleTextInput: {
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#e511e8',
  },
});

export default Input;
