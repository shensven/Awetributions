import React, {useContext} from 'react';
import {
    View,
    Text,
    StatusBar,
    StyleSheet,
    ScrollView,
    useColorScheme,
} from 'react-native';
import {useTheme as usePaperTheme} from 'react-native-paper';
import {SettingsContext} from '../util/SettingsManager';

const Dashboard: React.FC = () => {
    const systemThemeScheme = useColorScheme();
    const {colors: PaperColor} = usePaperTheme();
    const {appThemeScheme, appThemeIndex} = useContext(SettingsContext);

    return (
        <View style={styles.root}>
            <StatusBar
                translucent={true}
                backgroundColor="transparent"
                barStyle="dark-content"
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                overScrollMode="always">
                <Text
                    style={[styles.header_title, {color: PaperColor.primary}]}>
                    Dashboard
                </Text>
                <Text
                    style={[
                        styles.header_subtitle,
                        {color: PaperColor.primary},
                    ]}>
                    systemThemeScheme {systemThemeScheme}
                </Text>
                <Text
                    style={[
                        styles.header_subtitle,
                        {color: PaperColor.primary},
                    ]}>
                    appThemeScheme {appThemeScheme}
                </Text>
                <Text
                    style={[
                        styles.header_subtitle,
                        {color: PaperColor.primary},
                    ]}>
                    appThemeIndex {appThemeIndex}
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
