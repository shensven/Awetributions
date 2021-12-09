import React, {useContext} from 'react';
import {Linking, ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {List, TouchableRipple, useTheme as usePaperTheme} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import {SettingsContext} from '../util/SettingsManager';
import {StackScreenProps} from '@react-navigation/stack';

interface ListItemProps {
  label: string;
  leftIcon: string;
  leftIconSize?: number;
  description?: string;
  hasArrow?: boolean;
  arrowName?: string;
  onPress: () => void;
}

type StackParamList = {
  OAuth2Token: undefined;
  Appearance: undefined;
  Language: undefined;
  OpenSourceLibraries: undefined;
  About: undefined;
};

type ScreenNavigationProp = StackScreenProps<StackParamList>['navigation'];

const Settings: React.FC = () => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const {t} = useTranslation();
  const insets = useSafeAreaInsets();
  const {colors: PaperColor} = usePaperTheme();

  const {appAppearanceScheme, appI18nScheme} = useContext(SettingsContext);

  const appearancePreferenceValue = () => {
    switch (appAppearanceScheme) {
      case 'light':
        return t('Settings.Light');
      case 'dark':
        return t('Settings.Dark');
      case 'followSystem':
        return t('Settings.Automatic');
      default:
        return '';
    }
  };

  const languagePreferenceValue = () => {
    switch (appI18nScheme) {
      case 'en':
        return t('Settings.en');
      case 'zh-Hans':
        return t('Settings.zh-Hans');
      case 'zh-Hant':
        return t('Settings.zh-Hant');
      default:
        return '';
    }
  };

  const openLink = async (repository: string) => {
    try {
      const url = repository;

      if (await InAppBrowser.isAvailable()) {
        const oldBarStyle = StatusBar.pushStackEntry({
          barStyle: 'light-content',
          animated: true,
        });
        const result = await InAppBrowser.open(url, {
          // iOS Properties
          dismissButtonStyle: 'close',
          preferredBarTintColor: PaperColor.primary,
          preferredControlTintColor: 'white',
          readerMode: false,
          animated: true,
          modalPresentationStyle: 'fullScreen',
          modalTransitionStyle: 'coverVertical',
          modalEnabled: true,
          enableBarCollapsing: true,
          // Android Properties
          showTitle: true,
          toolbarColor: PaperColor.primary,
          secondaryToolbarColor: 'black',
          navigationBarColor: 'transparent',
          navigationBarDividerColor: 'white',
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          forceCloseOnRedirection: false,
          // Specify full animation resource identifier(package:anim/name)
          // or only resource name(in case of animation bundled with app).
          animations: {
            startEnter: 'slide_in_right',
            startExit: 'slide_out_left',
            endEnter: 'slide_in_left',
            endExit: 'slide_out_right',
          },
          headers: {
            'my-custom-header': 'my custom header value',
          },
        });
        StatusBar.popStackEntry(oldBarStyle);
        console.log(JSON.stringify(result));
      } else {
        Linking.openURL(url);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const ListItem: React.FC<ListItemProps> = props => {
    const {label, leftIcon, leftIconSize, description, hasArrow, arrowName, onPress} = props;
    return (
      <TouchableRipple onPress={onPress}>
        <List.Item
          title={label}
          titleStyle={{color: PaperColor.text}}
          left={() => (
            <List.Icon icon={() => <Ionicons name={leftIcon} size={leftIconSize ?? 23} color={PaperColor.text} />} />
          )}
          right={() =>
            hasArrow ?? false ? (
              <View style={styles.item_right}>
                <Text style={{color: PaperColor.textAccent}}>{description}</Text>
                <Ionicons name={arrowName ?? 'chevron-forward-outline'} size={16} color={PaperColor.textAccent} />
              </View>
            ) : null
          }
        />
      </TouchableRipple>
    );
  };

  return (
    <View style={[styles.root, {paddingLeft: insets.left, paddingRight: insets.right}]}>
      <ScrollView contentContainerStyle={{paddingBottom: insets.bottom}}>
        <List.Section>
          <ListItem
            label={t('Settings.OAuth2_Token')}
            leftIcon="logo-github"
            hasArrow={true}
            onPress={() => navigation.navigate('OAuth2Token')}
          />
          <ListItem
            label={t('Settings.Appearance')}
            leftIcon="color-palette-outline"
            hasArrow={true}
            description={appearancePreferenceValue()}
            onPress={() => navigation.navigate('Appearance')}
          />
          <ListItem
            label={t('Settings.Language')}
            leftIcon="language-outline"
            hasArrow={true}
            description={languagePreferenceValue()}
            onPress={() => navigation.navigate('Language')}
          />
          <ListItem
            label={t('Settings.OpenSourceLibraries')}
            leftIcon="code-slash-outline"
            hasArrow={true}
            onPress={() => navigation.navigate('OpenSourceLibraries')}
          />
          <ListItem
            label={t('Settings.Feedback')}
            leftIcon="bug-outline"
            hasArrow={true}
            arrowName="open-outline"
            onPress={() => openLink('https://github.com/shensven/Awetributions/issues')}
          />
          <ListItem
            label={t('Settings.About')}
            leftIcon="happy-outline"
            hasArrow={true}
            onPress={() => navigation.navigate('About')}
          />
        </List.Section>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  item_right: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
});

export default Settings;
