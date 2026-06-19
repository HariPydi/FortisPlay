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
import { venueData, Venue } from '../../../data/dummyData';
import Checkbox from '../../../components/common/Checkbox';

type Props = {
    navigation: any;
};

const COL = {
    check: 36,
    sno: 44,
    code: 90,
    name: 120,
    classification: 140,
    combined: 90,
    status: 80,
};

const VenuesTab: React.FC<Props> = ({ navigation }) => {
    const [searchText, setSearchText] = useState<string>('');
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [selectAll, setSelectAll] = useState<boolean>(false);

    const filteredData: Venue[] = venueData.filter(
        item =>
            item.venueCode.toLowerCase().includes(searchText.toLowerCase()) ||
            item.venueName.toLowerCase().includes(searchText.toLowerCase()),
    );

    const toggleSelectAll = (): void => {
        if (selectAll) {
            setSelectedIds([]);
            setSelectAll(false);
        } else {
            setSelectedIds(filteredData.map(item => item.id));
            setSelectAll(true);
        }
    };

    const toggleSelect = (id: string): void => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(i => i !== id));
            setSelectAll(false);
        } else {
            const newSelected = [...selectedIds, id];
            setSelectedIds(newSelected);
            if (newSelected.length === filteredData.length) setSelectAll(true);
        }
    };

    return (
        <View style={styles.card}>
            <View style={styles.cardHeaderContainer}>
                <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>Venues</Text>
                    <TouchableOpacity
                        style={styles.createBtn}
                        activeOpacity={0.8}
                        onPress={() => navigation?.navigate('AddVenue')}>
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

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginHorizontal: -16 }}>
                <View>
                    <View style={styles.tableHeaderRow}>
                        <View style={{ width: COL.check, alignItems: 'center' }}>
                            <Checkbox checked={selectAll} onPress={toggleSelectAll} />
                        </View>
                        <Text style={[styles.th, { width: COL.sno }]}>S.NO</Text>
                        <Text style={[styles.th, { width: COL.code }]}>VENUE CODE</Text>
                        <Text style={[styles.th, { width: COL.name }]}>VENUE NAME</Text>
                        <Text style={[styles.th, { width: COL.classification }]}>VENUE CLASSIFICATION</Text>
                        <Text style={[styles.th, { width: COL.combined }]}>COMBINED</Text>
                        <Text style={[styles.th, { width: COL.status }]}>STATUS</Text>
                    </View>

                    {filteredData.map((item, index) => (
                        <View key={item.id}>
                            <View style={[styles.tableRow, index % 2 === 0 && styles.tableRowEven]}>
                                <View style={{ width: COL.check, alignItems: 'center' }}>
                                    <Checkbox
                                        checked={selectedIds.includes(item.id)}
                                        onPress={() => toggleSelect(item.id)}
                                    />
                                </View>
                                <Text style={[styles.cellText, { width: COL.sno, textAlign: 'center' }]}>{item.sNo}</Text>
                                <TouchableOpacity style={{ width: COL.code }}>
                                    <Text style={styles.linkText}>{item.venueCode}</Text>
                                </TouchableOpacity>
                                <Text style={[styles.cellText, { width: COL.name }]}>{item.venueName}</Text>
                                <Text style={[styles.cellText, { width: COL.classification }]}>{item.venueClassification}</Text>
                                <Text style={[styles.cellText, { width: COL.combined }]}>{item.combined}</Text>
                                <Text style={[styles.cellText, { width: COL.status }]}>{item.status}</Text>
                            </View>
                            {index < filteredData.length - 1 && <View style={styles.separator} />}
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

    // Venue Table
    tableHeaderRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2563FF14',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 0.57,
        borderBlockColor: '#EAEEF2',
    },
    tableRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 14,
        backgroundColor: '#F1F4F7',
        borderBottomWidth: 0.57,
        borderBottomColor: '#F1F4F7'
    },
    tableRowEven: {
        backgroundColor: '#FFFFFF',
    },
    separator: {
        height: 1,
        backgroundColor: '#F0F0F0',
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
    cellText: {
        fontFamily: FontFamily.primaryFont,
        fontWeight: '500',
        lineHeight: 19.5,
        letterSpacing: 0,
        color: '#1F232B99',
        fontSize: 13,
    },
    linkText: {
        fontFamily: FontFamily.primaryFont,
        color: Colors.primaryBlue,
        fontSize: 13,
        fontWeight: '500',
        lineHeight: 19.5,
        letterSpacing: 0,
    },
});

export default VenuesTab;