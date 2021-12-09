import React, {useEffect, useState} from 'react';
import {useColorScheme} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTranslation} from 'react-i18next';

// ----------------------------------------------------------------------
//
interface SettingsContext {
  appAppearanceScheme: string | null | undefined;
  appAppearanceIndex: number;
  appI18nScheme: string;
  handleAppearanceIndex: (props: number) => void;
  handleAppearanceScheme: (props: string) => void;
  handleI18nScheme: (props: string) => void;
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
  const [appAppearanceScheme, setAppAppearanceScheme] = useState<string | null | undefined>(systemAppearanceScheme);

  /**
   * Possible number ​​for appAppearanceIndex
   *
   * 1: appAppearanceScheme is 'light' & systemAppearanceScheme is any
   * 2: appAppearanceScheme is 'dark' & systemScheme is any
   * 3: appAppearanceScheme is 'followSystem' & systemAppearanceScheme is 'light'
   * 4: appAppearanceScheme is 'followSystem' & systemAppearanceScheme is 'dark'
   */
  const [appAppearanceIndex, setAppAppearanceIndex] = useState<number>(0);

  // Persisting appAppearanceIndex
  const handleAppearanceIndex = (props: number) => {
    setAppAppearanceIndex(props);
    AsyncStorage.setItem('@appAppearanceIndex', props.toString());
  };

  // Persisting appAppearanceScheme
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
          AsyncStorage.setItem('@appAppearanceScheme', 'followSystem');
          break;
        } else if (systemAppearanceScheme === 'dark') {
          setAppAppearanceScheme('followSystem');
          AsyncStorage.setItem('@appAppearanceScheme', 'followSystem');
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
        const storageAppearanceIndex: string | null = await AsyncStorage.getItem('@appAppearanceIndex');

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

  // ----------------------------------------------------------------------
  /**
   * Possible string ​​for appI18nScheme
   *
   * 'en'          : English
   * 'zh-Hans'     : Simplified Chinese
   * 'followSystem': Automatic
   */
  const [appI18nScheme, setAppI18nScheme] = useState<string>('');
  const {i18n} = useTranslation();

  // Persisting appI18nScheme
  const handleI18nScheme = (props: string) => {
    switch (props) {
      case 'en':
        setAppI18nScheme('en');
        i18n.changeLanguage('en');
        AsyncStorage.setItem('@appI18nScheme', 'en');
        break;
      case 'zh-Hans':
        setAppI18nScheme('zh-Hans');
        i18n.changeLanguage('zh-Hans');
        AsyncStorage.setItem('@appI18nScheme', 'zh-Hans');
        break;
      case 'zh-Hant':
        setAppI18nScheme('zh-Hant');
        i18n.changeLanguage('zh-Hant');
        AsyncStorage.setItem('@appI18nScheme', 'zh-Hant');
        break;
      default:
    }
  };

  const handleAppLanguege = async () => {
    switch (appI18nScheme) {
      case '':
        // initail app i18n scheme
        const storageAppI18nScheme: string | null = await AsyncStorage.getItem('@appI18nScheme');

        switch (storageAppI18nScheme) {
          case null:
            handleI18nScheme('en');
            break;
          case 'en':
            handleI18nScheme('en');
            break;
          case 'zh-Hans':
            handleI18nScheme('zh-Hans');
            break;
          case 'zh-Hant':
            handleI18nScheme('zh-Hant');
            break;
          default:
        }
        break;
      case 'en':
        handleI18nScheme('en');
        break;
      case 'zh_Hans':
        handleI18nScheme('zh-Hans');
        break;
      case 'zh_Hant':
        handleI18nScheme('zh-Hant');
        break;
      default:
    }
  };

  // ----------------------------------------------------------------------
  // get app Appearance scheme to react to the system Appearance scheme
  useEffect(() => {
    handleAppAppearance();
    handleAppLanguege();
  }, [systemAppearanceScheme]);

  return (
    <SettingsContext.Provider
      value={{
        appAppearanceScheme,
        appAppearanceIndex,
        appI18nScheme,
        handleAppearanceIndex,
        handleAppearanceScheme,
        handleI18nScheme,
      }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const SettingsContext = React.createContext<SettingsContext>({
  appAppearanceScheme: 'followSystem',
  appAppearanceIndex: 0,
  appI18nScheme: '',
  handleAppearanceIndex: () => {},
  handleAppearanceScheme: () => {},
  handleI18nScheme: () => {},
});
