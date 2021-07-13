import React, {useContext} from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import TouchableList from '../components/TouchableList';
import {SettingsContext} from '../util/SettingsManager';

const Settings: React.FC = ({navigation}: any) => {
    const {appAppearanceScheme} = useContext(SettingsContext);

    const _themePreferenceValue = () => {
        switch (appAppearanceScheme) {
            case 'followSystem':
                return 'Automatic';
            case 'light':
                return 'Light';
            case 'dark':
                return 'Dark';
            default:
                return '';
        }
    };
    return (
        <View>
            <TouchableList
                icon={<Icon name="sunny" size={18} color="#F6C55B" />}
                label="Theme"
                preferenceValue={_themePreferenceValue()}
                onPress={() => {
                    navigation.navigate('Theme');
                }}
            />
            <TouchableList
                icon={
                    <Icon name="language-outline" size={18} color="#EB816C" />
                }
                label="Language"
                onPress={() => {
                    navigation.navigate('Theme');
                }}
            />
        </View>
    );
};

export default Settings;
