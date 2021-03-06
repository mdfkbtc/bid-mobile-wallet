/* global alert */
import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, TouchableWithoutFeedback, StyleSheet, Linking, View, TextInput } from 'react-native';
import {
  BlueLoading,
  BlueTextHooks,
  BlueSpacing20,
  BlueListItemHooks,
  BlueNavigationStyle,
  BlueCard,
  BlueButton,
} from '../../BlueComponents';
import { useTheme } from '@react-navigation/native';
import loc from '../../loc';
import { Button } from 'react-native-elements';
import { BlueCurrentTheme } from '../../components/themes';
const notifications = require('../../blue_modules/notifications');

const NotificationSettings = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isNotificationsEnabled, setNotificationsEnabled] = useState(false);
  const [URI, setURI] = useState();

  const { colors } = useTheme();

  const onNotificationsSwitch = async value => {
    setNotificationsEnabled(value); // so the slider is not 'jumpy'
    if (value) {
      // user is ENABLING notifications
      await notifications.tryToObtainPermissions();
    } else {
      // user is DISABLING notifications
      // NOP for now, since we should basically send to GroundControl that we want to disable everything
    }

    setNotificationsEnabled(await notifications.isNotificationsEnabled());
  };

  useEffect(() => {
    (async () => {
      setNotificationsEnabled(await notifications.isNotificationsEnabled());
      setURI(await notifications.getSavedUri());
      setIsLoading(false);
    })();
  }, []);

  const stylesWithThemeHook = {
    root: {
      ...styles.root,
      backgroundColor: colors.background,
    },
    scroll: {
      ...styles.scroll,
      backgroundColor: colors.background,
    },
    scrollBody: {
      ...styles.scrollBody,
      backgroundColor: colors.background,
    },
  };

  const save = useCallback(async () => {
    setIsLoading(true);
    try {
      if (URI) {
        // validating only if its not empty. empty means use default
        if (await notifications.isGroundControlUriValid(URI)) {
          await notifications.saveUri(URI);
          alert(loc.settings.saved);
        } else {
          alert(loc.settings.not_a_valid_uri);
        }
      } else {
        await notifications.saveUri('');
        alert(loc.settings.saved);
      }
    } catch (error) {
      console.warn(error);
    }
    setIsLoading(false);
  }, [URI]);

  return isLoading ? (
    <BlueLoading />
  ) : (
    <ScrollView style={stylesWithThemeHook.scroll}>
      <BlueListItemHooks
        Component={TouchableWithoutFeedback}
        title={loc.settings.push_notifications}
        switch={{ onValueChange: onNotificationsSwitch, value: isNotificationsEnabled }}
      />
      <BlueSpacing20 />

      <BlueCard>
        <BlueTextHooks>{loc.settings.groundcontrol_explanation}</BlueTextHooks>
      </BlueCard>

      <Button
        icon={{
          name: 'github',
          type: 'font-awesome',
          color: colors.foregroundColor,
        }}
        onPress={() => Linking.openURL('https://github.com/BlueWallet/GroundControl')}
        titleStyle={{ color: colors.buttonAlternativeTextColor }}
        title="github.com/BlueWallet/GroundControl"
        color={colors.buttonTextColor}
        buttonStyle={styles.buttonStyle}
      />

      <BlueCard>
        <View style={styles.uri}>
          <TextInput
            placeholder={notifications.getDefaultUri()}
            value={URI}
            onChangeText={setURI}
            numberOfLines={1}
            style={styles.uriText}
            placeholderTextColor="#81868e"
            editable={!isLoading}
            textContentType="URL"
            autoCapitalize="none"
            underlineColorAndroid="transparent"
          />
        </View>

        <BlueSpacing20 />
        <BlueTextHooks style={styles.centered}>♪ Ground Control to Major Tom ♪</BlueTextHooks>
        <BlueTextHooks style={styles.centered}>♪ Commencing countdown, engines on ♪</BlueTextHooks>

        <BlueSpacing20 />
        <BlueButton onPress={save} title={loc.settings.save} />
      </BlueCard>
    </ScrollView>
  );
};

NotificationSettings.navigationOptions = () => ({
  ...BlueNavigationStyle(),
  title: loc.settings.notifications,
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  uri: {
    flexDirection: 'row',
    borderColor: BlueCurrentTheme.colors.formBorder,
    borderBottomColor: BlueCurrentTheme.colors.formBorder,
    borderWidth: 1,
    borderBottomWidth: 0.5,
    backgroundColor: BlueCurrentTheme.colors.inputBackgroundColor,
    minHeight: 44,
    height: 44,
    alignItems: 'center',
    borderRadius: 4,
  },
  centered: {
    textAlign: 'center',
  },
  uriText: {
    flex: 1,
    color: '#81868e',
    marginHorizontal: 8,
    minHeight: 36,
    height: 36,
  },
  buttonStyle: {
    backgroundColor: 'transparent',
  },
});

export default NotificationSettings;
