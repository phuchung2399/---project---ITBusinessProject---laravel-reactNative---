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
        home_page: 'Trang chủ',
        reset_password: 'Update password',
        xac_nhan: 'Xác nhận',
        ghi_chu: 'Ghi chú',
        dat_lam_tai_nha: 'Đặt làm tại nhà',
        cua_hang_moi_nhat: 'Cửa hàng mới nhất',
        cua_hang_chat_luong: 'Cửa hàng chất lượng',
        xem_het: 'Xem hết',
        thong_bao: 'Thông báo',
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
