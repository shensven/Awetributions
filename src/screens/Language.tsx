import React, {useContext} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {useTranslation} from 'react-i18next';
import {SettingsContext} from '../util/SettingsManager';
import RadioBtnBlock from '../components/RadioBtnBlock';

const Language: React.FC = () => {
    const {i18n} = useTranslation();
    const {handleI18nScheme} = useContext(SettingsContext);

    return (
        <View style={styles.root}>
            <ScrollView>
                <View style={styles.root_item}>
                    <RadioBtnBlock
                        label="English"
                        checked={i18n.language === 'en'}
                        onPress={() => handleI18nScheme('en')}
                        style={styles.item}
                    />
                    <RadioBtnBlock
                        label="简体中文"
                        checked={i18n.language === 'zh-Hans'}
                        onPress={() => handleI18nScheme('zh-Hans')}
                        style={styles.item}
                    />
                    <RadioBtnBlock
                        label="繁体中文"
                        checked={i18n.language === 'zh-Hant'}
                        onPress={() => handleI18nScheme('zh-Hant')}
                        style={styles.item}
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
    root_item: {
        marginLeft: 16,
        marginRight: 16,
        marginTop: 16,
    },
    item: {
        marginBottom: 16,
    },
});

export default Language;
