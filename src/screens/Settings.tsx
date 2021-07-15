import React, {useContext} from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import TouchableList from '../components/TouchableList';
import {SettingsContext} from '../util/SettingsManager';

const Settings: React.FC = ({navigation}: any) => {
    const {t} = useTranslation();
    const {appAppearanceScheme, appI18nScheme} = useContext(SettingsContext);

    const _themePreferenceValue = () => {
        switch (appAppearanceScheme) {
            case 'followSystem':
                return t('Settings.Automatic');
            case 'light':
                return t('Settings.Light');
            case 'dark':
                return t('Settings.Dark');
            default:
                return '';
        }
    };
    const _languagePreferenceValue = () => {
        switch (appI18nScheme) {
            case 'en':
                return t('Settings.en');
            case 'zh-Hans':
                return t('Settings.zh-Hans');
            default:
                return '';
        }
    };

    return (
        <View>
            <TouchableList
                icon={<Icon name="sunny" size={18} color="#F6C55B" />}
                label={t('Settings.Theme')}
                preferenceValue={_themePreferenceValue()}
                onPress={() => {
                    navigation.navigate('Theme');
                }}
            />
            <TouchableList
                icon={
                    <Icon name="language-outline" size={18} color="#EB816C" />
                }
                label={t('Settings.Language')}
                preferenceValue={_languagePreferenceValue()}
                onPress={() => {
                    navigation.navigate('Language');
                }}
            />
        </View>
    );
};

export default Settings;
