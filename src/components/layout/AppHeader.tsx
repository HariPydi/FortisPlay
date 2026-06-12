import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
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
                    <TouchableOpacity onPress={onMenuPress} activeOpacity={0.7}>
                        <Text style={styles.menuIcon}>☰</Text>
                    </TouchableOpacity>
                    <View style={styles.logoBox}>
                        <Text style={styles.logoLetter}>F</Text>
                    </View>
                    <Text style={styles.brandName}>FortisPlay</Text>
                </View>
                <TouchableOpacity
                    style={styles.userPill}
                    onPress={onAvatarPress}
                    activeOpacity={0.8}>
                    <Text style={styles.userId}>{userId}</Text>
                    <View style={styles.divider} />
                    <View style={styles.avatar}>
                        <Text style={styles.avatarIcon}>👤</Text>
                    </View>
                    <Text style={styles.chevron}>▾</Text>
                </TouchableOpacity>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.headerBackground,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 0.5,
        borderBottomColor: Colors.headerBorder,
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    menuIcon: {
        fontSize: 20,
        color: Colors.textDark,
    },
    logoBox: {
        width: 32,
        height: 32,
        borderRadius: 8,
        backgroundColor: Colors.logoBlue,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoLetter: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    brandName: {
        fontSize: 16,
        fontWeight: '700',
        color: Colors.textDark,
    },
    userPill: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: '#a8a1a15c',
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 5,
        gap: 6,
    },
    userId: {
        fontSize: 13,
        color: Colors.venueText,
        fontWeight: '500',
    },
    divider: {
        width: 1,
        height: 16,
        backgroundColor: '#D0D0D0',
    },
    avatar: {
        width: 26,
        height: 26,
        borderRadius: 13,
        backgroundColor: Colors.avatarBackground,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarIcon: { fontSize: 13 },
    chevron: {
        fontSize: 11,
        color: Colors.venueText,
    },
});

export default AppHeader;