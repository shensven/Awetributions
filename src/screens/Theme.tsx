import React, {useContext} from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text, useColorScheme} from 'react-native';
import {Checkbox, useTheme as usePaperTheme} from 'react-native-paper';
import {SettingsContext} from '../util/SettingsManager';

const Theme: React.FC = () => {
    const {t} = useTranslation();

    const {
        appAppearanceIndex,
        handleAppearanceIndex,
        appAppearanceScheme,
        handleAppearanceScheme,
    } = useContext(SettingsContext);
    const systemAppearanceScheme = useColorScheme();
    const {colors: PaperColor} = usePaperTheme();

    const _handleAppearance = (props: string) => {
        if (props === 'light') {
            handleAppearanceIndex(1);
            handleAppearanceScheme('light');
        } else if (props === 'dark') {
            handleAppearanceIndex(2);
            handleAppearanceScheme('dark');
        } else if (
            props === 'followSystem' &&
            systemAppearanceScheme === 'light'
        ) {
            handleAppearanceIndex(3);
            handleAppearanceScheme('followSystem');
        } else if (
            props === 'followSystem' &&
            systemAppearanceScheme === 'dark'
        ) {
            handleAppearanceIndex(4);
            handleAppearanceScheme('followSystem');
        }
        console.log('_toggleAppearance', props);
    };

    return (
        // UI refactoring needed
        <View>
            <Text style={{color: PaperColor.primary}}>
                {t('Theme.systemAppearanceScheme')} {systemAppearanceScheme}
            </Text>
            <Text style={{color: PaperColor.primary}}>
                {t('Theme.appAppearanceScheme')} {appAppearanceScheme}
            </Text>
            <Text style={{color: PaperColor.primary}}>
                {t('Theme.appAppearanceIndex')} {appAppearanceIndex}
            </Text>
            <Text style={{color: PaperColor.text}}>{t('Theme.Light')}</Text>
            <Checkbox
                status={appAppearanceIndex === 1 ? 'checked' : 'unchecked'}
                onPress={() => {
                    _handleAppearance('light');
                }}
            />
            <Text style={{color: PaperColor.text}}>{t('Theme.Dark')}</Text>
            <Checkbox
                status={appAppearanceIndex === 2 ? 'checked' : 'unchecked'}
                onPress={() => {
                    _handleAppearance('dark');
                }}
            />
            <Text style={{color: PaperColor.text}}>{t('Theme.Automatic')}</Text>
            <Checkbox
                status={
                    appAppearanceIndex === 3 || appAppearanceIndex === 4
                        ? 'checked'
                        : 'unchecked'
                }
                onPress={() => {
                    _handleAppearance('followSystem');
                }}
            />
        </View>
    );
};

export default Theme;
