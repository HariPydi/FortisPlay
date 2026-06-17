import React from 'react';
import Svg, { Path } from 'react-native-svg';

const BreadcrumbArrow = () => {
    return (
        <Svg width={5} height={7} viewBox="0 0 5 7" fill="none">
            <Path
                d="M2.68333 3.5L0 0.816667L0.816667 0L4.31667 3.5L0.816667 7L0 6.18333L2.68333 3.5Z"
                fill="#586065"
            />
        </Svg>
    );
};

export default BreadcrumbArrow;