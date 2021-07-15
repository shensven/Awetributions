import React, {useContext} from 'react';
import {View, Text, StyleSheet, ScrollView, useColorScheme} from 'react-native';
import {useTheme as usePaperTheme} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {SettingsContext} from '../util/SettingsManager';

const Dashboard: React.FC = () => {
    const {t} = useTranslation();

    const systemAppearanceScheme = useColorScheme();
    const {colors: PaperColor} = usePaperTheme();
    const {appAppearanceScheme, appAppearanceIndex, appI18nScheme} =
        useContext(SettingsContext);
    return (
        <View style={styles.root}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                overScrollMode="always">
                <Text
                    style={[styles.header_title, {color: PaperColor.primary}]}>
                    {t('Dashboard.Dashboard')}
                </Text>
                <Text
                    style={[
                        styles.header_subtitle,
                        {color: PaperColor.primary},
                    ]}>
                    {t('Dashboard.systemAppearanceScheme')}{' '}
                    {systemAppearanceScheme}
                </Text>
                <Text
                    style={[
                        styles.header_subtitle,
                        {color: PaperColor.primary},
                    ]}>
                    {t('Dashboard.appAppearanceScheme')} {appAppearanceScheme}
                </Text>
                <Text
                    style={[
                        styles.header_subtitle,
                        {color: PaperColor.primary},
                    ]}>
                    {t('Dashboard.appAppearanceIndex')} {appAppearanceIndex}
                </Text>
                <Text
                    style={[
                        styles.header_subtitle,
                        {color: PaperColor.primary},
                    ]}>
                    {t('Dashboard.appI18nScheme')} {appI18nScheme}
                </Text>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    header_title: {
        fontSize: 34,
        fontWeight: '800',
        marginTop: 8,
        marginLeft: 20,
    },
    header_subtitle: {
        marginLeft: 21,
    },
});

export default Dashboard;
