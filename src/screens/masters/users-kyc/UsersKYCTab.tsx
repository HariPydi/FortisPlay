import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Image
} from 'react-native';
import { Colors, FontFamily } from '../../../styles/colors';

type Props = {
    navigation: any;
};

const UsersKYCTab: React.FC<Props> = ({ navigation }) => {
    const [searchText, setSearchText] = useState<string>('');

    return (
        <View style={styles.card}>
            <View style={styles.cardHeaderContainer}>
                <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>Users KYC</Text>
                    <TouchableOpacity
                        style={styles.createBtn}
                        activeOpacity={0.8}
                        onPress={() => navigation?.navigate('KYCPersonalInfo')}>
                        <Image
                            source={require('../../../assets/icons/PlusIcon.png')}
                            style={styles.plusIcon}
                            resizeMode="contain"
                        />
                        <Text style={styles.createBtnText}>Create New</Text>
                    </TouchableOpacity>
                </View>


                <View style={styles.searchContainer}>
                    <Image
                        source={require('../../../assets/icons/search-lg.png')}
                        style={styles.searchIcon}
                        resizeMode="contain"
                    />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search"
                        placeholderTextColor="#1F232B99"
                        value={searchText}
                        onChangeText={setSearchText}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 3,
        marginTop: 16,
    },
    cardHeaderContainer: {
        borderBottomWidth: 0.57,
        borderBottomColor: '#EAEEF2',
        padding: 12,
        gap: 12,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cardTitle: {
        fontFamily: FontFamily.primaryFont,
        fontWeight: '700',
        fontSize: 17,
        lineHeight: 25.5,
        letterSpacing: 0,
        color: Colors.textDark,
    },
    createBtn: {
        backgroundColor: Colors.primaryBlue,
        borderRadius: 8,
        paddingRight: 12,
        paddingLeft: 10,
        paddingVertical: 6,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    plusIcon: {
        width: 16,
        height: 16,
    },
    createBtnText: {
        fontFamily: FontFamily.primaryFont,
        fontWeight: '700',
        fontSize: 11,
        lineHeight: 16.5,
        letterSpacing: 0,
        color: '#FFFFFF',
    },

    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F1F4F7',
        borderRadius: 8,
        paddingTop: 9,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 16,
        height: 39,
        gap: 12
    },
    searchIcon: {
        width: 20,
        height: 20,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        color: Colors.textDark,
        height: 44,
    },
});

export default UsersKYCTab;