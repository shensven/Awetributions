import React, {useEffect, useState} from 'react';
import {useColorScheme} from 'react-native';
import {
    DefaultTheme as PaperDefaultTheme,
    DarkTheme as PaperDarkTheme,
} from 'react-native-paper';
import {
    DefaultTheme as NavigationDefaultTheme,
    DarkTheme as NavigationDarkTheme,
    useTheme as useNavigationTheme,
} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const PaperLight = {
    ...PaperDefaultTheme,
    roundness: 2,
    colors: {
        ...PaperDefaultTheme.colors,
        primary: '#216E39',
        // accent: '',
        background: '#FFFFFF',
        // surface: '',
        text: '#000000',
        // disabled: '',
        // placeholder: '',
        // backdrop: '',
        // onSurface: '',
        // notification: '',
    },
    fonts: {
        ...PaperDefaultTheme.fonts,
        // regular: '',
        // medium: '',
        // light: '',
        // thin: '',
    },
    animation: {
        ...PaperDarkTheme.animation,
    },
};
export const PaperDark = {
    ...PaperDarkTheme,
    roundness: 2,
    colors: {
        ...PaperDarkTheme.colors,
        primary: '#216E39',
        // accent: '',
        background: '#111111',
        // surface: '',
        text: '#D0D0D0',
        // disabled: '',
        // placeholder: '',
        // backdrop: '',
        // onSurface: '',
        // notification: '',
    },
    fonts: {
        ...PaperDarkTheme.fonts,
        // regular: '',
        // medium: '',
        // light: '',
        // thin: '',
    },
    animation: {
        ...PaperDarkTheme.animation,
    },
};
export const NavigationLight = {
    ...NavigationDefaultTheme,
    colors: {
        ...NavigationDefaultTheme.colors,
        // primary: '',
        background: '#FFFFFF',
        card: '#FFFFFF',
        text: '#000000',
        // border: '',
        // notification: '',
    },
};
export const NavigationDark = {
    ...NavigationDarkTheme,
    colors: {
        ...NavigationDarkTheme.colors,
        // primary: '',
        background: '#111111',
        card: '#111111',
        text: '#D0D0D0',
        // border: '',
        // notification: '',
    },
};

interface SettingsContext {
    appAppearanceScheme: string | null | undefined;
    appAppearanceIndex: number;
    handleAppearanceIndex: (props: number) => void;
    handleAppearanceScheme: (props: string) => void;
}

export const SettingsProvider = ({children}: any) => {
    /**
     * Possible string ​​for systemAppearanceScheme
     *
     * 'light': Light Mode
     * 'dark' : Dark Mode
     */
    const systemAppearanceScheme = useColorScheme();

    /**
     * Possible string ​​for appAppearanceScheme
     *
     * 'light'       : Light Mode
     * 'dark'        : Dark Mode
     * 'followSystem': Automatic
     */
    const [appAppearanceScheme, setAppAppearanceScheme] = useState<
        string | null | undefined
    >(systemAppearanceScheme);

    /**
     * Possible number ​​for appAppearanceIndex
     *
     * 1: appAppearanceScheme is 'light' & systemAppearanceScheme is any
     * 2: appAppearanceScheme is 'dark' & systemScheme is any
     * 3: appAppearanceScheme is 'followSystem' & systemAppearanceScheme is 'light'
     * 4: appAppearanceScheme is 'followSystem' & systemAppearanceScheme is 'dark'
     */
    const [appAppearanceIndex, setAppAppearanceIndex] = useState<number>(0);

    // appAppearanceIndex persistence
    const handleAppearanceIndex = (props: number) => {
        setAppAppearanceIndex(props);
        AsyncStorage.setItem('@appAppearanceIndex', props.toString());
    };

    // appAppearanceScheme persistence
    const handleAppearanceScheme = (props: string) => {
        switch (props) {
            case 'light':
                setAppAppearanceScheme('light');
                AsyncStorage.setItem('@appAppearanceScheme', 'light');
                break;
            case 'dark':
                setAppAppearanceScheme('dark');
                AsyncStorage.setItem('@appAppearanceScheme', 'dark');
                break;
            case 'followSystem':
                if (systemAppearanceScheme === 'light') {
                    setAppAppearanceScheme('followSystem');
                    AsyncStorage.setItem(
                        '@appAppearanceScheme',
                        'followSystem',
                    );
                    break;
                } else if (systemAppearanceScheme === 'dark') {
                    setAppAppearanceScheme('followSystem');
                    AsyncStorage.setItem(
                        '@appAppearanceScheme',
                        'followSystem',
                    );
                    break;
                }
                break;
            default:
        }
    };

    const handleAppAppearance = async () => {
        switch (appAppearanceIndex) {
            case 0:
                // initail app appearance scheme
                const storageAppearanceIndex: string | null =
                    await AsyncStorage.getItem('@appAppearanceIndex');

                switch (storageAppearanceIndex) {
                    case null:
                        if (systemAppearanceScheme === 'light') {
                            setAppAppearanceIndex(3);
                            setAppAppearanceScheme('followSystem');
                            break;
                        } else if (systemAppearanceScheme === 'dark') {
                            setAppAppearanceIndex(4);
                            setAppAppearanceScheme('followSystem');
                            break;
                        }
                        break;
                    case '1':
                        setAppAppearanceIndex(1);
                        setAppAppearanceScheme('light');
                        break;
                    case '2':
                        setAppAppearanceIndex(2);
                        setAppAppearanceScheme('dark');
                        break;
                    case '3':
                        if (systemAppearanceScheme === 'light') {
                            setAppAppearanceIndex(3);
                            setAppAppearanceScheme('light');
                            break;
                        } else if (systemAppearanceScheme === 'dark') {
                            setAppAppearanceIndex(4);
                            setAppAppearanceScheme('dark');
                            break;
                        }
                        break;
                    case '4':
                        if (systemAppearanceScheme === 'light') {
                            setAppAppearanceIndex(3);
                            setAppAppearanceScheme('light');
                            break;
                        } else if (systemAppearanceScheme === 'dark') {
                            setAppAppearanceIndex(4);
                            setAppAppearanceScheme('dark');
                            break;
                        }
                        break;
                    default:
                }
                break;
            case 1:
                handleAppearanceIndex(1);
                handleAppearanceScheme('light');
                break;
            case 2:
                handleAppearanceIndex(2);
                handleAppearanceScheme('dark');
                break;
            case 3:
                if (systemAppearanceScheme === 'light') {
                    handleAppearanceIndex(3);
                    handleAppearanceScheme('followSystem');
                } else if (systemAppearanceScheme === 'dark') {
                    handleAppearanceIndex(4);
                    handleAppearanceScheme('followSystem');
                }
                break;
            case 4:
                if (systemAppearanceScheme === 'light') {
                    handleAppearanceIndex(3);
                    handleAppearanceScheme('followSystem');
                } else if (systemAppearanceScheme === 'dark') {
                    handleAppearanceIndex(4);
                    handleAppearanceScheme('followSystem');
                }
                break;
            default:
        }
    };

    // get app Appearance scheme to react to the system Appearance scheme
    useEffect(() => {
        handleAppAppearance();
    }, [systemAppearanceScheme]);

    return (
        <SettingsContext.Provider
            value={{
                appAppearanceScheme,
                appAppearanceIndex,
                handleAppearanceIndex,
                handleAppearanceScheme,
            }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const SettingsContext = React.createContext<SettingsContext>({
    appAppearanceScheme: 'followSystem',
    appAppearanceIndex: 0,
    handleAppearanceIndex: () => {},
    handleAppearanceScheme: () => {},
});
