import React, {useContext} from 'react';
import {View, StyleSheet, ScrollView, Dimensions, Text} from 'react-native';
import {TouchableRipple, useTheme as usePaperTheme} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {SettingsContext} from '../util/SettingsManager';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

interface ToogleBtnProps {
    label: string;
    description: string;
    i18nKey: string;
    onPress: () => void;
}

const Language: React.FC = () => {
    const {handleI18nScheme} = useContext(SettingsContext);
    const {colors: PaperColor} = usePaperTheme();
    const {t, i18n} = useTranslation();

    const ToogleBtn: React.FC<ToogleBtnProps> = props => {
        const {label, description, i18nKey, onPress} = props;

        return (
            <View style={styles.toogle_btn_root}>
                <TouchableRipple
                    borderless={true}
                    rippleColor={PaperColor.rippleReverse}
                    style={[
                        styles.toogle_btn,
                        {
                            backgroundColor:
                                i18n.language === i18nKey
                                    ? PaperColor.accent
                                    : PaperColor.btnBackground,
                        },
                    ]}
                    onPress={onPress}>
                    <>
                        <Text
                            style={[
                                styles.toogle_label,
                                {
                                    color:
                                        i18n.language === i18nKey
                                            ? PaperColor.textForceLight
                                            : PaperColor.textAccent,
                                },
                            ]}>
                            {label}
                        </Text>
                        <Text
                            style={[
                                styles.toogle_labelAccent,
                                {
                                    color:
                                        i18n.language === i18nKey
                                            ? PaperColor.textForceLight
                                            : PaperColor.textAccent,
                                },
                            ]}>
                            {description}
                        </Text>
                    </>
                </TouchableRipple>
            </View>
        );
    };

    return (
        <View style={styles.root}>
            <ScrollView>
                <View style={styles.bg}>
                    <ToogleBtn
                        label="简体中文"
                        description={t('Language.zh-Hans')}
                        i18nKey="zh-Hans"
                        onPress={() => handleI18nScheme('zh-Hans')}
                    />
                    <ToogleBtn
                        label="繁體中文"
                        description={t('Language.zh-Hant')}
                        i18nKey="zh-Hant"
                        onPress={() => handleI18nScheme('zh-Hant')}
                    />
                    <ToogleBtn
                        label="English"
                        description={t('Language.en')}
                        i18nKey="en"
                        onPress={() => handleI18nScheme('en')}
                    />
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    bg: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 16,
        marginLeft: 16,
        marginRight: 16,
    },
    toogle_btn_root: {
        width: '50%',
    },
    toogle_btn: {
        height: screenWidth * 0.25,
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        marginLeft: 8,
        marginRight: 8,
        justifyContent: 'space-between',
    },
    toogle_label: {
        fontSize: 16,
    },
    toogle_labelAccent: {
        fontSize: 12,
        fontWeight: 'bold',
    },
});

export default Language;
