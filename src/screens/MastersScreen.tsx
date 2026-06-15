import React, {useState} from 'react';
import {
  FlatList,
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
};

const venueData: Venue[] = [
  {id: '1', sNo: 1, venueCode: 'KB1', venueName: 'KB1', venueClassification: 'Major'},
  {id: '2', sNo: 2, venueCode: 'KB2', venueName: 'KB2', venueClassification: 'Major'},
  {id: '3', sNo: 3, venueCode: 'KB3', venueName: 'KB3', venueClassification: 'Major'},
  {id: '4', sNo: 4, venueCode: 'LSC', venueName: 'LSC', venueClassification: 'Major'},
  {id: '5', sNo: 5, venueCode: 'LSC36', venueName: 'LSC36', venueClassification: 'Major'},
  {id: '6', sNo: 6, venueCode: 'LSS', venueName: 'LSS', venueClassification: 'Major'},
  {id: '7', sNo: 7, venueCode: 'LSS36', venueName: 'LSS36', venueClassification: 'Major'},
  {id: '8', sNo: 8, venueCode: 'SON', venueName: 'Scone (AUS)', venueClassification: 'Major'},
  {id: '9', sNo: 9, venueCode: 'SBY', venueName: 'Salisbury (UK)', venueClassification: 'Major'},
  {id: '10', sNo: 10, venueCode: 'YAR', venueName: 'Yarmouth (UK)', venueClassification: 'Major'},
];

const TABS = ['Venues', 'Pools', 'LS Prize', 'Distributions'];

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

  const renderRow = ({item}: {item: Venue}) => (
    <View style={styles.tableRow}>
      <View style={styles.colCheck}>
        <Checkbox
          checked={selectedIds.includes(item.id)}
          onPress={() => toggleSelect(item.id)}
        />
      </View>
      <Text style={styles.colSno}>{item.sNo}</Text>
      <TouchableOpacity style={styles.colCode}>
        <Text style={styles.linkText}>{item.venueCode}</Text>
      </TouchableOpacity>
      <Text style={styles.colName}>{item.venueName}</Text>
      <Text style={styles.colClass}>{item.venueClassification}</Text>
    </View>
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
              onPress={() => setActiveTab(tab)}
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

            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Venues</Text>
              <TouchableOpacity
                style={styles.createBtn}
                activeOpacity={0.8}
                onPress={() => navigation?.navigate('AddVenue')}>
                <Text style={styles.createBtnText}>+ Create New</Text>
              </TouchableOpacity>
            </View>

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

            <View style={styles.tableHeaderRow}>
              <View style={styles.colCheck}>
                <Checkbox checked={selectAll} onPress={toggleSelectAll} />
              </View>
              <Text style={[styles.colSno, styles.th]}>S.NO</Text>
              <Text style={[styles.colCode, styles.th]}>VENUE{'\n'}CODE</Text>
              <Text style={[styles.colName, styles.th]}>VENUE{'\n'}NAME</Text>
              <Text style={[styles.colClass, styles.th]}>VENUE{'\n'}CLASSIFIC...</Text>
            </View>

            <FlatList
              data={filteredData}
              keyExtractor={item => item.id}
              renderItem={renderRow}
              scrollEnabled={false}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
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

  tableHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F3FB',
    marginHorizontal: -16,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 4,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  separator: {
    height: 1,
    backgroundColor: '#F0F0F0',
  },

  colCheck: {
    width: 36,
    alignItems: 'center',
  },
  colSno: {
    width: 40,
    fontSize: 13,
    color: Colors.textDark,
    textAlign: 'center',
  },
  colCode: {
    flex: 1,
    fontSize: 13,
  },
  colName: {
    flex: 1.2,
    fontSize: 13,
    color: Colors.textDark,
  },
  colClass: {
    flex: 1.2,
    fontSize: 13,
    color: Colors.textDark,
  },
  th: {
    fontSize: 11,
    fontWeight: '700',
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
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