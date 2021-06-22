import React, {useContext} from 'react';
import {StyleSheet, useColorScheme, View} from 'react-native';
import {
    IconButton,
    Provider as PaperProvider,
    useTheme as usePaperTheme,
} from 'react-native-paper';
import {
    NavigationContainer,
    useTheme as useNavigationTheme,
} from '@react-navigation/native';
import {
    CardStyleInterpolators,
    createStackNavigator,
    HeaderStyleInterpolators,
    TransitionPresets,
} from '@react-navigation/stack';
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

const Stack = createStackNavigator();

const App: React.FC = () => {
    const {colors: PaperColors} = usePaperTheme();
    const {colors: NavigationColor} = useNavigationTheme();
    const {appThemeIndex} = useContext(SettingsContext);

    const awetributionsPaperTheme = () => {
        if (appThemeIndex === 0) {
            return PaperLight;
        } else if (appThemeIndex === 1) {
            return PaperDark;
        } else if (appThemeIndex === 2) {
            return PaperLight;
        } else if (appThemeIndex === 4) {
            return PaperLight;
        }
    };

    const awetributionsNavigationTheme = () => {
        if (appThemeIndex === 0) {
            return NavigationLight;
        } else if (appThemeIndex === 1) {
            return NavigationDark;
        } else if (appThemeIndex === 2) {
            return NavigationLight;
        } else if (appThemeIndex === 3) {
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

    return (
        <PaperProvider theme={awetributionsPaperTheme()}>
            <NavigationContainer theme={awetributionsNavigationTheme()}>
                <Stack.Navigator
                    initialRouteName="Dashboard"
                    screenOptions={{
                        headerStyle: {
                            elevation: 0, // Android
                            shadowOpacity: 0, // iOS
                        },
                        ...TransitionPresets.SlideFromRightIOS,
                        gestureEnabled: true,
                        headerBackAccessibilityLabel: 'go back',
                    }}>
                    <Stack.Screen
                        name="Dashboard"
                        component={Dashboard}
                        options={({navigation}) => ({
                            title: 'Dashboard',
                            cardStyle: {
                                backgroundColor:
                                    appThemeIndex === 1 || appThemeIndex === 3
                                        ? '#191919' // Dark Mode
                                        : '#F2F2F2', // Light Mode
                            },
                            headerRight: () => (
                                <DashboardHeaderRight navigation={navigation} />
                            ),
                        })}
                    />
                    <Stack.Screen
                        name="Settings"
                        component={Settings}
                        options={{
                            title: 'Settings',
                        }}
                    />
                    <Stack.Screen
                        name="Theme"
                        component={Theme}
                        options={{
                            title: 'Theme',
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
