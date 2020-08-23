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

import React, {useState} from 'react';
import {View, Button, Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export const App = () => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <View>
      <View>
        <Button onPress={showDatepicker} title="Show date picker!" />
      </View>
      <View>
        <Button onPress={showTimepicker} title="Show time picker!" />
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};
