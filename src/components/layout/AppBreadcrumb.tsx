import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../styles/colors';

type Props = {
    crumbs: string[];  // e.g. ['Dashboard'] or ['Dashboard', 'Masters']
};

const AppBreadcrumb: React.FC<Props> = ({ crumbs }) => {
    return (
        <View style={styles.breadcrumb}>
            <Text style={styles.text}>
                {crumbs.map((crumb, i) => (
                    <Text key={i}>
                        {i > 0 && <Text style={styles.sep}> › </Text>}
                        <Text style={i === crumbs.length - 1 ? styles.active : styles.text}>
                            {crumb}
                        </Text>
                    </Text>
                ))}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    breadcrumb: {
        backgroundColor: '#F0F2F5',
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 9,
    },
    text: {
        fontSize: 12,
        fontWeight: 500,
        fontFamily: 'Manrope',
        lineHeight: 16,
        color: '#586065',
    },
    sep: {
        fontSize: 14,
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