import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    Image,
} from 'react-native';
import { Colors } from '../../styles/colors';

type Props = {
    userId?: string;
    onMenuPress?: () => void;
    onAvatarPress?: () => void;
};

const AppHeader: React.FC<Props> = ({
    userId = '123456',
    onMenuPress,
    onAvatarPress,
}) => {
    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.headerBackground} />
            <View style={styles.header}>
                <View style={styles.left}>
                    <TouchableOpacity
                        onPress={onMenuPress}
                        activeOpacity={0.7}
                        style={styles.menuWrapper}
                    >
                        <Image
                            source={require('../../assets/icons/MenuIcon.png')}
                            style={styles.menuIcon}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                    <Image
                        source={require('../../assets/images/FortisPlayLogo.png')}
                        style={styles.headerLogo}
                        resizeMode="contain"
                    />
                </View>
                <TouchableOpacity
                    style={styles.userPill}
                    onPress={onAvatarPress}
                    activeOpacity={0.8}>
                    <Text style={styles.userId}>{userId}</Text>
                    <View style={styles.divider} />
                    <Image
                        source={require('../../assets/icons/UserIcon.png')}
                        style={styles.userIcon}
                        resizeMode="contain"
                    />
                    <Image
                        source={require('../../assets/icons/ChevronIcon.png')}
                        style={styles.chevronIcon}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    header: {
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.headerBackground,
        paddingHorizontal: 16,
        borderBottomWidth: 0.57,
        borderBottomColor: '#E2E8F0',
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    menuWrapper: {
        padding: 4
    },
    menuIcon: {
        width: 24,
        height: 24,
    },
    headerLogo: {
        height: 34,
        width: 120,
    },
    userPill: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 0.57,
        borderColor: 'rgba(31, 35, 43, 0.2)',
        borderRadius: 4,
        paddingHorizontal: 10,
        paddingVertical: 6,
        gap: 10,
    },
    userId: {
        height: 18,
        width: 48,
        top: 0.43,
        fontFamily: 'Manrope',
        fontSize: 14,
        color: '#1F232B',
        fontWeight: '600',
        lineHeight: 18,
        letterSpacing: 0,
    },
    divider: {
        width: 1,
        height: 16,
        backgroundColor: 'rgba(31, 35, 43, 0.4)',
    },
    userIcon: {
        width: 18,
        height: 18,
    },
    chevronIcon: {
        width: 10,
        height: 5,
    },
});

export default AppHeader;