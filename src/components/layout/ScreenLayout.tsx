import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../styles/colors';
import AppHeader from './AppHeader';
import AppBreadcrumb from '../common/AppBreadcrumb';
import Sidebar from './Sidebar';

type Props = {
    children: React.ReactNode;
    navigation?: any;
    activeScreen: string;
    userId?: string;
};

const ScreenLayout: React.FC<Props> = ({
    children,
    navigation,
    activeScreen,
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
            <View style={styles.content}>
                {children}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    content: {
        flex: 1,
        backgroundColor: Colors.dashBackground,
        paddingTop: 8,
        paddingBottom: 16,
        paddingHorizontal: 16,
    },
});

export default ScreenLayout;