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
import { poolData, venueOptions } from '../../../data/dummyData';

const DIST_COL = {
    pool: 140,
    name: 190,
    type: 150,
    salesCode: 160,
    percentage: 120,
    status: 100,
    actions: 100,
};

const DIST_TABLE_WIDTH =
    DIST_COL.pool +
    DIST_COL.name +
    DIST_COL.type +
    DIST_COL.salesCode +
    DIST_COL.percentage +
    DIST_COL.status +
    DIST_COL.actions;

const DistributionsTab = () => {
    const [showSearch, setShowSearch] = useState(false);
    const [searchText, setSearchText] = useState<string>('');
    const [selectedVenue, setSelectedVenue] = useState<string>('KB1');
    const [showVenueDropdown, setShowVenueDropdown] = useState<boolean>(false);

    return (
        <View style={styles.card}>

            {/* Card Header */}
            <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Distributions</Text>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity
                        style={{ marginRight: 12 }}
                        onPress={() => setShowSearch(!showSearch)}>
                        <Text>🔍</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.createBtn}>
                        <Text style={styles.createBtnText}>+ Create New</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {showSearch && (
                <View style={styles.searchContainer}>
                    <Text style={styles.searchIcon}></Text>

                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search Distribution"
                        value={searchText}
                        onChangeText={setSearchText}
                        placeholderTextColor="#999"
                    />
                </View>
            )}

            {/* Venue Dropdown */}
            <View style={styles.venueRow}>
                <Text style={styles.venueLabel}>Venue</Text>
                <View style={styles.venueDropdownWrapper}>
                    <TouchableOpacity
                        style={styles.venueDropdown}
                        onPress={() => setShowVenueDropdown(!showVenueDropdown)}
                        activeOpacity={0.8}>
                        <Text style={styles.venueDropdownText}>{selectedVenue}</Text>
                        <Text style={styles.dropdownArrow}>▼</Text>
                    </TouchableOpacity>
                    {showVenueDropdown && (
                        <View style={styles.dropdownList}>
                            {venueOptions.map(venue => (
                                <TouchableOpacity
                                    key={venue}
                                    style={[
                                        styles.dropdownItem,
                                        selectedVenue === venue && styles.dropdownItemActive,
                                    ]}
                                    onPress={() => {
                                        setSelectedVenue(venue);
                                        setShowVenueDropdown(false);
                                    }}
                                    activeOpacity={0.7}>
                                    <Text style={[
                                        styles.dropdownItemText,
                                        selectedVenue === venue && styles.dropdownItemTextActive,
                                    ]}>
                                        {venue}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>
            </View>

            {/* Distributions Table */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator
                nestedScrollEnabled
                style={styles.distHorizontalScroll}>

                <View style={{ width: DIST_TABLE_WIDTH }}>
                    <View style={styles.distTableHeader}>
                        <Text style={[styles.th, { width: DIST_COL.pool }]}>POOL NAME</Text>
                        <Text style={[styles.th, { width: DIST_COL.name }]}>DISTRIBUTION NAME</Text>
                        <Text style={[styles.th, { width: DIST_COL.type }]}>DISTRIBUTION TYPE</Text>
                        <Text style={[styles.th, { width: DIST_COL.salesCode }]}>SALES CODE</Text>
                        <Text style={[styles.th, { width: DIST_COL.percentage }]}>PERCENTAGE(%)</Text>
                        <Text style={[styles.th, { width: DIST_COL.status }]}>STATUS</Text>
                        <Text style={[styles.th, { width: DIST_COL.actions }]}>ACTIONS</Text>
                    </View>

                    {poolData.map((pool, poolIndex) => (
                        <View
                            key={pool.poolName}
                            style={[
                                styles.poolGroup,
                                poolIndex % 2 === 0 ? styles.poolGroupLight : styles.poolGroupWhite,
                            ]}>

                            {pool.distributions.map((dist, distIndex) => (
                                <View
                                    key={`${pool.poolName}-${dist.distributionName}-${dist.salesCode}`}
                                    style={styles.distRow}>

                                    <View style={{ width: DIST_COL.pool, }}>
                                        {distIndex === 0 && (
                                            <Text style={styles.poolNameText}>{pool.poolName}</Text>
                                        )}
                                    </View>

                                    <Text style={[styles.distCellText, { width: DIST_COL.name }]}>
                                        {dist.distributionName}
                                    </Text>

                                    <Text style={[styles.distCellText, { width: DIST_COL.type }]}>
                                        {dist.distributionType}
                                    </Text>

                                    <Text style={[styles.distCellText, { width: DIST_COL.salesCode }]}>
                                        {dist.salesCode}
                                    </Text>

                                    <Text style={[styles.distCellText, { width: DIST_COL.percentage }]}>
                                        {dist.percentage}%
                                    </Text>

                                    <Text
                                        style={[
                                            styles.distStatusText,
                                            { width: DIST_COL.status },
                                        ]}>
                                        {dist.status}
                                    </Text>

                                    <View style={[styles.actionCell, { width: DIST_COL.actions }]}>
                                        <TouchableOpacity>
                                            <Text style={styles.editIcon}>✏️</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity>
                                            <Text style={styles.deleteIcon}>🗑️</Text>
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            ))}
                        </View>
                    ))}
                </View>
            </ScrollView>
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

    // Distributions
    venueRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        gap: 12,
        zIndex: 100,
    },
    venueLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1A1A2E',
    },
    venueDropdownWrapper: {
        flex: 1,
    },
    venueDropdown: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1.5,
        borderColor: '#E0E0E0',
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 10,
        backgroundColor: '#FFFFFF',
    },
    venueDropdownText: {
        fontSize: 14,
        color: '#1A1A2E',
        fontWeight: '500',
    },
    dropdownArrow: {
        fontSize: 11,
        color: '#555555',
    },
    dropdownList: {
        position: 'absolute',
        top: 46,
        left: 0,
        right: 0,
        borderWidth: 1.5,
        borderColor: '#E0E0E0',
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        elevation: 8,
        zIndex: 999,
    },
    dropdownItem: {
        paddingHorizontal: 14,
        paddingVertical: 12,
        borderBottomWidth: 0.5,
        borderBottomColor: '#F0F0F0',
    },
    dropdownItemActive: {
        backgroundColor: '#EEF2FF',
    },
    dropdownItemText: {
        fontSize: 14,
        color: '#444444',
    },
    dropdownItemTextActive: {
        color: Colors.primaryBlue,
        fontWeight: '600',
    },

    distTableHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F0F3FB',
        marginHorizontal: -16,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 0,
    },
    th: {
        fontFamily: FontFamily.primaryFont,
        fontWeight: '700',
        fontSize: 11,
        lineHeight: 11,
        letterSpacing: 0,
        color: '#1F232BCC',
        textTransform: 'uppercase',
    },
    poolGroup: {
        borderBottomWidth: 1,
        borderBottomColor: '#E8ECF4',
    },
    poolGroupLight: {
        backgroundColor: '#F7F9FF',
    },
    poolGroupWhite: {
        backgroundColor: '#FFFFFF',
    },
    distRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderBottomWidth: 0.5,
        borderBottomColor: '#F0F0F0',
    },
    poolNameText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#1A1A2E',
    },

    distHorizontalScroll: {
        marginHorizontal: -16,
    },

    distCellText: {
        fontSize: 13,
        color: '#374151',
        paddingRight: 12,
    },

    distStatusText: {
        fontSize: 13,
        fontWeight: '600',
        paddingRight: 12,
    },

    activeStatus: {
        color: '#16A34A',
    },
    actionCell: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },

    editIcon: {
        fontSize: 16,
    },

    deleteIcon: {
        fontSize: 16,
    },
});

export default DistributionsTab;