import React, {useLayoutEffect, useState} from 'react';
import {View, Text, StyleSheet, Keyboard, Platform, ScrollView} from 'react-native';
import {Button, TextInput, useTheme as usePaperTheme} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import {useAbsoluteWindowHeight, useAbsoluteWindowWidth} from '../util/absoluteScreen';

const OAuthToken: React.FC = () => {
    const absoluteWindowWidth = useAbsoluteWindowWidth();
    const absoluteWindowHeight = useAbsoluteWindowHeight();
    const deviceType = DeviceInfo.getDeviceType();

    const {t} = useTranslation();
    const insets = useSafeAreaInsets();
    const {colors: PaperColor} = usePaperTheme();
    const [rootWidth, setRootWidth] = useState<number>(0);

    DeviceInfo.isLandscape().then(isLandscape => {
        if (isLandscape === false && deviceType === 'Handset') {
            setRootWidth(absoluteWindowWidth - 32);
        } else if (isLandscape === false && deviceType === 'Tablet') {
            setRootWidth(absoluteWindowWidth * 0.6);
        } else if (isLandscape === true && deviceType === 'Handset') {
            setRootWidth(absoluteWindowHeight * 0.6);
        } else if (isLandscape === true && deviceType === 'Tablet') {
            setRootWidth(absoluteWindowHeight * 0.5);
        }
    });

    const [currentLocalToken, setCurrentLocalToken] = useState<string | null>(null);
    const [gitHubToken, setGitHubToken] = useState<string>('');

    const getLocalToken = async () => {
        try {
            const rsp: string | null = await AsyncStorage.getItem('@GitHubToken');
            if (rsp !== null) {
                setCurrentLocalToken(
                    rsp.replace(rsp.substring(8, 36), '****************************'),
                );
            }
        } catch (error) {
            console.log(error);
        }
    };

    const storeToken = async () => {
        try {
            await AsyncStorage.setItem('@GitHubToken', gitHubToken);
        } catch (error) {
            console.log(error);
        }
    };

    useLayoutEffect(() => {
        getLocalToken();
    }, []);

    const submit = () => {
        if (gitHubToken.length < 40) {
            Keyboard.dismiss();
        } else {
            storeToken();
            Keyboard.dismiss();
            getLocalToken();
            setGitHubToken('');
        }
    };
    return (
        <View style={styles.root}>
            <ScrollView
                contentContainerStyle={{
                    paddingLeft: insets.left,
                    paddingRight: insets.right,
                    width: rootWidth,
                    alignSelf: 'center',
                }}>
                <TextInput
                    mode="outlined"
                    keyboardType="ascii-capable"
                    maxLength={40}
                    value={gitHubToken}
                    label={t('OAuth2Token.Enter_Your_GitHub_Access_Token')}
                    right={<TextInput.Affix text={gitHubToken.length.toString() + '/40'} />}
                    outlineColor={'rgba(0,0,0,0)'}
                    theme={{
                        roundness: 10,
                        colors: {
                            primary:
                                gitHubToken.length === 40
                                    ? PaperColor.primary
                                    : PaperColor.textAccent,
                        },
                    }}
                    style={styles.input}
                    onSubmitEditing={() => submit()}
                    onChangeText={text => {
                        // setGitHubToken(text.replace(/\s/g, ''));
                        setGitHubToken(text.replace(/[^A-Za-z0-9_]/gi, ''));
                    }}
                />
                <View style={[styles.current_view, {backgroundColor: PaperColor.btnBackground}]}>
                    <Text style={[styles.current_token_label, {color: PaperColor.textAccent}]}>
                        {t('OAuth2Token.CURRENT_TOKEN')}
                    </Text>
                    <Text style={[styles.current_token_value, {color: PaperColor.textAccent}]}>
                        {currentLocalToken ?? 'null'}
                    </Text>
                </View>
                <Button
                    mode="contained"
                    theme={{
                        roundness: 10,
                    }}
                    style={styles.btn}
                    onPress={() => submit()}>
                    {currentLocalToken === null ? t('OAuth2Token.SAVE') : t('OAuth2Token.UPDATE')}
                </Button>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    input: {
        fontSize: 14,
        marginTop: 8,
    },
    current_view: {
        marginTop: 8,
        padding: 12,
        borderRadius: 10,
    },
    current_token_label: {
        fontSize: 12,
    },
    current_token_value: {
        fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
        fontSize: 10,
        marginTop: Platform.OS === 'ios' ? 2 : 0,
        marginLeft: 1,
    },
    btn: {
        marginTop: 32,
        marginBottom: 32,
    },
});

export default OAuthToken;
