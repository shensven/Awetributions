import React, {useContext} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {List, TouchableRipple, useTheme as usePaperTheme} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';
import {SettingsContext} from '../util/SettingsManager';

interface ListItemProps {
    label: string;
    leftIcon: string;
    leftIconSize?: number;
    description?: string;
    hasArrow?: boolean;
    onPress: () => void;
}

const Settings: React.FC = () => {
    const navigation = useNavigation();
    const {t} = useTranslation();
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

    const ListItem: React.FC<ListItemProps> = props => {
        const {label, leftIcon, leftIconSize, description, hasArrow, onPress} = props;
        return (
            <TouchableRipple onPress={onPress}>
                <List.Item
                    title={label}
                    titleStyle={{color: PaperColor.text}}
                    left={() => (
                        <List.Icon
                            icon={() => (
                                <Ionicons
                                    name={leftIcon}
                                    size={leftIconSize ?? 23}
                                    color={PaperColor.text}
                                />
                            )}
                        />
                    )}
                    right={() =>
                        hasArrow ?? false ? (
                            <View style={styles.item_right}>
                                <Text style={{color: PaperColor.textAccent}}>{description}</Text>
                                <Ionicons
                                    name="chevron-forward-outline"
                                    size={16}
                                    color={PaperColor.textAccent}
                                />
                            </View>
                        ) : null
                    }
                />
            </TouchableRipple>
        );
    };

    return (
        <View style={styles.root}>
            <ScrollView>
                <List.Section>
                    <ListItem
                        label={t('Settings.Appearance')}
                        leftIcon="color-palette-outline"
                        hasArrow={true}
                        description={appearancePreferenceValue()}
                        onPress={() =>
                            // @ts-ignore
                            navigation.navigate('Appearance')
                        }
                    />
                    <ListItem
                        label={t('Settings.Language')}
                        leftIcon="language-outline"
                        hasArrow={true}
                        description={languagePreferenceValue()}
                        onPress={() =>
                            // @ts-ignore
                            navigation.navigate('Language')
                        }
                    />
                    <ListItem
                        label={t('Settings.OpenSourceLibraries')}
                        leftIcon="code-slash-outline"
                        hasArrow={true}
                        onPress={() =>
                            // @ts-ignore
                            navigation.navigate('OpenSourceLibraries')
                        }
                    />
                    <ListItem
                        label={t('Settings.About')}
                        leftIcon="happy-outline"
                        hasArrow={true}
                        onPress={() =>
                            // @ts-ignore
                            navigation.navigate('About')
                        }
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

    bottom_easter_egg: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        marginBottom: -96,
    },
    bottom_easter_egg_text: {
        fontSize: 12,
    },
});

export default Settings;
