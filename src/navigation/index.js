import React from 'react';
import {Navigation} from 'react-native-navigation';
import Home from '../screens/Home';
import Order from '../screens/Order';
import Love from '../screens/Love';
import Profile from '../screens/Profile';
import Contact from '../screens/Contact';
import Booking from '../screens/Home/Booking';
import Search from '../screens/Home/Search';
import Detail from '../screens/Home/Detail';
import App from '../../App';
import Signin from '../screens/SignIn';
import Signup from '../screens/SignUp';
import UploadProfile from '../screens/SignUp/UploadProfile';
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
import noti_Icon from '../../assets/images/noti_icon.png';
import Notification from '../screens/Notification';
import NotificationItems from '../screens/Notification/components/NotifyItems';
import Loading from '../screens/Loading';
import Cart from '../screens/Cart';
import history_icon from '../../assets/images/history_icon.png';
import HistoryOrder from '../screens/HistoryOrder';
import HistoryOrderDetail from '../screens/HistoryOrder/historyOrderDetail';
import CommentModal from '../screens/Home/detail_child/CommentModal';
import Voucher from '../screens/Voucher';
import {Provider} from 'react-redux';
import store from '../redux/store';
console.disableYellowBox = true;

function ReduxProvider(Component) {
  return props => (
    <Provider store={store}>
      <Component {...props} />
    </Provider>
  );
}

Navigation.registerComponent(
  'App',
  () => ReduxProvider(App),
  () => App,
);

Navigation.registerComponent(
  'SideBarMenu',
  () => ReduxProvider(SideBarMenu),
  () => SideBarMenu,
);

Navigation.registerComponent(
  'Home',
  () => ReduxProvider(Home),
  () => Home,
);

Navigation.registerComponent(
  'Order',
  () => ReduxProvider(Order),
  () => Order,
);

Navigation.registerComponent(
  'Love',
  () => ReduxProvider(Love),
  () => Love,
);

Navigation.registerComponent(
  'Profile',
  () => ReduxProvider(Profile),
  () => Profile,
);

Navigation.registerComponent(
  'Signin',
  () => ReduxProvider(Signin),
  () => Signin,
);

Navigation.registerComponent(
  'Signup',
  () => ReduxProvider(Signup),
  () => Signup,
);

Navigation.registerComponent(
  'Announcement',
  () => ReduxProvider(Announcement),
  () => Announcement,
);

Navigation.registerComponent(
  'Booking',
  () => ReduxProvider(Booking),
  () => Booking,
);

Navigation.registerComponent(
  'BookingItems',
  () => ReduxProvider(BookingItems),
  () => BookingItems,
);

Navigation.registerComponent(
  'Intro',
  () => ReduxProvider(Intro),
  () => Intro,
);

Navigation.registerComponent(
  'Search',
  () => ReduxProvider(Search),
  () => Search,
);

Navigation.registerComponent(
  'SearchItems',
  () => ReduxProvider(SearchItems),
  () => SearchItems,
);

Navigation.registerComponent(
  'Loading',
  () => ReduxProvider(Loading),
  () => Loading,
);

Navigation.registerComponent(
  'Notification',
  () => ReduxProvider(Notification),
  () => Notification,
);

Navigation.registerComponent(
  'NotificationItems',
  () => ReduxProvider(NotificationItems),
  () => NotificationItems,
);

Navigation.registerComponent(
  'ShowAllStores',
  () => ReduxProvider(ShowAllStores),
  () => ShowAllStores,
);

Navigation.registerComponent(
  'Detail',
  () => ReduxProvider(Detail),
  () => Detail,
);

Navigation.registerComponent(
  'UploadProfile',
  () => ReduxProvider(UploadProfile),
  () => UploadProfile,
);

Navigation.registerComponent(
  'Cart',
  () => ReduxProvider(Cart),
  () => Cart,
);

Navigation.registerComponent(
  'HistoryOrder',
  () => ReduxProvider(HistoryOrder),
  () => HistoryOrder,
);

Navigation.registerComponent(
  'HistoryOrderDetail',
  () => ReduxProvider(HistoryOrderDetail),
  () => HistoryOrderDetail,
);

Navigation.registerComponent(
  'CommentModal',
  () => ReduxProvider(CommentModal),
  () => CommentModal,
);

Navigation.registerComponent(
  'Voucher',
  () => ReduxProvider(Voucher),
  () => Voucher,
);

Navigation.registerComponent(
  'Contact',
  () => ReduxProvider(Contact),
  () => Contact,
);

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
                        name: 'Notification',
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
                      text: 'Thông báo',
                      icon: noti_Icon,
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
                        name: 'HistoryOrder',
                      },
                    },
                  ],
                  options: {
                    topBar: {visible: false},
                    bottomTab: {
                      text: 'Lịch sử GD',
                      icon: history_icon,
                      testID: 'FOUR_TAB_BAR_BUTTON',
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
