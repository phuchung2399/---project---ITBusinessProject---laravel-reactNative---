/* eslint max-len: 0 */
import i18next from 'i18next';
import React from 'react';
import {View, Text} from 'react-native';
i18next.init({
  lng: 'en',
  resources: {
    en: {
      translation: {
        brand_name: 'Nail',
        txtLogin: 'Đăng nhập',
        Loading: 'Loading ...',
        Login: 'User Login',
        home_page: 'Home',
        reset_password: 'Update password',
      },
    },
  },
});

export function t(key, params) {
  if (params) {
    return i18next.t(key, params);
  }
  return i18next.t(key);
}

export const brand = (
  <View>
    <Text>{t('brand_name')}</Text>
  </View>
);
