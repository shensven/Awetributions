import React, {useEffect, useState} from 'react';
import {useColorScheme} from 'react-native';
import {
    DefaultTheme as PaperDefaultTheme,
    DarkTheme as PaperDarkTheme,
    Provider as PaperProvider,
    useTheme as usePaperTheme,
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
    // dark: true,
    // mode: 'adaptive',
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
        background: '#FFFFFE',
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
    appThemeScheme: string;
    appThemeIndex: number;
    toggleThemeScheme: (props: string) => void;
    toggleThemeIndex: (props: number) => void;
}

export const SettingsContext = React.createContext<SettingsContext>({
    appThemeScheme: 'followSystem',
    appThemeIndex: 2,
    toggleThemeScheme: () => {},
    toggleThemeIndex: () => {},
});

export const SettingsProvider = ({children}) => {
    /**
     * Possible string ​​for appThemeScheme
     *
     * 'followSystem': Automatic
     * 'light'       : Light Mode
     * 'dark'        : Dark Mode
     */
    const [appThemeScheme, setAppThemeScheme] =
        useState<string>('followSystem');

    /**
     * Possible index ​​for appThemeIndex
     *
     * 0: appThemeScheme is 'light' & systemThemeScheme is any
     * 1: appThemeScheme is 'dark' & systemThemeScheme is any
     * 2: appThemeScheme is 'followSystem' & systemThemeScheme is 'light'
     * 3: appThemeScheme is 'followSystem' & systemThemeScheme is 'dark'
     */
    const [appThemeIndex, setAppThemeIndex] = useState<number>(2);

    const systemThemeScheme = useColorScheme();

    const toggleThemeScheme = (props: string) => {
        if (props === 'light') {
            setAppThemeScheme('light');
            AsyncStorage.setItem('@appThemeScheme', 'light');
        } else if (props === 'dark') {
            setAppThemeScheme('dark');
            AsyncStorage.setItem('@appThemeScheme', 'dark');
        } else if (props === 'followSystem') {
            if (systemThemeScheme === 'light') {
                setAppThemeScheme('followSystem');
                AsyncStorage.setItem('@appThemeScheme', 'followSystem');
            } else if (systemThemeScheme === 'dark') {
                setAppThemeScheme('followSystem');
                AsyncStorage.setItem('@appThemeScheme', 'followSystem');
            }
        }
    };

    const toggleThemeIndex = (props: number) => {
        setAppThemeIndex(props);
        if (props === 0) {
            setAppThemeScheme('light');
        } else if (props === 2) {
            setAppThemeScheme('dark');
        } else if (props === 3 || props === 4) {
            setAppThemeScheme('followSystem');
        }
        AsyncStorage.setItem('@appThemeIndex', props.toString());
    };

    useEffect(() => {
        if (appThemeScheme === 'light') {
            toggleThemeIndex(0);
            toggleThemeScheme('light');
        } else if (appThemeScheme === 'dark') {
            toggleThemeIndex(1);
            toggleThemeScheme('dark');
        } else if (
            systemThemeScheme === 'light' &&
            appThemeScheme === 'followSystem'
        ) {
            toggleThemeIndex(2);
            toggleThemeScheme('followSystem');
        } else if (
            systemThemeScheme === 'dark' &&
            appThemeScheme === 'followSystem'
        ) {
            toggleThemeIndex(3);
            toggleThemeScheme('followSystem');
        }
    }, [systemThemeScheme]);

    return (
        <SettingsContext.Provider
            value={{
                appThemeScheme,
                appThemeIndex,
                toggleThemeScheme,
                toggleThemeIndex,
            }}>
            {children}
        </SettingsContext.Provider>
    );
};
