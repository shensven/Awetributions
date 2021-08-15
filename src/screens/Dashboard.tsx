import React, {useContext, useLayoutEffect} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    useColorScheme,
    Animated,
    Dimensions,
} from 'react-native';
import {IconButton, useTheme as usePaperTheme} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {SettingsContext} from '../util/SettingsManager';
import PagerView from 'react-native-pager-view';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;
const blockWidth = (screenWidth - 32 - 2 * 18) / 18;

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

const Dashboard: React.FC = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const {t} = useTranslation();

    const {colors: PaperColor} = usePaperTheme();

    const RNHeaderRight: React.FC = () => {
        const _navigation = useNavigation();
        const {colors: _PaperColor} = usePaperTheme();
        return (
            <View style={styles.RN_header_btn}>
                <IconButton
                    size={22}
                    color={_PaperColor.text}
                    rippleColor={PaperColor.ripple}
                    icon="plus-circle-outline"
                    style={styles.RN_header_iconbtn}
                    onPress={() => console.log('AddProfile')}
                />
                <IconButton
                    size={22}
                    color={_PaperColor.text}
                    rippleColor={_PaperColor.ripple}
                    icon={() => <Ionicons name="cog-outline" size={24} color={_PaperColor.text} />}
                    onPress={() => {
                        // @ts-ignore
                        _navigation.navigate('Settings');
                    }}
                />
            </View>
        );
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            // headerTitle: handleHeaderTitle(),
            // headerTitleAlign: handleHeaderTitleAlign(),
            // headerTintColor: handleHeaderTintColor(),
            headerRight: () => <RNHeaderRight />,
        });
    }, [navigation, route]);

    const HeaderPaperView = () => {
        const ARRAY = Array(123).fill(0);

        return (
            <PagerView style={styles.header_root}>
                <View style={styles.header_month_wing}>
                    <View style={styles.header_month}>
                        {ARRAY.map((item: any, index: number) => (
                            <View
                                style={[styles.header_block, {backgroundColor: PaperColor.primary}]}
                                key={index}
                            />
                        ))}
                    </View>
                </View>
                <View style={styles.header_month_wing}>
                    <View style={styles.header_month}>
                        {ARRAY.map((item: any, index: number) => (
                            <View
                                style={[styles.header_block, {backgroundColor: PaperColor.primary}]}
                                key={index}
                            />
                        ))}
                    </View>
                </View>
            </PagerView>
        );
    };

    interface KeyValueElProps {
        label: string;
        value: string;
        valueSize?: number;
        unit: string;
    }

    const KeyValueEl: React.FC<KeyValueElProps> = props => {
        const {label, value, valueSize, unit} = props;
        return (
            <View style={styles.mid_section_item}>
                <Text style={[styles.mid_section_top_label, {color: PaperColor.textAccent}]}>
                    {label}
                </Text>
                <View style={styles.mid_section_bottom}>
                    <Text
                        style={[
                            styles.mid_section_bottom_value,
                            {fontSize: valueSize},
                            {color: PaperColor.textAccent},
                        ]}>
                        {value}
                    </Text>
                    <Text style={[styles.mid_section_bottom_unit, {color: PaperColor.textAccent}]}>
                        {unit}
                    </Text>
                </View>
            </View>
        );
    };

    return (
        <View style={[styles.root, {backgroundColor: PaperColor.background}]}>
            <ScrollView>
                <HeaderPaperView />
                <View>
                    <Text style={styles.mid_section_title}>总览</Text>
                    <View
                        style={[styles.mid_section, {backgroundColor: PaperColor.cardBackground}]}>
                        <KeyValueEl label="今日提交" value="2" valueSize={20} unit="次" />
                    </View>
                    <Text style={styles.mid_section_title}>我的贡献榜单</Text>
                    <View
                        style={[styles.mid_section, {backgroundColor: PaperColor.cardBackground}]}>
                        <KeyValueEl label="当前连续" value="17" unit="天" />
                        <KeyValueEl label="最长连续" value="17" unit="天" />
                        <KeyValueEl label="单日最多" value="30" unit="次" />
                        <KeyValueEl label="全年平均" value="3.11" unit="次/天" />
                    </View>
                    <Text style={styles.mid_section_title}>过去的提交活动</Text>
                    <View
                        style={[styles.mid_section, {backgroundColor: PaperColor.cardBackground}]}>
                        <KeyValueEl label="最近一周" value="50" unit="次" />
                        <KeyValueEl label="最近一月" value="100" unit="次" />
                        <KeyValueEl label="最近半年" value="500" unit="次" />
                        <KeyValueEl label="最近365天" value="900" unit="次" />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    RN_header_btn: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    RN_header_iconbtn: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    root: {
        flex: 1,
    },

    header_root: {
        height: screenWidth * 0.5,
    },
    header_month_wing: {
        justifyContent: 'center',
        paddingTop: 8,
        paddingLeft: 16,
        paddingRight: 16,
    },
    header_month: {
        height: blockWidth * 8,
        flexWrap: 'wrap',
    },
    header_block: {
        width: blockWidth,
        height: blockWidth,
        margin: 1,
        borderRadius: 4,
    },

    mid_title: {
        fontSize: 16,
        fontWeight: '800',
        marginTop: 8,
        marginLeft: 16,
    },
    mid_section_title: {
        fontSize: 12,
        marginLeft: 24,
        marginBottom: 4,
    },
    mid_section: {
        marginLeft: 16,
        marginRight: 16,
        marginBottom: 24,
        padding: 16,
        paddingBottom: 0,
        borderRadius: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    mid_section_item: {
        width: (screenWidth - 32 - 32) / 3,
        marginBottom: 16,
    },
    mid_section_top_label: {
        fontSize: 12,
    },
    mid_section_bottom: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    mid_section_bottom_value: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    mid_section_bottom_unit: {
        fontSize: 10,
        marginLeft: 1,
        marginBottom: 1,
    },
    mid_section_bottom_value_spacial: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default Dashboard;
