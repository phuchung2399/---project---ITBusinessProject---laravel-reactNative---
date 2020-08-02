import {AsyncStorage} from 'react-native';

const storageSet = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log(error);
  }
};

const storageGet = async key => {
  try {
    const result = await AsyncStorage.getItem(key);
    //  console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const storageRemove = async () => {
  try {
    await AsyncStorage.clear();
    alert('Log out successfully!');
  } catch (error) {
    alert('Logout failed');
  }
};

export {storageSet, storageGet};
