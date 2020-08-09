import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Text, View, StyleSheet, BackHandler, StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ButtonProps } from 'react-native-elements';

import { images, icons } from 'app/assets';
import { Button, Image, ScreenTemplate, Header, ListItem } from 'app/components';
import { Route, MainCardStackNavigatorParams } from 'app/consts';
import { BiometricService } from 'app/services';
import { ApplicationState } from 'app/state';
import { typography, palette, ifIphoneX } from 'app/styles';
import { updateBiometricSetting } from 'app/state/appSettings/actions';

import { LabeledSettingsRow } from './LabeledSettingsRow';
import { NavigationService } from 'app/services';

const i18n = require('../../loc');

interface Props {
  navigation: StackNavigationProp<MainCardStackNavigatorParams, Route.Settings>;
}

const onLogoutPress = () => {  
  NavigationService.navigate(Route.UnlockScreen, {
    onSuccess: () => NavigationService.navigate(Route.Dashboard) 
  }) 
};

export const LogoutScreen = (props: Props) => {
    return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.title}>Log Out</Text>
      <Image source={images.success} style={images.success} resizeMode="contain" />
      <Text style={styles.description}>You have logged out. Please log in again to unlock the app.</Text>
      <Button {...ButtonProps} title="Log In" onPress={onLogoutPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    paddingBottom: ifIphoneX(54, 20),
    backgroundColor: palette.white
  },
  title: {
    ...typography.headline3,
    marginTop: '30%',
    color: palette.black
  },
  image: {
    height: 172,
    width: '100%',
    marginTop: 40,
    marginBottom: 40,
  },
  description: {
    ...typography.caption,
    color: palette.black,
    textAlign: 'center',
    lineHeight: 19,
    flexGrow: 1,
    marginTop: 20
  },
});
