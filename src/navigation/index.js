import React from 'react';
import {Navigation} from 'react-native-navigation';
import Demo from '../screens/Demo';
import Home from '..//screens/home';
import App from '../../App';
import home_Icon from '../../assets/images/home_icon.png';
import order_Icon from '../../assets/images/booking_icon.png';
import love_Icon from '../../assets/images/heart_icon.png';
import profile_Icon from '../../assets/images/profile_icon.png';
import home_icon from '../../assets/images/home_icon.png';
console.disableYellowBox = true;

Navigation.registerComponent('Demo', () => Demo);
Navigation.registerComponent('Home', () => Home);
Navigation.registerComponent('App', () => App);

export default () => {
  Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
      root: {
        component: {
          name: 'App',
        },
      },
    });
  });
};

export const onChangeIntoMainScreen = () => {
  Navigation.setRoot({
    root: {
      sideMenu: {
        id: 'sideMenu',
        left: {
          component: {
            name: 'Demo',
          },
        },
        center: {
          bottomTabs: {
            children: [
              {
                stack: {
                  children: [
                    {
                      component: {
                        name: 'Home',
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
                  options: {
                    bottomTab: {
                      text: 'Trang chủ',
                      icon: home_Icon,
                      testID: 'FIRST_TAB_BAR_BUTTON',
                    },
                  },
                },
              },
              {
                stack: {
                  children: [
                    {
                      component: {
                        name: 'Demo',
                        options: {
                          topBar: {
                            title: {
                              text: '',
                              alignment: 'center',
                            },
                          },
                        },
                      },
                    },
                  ],
                  options: {
                    bottomTab: {
                      text: 'Đặt lịch',
                      icon: order_Icon,
                      testID: 'SECOND_TAB_BAR_BUTTON',
                    },
                  },
                },
              },
              {
                stack: {
                  children: [
                    {
                      component: {
                        name: 'App',
                      },
                    },
                  ],
                  options: {
                    topBar: {visible: false},
                    bottomTab: {
                      text: 'Yêu thích',
                      icon: love_Icon,
                      testID: 'THIRST_TAB_BAR_BUTTON',
                    },
                  },
                },
              },
              {
                stack: {
                  children: [
                    {
                      component: {
                        name: 'Home',
                      },
                    },
                  ],
                  options: {
                    topBar: {visible: false},
                    bottomTab: {
                      text: 'Tôi',
                      icon: profile_Icon,
                      testID: 'FOUR_TAB_BAR_BUTTON',
                    },
                  },
                },
              },
            ],
          },
        },
        right: {
          component: {
            name: 'App',
          },
        },
      },
    },
  });
};
