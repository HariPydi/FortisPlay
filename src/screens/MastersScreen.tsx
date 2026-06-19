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
import ScreenLayout from '../components/layout/ScreenLayout';
import { Colors, FontFamily } from '../styles/colors';
import AppBreadcrumb from '../components/common/AppBreadcrumb';
import PageHeader from '../components/common/PageHeader';

type Props = {
  navigation?: any;
};

type Venue = {
  id: string;
  sNo: number;
  venueCode: string;
  venueName: string;
  venueClassification: string;
  combined: string;
  status: string;
};

type Distribution = {
  distributionName: string;
  distributionType: string;
  salesCode: string;
  percentage: number;
  status: string;
};

type Pool = {
  poolName: string;
  distributions: Distribution[];
};

const venueData: Venue[] = [
  { id: '1', sNo: 1, venueCode: 'KB1', venueName: 'KB1', venueClassification: 'Major', combined: 'N', status: 'Active' },
  { id: '2', sNo: 2, venueCode: 'KB2', venueName: 'KB2', venueClassification: 'Major', combined: 'N', status: 'Active' },
  { id: '3', sNo: 3, venueCode: 'KB3', venueName: 'KB3', venueClassification: 'Major', combined: 'N', status: 'Active' },
  { id: '4', sNo: 4, venueCode: 'LSC', venueName: 'LSC', venueClassification: 'Major', combined: 'N', status: 'Active' },
  { id: '5', sNo: 5, venueCode: 'LSC36', venueName: 'LSC36', venueClassification: 'Major', combined: 'N', status: 'Active' },
  { id: '6', sNo: 6, venueCode: 'LSS', venueName: 'LSS', venueClassification: 'Major', combined: 'N', status: 'Active' },
  { id: '7', sNo: 7, venueCode: 'LSS36', venueName: 'LSS36', venueClassification: 'Major', combined: 'N', status: 'Active' },
  { id: '8', sNo: 8, venueCode: 'SON', venueName: 'Scone (AUS)', venueClassification: 'Major', combined: 'No', status: 'Active' },
  { id: '9', sNo: 9, venueCode: 'SBY', venueName: 'Salisbury (UK)', venueClassification: 'Major', combined: 'No', status: 'Active' },
  { id: '10', sNo: 10, venueCode: 'YAR', venueName: 'Yarmouth (UK)', venueClassification: 'Major', combined: 'No', status: 'Active' },
];

const poolData: Pool[] = [
  {
    poolName: 'Win',
    distributions: [
      { distributionName: 'Club Commission', distributionType: 'Commission', salesCode: 'FEE_CC_PRCT', percentage: 0, status: 'Active' },
      { distributionName: 'GST', distributionType: 'Tax', salesCode: 'TAX_BT_PRCT', percentage: 0, status: 'Active' },
      { distributionName: 'SGST', distributionType: 'Tax', salesCode: 'TAX_SGST_PRCT', percentage: 0, status: 'Active' },
      { distributionName: 'CGST', distributionType: 'Tax', salesCode: 'TAX_CGST_PRCT', percentage: 0, status: 'Active' },
    ],
  },
  {
    poolName: 'Second Horse Pool',
    distributions: [
      { distributionName: 'Club Commission', distributionType: 'Commission', salesCode: 'FEE_CC_PRCT', percentage: 0, status: 'Active' },
      { distributionName: 'GST', distributionType: 'Tax', salesCode: 'TAX_BT_PRCT', percentage: 0, status: 'Active' },
      { distributionName: 'SGST', distributionType: 'Tax', salesCode: 'TAX_SGST_PRCT', percentage: 0, status: 'Active' },
      { distributionName: 'CGST', distributionType: 'Tax', salesCode: 'TAX_CGST_PRCT', percentage: 0, status: 'Active' },
    ],
  },
  {
    poolName: 'Place',
    distributions: [
      { distributionName: 'Club Commission', distributionType: 'Commission', salesCode: 'FEE_CC_PRCT', percentage: 0, status: 'Active' },
      { distributionName: 'GST', distributionType: 'Tax', salesCode: 'TAX_BT_PRCT', percentage: 0, status: 'Active' },
      { distributionName: 'SGST', distributionType: 'Tax', salesCode: 'TAX_SGST_PRCT', percentage: 0, status: 'Active' },
      { distributionName: 'CGST', distributionType: 'Tax', salesCode: 'TAX_CGST_PRCT', percentage: 0, status: 'Active' },
    ],
  },
];

const venueOptions = ['KB1', 'KB2', 'KB3', 'LSC', 'LSC36', 'LSS'];
const TABS = ['Venues', 'Pools', 'LS Prize', 'Distributions', 'Enclosures', 'Terminals', 'Users', 'Users KYC', 'Locations'];

const COL = {
  check: 36,
  sno: 44,
  code: 90,
  name: 120,
  classification: 140,
  combined: 90,
  status: 80,
};
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

const MastersScreen: React.FC<Props> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState<string>('Venues');
  const [searchText, setSearchText] = useState<string>('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [selectedVenue, setSelectedVenue] = useState<string>('KB1');
  const [showVenueDropdown, setShowVenueDropdown] = useState<boolean>(false);
  const [showSearch, setShowSearch] = useState(false);

  const filteredData = venueData.filter(
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

  const Checkbox = ({ checked, onPress }: { checked: boolean; onPress: () => void }) => (
    <TouchableOpacity
      style={[styles.checkbox, checked && styles.checkboxChecked]}
      onPress={onPress}
      activeOpacity={0.7}>
      {checked && <Text style={styles.checkmark}>✓</Text>}
    </TouchableOpacity>
  );

  const getPageCrumbs = (tab: string): string[] => {
    switch (tab) {
      case 'Venues':
        return ['Dashboard', 'Masters'];

      case 'Pools':
        return ['Dashboard', 'Masters', 'Pools'];

      case 'LS Prize':
        return ['Dashboard', 'Masters', 'LS Prize'];

      case 'Distributions':
        return ['Dashboard', 'Masters', 'Distributions'];

      case 'Enclosures':
        return ['Dashboard', 'Masters', 'Enclosures'];

      case 'Terminals':
        return ['Dashboard', 'Masters', 'Terminals'];

      case 'Users':
        return ['Dashboard', 'Masters', 'Users'];

      case 'Users KYC':
        return ['Dashboard', 'Masters', 'Users KYC'];

      case 'Locations':
        return ['Dashboard', 'Masters', 'Locations'];

      default:
        return ['Dashboard', 'Masters'];
    }
  };

  return (
    <ScreenLayout
      navigation={navigation}
      activeScreen="Masters"
    >

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>

        <AppBreadcrumb crumbs={getPageCrumbs(activeTab)} />

        <PageHeader
          title="Masters"
          tabs={TABS}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onRefresh={() => {
            console.log('refresh');
          }}
        />

        {/* ── VENUES TAB ── */}
        {activeTab === 'Venues' && (
          <View style={styles.card}>
            <View style={styles.cardHeaderContainer}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Venues</Text>
                <TouchableOpacity
                  style={styles.createBtn}
                  activeOpacity={0.8}
                  onPress={() => navigation?.navigate('AddVenue')}>
                  <Image
                    source={require('../assets/icons/PlusIcon.png')}
                    style={styles.plusIcon}
                    resizeMode="contain"
                  />
                  <Text style={styles.createBtnText}>Create New</Text>
                </TouchableOpacity>
              </View>


              <View style={styles.searchContainer}>
                <Image
                  source={require('../assets/icons/search-lg.png')}
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
        )}

        {/* ── DISTRIBUTIONS TAB ── */}
        {activeTab === 'Distributions' && (
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
        )}

        {/* ── USERS KYC TAB ── */}
        {activeTab === 'Users KYC' && (
          <View style={styles.card}>
            <View style={styles.cardHeaderContainer}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Users KYC</Text>
                <TouchableOpacity
                  style={styles.createBtn}
                  activeOpacity={0.8}
                  onPress={() => navigation?.navigate('KYCPersonalInfo')}>
                  <Image
                    source={require('../assets/icons/PlusIcon.png')}
                    style={styles.plusIcon}
                    resizeMode="contain"
                  />
                  <Text style={styles.createBtnText}>Create New</Text>
                </TouchableOpacity>
              </View>


              <View style={styles.searchContainer}>
                <Image
                  source={require('../assets/icons/search-lg.png')}
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
        )}

        {/* ── OTHER TABS ── */}
        {activeTab !== 'Venues' && activeTab !== 'Distributions' && activeTab !== 'Users KYC' && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{activeTab}</Text>
            <Text style={{ color: Colors.textGrey, marginTop: 12 }}>
              {activeTab} content goes here...
            </Text>
          </View>
        )}

        <View style={{ height: 30 }} />
      </ScrollView>

    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },

  pageTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.textDark,
    marginBottom: 16,
  },

  tabsRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 16,
    paddingRight: 8,
  },
  tab: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 24,
    backgroundColor: 'transparent',
  },
  tabActive: {
    backgroundColor: '#1A1A2E',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555555',
  },
  tabTextActive: {
    color: '#FFFFFF',
  },

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
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 3,
    borderWidth: 1.71,
    borderColor: '#1F232B4D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: Colors.primaryBlue,
    borderColor: Colors.primaryBlue,
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
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

export default MastersScreen;