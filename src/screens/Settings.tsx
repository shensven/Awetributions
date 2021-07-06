import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import TouchableList from '../components/TouchableList';

const Settings: React.FC = ({navigation}: any) => {
    return (
        <View>
            <TouchableList
                label="Theme"
                icon={<Icon name="sunny" size={18} color="#F6C55B" />}
                onPress={() => {
                    navigation.navigate('Theme');
                }}
            />
            <TouchableList
                label="Language"
                icon={
                    <Icon name="language-outline" size={18} color="#EB816C" />
                }
                onPress={() => {
                    navigation.navigate('Theme');
                }}
            />
        </View>
    );
};

export default Settings;
