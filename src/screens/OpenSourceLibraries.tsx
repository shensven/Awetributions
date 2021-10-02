import React from 'react';
import {View, Text, StyleSheet, Linking, StatusBar, FlatList} from 'react-native';
import {List, TouchableRipple, useTheme as usePaperTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface PackageDetail {
    license: string;
    licenseFile: string;
    name: string;
    path: string;
    repository: string;
    version: string;
}

interface TouchableRippleProps {
    repository: string;
    name: string;
    license: string;
}

const openSourceLibrariesArr: PackageDetail[] = require('./../util/openSourceLibraries.json');

const OpenSourceLibraries: React.FC = () => {
    const {colors: PaperColors} = usePaperTheme();
    const insets = useSafeAreaInsets();

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
        } catch (error: any) {
            console.log(error.message);
        }
    };

    const renderTouchableRipple = ({item}: {item: TouchableRippleProps}) => {
        return (
            <TouchableRipple
                rippleColor={PaperColors.ripple}
                onPress={() => openLink(item.repository)}>
                <List.Item
                    title={item.name}
                    titleStyle={[styles.item_title, {color: PaperColors.text}]}
                    right={() => (
                        <View style={styles.item_right}>
                            <Text
                                style={[styles.item_right_type, {color: PaperColors.placeholder}]}>
                                {item.license}
                            </Text>
                            <Icon name="open-outline" size={12} color={PaperColors.text} />
                        </View>
                    )}
                />
            </TouchableRipple>
        );
    };

    return (
        <View style={[styles.root, {paddingLeft: insets.left, paddingRight: insets.right}]}>
            <FlatList
                data={openSourceLibrariesArr}
                renderItem={renderTouchableRipple}
                ListFooterComponent={() => <View />}
                ListFooterComponentStyle={{height: insets.bottom}}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
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
