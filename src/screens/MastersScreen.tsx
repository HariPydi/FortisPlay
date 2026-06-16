import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ScreenLayout from '../components/layout/ScreenLayout';
import {Colors} from '../styles/colors';

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

const venueData: Venue[] = [
  {id: '1', sNo: 1, venueCode: 'KB1', venueName: 'KB1', venueClassification: 'Major', combined: 'N', status: 'Active'},
  {id: '2', sNo: 2, venueCode: 'KB2', venueName: 'KB2', venueClassification: 'Major', combined: 'N', status: 'Active'},
  {id: '3', sNo: 3, venueCode: 'KB3', venueName: 'KB3', venueClassification: 'Major', combined: 'N', status: 'Active'},
  {id: '4', sNo: 4, venueCode: 'LSC', venueName: 'LSC', venueClassification: 'Major', combined: 'N', status: 'Active'},
  {id: '5', sNo: 5, venueCode: 'LSC36', venueName: 'LSC36', venueClassification: 'Major', combined: 'N', status: 'Active'},
  {id: '6', sNo: 6, venueCode: 'LSS', venueName: 'LSS', venueClassification: 'Major', combined: 'N', status: 'Active'},
  {id: '7', sNo: 7, venueCode: 'LSS36', venueName: 'LSS36', venueClassification: 'Major', combined: 'N', status: 'Active'},
  {id: '8', sNo: 8, venueCode: 'SON', venueName: 'Scone (AUS)', venueClassification: 'Major', combined: 'No', status: 'Active'},
  {id: '9', sNo: 9, venueCode: 'SBY', venueName: 'Salisbury (UK)', venueClassification: 'Major', combined: 'No', status: 'Active'},
  {id: '10', sNo: 10, venueCode: 'YAR', venueName: 'Yarmouth (UK)', venueClassification: 'Major', combined: 'No', status: 'Active'},
];

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

const MastersScreen: React.FC<Props> = ({navigation}) => {
  const [activeTab, setActiveTab] = useState<string>('Venues');
  const [searchText, setSearchText] = useState<string>('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);

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
      if (newSelected.length === filteredData.length) {
        setSelectAll(true);
      }
    }
  };

  const Checkbox = ({checked, onPress}: {checked: boolean; onPress: () => void}) => (
    <TouchableOpacity
      style={[styles.checkbox, checked && styles.checkboxChecked]}
      onPress={onPress}
      activeOpacity={0.7}>
      {checked && <Text style={styles.checkmark}>✓</Text>}
    </TouchableOpacity>
  );

  return (
    <ScreenLayout
      navigation={navigation}
      activeScreen="Masters"
      breadcrumbs={['Dashboard', 'Masters']}>

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>

        <Text style={styles.pageTitle}>Masters</Text>

        {/* Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsRow}>
          {TABS.map(tab => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.tabActive]}
              onPress={() => {
                if (tab === 'Users KYC') {
                  navigation?.navigate('KYCPersonalInfo');
                } else {
                  setActiveTab(tab);
                }
              }}
              activeOpacity={0.8}>
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Venues Card */}
        {activeTab === 'Venues' && (
          <View style={styles.card}>

            {/* Card Header */}
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Venues</Text>
              <TouchableOpacity
                style={styles.createBtn}
                activeOpacity={0.8}
                onPress={() => navigation?.navigate('AddVenue')}>
                <Text style={styles.createBtnText}>+ Create New</Text>
              </TouchableOpacity>
            </View>

            {/* Search */}
            <View style={styles.searchContainer}>
              <Text style={styles.searchIcon}>🔍</Text>
              <TextInput
                style={styles.searchInput}
                placeholder="Search"
                placeholderTextColor="#AAAAAA"
                value={searchText}
                onChangeText={setSearchText}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            {/* Table - Horizontal Scroll */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginHorizontal: -16}}>
              <View>

                {/* Table Header */}
                <View style={styles.tableHeaderRow}>
                  <View style={{width: COL.check, alignItems: 'center'}}>
                    <Checkbox checked={selectAll} onPress={toggleSelectAll} />
                  </View>
                  <Text style={[styles.th, {width: COL.sno}]}>S.NO</Text>
                  <Text style={[styles.th, {width: COL.code}]}>VENUE CODE</Text>
                  <Text style={[styles.th, {width: COL.name}]}>VENUE NAME</Text>
                  <Text style={[styles.th, {width: COL.classification}]}>VENUE CLASSIFICATION</Text>
                  <Text style={[styles.th, {width: COL.combined}]}>COMBINED</Text>
                  <Text style={[styles.th, {width: COL.status}]}>STATUS</Text>
                </View>

                {/* Table Rows */}
                {filteredData.map((item, index) => (
                  <View key={item.id}>
                    <View style={[styles.tableRow, index % 2 === 0 && styles.tableRowEven]}>
                      <View style={{width: COL.check, alignItems: 'center'}}>
                        <Checkbox
                          checked={selectedIds.includes(item.id)}
                          onPress={() => toggleSelect(item.id)}
                        />
                      </View>
                      <Text style={[styles.cellText, {width: COL.sno, textAlign: 'center'}]}>{item.sNo}</Text>
                      <TouchableOpacity style={{width: COL.code}}>
                        <Text style={styles.linkText}>{item.venueCode}</Text>
                      </TouchableOpacity>
                      <Text style={[styles.cellText, {width: COL.name}]}>{item.venueName}</Text>
                      <Text style={[styles.cellText, {width: COL.classification}]}>{item.venueClassification}</Text>
                      <Text style={[styles.cellText, {width: COL.combined}]}>{item.combined}</Text>
                      <Text style={[styles.cellText, {width: COL.status}]}>{item.status}</Text>
                    </View>
                    {index < filteredData.length - 1 && <View style={styles.separator} />}
                  </View>
                ))}

              </View>
            </ScrollView>
          </View>
        )}

        {/* Other Tabs */}
        {activeTab !== 'Venues' && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{activeTab}</Text>
            <Text style={{color: Colors.textGrey, marginTop: 12}}>
              {activeTab} content goes here...
            </Text>
          </View>
        )}

        <View style={{height: 30}} />
      </ScrollView>

    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  scroll: {flex: 1},
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
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.textDark,
  },
  createBtn: {
    backgroundColor: Colors.primaryBlue,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 9,
  },
  createBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F6FB',
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 14,
    height: 44,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: Colors.textDark,
    height: 44,
  },

  // Table
  tableHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F3FB',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
  },
  tableRowEven: {
    backgroundColor: '#FAFBFF',
  },
  separator: {
    height: 1,
    backgroundColor: '#F0F0F0',
  },

  th: {
    fontSize: 11,
    fontWeight: '700',
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  cellText: {
    fontSize: 13,
    color: Colors.textDark,
  },
  linkText: {
    color: Colors.primaryBlue,
    fontSize: 13,
    fontWeight: '500',
  },

  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#C0C0C0',
    backgroundColor: '#FFFFFF',
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
});

export default MastersScreen;