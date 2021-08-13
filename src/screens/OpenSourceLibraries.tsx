import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Linking,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import {List, TouchableRipple, useTheme as usePaperTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import InAppBrowser from 'react-native-inappbrowser-reborn';

interface PackageDetail {
    license: string;
    licenseFile: string;
    name: string;
    path: string;
    repository: string;
    version: string;
}

const openSourceLibrariesArr: PackageDetail[] = require('./../util/openSourceLibraries.json');

const OpenSourceLibraries: React.FC = () => {
    const {colors: PaperColors} = usePaperTheme();
    const dashedArrr = Array(100).fill(0);

    const openLink = async (repository: string) => {
        try {
            const url = repository;

            if (await InAppBrowser.isAvailable()) {
                const oldBarStyle = StatusBar.pushStackEntry({
                    barStyle: 'light-content',
                    animated: true,
                });
                const result = await InAppBrowser.open(url, {
                    // iOS Properties
                    dismissButtonStyle: 'close',
                    preferredBarTintColor: PaperColors.primary,
                    preferredControlTintColor: 'white',
                    readerMode: false,
                    animated: true,
                    modalPresentationStyle: 'fullScreen',
                    modalTransitionStyle: 'coverVertical',
                    modalEnabled: true,
                    enableBarCollapsing: true,
                    // Android Properties
                    showTitle: true,
                    toolbarColor: PaperColors.primary,
                    secondaryToolbarColor: 'black',
                    navigationBarColor: 'transparent',
                    navigationBarDividerColor: 'white',
                    enableUrlBarHiding: true,
                    enableDefaultShare: true,
                    forceCloseOnRedirection: false,
                    // Specify full animation resource identifier(package:anim/name)
                    // or only resource name(in case of animation bundled with app).
                    animations: {
                        startEnter: 'slide_in_right',
                        startExit: 'slide_out_left',
                        endEnter: 'slide_in_left',
                        endExit: 'slide_out_right',
                    },
                    headers: {
                        'my-custom-header': 'my custom header value',
                    },
                });
                StatusBar.popStackEntry(oldBarStyle);
                console.log(JSON.stringify(result));
            } else {
                Linking.openURL(url);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <View style={styles.root}>
            <ScrollView>
                <View style={styles.scrollview_padding}>
                    <View style={styles.header}>
                        <View style={styles.header_title_container}>
                            <TouchableOpacity
                                onPress={() => {
                                    openLink('https://github.com/shensven/Awetributions');
                                }}>
                                <Text
                                    style={[
                                        styles.header_title_spicial,
                                        {color: PaperColors.primary},
                                    ]}>
                                    Awetributions
                                </Text>
                            </TouchableOpacity>
                            <Text style={{color: PaperColors.text}}>
                                {' '}
                                is built using open source libraries, proudly written in{' '}
                            </Text>
                            <TouchableOpacity
                                onPress={() => {
                                    openLink('https://reactnative.dev/');
                                }}>
                                <Text
                                    style={[
                                        styles.header_title_spicial,
                                        {color: PaperColors.primary},
                                    ]}>
                                    React Native
                                </Text>
                            </TouchableOpacity>
                            <Text style={{color: PaperColors.text}}> framework using </Text>
                            <TouchableOpacity
                                onPress={() => {
                                    openLink('https://www.typescriptlang.org/');
                                }}>
                                <Text
                                    style={[
                                        styles.header_title_spicial,
                                        {color: PaperColors.primary},
                                    ]}>
                                    TypeScript
                                </Text>
                            </TouchableOpacity>
                            <Text style={{color: PaperColors.text}}>.</Text>
                        </View>
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
                    {openSourceLibrariesArr.map((item: PackageDetail, index: number) => (
                        <TouchableRipple
                            key={index}
                            rippleColor={PaperColors.ripple}
                            onPress={() => {
                                openLink(item.repository);
                            }}>
                            <List.Item
                                title={item.name}
                                titleStyle={[styles.item_title, {color: PaperColors.text}]}
                                right={() => (
                                    <View style={styles.item_right}>
                                        <Text
                                            style={[
                                                styles.item_right_type,
                                                {
                                                    color: PaperColors.placeholder,
                                                },
                                            ]}>
                                            {item.license}
                                        </Text>
                                        <Icon
                                            name="open-outline"
                                            size={12}
                                            color={PaperColors.text}
                                        />
                                    </View>
                                )}
                            />
                        </TouchableRipple>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    scrollview_padding: {
        paddingBottom: 16,
    },
    header: {
        marginLeft: 16,
        marginRight: 16,
        marginTop: 16,
        marginBottom: 16,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    header_title_container: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    header_title: {},
    header_title_spicial: {
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
        marginRight: 4,
    },
});

export default OpenSourceLibraries;
