import React, {useLayoutEffect, useState} from 'react';
import {View, Text, StyleSheet, Keyboard, Platform} from 'react-native';
import {Button, TextInput, useTheme as usePaperTheme} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OAuthToken: React.FC = () => {
    const {t} = useTranslation();
    const {colors: PaperColor} = usePaperTheme();

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
            <TextInput
                mode="outlined"
                keyboardType="ascii-capable"
                maxLength={40}
                value={gitHubToken}
                label={t('OAuth2Token.Enter_Your_GitHub_Access_Token')}
                right={<TextInput.Affix text={gitHubToken.length.toString() + '/40'} />}
                outlineColor={PaperColor.boaderBackground}
                theme={{
                    roundness: 10,
                    colors: {
                        primary:
                            gitHubToken.length === 40 ? PaperColor.primary : PaperColor.textAccent,
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
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        paddingLeft: 16,
        paddingRight: 16,
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
    },
});

export default OAuthToken;
