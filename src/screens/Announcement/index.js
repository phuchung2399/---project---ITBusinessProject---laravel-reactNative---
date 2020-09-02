import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import Logo from '../../../assets/images/logo.png';
import LinearGradient from 'react-native-linear-gradient';
import {onSignIn} from '../../navigation';
import {t} from '../../i18n/t';
import LogoAppStore from '../../../assets/images/dl-gg.png';
import LogoGGPlay from '../../../assets/images/dl_Appstore.png';
import Colors from '../../themers/Colors';

class Announcement extends Component {
  onSignin = () => {
    onSignIn();
  };

  renderTitle = () => {
    return (
      <View style={style.viewTitle}>
        <Text style={style.txtBranch_name}>{t('brand_name')}</Text>
        <Text style={style.txt_annou}>{t('announcement')}</Text>
      </View>
    );
  };

  renderLogo = () => {
    return (
      <View style={style.viewLogoApp}>
        <Image style={style.logo} source={Logo} />
      </View>
    );
  };

  renderAnnouncement = () => {
    const dataUser = this.props.data;

    return (
      <View style={style.viewAnnou}>
        <Text style={style.txt_xinchao}>{t('txt_xin_chao')}</Text>
        {dataUser && (
          <Text style={style.txtUserName}>{dataUser.user_name}</Text>
        )}
        <Text style={style.txtAnnou}>{t('txt_announcement')}</Text>
      </View>
    );
  };

  renderButton = () => {
    return (
      <View style={style.viewButton}>
        <TouchableOpacity onPress={this.onSignin}>
          <Text style={style.txt_singIn}>{t('txt_dang_nhap_ngay')}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  renderLogoApp = () => {
    return (
      <View style={style.viewLogo}>
        <TouchableOpacity>
          <Image source={LogoGGPlay} style={style.logoAppStore} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={LogoAppStore} style={style.logoGGPlay} />
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <LinearGradient colors={[Colors.pink, Colors.orrange]}>
        <ScrollView style={style.container}>
          {this.renderTitle()}
          {this.renderLogo()}
          {this.renderAnnouncement()}
          {this.renderButton()}
          {this.renderLogoApp()}
        </ScrollView>
      </LinearGradient>
    );
  }
}

const style = StyleSheet.create({
  container: {
    height: '100%',
  },
  viewTitle: {alignItems: 'center', flex: 1},
  txtBranch_name: {
    fontSize: 50,
    fontWeight: 'bold',
    marginTop: 20,
    color: Colors.white,
  },
  logoAppStore: {
    width: 110,
    height: 40,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  logoGGPlay: {
    width: 115,
    height: 42,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  viewLogo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: '5%',
  },
  txt_annou: {
    fontSize: 35,
    fontWeight: 'bold',
    color: 'white',
  },
  viewLogoApp: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 170,
    height: 170,
  },
  viewButton: {
    flex: 2,
    justifyContent: 'center',
    paddingHorizontal: '20%',
    paddingVertical: 15,
  },
  txt_singIn: {
    borderWidth: 1,
    borderRadius: 20,
    fontSize: 24,
    fontWeight: 'bold',
    padding: 12,
    textAlign: 'center',
    backgroundColor: Colors.pink,
    borderColor: Colors.pink,
    color: Colors.white,
  },
  viewAnnou: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 25,
    justifyContent: 'center',
  },
  txt_xinchao: {
    fontSize: 35,
    fontWeight: 'bold',
    color: Colors.white,
  },
  txtUserName: {
    fontSize: 25,
    fontWeight: 'bold',
    color: Colors.white,
    textAlign: 'center',
  },
  txtAnnou: {
    fontSize: 17,
    fontWeight: 'bold',
    color: Colors.white,
    textAlign: 'center',
    marginTop: 10,
  },
});

export default Announcement;
