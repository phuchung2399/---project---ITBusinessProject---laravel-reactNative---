import React from 'react';
import {Navigation} from 'react-native-navigation';
import Home from '../screens/Home';
import Order from '../screens/Order';
import Love from '../screens/Love';
import Profile from '../screens/Profile';
import Booking from '../screens/Home/Booking';
import Search from '../screens/Home/Search';
import App from '../../App';
import Signin from '../screens/SignIn';
import Signup from '../screens/SignUp';
import SearchItems from '../screens/Home/components/SearchItems';
import ShowAllStores from '../screens/Home/ShowAllStores';
import Intro from '../screens/Intro';
import BookingItems from '../screens/Home/components/BookingItems';
import Announcement from '../screens/Announcement';
import SideBarMenu from '../screens/SideBar';
import home_Icon from '../../assets/images/home_icon.png';
import order_Icon from '../../assets/images/booking_icon.png';
import love_Icon from '../../assets/images/heart_icon.png';
import profile_Icon from '../../assets/images/profile_icon.png';
import history_Icon from '../../assets/images/history_icon.png';
import notification_Icon from '../../assets/images/noti_icon.png';
import Loading from '../screens/Loading';

console.disableYellowBox = true;

Navigation.registerComponent('SideBarMenu', () => SideBarMenu);
Navigation.registerComponent('Home', () => Home);
Navigation.registerComponent('Order', () => Order);
Navigation.registerComponent('Love', () => Love);
Navigation.registerComponent('Profile', () => Profile);
Navigation.registerComponent('App', () => App);
Navigation.registerComponent('Signin', () => Signin);
Navigation.registerComponent('Signup', () => Signup);
Navigation.registerComponent('Announcement', () => Announcement);
Navigation.registerComponent('Booking', () => Booking);
Navigation.registerComponent('BookingItems', () => BookingItems);
Navigation.registerComponent('Intro', () => Intro);
Navigation.registerComponent('Search', () => Search);
Navigation.registerComponent('SearchItems', () => SearchItems);
Navigation.registerComponent('Loading', () => Loading);
Navigation.registerComponent('ShowAllStores', () => ShowAllStores);

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
            name: 'SideBarMenu',
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
                              text: 'tt',
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
                        name: 'Home',
                        options: {
                          topBar: {
                            title: {
                              text: 'tt',
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
                      text: 'Thông báo',
                      icon: notification_Icon,
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
                        name: 'Announcement',
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
                        name: 'Booking',
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
                      text: 'Lịch sử GD',
                      icon: history_Icon,
                      testID: 'SECOND_TAB_BAR_BUTTON',
                    },
                  },
                },
              },
            ],
          },
        },
      },
    },
  });
};

export const onSignIn = () => {
  Navigation.setRoot({
    root: {
      component: {
        name: 'Signin',
        options: {
          topBar: {
            title: {
              text: 'Signin',
              alignment: 'center',
            },
          },
        },
      },
    },
  });
};

export const onSignUp = () => {
  Navigation.setRoot({
    root: {
      component: {
        name: 'Signup',
        options: {
          topBar: {
            title: {
              text: 'Signup',
              alignment: 'center',
            },
          },
        },
      },
    },
  });
};

export const onIntro = () => {
  Navigation.setRoot({
    root: {
      component: {
        name: 'Intro',
        options: {
          topBar: {
            title: {
              text: 'Intro',
              alignment: 'center',
            },
          },
        },
      },
    },
  });
};
