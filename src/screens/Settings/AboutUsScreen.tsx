import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Text, StyleSheet, View, Linking, Dimensions } from 'react-native';
import { getApplicationName, getVersion, getBundleId, getBuildNumber } from 'react-native-device-info';
import Rate, { AndroidMarket } from 'react-native-rate';

import { icons } from 'app/assets';
import { ScreenTemplate, Button, Header } from 'app/components';
import { Route, MainCardStackNavigatorParams } from 'app/consts';
import { typography, palette } from 'app/styles';

const i18n = require('../../../loc');

interface Props {
  navigation: StackNavigationProp<MainCardStackNavigatorParams, Route.AboutUs>;
}

export const AboutUsScreen = (props: Props) => {
  const libraries = [
    'React Native',
    'React Native Elements',
    'React Redux',
    'Bitcoinjs-lib',
    'Typescript',
    'bignumber.js',
    'blockcypher.com API',
    'React Native Linear Gradient',
  ];

  const getBuildData = () => {
    const { width, height } = Dimensions.get('window');
    return `${getApplicationName()} ver. ${getVersion()} (build ${getBuildNumber()}) \n ${getBundleId()} \n w, h = ${width.toFixed(
      0,
    )}, ${height.toFixed(0)}`;
  };

  const handleRateButtonPress = () => {
    const options = {
      AppleAppID: '1515116464',
      GooglePackageName: 'com.blockidchain.wallet',
      preferredAndroidMarket: AndroidMarket.Google,
      preferInApp: true,
      openAppStoreIfInAppFails: true,
      fallbackPlatformURL: 'https://blockidchain.com',
    };
    Rate.rate(options, success => {
      if (success) {
        console.log('User Rated.');
      }
    });
  };

  const goToGithub = () => {
    Linking.openURL('https://github.com/blockidchain/bid-mobile-wallet');
  };

  return (
    <ScreenTemplate header={<Header isBackArrow={true} navigation={props.navigation} title={i18n.aboutUs.header} />}>
      <Text style={styles.title}>{i18n.aboutUs.title}</Text>
      <Text style={[styles.description, {color: palette.textRed, fontSize: 16, fontWeight: '900',}]}>{i18n.aboutUs.alwaysBackupYourKeys}</Text>
      <Text></Text>
      <Button
        source={icons.github}
        onPress={goToGithub}
        title={i18n.aboutUs.goToOurGithub}
        containerStyle={styles.buttonContainer}
      />
      <Text></Text>
      <Button
        onPress={handleRateButtonPress}
        source={icons.star}
        title={i18n.aboutUs.rateBlockIdCoinWallet}
        containerStyle={styles.buttonContainer}
      />
      <View style={styles.buildWithContainer}>
        <Text style={styles.title}>{i18n.aboutUs.buildWithAwesome}</Text>
        {libraries.map((item, key) => (
          <Text key={key} style={styles.description}>
            {item}
          </Text>
        ))}
      </View>
      <Text style={styles.buildData}>{getBuildData()}</Text>
    </ScreenTemplate>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    paddingTop: 20,
  },
  title: {
    ...typography.headline4,
    textAlign: 'center',
    paddingBottom: 14,
    color: palette.white,
  },
  description: {
    ...typography.caption,
    color: palette.white,
    alignSelf: 'center',
    paddingVertical: 4,
  },
  buildData: {
    ...typography.subtitle4,
    color: palette.white,
    textAlign: 'center',
    paddingVertical: 20,
  },
  buildWithContainer: {
    paddingTop: 36,
  },
});
