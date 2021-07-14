import React from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text} from 'react-native';
import {Button} from 'react-native-paper';

const Language: React.FC = () => {
    const {t, i18n} = useTranslation();

    return (
        <View>
            <Text>{t('Language.Current lang')}</Text>
            <Button
                onPress={() => {
                    if (i18n.language === 'en') {
                        i18n.changeLanguage('zh');
                    } else {
                        i18n.changeLanguage('en');
                    }
                }}>
                {t('Language.Switch')}
            </Button>
        </View>
    );
};

export default Language;
