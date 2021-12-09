import React, {useContext, useState} from 'react';
import {View, StyleSheet, ScrollView, Text} from 'react-native';
import {TouchableRipple, useTheme as usePaperTheme} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import DeviceInfo from 'react-native-device-info';
import {SettingsContext} from '../util/SettingsManager';
import {useAbsoluteWindowWidth, useAbsoluteWindowHeight} from '../util/absoluteScreen';

interface ToogleBtnProps {
  label: string;
  description: string;
  i18nKey: string;
  onPress: () => void;
}

const Language: React.FC = () => {
  const {handleI18nScheme} = useContext(SettingsContext);
  const {colors: PaperColor} = usePaperTheme();
  const insets = useSafeAreaInsets();
  const {t, i18n} = useTranslation();

  const absoluteWindowWidth = useAbsoluteWindowWidth();
  const absoluteWindowHeight = useAbsoluteWindowHeight();

  const [toogleBtnWidth, setToogleBtnWidth] = useState<number>(0);
  const [toogleBtnHeight, setToogleBtnHeight] = useState<number>(0);

  const deviceType = DeviceInfo.getDeviceType();

  DeviceInfo.isLandscape().then(isLandscape => {
    if (isLandscape === false && deviceType === 'Handset') {
      setToogleBtnWidth((absoluteWindowWidth - 32) / 2);
      setToogleBtnHeight(((absoluteWindowWidth - 32) / 2) * 0.55);
    } else if (isLandscape === false && deviceType === 'Tablet') {
      setToogleBtnWidth((absoluteWindowWidth - 32) / 4);
      setToogleBtnHeight(((absoluteWindowWidth - 32) / 4) * 0.55);
    } else if (isLandscape === true && deviceType === 'Handset') {
      setToogleBtnWidth((absoluteWindowHeight - 32 - insets.left - insets.right) / 4);
      setToogleBtnHeight(((absoluteWindowHeight - 32 - insets.left - insets.right) / 4) * 0.55);
    } else if (isLandscape === true && deviceType === 'Tablet') {
      setToogleBtnWidth((absoluteWindowHeight - 32 - insets.left - insets.right) / 6);
      setToogleBtnHeight(((absoluteWindowHeight - 32 - insets.left - insets.right) / 6) * 0.55);
    }
  });

  const ToogleBtn: React.FC<ToogleBtnProps> = props => {
    const {label, description, i18nKey, onPress} = props;

    return (
      <View style={[styles.toogle_btn_root, {width: toogleBtnWidth}]}>
        <TouchableRipple
          borderless={true}
          rippleColor={PaperColor.rippleReverse}
          style={[
            styles.toogle_btn,
            {
              height: toogleBtnHeight,
              backgroundColor: i18n.language === i18nKey ? PaperColor.accent : PaperColor.btnBackground,
            },
          ]}
          onPress={onPress}>
          <>
            <Text
              style={[
                styles.toogle_label,
                {
                  color: i18n.language === i18nKey ? PaperColor.textForceLight : PaperColor.textAccent,
                },
              ]}>
              {label}
            </Text>
            <Text
              style={[
                styles.toogle_labelAccent,
                {
                  color: i18n.language === i18nKey ? PaperColor.textForceLight : PaperColor.textAccent,
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
    <View style={[styles.root, {paddingLeft: insets.left, paddingRight: insets.right}]}>
      <ScrollView contentContainerStyle={[styles.bg, {paddingBottom: insets.bottom}]}>
        <ToogleBtn label="English" description={t('Language.en')} i18nKey="en" onPress={() => handleI18nScheme('en')} />
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
  toogle_btn_root: {},
  toogle_btn: {
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
