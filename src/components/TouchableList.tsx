import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableRipple, useTheme as usePaperTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
    icon?: React.ReactNode;
    label: string;
    preferenceValue?: string;
    onPress: () => void;
}

const TouchableList: React.FC<Props> = props => {
    const {icon, label, preferenceValue, onPress} = props;
    const {colors: PaperColors} = usePaperTheme();

    return (
        <TouchableRipple rippleColor={PaperColors.rippleColor} onPress={onPress}>
            <View style={styles.item}>
                <View style={styles.item_left}>
                    {icon}
                    <Text style={[styles.item_left_label, {color: PaperColors.text}]}>{label}</Text>
                </View>
                <View style={styles.item_right}>
                    <Text
                        style={[
                            styles.item_right_preferenceValue,
                            {color: PaperColors.placeholder},
                        ]}>
                        {preferenceValue}
                    </Text>
                    <Icon
                        name="chevron-forward"
                        size={18}
                        color={PaperColors.placeholder}
                        style={styles.item_right_icon_fixed}
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
    item_right: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    item_right_preferenceValue: {
        marginRight: 8,
    },
    item_right_icon_fixed: {
        paddingTop: 1,
    },
});

export default TouchableList;
