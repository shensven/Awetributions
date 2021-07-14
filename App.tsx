import React, {useContext} from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import {
    IconButton,
    Provider as PaperProvider,
    useTheme as usePaperTheme,
} from 'react-native-paper';
import {
    NavigationContainer,
    useTheme as useNavigationTheme,
} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {
    NavigationDark,
    NavigationLight,
    PaperDark,
    PaperLight,
    SettingsContext,
    SettingsProvider,
} from './src/util/SettingsManager';
import Dashboard from './src/screens/Dashboard';
import Settings from './src/screens/Settings';
import Theme from './src/screens/Theme';
import Language from './src/screens/Language';
import {useTranslation} from 'react-i18next';

const Stack = createStackNavigator();

const App: React.FC = () => {
    const {t} = useTranslation();

    const {colors: PaperColors} = usePaperTheme();
    const {colors: NavigationColor} = useNavigationTheme();
    const {appAppearanceIndex} = useContext(SettingsContext);

    const awetributionsPaperTheme = () => {
        if (appAppearanceIndex === 1 || appAppearanceIndex === 3) {
            return PaperLight;
        } else if (appAppearanceIndex === 2 || appAppearanceIndex === 4) {
            return PaperDark;
        }
    };

    const awetributionsNavigationTheme = () => {
        if (appAppearanceIndex === 1 || appAppearanceIndex === 3) {
            return NavigationLight;
        } else if (appAppearanceIndex === 2 || appAppearanceIndex === 4) {
            return NavigationDark;
        }
    };

    const DashboardHeaderRight = (props: {navigation: any}) => {
        const {navigation} = props;
        const {colors: DashboardHeaderRightNavigationColors} =
            useNavigationTheme();

        return (
            <View style={styles.dashboard_header_btn}>
                <IconButton
                    size={20}
                    color={DashboardHeaderRightNavigationColors.text}
                    icon="plus-circle-outline"
                    onPress={() => console.log('AddProfile')}
                />
                <IconButton
                    size={20}
                    color={DashboardHeaderRightNavigationColors.text}
                    icon="cog-outline"
                    onPress={() => navigation.navigate('Settings')}
                />
            </View>
        );
    };

    return appAppearanceIndex === 0 ? null : (
        <PaperProvider theme={awetributionsPaperTheme()}>
            <NavigationContainer
                theme={awetributionsNavigationTheme()}
                onReady={() =>
                    setTimeout(() => {
                        RNBootSplash.hide({fade: true});
                    }, 250)
                }>
                <StatusBar
                    // translucent={true}
                    backgroundColor={
                        awetributionsNavigationTheme() === NavigationDark
                            ? '#111111'
                            : '#FFFFFF'
                    }
                    barStyle={
                        awetributionsNavigationTheme() === NavigationDark
                            ? 'light-content'
                            : 'dark-content'
                    }
                />
                <Stack.Navigator
                    initialRouteName="Dashboard"
                    detachInactiveScreens={false}
                    screenOptions={{
                        headerStyle: {
                            elevation: 0, // Android
                            shadowOpacity: 0, // iOS
                        },
                        gestureEnabled: true,
                        ...TransitionPresets.SlideFromRightIOS,
                    }}>
                    <Stack.Screen
                        name="Dashboard"
                        component={Dashboard}
                        options={({navigation}) => ({
                            title: t('App.Dashboard'),
                            // cardStyle: {
                            //     backgroundColor:
                            //         appThemeIndex === 1 || appThemeIndex === 3
                            //             ? '#191919' // Dark Mode
                            //             : '#F2F2F2', // Light Mode
                            // },
                            headerRight: () => (
                                <DashboardHeaderRight navigation={navigation} />
                            ),
                        })}
                    />
                    <Stack.Screen
                        name="Settings"
                        component={Settings}
                        options={{
                            title: t('App.Settings'),
                        }}
                    />
                    <Stack.Screen
                        name="Theme"
                        component={Theme}
                        options={{
                            title: t('App.Theme'),
                        }}
                    />
                    <Stack.Screen
                        name="Language"
                        component={Language}
                        options={{
                            title: t('App.Language'),
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    );
};

export default () => (
    <SettingsProvider>
        <App />
    </SettingsProvider>
);

const styles = StyleSheet.create({
    dashboard_header_btn: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
