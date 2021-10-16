import React, {useContext} from 'react';
import {StatusBar} from 'react-native';
import {Provider as PaperProvider /*useTheme as usePaperTheme*/} from 'react-native-paper';
import {NavigationContainer /*useTheme as useNavigationTheme*/} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RNBootSplash from 'react-native-bootsplash';

import {useTranslation} from 'react-i18next';
import {SettingsContext, SettingsProvider} from './src/util/SettingsManager';
import {
    NavigationDark,
    NavigationLight,
    PaperDark,
    PaperLight,
} from './src/util/appearance/default';
import Dashboard from './src/screens/Dashboard';
import Settings from './src/screens/Settings';
import OAuth2Token from './src/screens/OAuth2Token';
import Appearance from './src/screens/Appearance';
import Language from './src/screens/Language';
import OpenSourceLibraries from './src/screens/OpenSourceLibraries';
import About from './src/screens/About';

const Stack = createStackNavigator();

const App: React.FC = () => {
    const {t} = useTranslation();

    // const {colors: NavigationColor} = useNavigationTheme();
    // const {colors: PaperColor} = usePaperTheme();
    const {appAppearanceIndex, appI18nScheme} = useContext(SettingsContext);

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

    return appAppearanceIndex === 0 || appI18nScheme === '' ? null : (
        <PaperProvider theme={awetributionsPaperTheme()}>
            <SafeAreaProvider>
                <NavigationContainer
                    theme={awetributionsNavigationTheme()}
                    onReady={() => {
                        setTimeout(() => {
                            RNBootSplash.hide({fade: true});
                        }, 250);
                    }}>
                    <StatusBar
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
                                elevation: 0, // Android only
                                shadowOpacity: 0, // iOS only
                            },
                            gestureEnabled: true,
                            ...TransitionPresets.SlideFromRightIOS,
                        }}>
                        <Stack.Screen
                            name="Dashboard"
                            component={Dashboard}
                            options={{
                                title: t('App.Dashboard'),
                            }}
                        />
                        <Stack.Screen
                            name="Settings"
                            component={Settings}
                            options={{
                                title: t('App.Settings'),
                            }}
                        />
                        <Stack.Screen
                            name="OAuth2Token"
                            component={OAuth2Token}
                            options={{
                                title: t('App.OAuth2_Token'),
                            }}
                        />
                        <Stack.Screen
                            name="Appearance"
                            component={Appearance}
                            options={{
                                title: t('App.Appearance'),
                            }}
                        />
                        <Stack.Screen
                            name="Language"
                            component={Language}
                            options={{
                                title: t('App.Language'),
                            }}
                        />
                        <Stack.Screen
                            name="OpenSourceLibraries"
                            component={OpenSourceLibraries}
                            options={{
                                title: t('App.OpenSourceLibraries'),
                            }}
                        />
                        <Stack.Screen
                            name="About"
                            component={About}
                            options={{
                                title: t('App.About'),
                            }}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </SafeAreaProvider>
        </PaperProvider>
    );
};

export default () => (
    <SettingsProvider>
        <App />
    </SettingsProvider>
);
