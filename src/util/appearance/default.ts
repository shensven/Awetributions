import {DefaultTheme as PaperDefaultTheme, DarkTheme as PaperDarkTheme} from 'react-native-paper';
import {
    DefaultTheme as NavigationDefaultTheme,
    DarkTheme as NavigationDarkTheme,
    useTheme as useNavigationTheme,
} from '@react-navigation/native';

// ----------------------------------------------------------------------
//
declare global {
    namespace ReactNativePaper {
        interface ThemeColors {
            textAccent: string;
            textForceLight: string;
            rippleColor: string;
            rippleReverse: string;
            IconBtnRippleColor: string;
            RadioBtnBlockText: string;
            RadioBtnBlockTextUnchecked: string;
            RadioBtnBlockBackground: string;
            RadioBtnBlockBackgroundUnchecked: string;
            btnBackground: string;
        }
    }
}

export const PaperLight = {
    ...PaperDefaultTheme,
    roundness: 2,
    colors: {
        ...PaperDefaultTheme.colors,
        primary: '#216E39',
        accent: '#30A14E',
        background: '#FFFFFF',
        rippleColor: 'rgba(128, 128, 128, 0.1)',
        rippleReverse: 'rgba(128, 128, 128, 0.3)',
        IconBtnRippleColor: 'rgba(128, 128, 128, 0.3)',
        RadioBtnBlockBackground: '#216E39',
        RadioBtnBlockBackgroundUnchecked: 'rgba(128,128,128,0.1)',
        RadioBtnBlockText: '#FFFFFF',
        RadioBtnBlockTextUnchecked: 'rgba(128,128,128,1)',
        btnBackground: 'rgba(128, 128, 128, 0.1)',
        // surface: '',
        text: '#000000',
        textAccent: '#777777',
        textForceLight: '#FFFFFF',
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
        accent: '#30A14E',
        background: '#111111',
        rippleColor: 'rgba(128, 128, 128, 0.1)',
        rippleReverse: 'rgba(128, 128, 128, 0.3)',
        IconBtnRippleColor: 'rgba(128, 128, 128, 0.3)',
        RadioBtnBlockBackground: '#216E39',
        RadioBtnBlockBackgroundUnchecked: 'rgba(128,128,128,0.1)',
        RadioBtnBlockText: '#FFFFFF',
        RadioBtnBlockTextUnchecked: 'rgba(128,128,128,0.5)',
        btnBackground: 'rgba(128, 128, 128, 0.1)',
        // surface: '',
        text: '#D0D0D0',
        textAccent: '#777777',
        textForceLight: '#FFFFFF',
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

// ----------------------------------------------------------------------
//
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
