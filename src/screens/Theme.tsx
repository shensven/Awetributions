import React, {useContext} from 'react';
import {View, Text, useColorScheme} from 'react-native';
import {Checkbox, useTheme as usePaperTheme} from 'react-native-paper';
import {SettingsContext} from '../util/SettingsManager';

const Theme: React.FC = () => {
    const {colors: PaperColor} = usePaperTheme();
    const {appThemeScheme, toggleThemeScheme, appThemeIndex, toggleThemeIndex} =
        useContext(SettingsContext);
    const systemThemeScheme = useColorScheme();

    const _toggleTheme = (props: string) => {
        if (props === 'light') {
            toggleThemeIndex(0);
            toggleThemeScheme('light');
        } else if (props === 'dark') {
            toggleThemeIndex(1);
            toggleThemeScheme('dark');
        } else if (props === 'followSystem' && systemThemeScheme === 'light') {
            toggleThemeIndex(2);
            toggleThemeScheme('followSystem');
        } else if (props === 'followSystem' && systemThemeScheme === 'dark') {
            toggleThemeIndex(3);
            toggleThemeScheme('followSystem');
        }
    };

    return (
        // UI refactoring needed
        <View>
            <Text style={{color: PaperColor.primary}}>
                systemTheme {systemThemeScheme}
            </Text>
            <Text style={{color: PaperColor.primary}}>
                appThemeScheme {appThemeScheme}
            </Text>
            <Text style={{color: PaperColor.primary}}>
                appThemeIndex {appThemeIndex}
            </Text>
            <Text style={{color: PaperColor.accent}}>Light</Text>
            <Checkbox
                status={appThemeIndex === 0 ? 'checked' : 'unchecked'}
                onPress={() => {
                    _toggleTheme('light');
                }}
            />
            <Text style={{color: PaperColor.accent}}>Dark</Text>
            <Checkbox
                status={appThemeIndex === 1 ? 'checked' : 'unchecked'}
                onPress={() => {
                    _toggleTheme('dark');
                }}
            />
            <Text style={{color: PaperColor.accent}}>Automatic</Text>
            <Checkbox
                status={
                    appThemeIndex === 2 || appThemeIndex === 3
                        ? 'checked'
                        : 'unchecked'
                }
                onPress={() => {
                    _toggleTheme('followSystem');
                }}
            />
        </View>
    );
};

export default Theme;
