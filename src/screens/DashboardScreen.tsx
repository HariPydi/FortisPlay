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
        <Text style={styles.dashCell}>—</Text>
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
          <View key={i} style={styles.fixedDataCell}>
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
      activeScreen="Dashboard"
      breadcrumbs={['Control Center', 'Dashboard']}>

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>

        <Text style={styles.pageTitle}>Live Events</Text>

        {/* Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsRow}>
          {TABS.map(tab => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.tabActive]}
              onPress={() => setActiveTab(tab)}
              activeOpacity={0.8}>
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Legend */}
        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.dot, { backgroundColor: Colors.dotGreen }]} />
            <Text style={styles.legendText}>Betting in Progress</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.dot, { backgroundColor: Colors.dotRed }]} />
            <Text style={styles.legendText}>Betting Stopped</Text>
          </View>
          <TouchableOpacity style={styles.refreshBtn}>
            <Image
              source={require('../assets/icons/RefreshIcon.png')}
              style={styles.refreshIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* Horse Racing */}
        {showHorse && (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Horse Racing</Text>
              <TouchableOpacity style={styles.createBtn}>
                <Text style={styles.createBtnText}>+ Create Race Card</Text>
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
                <Text style={styles.createBtnText}>+ Create Meeting</Text>
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
                <Text style={styles.createBtnText}>+ Create Meeting</Text>
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

  pageTitle: {
    fontFamily: 'Manrope',
    fontSize: 22,
    fontWeight: '800',
    color: '#1F232B',
    lineHeight: 36,
    letterSpacing: -0.75,
    marginBottom: 14,
  },

  tabsRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(248, 250, 247, 0.8)',
    borderTopWidth: 0.57,
    borderTopColor: '#F1F5F9',
    gap: 4,
    paddingTop: 2,
    paddingBottom: 2,
    marginBottom: 14,
    paddingRight: 4
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 7
  },
  tabActive: {
    borderRadius: 20,
    backgroundColor: '#1F232B',
  },
  tabText: {
    fontFamily: 'Manrope',
    fontSize: 13,
    fontWeight: '700',
    color: 'rgba(31, 35, 43, 0.8)',
    lineHeight: 20,
    letterSpacing: -0.4,
  },
  tabTextActive: { color: '#FFFFFF' },

  legend: { flexDirection: 'row', alignItems: 'center', marginBottom: 14, gap: 14 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  dot: { width: 9, height: 9, borderRadius: 5 },
  legendText: { fontSize: 12, color: Colors.textGrey },
  refreshBtn: {
    marginLeft: 'auto',
    padding: 6,
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 2,
    borderColor: '#2563FF',
    borderRadius: 10,
  },
  refreshIcon: {
    width: 15,
    height: 15,
  },

  card: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 14,
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 16,
    marginBottom: 14,
    overflow: 'hidden',
    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,

    // Android Shadow
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  cardTitle: { fontSize: 16, fontWeight: '700', color: Colors.textDark },
  createBtn: {
    backgroundColor: Colors.createButton,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  createBtnText: { color: Colors.createButtonText, fontSize: 12, fontWeight: '600' },

  // Table
  tableWrapper: {
    flexDirection: 'row',
    marginHorizontal: -16,
  },

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
    color: Colors.thText,
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },

  chipSlot: {
    width: CHIP_W,
    alignItems: 'center',
    paddingHorizontal: 2,
  },
  chip: {
    width: CHIP_W - 25,
    paddingVertical: 7,
    borderRadius: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipText: { color: Colors.chipText, fontSize: 11, fontWeight: '700' },
  dashCell: { fontSize: 13, color: Colors.dashCell, textAlign: 'center' },

  noDataContainer: { paddingVertical: 16, alignItems: 'center' },
  noDataText: { color: '#2a252590', textAlign: 'center' },
  masterData: { color: '#2837d8ff', textDecorationLine: 'underline' },
  tableWrapper: {
    flexDirection: 'row',
    marginHorizontal: -16,
  },
  fixedHeaderCell: {
    height: 36,
    backgroundColor: '#EEF3FF',
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
    fontSize: 12,
    color: Colors.venueText,
    fontWeight: '500',
  },
});

export default DashboardScreen;