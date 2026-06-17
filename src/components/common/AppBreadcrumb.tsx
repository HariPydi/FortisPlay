import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../styles/colors';
import Svg, { Path } from 'react-native-svg';
import BreadcrumbArrow from './BreadcrumbArrow';

type Props = {
    crumbs: string[];  // e.g. ['Dashboard'] or ['Dashboard', 'Masters']
};

const AppBreadcrumb: React.FC<Props> = ({ crumbs }) => {
    return (
        <View style={styles.breadcrumb}>
            {crumbs.map((crumb, index) => (
                <React.Fragment key={index}>
                    {index > 0 && (
                        <View style={styles.separator}>
                            <BreadcrumbArrow />
                        </View>
                    )}

                    <Text
                        style={
                            index === crumbs.length - 1
                                ? styles.active
                                : styles.text
                        }>
                        {crumb}
                    </Text>
                </React.Fragment>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    breadcrumb: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    separator: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 12,
        fontWeight: 500,
        fontFamily: 'Manrope',
        lineHeight: 16,
        letterSpacing: 0,
        color: '#586065',
    },
    active: {
        fontSize: 12,
        fontWeight: 500,
        lineHeight: 16,
        fontFamily: 'Manrope',
        color: '#2B3438',
    },
});

export default AppBreadcrumb;