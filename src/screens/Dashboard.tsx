import React, {useEffect, useLayoutEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Animated, Dimensions} from 'react-native';
import {IconButton, useTheme as usePaperTheme} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import PagerView from 'react-native-pager-view';
import appAxios from '../util/appAxios';

// const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);
// const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;
const blockWidth = (screenWidth - 34 - 2 * 18) / 18;

const owner: string = 'shensven';

interface Commit {
    date: string;
}

const Dashboard: React.FC = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const {t} = useTranslation();
    const {colors: PaperColor} = usePaperTheme();

    const [userPublicReposCount, setUserPublicReposCount] = useState<number>(0);
    const [reposArray, setReposArray] = useState<string[]>([]);
    const [commitsArray, setCommitsArray] = useState<Commit[]>([]);

    const getData = async () => {
        /*
         * Get a user
         * eg: {
         *      'login': 'shensven',
         *      'public_repos': 20,
         *       ...
         *     }
         */
        const _rspUser = await appAxios.get(`/users/${owner}`);
        setUserPublicReposCount(_rspUser.data.public_repos);

        /*
         * List the first 100 public repositories
         * eg: [
         *      {'name':'Awetributions', ...},
         *      {'name':'docker-android', ...},
         *      {'name':'winstagram_98', ...},
         *       ...
         *     ]
         */
        const _rspReposArray = await appAxios.get(`users/${owner}/repos`, {params: {per_page: 20}});
        console.log(_rspReposArray);

        /*
         * Put repositories name into an array
         * eg: [
         *      'Awetributions',
         *      'docker-android',
         *      'winstagram_98',
         *       ...
         *     ]
         */
        const _reposArray: string[] = _rspReposArray.data.map((item: {name: string}) => item.name);
        setReposArray(_reposArray);

        /*
         * List the first 100 commits for Awetributions
         * eg: [
         *      {"sha": "9510xxx", commit: { "message": "fix: minor UI update",}},
         *      {"sha": "e24axxx", commit: { "message": "fix: minor UX update",}},
         *      ...
         *     ]
         */
        const _resCommits = await appAxios.get(`/repos/${owner}/${reposArray[1]}/commits`, {
            params: {
                per_page: 100,
            },
        });

        /*
         * Get url for the last page
         * eg: https://api.github.com/repositories/366780714/commits?per_page=100&page=2
         */
        const lastUri = _resCommits.headers.link
            .split(',')[1]
            .split(';')[0]
            .split('<')[1]
            .split('>')[0];

        /*
         * Get last page
         * eg: 2
         */
        const lastPage: number = lastUri.charAt(lastUri.length - 1);

        /*
         * Get Initial commit hash
         */
        let lastPageLength: number = 0;
        if (lastPage !== 1) {
            const _resLastPageCommits = await appAxios.get(
                `/repos/${owner}/${reposArray[1]}/commits`,
                {
                    params: {
                        per_page: 100,
                        page: lastPage,
                    },
                },
            );
            lastPageLength = _resLastPageCommits.data.length;
        }

        /*
         * Get total commit counts
         */
        const totalCommitCounts = 100 * (lastPage - 1) + lastPageLength;
        console.log(totalCommitCounts);
    };

    const RNHeaderRight: React.FC = () => {
        const _navigation = useNavigation();
        const {colors: _PaperColor} = usePaperTheme();
        return (
            <View style={styles.RN_header_btn}>
                <IconButton
                    size={22}
                    color={_PaperColor.text}
                    rippleColor={_PaperColor.ripple}
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
    useEffect(() => {
        getData();
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            // headerTitle: handleHeaderTitle(),
            // headerTitleAlign: handleHeaderTitleAlign(),
            // headerTintColor: handleHeaderTintColor(),
            headerRight: () => <RNHeaderRight />,
        });
    }, [navigation, route]);

    const HeaderPaperView: React.FC = () => {
        const ARRAY = Array(123).fill(0);

        return (
            <PagerView style={styles.header_root}>
                <View style={styles.header_month_wing}>
                    <View style={styles.header_month_tag}>
                        <Text
                            style={[styles.header_month_tag_label, {color: PaperColor.textAccent}]}>
                            1月
                        </Text>
                        <Text
                            style={[styles.header_month_tag_label, {color: PaperColor.textAccent}]}>
                            2月
                        </Text>
                        <Text
                            style={[styles.header_month_tag_label, {color: PaperColor.textAccent}]}>
                            3月
                        </Text>
                        <Text
                            style={[styles.header_month_tag_label, {color: PaperColor.textAccent}]}>
                            4月
                        </Text>
                    </View>
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
                    <View style={styles.header_month_tag}>
                        <Text
                            style={[styles.header_month_tag_label, {color: PaperColor.textAccent}]}>
                            5月
                        </Text>
                        <Text
                            style={[styles.header_month_tag_label, {color: PaperColor.textAccent}]}>
                            6月
                        </Text>
                        <Text
                            style={[styles.header_month_tag_label, {color: PaperColor.textAccent}]}>
                            7月
                        </Text>
                        <Text
                            style={[styles.header_month_tag_label, {color: PaperColor.textAccent}]}>
                            8月
                        </Text>
                    </View>
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
                    <View style={styles.header_month_tag}>
                        <Text
                            style={[styles.header_month_tag_label, {color: PaperColor.textAccent}]}>
                            9月
                        </Text>
                        <Text
                            style={[styles.header_month_tag_label, {color: PaperColor.textAccent}]}>
                            10月
                        </Text>
                        <Text
                            style={[styles.header_month_tag_label, {color: PaperColor.textAccent}]}>
                            11月
                        </Text>
                        <Text
                            style={[styles.header_month_tag_label, {color: PaperColor.textAccent}]}>
                            12月
                        </Text>
                    </View>
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
                    <View style={styles.mif_section_title}>
                        <Text style={styles.mid_section_title_left}>
                            {t('Dashboard.Today_Activity')}
                        </Text>
                        {/* <Ionicons
                            name="reorder-three-outline"
                            size={16}
                            color={PaperColor.textAccent}
                        /> */}
                    </View>
                    <View
                        style={[styles.mid_section, {backgroundColor: PaperColor.cardBackground}]}>
                        <KeyValueEl
                            label="2021-08-16"
                            value="x"
                            valueSize={20}
                            unit={t('Dashboard.commits')}
                        />
                    </View>
                    <View style={styles.mif_section_title}>
                        <Text style={styles.mid_section_title_left}>
                            {t('Dashboard.Best_Ever')}
                        </Text>
                        {/* <Ionicons
                            name="reorder-three-outline"
                            size={16}
                            color={PaperColor.textAccent}
                        /> */}
                    </View>
                    <View
                        style={[styles.mid_section, {backgroundColor: PaperColor.cardBackground}]}>
                        <KeyValueEl
                            label={t('Dashboard.annual_average')}
                            value="x.xx"
                            unit={t('Dashboard.commits/day')}
                        />
                        <KeyValueEl
                            label={t('Dashboard.current_continuity')}
                            value="xx"
                            unit={t('Dashboard.day')}
                        />
                        <KeyValueEl
                            label={t('Dashboard.max_continuity')}
                            value="xx"
                            unit={t('Dashboard.day')}
                        />
                        <KeyValueEl
                            label={t('Dashboard.max_one_day')}
                            value="xx"
                            unit={t('Dashboard.commits')}
                        />
                        <KeyValueEl
                            label={t('Dashboard.repo')}
                            value={userPublicReposCount.toString()}
                            unit={t('Dashboard.ge')}
                        />
                    </View>
                    <View style={styles.mif_section_title}>
                        <Text style={styles.mid_section_title_left}>
                            {t('Dashboard.All_Contribution_Activity')}
                        </Text>
                        {/* <Ionicons
                            name="reorder-three-outline"
                            size={16}
                            color={PaperColor.textAccent}
                        /> */}
                    </View>
                    <View
                        style={[styles.mid_section, {backgroundColor: PaperColor.cardBackground}]}>
                        <KeyValueEl
                            label={t('Dashboard.last_week')}
                            value="xx"
                            unit={t('Dashboard.commits')}
                        />
                        <KeyValueEl
                            label={t('Dashboard.last_month')}
                            value="xxx"
                            unit={t('Dashboard.commits')}
                        />
                        <KeyValueEl
                            label={t('Dashboard.last_half_year')}
                            value="xxx"
                            unit={t('Dashboard.commits')}
                        />
                        <KeyValueEl
                            label={t('Dashboard.last_365_days')}
                            value="xxx"
                            unit={t('Dashboard.commits')}
                        />
                        <KeyValueEl
                            label={t('Dashboard.career')}
                            value="xxxx"
                            unit={t('Dashboard.commits')}
                        />
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
        paddingBottom: 8,
        paddingLeft: 17,
        paddingRight: 17,
    },
    header_month_tag: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    header_month_tag_label: {
        flex: 1,
        fontSize: 10,
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
    mif_section_title: {
        marginLeft: 24,
        marginRight: 24,
        marginBottom: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    mid_section_title_left: {
        fontSize: 12,
    },
    mid_section_title_right: {},
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
