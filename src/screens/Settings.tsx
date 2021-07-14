import React, {useContext} from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import TouchableList from '../components/TouchableList';
import {SettingsContext} from '../util/SettingsManager';

const Settings: React.FC = ({navigation}: any) => {
    const {t} = useTranslation();
    const {appAppearanceScheme} = useContext(SettingsContext);

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
                onPress={() => {
                    navigation.navigate('Language');
                }}
            />
        </View>
    );
};

export default Settings;
