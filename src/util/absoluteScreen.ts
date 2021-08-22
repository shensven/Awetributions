import {useState} from 'react';
import DeviceInfo from 'react-native-device-info';
import {useDimensions} from '@react-native-community/hooks';

export const useAbsoluteScreenWidth = () => {
    const dimensions = useDimensions();
    const [absoluteScreenWidth, setAbsoluteScreenWidth] = useState(0);

    DeviceInfo.isLandscape().then(isLandscape => {
        if (isLandscape === false) {
            setAbsoluteScreenWidth(dimensions.screen.width);
        } else {
            setAbsoluteScreenWidth(dimensions.screen.height);
        }
    });

    return absoluteScreenWidth;
};

export const useAbsoluteScreenHeight = () => {
    const dimensions = useDimensions();
    const [absoluteScreenHeight, setAbsoluteScreenHeight] = useState(0);

    DeviceInfo.isLandscape().then(isLandscape => {
        if (isLandscape === false) {
            setAbsoluteScreenHeight(dimensions.screen.height);
        } else {
            setAbsoluteScreenHeight(dimensions.screen.width);
        }
    });

    return absoluteScreenHeight;
};

export const useAbsoluteWindowWidth = () => {
    const dimensions = useDimensions();
    const [absoluteWindowWidth, setAbsoluteWindowWidth] = useState(0);

    DeviceInfo.isLandscape().then(isLandscape => {
        if (isLandscape === false) {
            setAbsoluteWindowWidth(dimensions.window.width);
        } else {
            setAbsoluteWindowWidth(dimensions.window.height);
        }
    });

    return absoluteWindowWidth;
};

export const useAbsoluteWindowHeight = () => {
    const dimensions = useDimensions();
    const [absoluteWindowHeight, setAbsoluteWindowHeight] = useState(0);

    DeviceInfo.isLandscape().then(isLandscape => {
        if (isLandscape === false) {
            setAbsoluteWindowHeight(dimensions.window.height);
        } else {
            setAbsoluteWindowHeight(dimensions.window.width);
        }
    });

    return absoluteWindowHeight;
};
