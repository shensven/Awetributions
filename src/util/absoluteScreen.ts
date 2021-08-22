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
