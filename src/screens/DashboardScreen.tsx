import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image
} from 'react-native';
import ScreenLayout from '../components/layout/ScreenLayout';
import MasterDataModal from '../components/modals/MasterDataModal';
import { Colors } from '../styles/colors';
import AppBreadcrumb from '../components/common/AppBreadcrumb';
import PageHeader from '../components/common/PageHeader';

type Props = {
  navigation?: any;
};

type ChipStatus = 'red' | 'green';
type RaceChip = { time: string; status: ChipStatus } | null;
type HorseRow = { venue: string; races: RaceChip[] };
type MeetingRow = { name: string; draws: RaceChip[] };

const horseData: HorseRow[] = [
  {
    venue: 'Doomben (AUS)',
    races: [
      { time: '10:35', status: 'red' },
      { time: '11:10', status: 'red' },
      { time: '11:45', status: 'red' },
      { time: '12:20', status: 'red' },
      { time: '12:25', status: 'red' },

    ],
  },
  {
    venue: 'Randwick (AUS)',
    races: [
      { time: '10:55', status: 'red' },
      { time: '11:30', status: 'red' },
      { time: '12:05', status: 'red' },
      { time: '12:40', status: 'red' },
      { time: '12:45', status: 'red' },
    ],
  },
  {
    venue: 'Yarmouth (UK)',
    races: [
      { time: '18:10', status: 'red' },
      { time: '18:40', status: 'red' },
      { time: '19:10', status: 'green' },
      { time: '19:45', status: 'green' },
      { time: '19:50', status: 'green' },
      { time: '19:55', status: 'green' },
    ],
  },
];

const karambolaData: MeetingRow[] = [
  {
    name: 'Meeting 1 @ 13:00',
    draws: [
      { time: '13:00', status: 'red' },
      { time: '13:05', status: 'red' },
      { time: '13:10', status: 'red' },
      { time: '13:15', status: 'red' },
    ],
  },
  {
    name: 'Meeting 2 @ 15:00',
    draws: [
      { time: '15:00', status: 'red' },
      { time: '15:05', status: 'red' },
      { time: '15:10', status: 'red' },
      { time: '15:15', status: 'red' },
    ],
  },
  {
    name: 'Meeting 3 @ 19:00',
    draws: [
      { time: '19:00', status: 'green' },
      { time: '19:05', status: 'green' },
      { time: '19:10', status: 'green' },
      { time: '19:15', status: 'green' },
    ],
  },
];

const luckySignData: MeetingRow[] = [
  { name: 'Meeting 1 @ 13:00', draws: [{ time: '13:35', status: 'red' }, null, null] },
  { name: 'Meeting 2 @ 15:00', draws: [{ time: '15:00', status: 'red' }, null, null] },
  { name: 'Meeting 3 @ 19:00', draws: [{ time: '19:00', status: 'green' }, null, null] },
];

const TABS = ['All', 'Horse Racing', 'Karambola', 'Lucky Sign'];

const CHIP_W = 68;
const VENUE_W = 110;
const MEETING_W = 130;
const ROW_H = 44;
const HEADER_H = 36;

// Single Chip
const Chip = ({ chip }: { chip: RaceChip }) => {
  if (!chip) {
    return (
      <View style={styles.chipSlot}>
        <Text style={styles.dashCell}>-</Text>
      </View>
    );
  }
  return (
    <View style={styles.chipSlot}>
      <View
        style={[
          styles.chip,
          {
            backgroundColor:
              chip.status === 'green' ? Colors.chipGreen : Colors.chipRed,
          },
        ]}>
        <Text style={styles.chipText}>{chip.time}</Text>
      </View>
    </View>
  );
};

// Horse Racing Table - Left VENUE fixed, Right chips scroll
const HorseRacingTable = ({ data }: { data: HorseRow[] }) => {
  const maxRaces = Math.max(...data.map(r => r.races.length), 0);
  const headers = Array.from({ length: maxRaces }, (_, i) => `RACE ${i + 1}`);

  return (
    <View style={styles.tableWrapper}>

      {/* LEFT - VENUE fixed */}
      <View style={{ width: VENUE_W }}>
        <View style={styles.fixedHeaderCell}>
          <Text style={styles.th}>VENUE</Text>
        </View>
        {data.map((row, i) => (
          <View key={i} style={[styles.fixedDataCell, { width: VENUE_W }]}>
            <Text style={styles.cellLabel} numberOfLines={2}>{row.venue}</Text>
          </View>
        ))}
      </View>

      {/* RIGHT - chips scroll */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View>
          <View style={styles.scrollHeaderRow}>
            {headers.map(h => (
              <Text key={h} style={[styles.th, { width: CHIP_W, textAlign: 'center' }]}>{h}</Text>
            ))}
          </View>
          {data.map((row, i) => (
            <View key={i} style={styles.scrollDataRow}>
              {row.races.map((chip, j) => (
                <Chip key={j} chip={chip} />
              ))}
              {Array.from({ length: maxRaces - row.races.length }).map((_, k) => (
                <Chip key={`e-${k}`} chip={null} />
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

// Meeting Table - Left MEETING fixed, Right chips scroll
const MeetingTable = ({ data }: { data: MeetingRow[] }) => {
  const maxDraws = Math.max(...data.map(r => r.draws.length), 0);
  const headers = Array.from({ length: maxDraws }, (_, i) => `DRAW ${i + 1}`);

  return (
    <View style={styles.tableWrapper}>

      {/* LEFT - MEETING fixed */}
      <View style={{ width: MEETING_W }}>
        <View style={styles.fixedHeaderCell}>
          <Text style={styles.th}>MEETING</Text>
        </View>
        {data.map((row, i) => (
          <View key={i} style={styles.fixedDataCell}>
            <Text style={styles.cellLabel} numberOfLines={2}>{row.name}</Text>
          </View>
        ))}
      </View>

      {/* RIGHT - chips scroll */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View>
          <View style={styles.scrollHeaderRow}>
            {headers.map((h, i) => (
              <Text key={i} style={[styles.th, { width: CHIP_W, textAlign: 'center' }]}>{h}</Text>
            ))}
          </View>
          {data.map((row, i) => (
            <View key={i} style={styles.scrollDataRow}>
              {row.draws.map((chip, j) => (
                <Chip key={j} chip={chip} />
              ))}
              {Array.from({ length: maxDraws - row.draws.length }).map((_, k) => (
                <Chip key={`e-${k}`} chip={null} />
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const DashboardScreen: React.FC<Props> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState<string>('All');
  const [masterModal, setMasterModal] = useState<boolean>(false);

  const openMaster = () => setMasterModal(true);
  const closeMaster = () => setMasterModal(false);

  const showHorse = activeTab === 'All' || activeTab === 'Horse Racing';
  const showKarambola = activeTab === 'All' || activeTab === 'Karambola';
  const showLucky = activeTab === 'All' || activeTab === 'Lucky Sign';

  return (
    <ScreenLayout
      navigation={navigation}
      activeScreen="Dashboard">

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>

        <AppBreadcrumb crumbs={['Control Center', 'Dashboard']} />

        <PageHeader
          title="Live Events"
          tabs={TABS}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onRefresh={() => {
            console.log('refresh');
          }}
        />

        {/* Horse Racing */}
        <View style={styles.cardWrapper}>
          {showHorse && (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Horse Racing</Text>
                <TouchableOpacity style={styles.createBtn}>
                  <Image
                    source={require('../assets/icons/PlusIcon.png')}
                    style={styles.plusIcon}
                    resizeMode="contain"
                  />
                  <Text style={styles.createBtnText}>Create Race Card</Text>
                </TouchableOpacity>
              </View>
              {horseData.length === 0 ? (
                <View style={styles.noDataContainer}>
                  <Text style={styles.noDataText}>
                    The <Text style={styles.masterData}>Master Data</Text> setup required before creating race cards
                  </Text>
                </View>
              ) : (
                <HorseRacingTable data={horseData} />
              )}
            </View>
          )}

          {/* Karambola */}
          {showKarambola && (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Karambola</Text>
                <TouchableOpacity style={styles.createBtn} onPress={openMaster}>
                  <Image
                    source={require('../assets/icons/PlusIcon.png')}
                    style={styles.plusIcon}
                    resizeMode="contain"
                  />
                  <Text style={styles.createBtnText}>Create Meeting</Text>
                </TouchableOpacity>
              </View>
              {karambolaData.length === 0 ? (
                <View style={styles.noDataContainer}>
                  <Text style={styles.noDataText}>No draws scheduled for today.</Text>
                </View>
              ) : (
                <MeetingTable data={karambolaData} />
              )}
            </View>
          )}

          {/* Lucky Sign */}
          {showLucky && (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Lucky Sign</Text>
                <TouchableOpacity style={styles.createBtn}>
                  <Image
                    source={require('../assets/icons/PlusIcon.png')}
                    style={styles.plusIcon}
                    resizeMode="contain"
                  />
                  <Text style={styles.createBtnText}>Create Meeting</Text>
                </TouchableOpacity>
              </View>
              {luckySignData.length === 0 ? (
                <View style={styles.noDataContainer}>
                  <Text style={styles.noDataText}>No draws scheduled for today.</Text>
                </View>
              ) : (
                <MeetingTable data={luckySignData} />
              )}
            </View>
          )}
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>

      <MasterDataModal
        visible={masterModal}
        onClose={closeMaster}
        onGoToMasters={() => { closeMaster(); }}
      />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 16, paddingTop: 16 },

  cardWrapper: {
    paddingTop: 16,
    gap: 16
  },
  card: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.1)',
    paddingVertical: 16,
    paddingHorizontal: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  cardTitle: {
    fontFamily: 'Manrope',
    fontSize: 17,
    fontWeight: '700',
    lineHeight: 25,
    letterSpacing: 0,
    color: Colors.textDark
  },
  createBtn: {
    backgroundColor: Colors.createButton,
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
    fontFamily: 'Manrope',
    color: Colors.createButtonText,
    fontSize: 11,
    fontWeight: '700',
    lineHeight: 16,
    letterSpacing: 0,
  },

  // Table
  // Left Fixed Column


  // Right Scrollable
  scrollableCols: { flex: 1 },
  scrollHeaderRow: {
    height: HEADER_H,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF3FF',
  },
  scrollDataRow: {
    height: ROW_H,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#F0F0F0',
  },

  th: {
    fontFamily: 'Manrope',
    fontSize: 10,
    lineHeight: 15,
    fontWeight: '700',
    letterSpacing: 0.55,
    color: 'rgba(31, 35, 43, 0.8)',
    textTransform: 'uppercase',
  },

  chipSlot: {
    width: CHIP_W,
    alignItems: 'center',
    paddingHorizontal: 2,
  },
  chip: {
    minWidth: 52,
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipText: {
    fontFamily: 'Manrope',
    color: Colors.chipText,
    fontSize: 11,
    fontWeight: '700',
    lineHeight: 16,
    letterSpacing: 0,
  },
  dashCell: {
    fontFamily: 'Manrope',
    fontSize: 13,
    lineHeight: 19,
    fontWeight: '700',
    letterSpacing: 0,
    color: Colors.textDark,
    textAlign: 'center'
  },

  noDataContainer: { paddingVertical: 16, alignItems: 'center' },
  noDataText: { color: '#2a252590', textAlign: 'center' },
  masterData: { color: '#2837d8ff', textDecorationLine: 'underline' },
  tableWrapper: {
    flexDirection: 'row',
    marginHorizontal: -16,
  },
  fixedHeaderCell: {
    height: 36,
    backgroundColor: 'rgba(37, 99, 255, 0.1)',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  fixedDataCell: {
    height: 44,
    justifyContent: 'center',
    paddingHorizontal: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#F0F0F0',
  },
  cellLabel: {
    fontFamily: 'Manrope',
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '700',
    letterSpacing: 0,
    color: Colors.textDark,
  },
});

export default DashboardScreen;