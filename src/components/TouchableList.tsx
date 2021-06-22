import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableRipple, useTheme as usePaperTheme} from 'react-native-paper';
import {useTheme as useNavigationTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
    label: string;
    icon?: React.ReactNode;
    onPress: () => void;
}

const TouchableList: React.FC<Props> = props => {
    const {label, icon, onPress} = props;
    const {colors: PaperColors} = useNavigationTheme();

    return (
        <TouchableRipple rippleColor="rgba(0, 0, 0, 0.1)" onPress={onPress}>
            <View style={styles.item}>
                <View style={styles.item_left}>
                    {icon}
                    <Text
                        style={[
                            styles.item_left_label,
                            {color: PaperColors.text},
                        ]}>
                        {label}
                    </Text>
                </View>
                <View style={styles.item_right}>
                    <Icon
                        name="chevron-forward"
                        size={18}
                        color={PaperColors.text}
                    />
                </View>
            </View>
        </TouchableRipple>
    );
};

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 56,
        // backgroundColor: '#FFFFFF',
        paddingLeft: 20,
        paddingRight: 20,
    },
    item_left: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    item_left_label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 16,
    },
    item_right: {},
});

export default TouchableList;
