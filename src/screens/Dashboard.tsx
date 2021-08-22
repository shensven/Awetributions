import React, {useEffect, useLayoutEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Animated} from 'react-native';
import {IconButton, useTheme as usePaperTheme} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import PagerView from 'react-native-pager-view';
import DeviceInfo from 'react-native-device-info';
import axios from 'axios';
import appAxios from '../util/appAxios';
import {
    useAbsoluteScreenHeight,
    useAbsoluteWindowHeight,
    useAbsoluteWindowWidth,
} from '../util/absoluteScreen';

// const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

const owner: string = 'shensven';
const PER_PAGE: number = 100;
const COMMIT_PER_PAGE: number = 40;

interface Owner {
    data: {
        public_repos: number;
    };
}

interface RspRepos {
    data: {
        name: string;
    }[];
    headers: {
        link?: string;
    };
}

interface Commit {
    date: string;
}

interface RemoteCommit {
    name: string;
    commit: {
        author: {
            date: string;
        };
    };
}

const Dashboard: React.FC = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const {t} = useTranslation();
    const {colors: PaperColor} = usePaperTheme();
    const deviceType = DeviceInfo.getDeviceType();

    const [ownerReposCount, setOwnerReposCount] = useState<number>(-1);

    const [lastReposPage, setLastReposPage] = useState<number>(-1);
    const [reposArray, setReposArray] = useState<string[]>([]);

    const [lastCommitsPage, setLastCommitsPage] = useState<number>(1);
    const [commitsArray, setCommitsArray] = useState<[]>([]);

    const getOwnerReposCount = async () => {
        if (ownerReposCount === -1) {
            const _resReposCount: Owner = await appAxios.get(`/users/${owner}`);
            setOwnerReposCount(_resReposCount.data.public_repos);
        }
    };

    const getFirstArray = async () => {
        if (lastReposPage === -1) {
            const _rspReposFirstArray: RspRepos = await appAxios.get(`users/${owner}/repos`, {
                params: {per_page: PER_PAGE},
            });
            const _reposFirstArray: string[] = _rspReposFirstArray.data.map(
                (item: {name: string}) => item.name,
            );
            setReposArray(_reposFirstArray);

            let _rspReposLastPage: number = 1;
            if ('link' in _rspReposFirstArray.headers) {
                const _rspReposLastURL: string = (_rspReposFirstArray.headers.link as string)
                    .split(',')[1]
                    .split(';')[0]
                    .split('<')[1]
                    .split('>')[0];
                _rspReposLastPage = Number(_rspReposLastURL.charAt(_rspReposLastURL.length - 1));
            }
            setLastReposPage(_rspReposLastPage);
        }
    };

    const getNextReposArray = async () => {
        if (reposArray.length < ownerReposCount) {
            let _tempReposArray: string[] = [];

            for (let i = 1; i < lastReposPage; i++) {
                const _rspReposNextArray = await appAxios.get(`users/${owner}/repos`, {
                    params: {per_page: PER_PAGE, page: i + 1},
                });
                _rspReposNextArray.data.map((item: {name: string}) =>
                    _tempReposArray.push(item.name),
                );
            }
            setReposArray([...reposArray].concat(_tempReposArray));
        }
    };

    const getFirstCommitsArray = async () => {
        // const _tempObj: {name?: string; date?: string} = {};
        if (reposArray.length === ownerReposCount) {
            axios
                .all(
                    reposArray.map((repoName: string) =>
                        appAxios.get(`/repos/${owner}/${repoName}/commits`),
                    ),
                )
                .then(
                    axios.spread((...res) => {
                        res.map(item => {
                            console.log(item);
                        });
                    }),
                );
        }

        // const _resCommitsFirstArray = await appAxios.get(
        //     `/repos/${owner}/${reposArray[0]}/commits`,
        //     {
        //         params: {
        //             per_page: COMMIT_PER_PAGE,
        //         },
        //     },
        // );
        // const _commitsFirstArray: string[] = _resCommitsFirstArray.data.map(
        //     (item: RemoteCommit) => item.commit.author.date,
        // );
        // setCommitsArray(_commitsFirstArray);
        // setLastReposPage(_rspReposLastPage);
    };

    const getNextCommitsArray = async () => {
        if (lastCommitsPage === 1) {
        }
    };

    useLayoutEffect(() => {
        // getOwnerReposCount();
        // getFirstArray();
        // getNextReposArray();
        // getFirstCommitsArray();
        // getNextCommitsArray();
    }, [lastReposPage]);

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

    useLayoutEffect(() => {
        navigation.setOptions({
            // headerTitle: handleHeaderTitle(),
            // headerTitleAlign: handleHeaderTitleAlign(),
            // headerTintColor: handleHeaderTintColor(),
            headerRight: () => <RNHeaderRight />,
        });
    }, [navigation, route]);

    const HeaderPaperView: React.FC = () => {
        const absoluteWindowWidth = useAbsoluteWindowWidth();
        const absoluteScreenHeight = useAbsoluteScreenHeight();

        // const [ARRAY, setARRAY] = useState<number[]>(Array(123).fill(0));

        const [headerRootHeight, setHeaderRootHeight] = useState<number>(0);
        const [monthWidth, setMonthWidth] = useState<number>(0);
        const [blockWidth, setBlockWidth] = useState<number>(0);
        const [blockBorderRadius, setBlockBorderRadius] = useState<number>(0);

        DeviceInfo.isLandscape().then(isLandscape => {
            if (isLandscape === false && deviceType === 'Handset') {
                setHeaderRootHeight(Math.ceil((blockWidth + 2) * 9));
                setMonthWidth((blockWidth + 2) * 18);
                setBlockWidth(Math.floor((absoluteWindowWidth - 34 - 2 * 18) / 18));
                setBlockBorderRadius(4);
                // setARRAY(Array(123).fill(0));
            } else if (isLandscape === false && deviceType === 'Tablet') {
                setHeaderRootHeight(Math.ceil((blockWidth + 2) * 9));
                setMonthWidth((blockWidth + 2) * 53);
                setBlockWidth(Math.floor((absoluteWindowWidth - 0 - 2 * 53) / 53));
                setBlockBorderRadius(3);
                // setARRAY(Array(366).fill(0));
            } else if (isLandscape === true && deviceType === 'Handset') {
                setHeaderRootHeight(Math.ceil((blockWidth + 2) * 9));
                setMonthWidth((blockWidth + 2) * 53);
                setBlockWidth(Math.floor((absoluteScreenHeight - 34 - 2 * 53) / 53));
                setBlockBorderRadius(3);
                // setARRAY(Array(366).fill(0));
            } else if (isLandscape === true && deviceType === 'Tablet') {
                setHeaderRootHeight(Math.ceil((blockWidth + 2) * 9));
                setMonthWidth((blockWidth + 2) * 53);
                setBlockWidth(Math.floor((absoluteScreenHeight - 34 - 2 * 53) / 53));
                setBlockBorderRadius(4);
                // setARRAY(Array(366).fill(0));
            }
        });

        const ARRAY = Array(123).fill(0);
        // const ARRAY = Array(366).fill(0);

        return (
            <PagerView style={[styles.header, {height: headerRootHeight}]}>
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
                    <View
                        style={[
                            styles.header_month,
                            {width: monthWidth, height: (blockWidth + 2) * 7},
                        ]}>
                        {ARRAY.map((item: any, index: number) => (
                            <View
                                style={[
                                    styles.header_block,
                                    {
                                        width: blockWidth,
                                        height: blockWidth,
                                        borderRadius: blockBorderRadius,
                                        backgroundColor: PaperColor.primary,
                                    },
                                ]}
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

        const [midSectionItemWidth, setMidSectionItemWidth] = useState<number>(0);

        const absoluteWindowWidth = useAbsoluteWindowWidth();
        const absoluteWindowHeight = useAbsoluteWindowHeight();

        DeviceInfo.isLandscape().then(isLandscape => {
            if (isLandscape === false && deviceType === 'Handset') {
                setMidSectionItemWidth((absoluteWindowWidth - 32 - 32) / 3);
            } else if (isLandscape === false && deviceType === 'Tablet') {
                setMidSectionItemWidth((absoluteWindowWidth - 32 - 32) / 5);
            } else if (isLandscape === true && deviceType === 'Handset') {
                setMidSectionItemWidth((absoluteWindowHeight - 32 - 32) / 5);
            } else if (isLandscape === true && deviceType === 'Tablet') {
                setMidSectionItemWidth((absoluteWindowHeight - 32 - 32) / 5);
            }
        });

        return (
            <View style={[styles.mid_section_item, {width: midSectionItemWidth}]}>
                <Text style={[styles.mid_section_top_label, {color: PaperColor.primary}]}>
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
                    <View style={styles.mid_section_title}>
                        <Text
                            style={[styles.mid_section_title_left, {color: PaperColor.textAccent}]}>
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
                    <View style={styles.mid_section_title}>
                        <Text
                            style={[styles.mid_section_title_left, {color: PaperColor.textAccent}]}>
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
                            value={reposArray.length.toString()}
                            unit={t('Dashboard.ge')}
                        />
                    </View>
                    <View style={styles.mid_section_title}>
                        <Text
                            style={[styles.mid_section_title_left, {color: PaperColor.textAccent}]}>
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
                <Text>ownerReposCount: {ownerReposCount}</Text>
                <Text>lastReposPage: {lastReposPage}</Text>
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

    header: {
        marginBottom: 12,
    },
    header_month_wing: {
        justifyContent: 'center',
        alignItems: 'center',
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
        flexWrap: 'wrap',
    },
    header_block: {
        margin: 1,
        // borderRadius: 4,
    },

    mid_title: {
        fontSize: 16,
        fontWeight: '800',
        marginTop: 8,
        marginLeft: 16,
    },
    mid_section_title: {
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
        marginBottom: 16,
        alignItems: 'center',
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
