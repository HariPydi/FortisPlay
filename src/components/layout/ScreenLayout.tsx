import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../styles/colors';
import AppHeader from './AppHeader';
import AppBreadcrumb from './AppBreadcrumb';
import Sidebar from './Sidebar';

type Props = {
    children: React.ReactNode;
    navigation?: any;
    activeScreen: string;
    breadcrumbs: string[];
    userId?: string;
};

const ScreenLayout: React.FC<Props> = ({
    children,
    navigation,
    activeScreen,
    breadcrumbs,
    userId,
}) => {
    const [sidebarVisible, setSidebarVisible] = React.useState(false);

    return (
        <SafeAreaView style={styles.safeArea}>
            <Sidebar
                visible={sidebarVisible}
                onClose={() => setSidebarVisible(false)}
                navigation={navigation}
                activeScreen={activeScreen}
            />
            <AppHeader
                userId={userId}
                onMenuPress={() => setSidebarVisible(true)}
            />
            <AppBreadcrumb crumbs={breadcrumbs} />
            <View style={styles.content}>
                {children}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.headerBackground,
    },
    content: {
        flex: 1,
        backgroundColor: Colors.dashBackground,
    },
});

export default ScreenLayout;