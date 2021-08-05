import React, {useContext, useLayoutEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, useColorScheme} from 'react-native';
import {IconButton, useTheme as usePaperTheme} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {SettingsContext} from '../util/SettingsManager';

const Dashboard: React.FC = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const {t} = useTranslation();

    const systemAppearanceScheme = useColorScheme();
    const {colors: PaperColor} = usePaperTheme();

    const {appAppearanceScheme, appAppearanceIndex, appI18nScheme} =
        useContext(SettingsContext);

    const HeaderRight: React.FC = () => {
        const _navigation = useNavigation();
        const {colors: _PaperColor} = usePaperTheme();
        return (
            <View style={styles.react_nav_header_btn}>
                <IconButton
                    size={22}
                    color={_PaperColor.text}
                    rippleColor={PaperColor.IconBtnRippleColor}
                    icon={() => (
                        <Ionicons
                            name="add-circle-outline"
                            size={23}
                            color={_PaperColor.text}
                        />
                    )}
                    onPress={() => console.log('AddProfile')}
                />
                <IconButton
                    size={22}
                    color={_PaperColor.text}
                    rippleColor={_PaperColor.IconBtnRippleColor}
                    icon={() => (
                        <Ionicons
                            name="cog-outline"
                            size={24}
                            color={_PaperColor.text}
                        />
                    )}
                    onPress={() => {
                        _navigation.navigate('Settings');
                    }}
                />
            </View>
        );
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            // headerTitle: handleHeaderTitle(),
            // headerTitleAlign: handleHeaderTitleAlign(),
            // headerTintColor: handleHeaderTintColor(),
            headerRight: () => <HeaderRight />,
        });
    }, [navigation, route]);

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
    react_nav_header_btn: {
        flexDirection: 'row',
        alignItems: 'center',
    },

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
