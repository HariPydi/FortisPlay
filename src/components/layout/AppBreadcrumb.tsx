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
        paddingVertical: 9,
    },
    text: {
        fontSize: 12,
        color: Colors.breadcrumbText,
    },
    sep: {
        color: Colors.breadcrumbText,
    },
    active: {
        fontSize: 12,
        color: Colors.breadcrumbText,
        fontWeight: '600',
    },
});

export default AppBreadcrumb;