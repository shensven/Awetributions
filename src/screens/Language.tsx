import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useContext} from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text} from 'react-native';
import {Button} from 'react-native-paper';
import {SettingsContext} from '../util/SettingsManager';

const Language: React.FC = () => {
    const {t, i18n} = useTranslation();
    const {handleI18nScheme} = useContext(SettingsContext);

    return (
        <View>
            <Text>{t('Language.Current lang')}</Text>
            <Button
                onPress={() => {
                    if (i18n.language === 'en') {
                        handleI18nScheme('zh-Hans');
                    } else {
                        handleI18nScheme('en');
                    }
                }}>
                {t('Language.Switch')}
            </Button>
        </View>
    );
};

export default Language;
