import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {
    List,
    TouchableRipple,
    useTheme as usePaperTheme,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

const openSourceLibrariesArr = require('./../util/openSourceLibraries.json');

const OpenSourceLibraries: React.FC = () => {
    const {colors: PaperColors} = usePaperTheme();

    const dashedArrr = Array(100).fill(0);

    return (
        <View style={styles.root}>
            <ScrollView>
                <View style={styles.header}>
                    <Text style={styles.header_title}>
                        <Text
                            style={[
                                styles.header_title_spicial,
                                {color: PaperColors.primary},
                            ]}>
                            Awetributions
                        </Text>
                        <Text style={{color: PaperColors.text}}>
                            {' '}
                            is built using open source libraries, proudly
                            written in{' '}
                        </Text>
                        <Text
                            style={[
                                styles.header_title_spicial,
                                {color: PaperColors.primary},
                            ]}>
                            React Native
                        </Text>
                        .
                    </Text>
                </View>
                <View style={styles.header_divider_flex}>
                    {dashedArrr.map((item, index) => (
                        <View
                            style={[
                                styles.header_divider,
                                {backgroundColor: PaperColors.disabled},
                            ]}
                            key={index}
                        />
                    ))}
                </View>
                {openSourceLibrariesArr.map((item: any, index: number) => (
                    <TouchableRipple
                        key={index}
                        rippleColor={PaperColors.rippleColor}
                        onPress={() => {}}>
                        <List.Item
                            title={item.name}
                            titleStyle={[
                                styles.item_title,
                                {color: PaperColors.text},
                            ]}
                            right={() => (
                                <View style={styles.item_right}>
                                    <Text
                                        style={[
                                            styles.item_right_type,
                                            {color: PaperColors.placeholder},
                                        ]}>
                                        {item.license}
                                    </Text>
                                    <Icon
                                        name="chevron-forward"
                                        size={12}
                                        color={PaperColors.text}
                                    />
                                </View>
                            )}
                        />
                    </TouchableRipple>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    header: {
        marginLeft: 16,
        marginRight: 16,
        marginTop: 16,
        marginBottom: 16,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    header_title: {
        fontSize: 14,
        textAlign: 'center',
    },
    header_title_spicial: {
        fontSize: 14,
        textDecorationLine: 'underline',
    },
    header_divider_flex: {
        flexDirection: 'row',
        justifyContent: 'center',
        overflow: 'hidden',
        marginTop: 8,
        marginBottom: 8,
    },
    header_divider: {
        height: 1,
        width: 4,
        marginLeft: 2,
        marginRight: 2,
    },
    item_title: {
        fontSize: 12,
        marginRight: 16,
    },
    item_right: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    item_right_type: {
        fontSize: 12,
    },
});

export default OpenSourceLibraries;
