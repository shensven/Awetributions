import React from 'react';
import {View, Text, StyleSheet, StyleProp, ViewStyle, Platform} from 'react-native';
import {RadioButton, TouchableRipple, useTheme as usePaperTheme} from 'react-native-paper';

interface Props {
    label: string;
    checked: boolean;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
}

const RadioBtnBlock: React.FC<Props> = props => {
    const {label, checked, onPress, style} = props;

    const {colors: PaperColor} = usePaperTheme();

    return (
        <View
            style={
                checked
                    ? [styles.item, {backgroundColor: PaperColor.RadioBtnBlockBackground}, style]
                    : [
                          styles.item,
                          {
                              backgroundColor: PaperColor.RadioBtnBlockBackgroundUnchecked,
                          },
                          style,
                      ]
            }>
            <TouchableRipple rippleColor="rgba(0, 0, 0, 0.1)" onPress={onPress}>
                <View style={styles.item_root}>
                    <RadioButton
                        status={checked ? 'checked' : 'unchecked'}
                        value=""
                        color={PaperColor.RadioBtnBlockText}
                        uncheckedColor={PaperColor.RadioBtnBlockTextUnchecked}
                        onPress={onPress}
                    />
                    <Text
                        style={
                            checked
                                ? [
                                      styles.item_label,
                                      Platform.OS === 'android' ? {paddingBottom: 1} : null,
                                      {color: PaperColor.RadioBtnBlockText},
                                  ]
                                : [
                                      styles.item_label,
                                      Platform.OS === 'android' ? {paddingBottom: 1} : null,
                                      {
                                          color: PaperColor.RadioBtnBlockTextUnchecked,
                                      },
                                  ]
                        }>
                        {label}
                    </Text>
                </View>
            </TouchableRipple>
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        borderRadius: 8,
        overflow: 'hidden',
    },
    item_root: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 8,
        height: 48,
    },
    item_label: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default RadioBtnBlock;
