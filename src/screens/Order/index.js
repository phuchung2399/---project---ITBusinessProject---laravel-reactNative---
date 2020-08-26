// import React, {Component} from 'react';
// import {Dimensions, Image, Text, View} from 'react-native';
// import ParallaxScrollView from 'react-native-parallax-scroll-view';

// const window = Dimensions.get('window');
// console.log(window.width);

// class Nested extends Component {
//   render() {
//     return (
//       <View style={{flex: 1}}>
//         <View style={{height: 60, backgroundColor: 'green'}} />
//         <View style={{flex: 1, flexDirection: 'row'}}>
//           <ParallaxScrollView
//             style={{flex: 1, backgroundColor: 'hotpink', overflow: 'hidden'}}
//             renderBackground={() => (
//               <Image
//                 source={{
//                   uri: 'https://placekitten.com/414/350',
//                   width: window.width,
//                   height: 350,
//                 }}
//               />
//             )}
//             renderFixedHeader={() => (
//               <Text
//                 style={{
//                   textAlign: 'right',
//                   color: 'white',
//                   padding: 5,
//                   fontSize: 20,
//                 }}>
//                 Hello
//               </Text>
//             )}
//             parallaxHeaderHeight={350}>
//             <View style={{alignItems: 'center'}}>
//               <Text style={{fontSize: 30}}>Meow!</Text>
//             </View>
//           </ParallaxScrollView>
//         </View>
//       </View>
//     );
//   }
// }

// export default Nested;

// import React, {useState} from 'react';
// import {
//   Alert,
//   Modal,
//   StyleSheet,
//   Text,
//   TouchableHighlight,
//   View,
// } from 'react-native';

// const App = () => {
//   const [modalVisible, setModalVisible] = useState(false);
//   return (
//     <View
//       style={{
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginTop: 22,
//       }}>
//       <Modal animationType="slide" transparent={true} visible={modalVisible}>
//         <View
//           style={{
//             flex: 1,
//             justifyContent: 'center',
//             alignItems: 'center',
//             marginTop: 22,
//           }}>
//           <View
//             style={{
//               margin: 20,
//               width: 300,
//               height: 300,
//               backgroundColor: 'white',
//               borderRadius: 20,
//               padding: 35,
//               alignItems: 'center',
//               shadowColor: '#000',
//               shadowOffset: {
//                 width: 0,
//                 height: 2,
//               },
//               shadowOpacity: 0.25,
//               shadowRadius: 3.84,
//               elevation: 5,
//             }}>
//             <Text style={styles.modalText}>Hello World!</Text>

//             <TouchableHighlight
//               style={{...styles.openButton, backgroundColor: '#2196F3'}}
//               onPress={() => {
//                 setModalVisible(!modalVisible);
//               }}>
//               <Text style={styles.textStyle}>OK</Text>
//             </TouchableHighlight>
//           </View>
//         </View>
//       </Modal>

//       <TouchableHighlight
//         style={styles.openButton}
//         onPress={() => {
//           setModalVisible(true);
//         }}>
//         <Text style={styles.textStyle}>Show Modal</Text>
//       </TouchableHighlight>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   centeredView: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 22,
//   },
//   modalView: {
//     margin: 20,
//     backgroundColor: 'white',
//     borderRadius: 20,
//     padding: 35,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   openButton: {
//     backgroundColor: '#F194FF',
//     borderRadius: 20,
//     padding: 10,
//     elevation: 2,
//   },
//   textStyle: {
//     color: 'white',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   modalText: {
//     marginBottom: 15,
//     textAlign: 'center',
//   },
// });

// export default App;

// import React, {useState} from 'react';
// import {View, StyleSheet, Button, Alert} from 'react-native';

// const App = () => {
//   const createTwoButtonAlert = () =>
//     Alert.alert(
//       'Thong bao',
//       'Ban co chac muon thay doi comment chua?',
//       [
//         {
//           text: 'Quay lai',
//           onPress: () => console.log('Cancel Pressed'),
//           style: 'cancel',
//         },
//         {text: 'OK', onPress: () => console.log('OK Pressed')},
//         ,
//       ],
//       {cancelable: false},
//     );

//   const createThreeButtonAlert = () =>
//     Alert.alert(
//       'Alert Title',
//       'My Alert Msg',
//       [
//         {
//           text: 'Ask me later',
//           onPress: () => console.log('Ask me later pressed'),
//         },
//         {
//           text: 'Cancel',
//           onPress: () => console.log('Cancel Pressed'),
//           style: 'cancel',
//         },
//         {text: 'OK', onPress: () => console.log('OK Pressed')},
//         ,
//       ],
//       {cancelable: false},
//     );

//   return (
//     <View style={styles.container}>
//       <Button title={'2-Button Alert'} onPress={createTwoButtonAlert} />

//       <Button title={'3-Button Alert'} onPress={createThreeButtonAlert} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'space-around',
//     alignItems: 'center',
//   },
// });

// export default App;

// import React, {Component} from 'react';
// import {TouchableOpacity, Platform, Text, View} from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import moment from 'moment';

// export default class DatePicker extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       date: new Date(),
//     };
//   }

//   getTime = () => {
//     const {date} = this.state;
//     var hours = date.getHours(); //Current Hours
//     var min = date.getMinutes(); //Current Minutes
//     var sec = date.getSeconds(); //Current Seconds
//     console.log(hours + ':' + min + ':' + sec);
//   };

//   render() {
//     const {date} = this.state;
//     return (
//       <View>
//         <Text
//           style={{
//             fontSize: 20,
//             marginBottom: 10,
//             borderBottomWidth: 2,
//             borderBottomColor: 'gray',
//           }}>
//           Chon ngay
//         </Text>
//         <DateTimePicker
//           isVisible={false}
//           value={date}
//           mode="time"
//           display="spinner"
//           confirmBtnText="Confirm"
//           cancelBtnText="Cancel"
//           onChange={(e, d) => {
//             this.setState({date: d});
//             this.setState({date: d}, () => {
//               this.getTime();
//             });
//           }}
//           style={{backgroundColor: 'white'}}
//         />
//       </View>
//     );
//   }
// }

// import React, {useState} from 'react';
// import {
//   FlatList,
//   SafeAreaView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
// } from 'react-native';

// const DATA = [
//   {
//     id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
//     title: 'First Item',
//   },
//   {
//     id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
//     title: 'Second Item',
//   },
//   {
//     id: '58694a0f-3da1-471f-bd96-145571e29d72',
//     title: 'Third Item',
//   },
// ];

// const Item = ({item, onPress, style, show}) => (
//   <View>
//     <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
//       <Text style={styles.title}>{item.title}</Text>
//     </TouchableOpacity>

//     {show === true ? <Text style={[styles.item]}>ok</Text> : null}
//   </View>
// );

// const App = () => {
//   const [selectedId, setSelectedId] = useState(null);

//   const renderItem = ({item}) => {
//     const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
//     const show = item.id === selectedId ? true : false;

//     return (
//       <Item
//         item={item}
//         onPress={() => setSelectedId(item.id)}
//         style={{backgroundColor}}
//         show={{show}}
//       />
//     );
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <FlatList
//         data={DATA}
//         renderItem={renderItem}
//         keyExtractor={item => item.id}
//         extraData={selectedId}
//       />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: StatusBar.currentHeight || 0,
//   },
//   item: {
//     padding: 20,
//     marginVertical: 8,
//     marginHorizontal: 16,
//   },
//   title: {
//     fontSize: 32,
//   },
// });

// export default App;

import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import TimePicker from 'react-native-24h-timepicker';

class Example extends Component {
  constructor() {
    super();
    this.state = {
      time: '',
    };
  }

  onCancel() {
    this.TimePicker.close();
  }

  onConfirm(hour, minute) {
    this.setState({time: `${hour}:${minute}` + ':00'});
    this.TimePicker.close();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>REACT NATIVE</Text>
        <Text style={styles.text}>24 HOURS FORMAT TIMEPICKER</Text>
        <TouchableOpacity
          onPress={() => this.TimePicker.open()}
          style={styles.button}>
          <Text style={styles.buttonText}>TIMEPICKER</Text>
        </TouchableOpacity>
        <Text style={styles.text}>{this.state.time}</Text>
        <TimePicker
          ref={ref => {
            this.TimePicker = ref;
          }}
          onCancel={() => this.onCancel()}
          onConfirm={(hour, minute, second) =>
            this.onConfirm(hour, minute, second)
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 100,
  },
  text: {
    fontSize: 20,
    marginTop: 10,
  },
  button: {
    backgroundColor: '#4EB151',
    paddingVertical: 11,
    paddingHorizontal: 17,
    borderRadius: 3,
    marginVertical: 50,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Example;

// import React, {useState} from 'react';
// import {
//   Alert,
//   Modal,
//   StyleSheet,
//   Text,
//   TouchableHighlight,
//   View,
// } from 'react-native';

// const App = () => {
//   const [modalVisible, setModalVisible] = useState(false);
//   return (
//     <View style={styles.centeredView}>
//       <Modal animationType="slide" transparent={true} visible={modalVisible}>
//         <View
//           style={{
//             flex: 1,
//             justifyContent: 'center',
//             alignItems: 'center',
//             marginTop: 22,
//             height: 1000,
//           }}>
//           <View
//             style={{
//               margin: 20,
//               backgroundColor: 'white',
//               borderRadius: 20,
//               padding: 35,
//               alignItems: 'center',
//               shadowColor: '#000',
//               shadowOpacity: 0.25,
//               shadowRadius: 3.84,
//               elevation: 5,
//               width: 300,
//               height: 250,
//             }}>
//             <Text style={{marginBottom: 15, textAlign: 'center'}}>
//               Hello World!
//             </Text>

//             <TouchableHighlight
//               style={{...styles.openButton, backgroundColor: '#2196F3'}}
//               onPress={() => {
//                 setModalVisible(!modalVisible);
//               }}>
//               <Text style={styles.textStyle}>Da hieu</Text>
//             </TouchableHighlight>
//           </View>
//         </View>
//       </Modal>

//       <TouchableHighlight
//         style={styles.openButton}
//         onPress={() => {
//           setModalVisible(true);
//         }}>
//         <Text style={styles.textStyle}>Show Modal</Text>
//       </TouchableHighlight>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   centeredView: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 22,
//   },
//   modalView: {
//     margin: 20,
//     backgroundColor: 'white',
//     borderRadius: 20,
//     padding: 35,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   openButton: {
//     backgroundColor: '#F194FF',
//     borderRadius: 20,
//     padding: 10,
//     elevation: 2,
//   },
//   textStyle: {
//     color: 'white',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   modalText: {
//     marginBottom: 15,
//     textAlign: 'center',
//   },
// });

// export default App;
