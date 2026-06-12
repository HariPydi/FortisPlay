import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import { Colors } from '../styles/colors';
import Sidebar from '../components/Sidebar';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import MasterDataModal from '../components/modals/MasterDataModal'

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

// const horseData: HorseRow[] = []

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

// const karambolaData: MeetingRow[] = []

const luckySignData: MeetingRow[] = [
  { name: 'Meeting 1 @ 13:00', draws: [{ time: '13:35', status: 'red' }, null, null] },
  { name: 'Meeting 2 @ 15:00', draws: [{ time: '15:00', status: 'red' }, null, null] },
  { name: 'Meeting 3 @ 19:00', draws: [{ time: '19:00', status: 'green' }, null, null] },
];

const TABS = ['All', 'Horse Racing', 'Karambola', 'Lucky Sign'];

const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_PADDING = 16;       // card horizontal padding each side
const PAGE_PADDING = 16;       // page horizontal padding each side
const CARD_INNER = SCREEN_WIDTH - PAGE_PADDING * 2 - CARD_PADDING * 2;

// Horse Racing: venue=100, 4 chips share the rest
const VENUE_W = 100;
const HORSE_CHIP_W = Math.floor((CARD_INNER - VENUE_W) / 4);

// Karambola / Lucky Sign: meeting=130, 3 chips share the rest
const MEETING_W = 130;
const DRAW_CHIP_W = Math.floor((CARD_INNER - MEETING_W) / 3);

const Chip = ({ chip, width }: { chip: RaceChip; width: number }) => {
  if (!chip) {
    return (
      <View style={{ width, alignItems: 'center' }}>
        <Text style={styles.dashCell}>—</Text>
      </View>
    );
  }
  return (
    <View style={{ width, alignItems: 'center', paddingHorizontal: 2 }}>
      <View
        style={[
          styles.chip,
          {
            width: width - 4,
            backgroundColor:
              chip.status === 'green' ? Colors.chipGreen : Colors.chipRed,
          },
        ]}>
        <Text style={styles.chipText}>{chip.time}</Text>
      </View>
    </View>
  );
};

const DashboardScreen: React.FC<Props> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState<string>('All');
  const [sidebarVisible, setSidebarVisible] = useState<boolean>(false);
  const [masterModal, setMasterModal] = useState<boolean>(false);   // ← add

  const openMaster = () => setMasterModal(true);    // ← add
  const closeMaster = () => setMasterModal(false);  // ← add

  const showHorse = activeTab === 'All' || activeTab === 'Horse Racing';
  const showKarambola = activeTab === 'All' || activeTab === 'Karambola';
  const showLucky = activeTab === 'All' || activeTab === 'Lucky Sign';

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.headerBackground} />
      {/* ── Sidebar ── */}
      <Sidebar
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
        navigation={navigation}
        activeScreen="Dashboard"
      />

      {/* ── Header ── */}
      <View style={styles.header}>
        <View style={styles.logoRow}>
          <TouchableOpacity onPress={() => setSidebarVisible(true)}>
            <Text style={{ fontSize: 20 }}>☰</Text>
          </TouchableOpacity>
          <View style={styles.logoBox}>
            <Text style={styles.logoLetter}>F</Text>
          </View>
          <Text style={styles.brandName}>FortisPlay</Text>
        </View>
        <View style={styles.headerRight}>
          <Text style={styles.userId}>123456 | </Text>
          <View style={styles.avatar}>
            <Text style={styles.avatarIcon}>👤</Text>
          </View>
          <Text style={styles.chevron}>▾</Text>
        </View>
      </View>

      {/* ── Breadcrumb ── */}
      <View style={styles.breadcrumb}>
        <Text style={styles.breadcrumbText}>Control Center › Dashboard</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>

        <Text style={styles.pageTitle}>Live Events</Text>

        {/* ── Tabs ── */}
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

        {/* ── Legend ── */}
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
            <Text style={styles.refreshIcon}>↻</Text>
          </TouchableOpacity>
        </View>

        {/* ── Horse Racing ── */}
        {showHorse && (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Horse Racing</Text>
              <TouchableOpacity style={styles.createBtn}>
                <Text style={styles.createBtnText}>+ Create Race Card</Text>
              </TouchableOpacity>
            </View>

            {/* Header row */}
            <View style={styles.throw}>
              <Text style={[styles.venueLabel, styles.th]}>VENUE</Text>
              {['RACE 1', 'RACE 2', 'RACE 3', 'RACE 4'].map(h => (
                <Text key={h} style={[styles.th, styles.colHeader, { width: HORSE_CHIP_W }]}>
                  {h}
                </Text>
              ))}
            </View>

            {horseData.length === 0 ? (
              <View>
                <Text style={styles.noDataText}>The
                  <Text style={styles.masterData}> Master Data </Text>
                  setup required before creating race cards</Text>
              </View>
            ) : (
              horseData.map((row, i) => (
                <View key={i} style={styles.row}>
                  <Text style={styles.venueLabel}>{row.venue}</Text>
                  {row.races.map((chip, j) => (
                    <Chip key={j} chip={chip} width={HORSE_CHIP_W} />
                  ))}
                </View>
              ))
            )}

          </View>
        )}

        {/* ── Karambola ── */}
        {showKarambola && (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Karambola</Text>
              <TouchableOpacity style={styles.createBtn} onPress={openMaster}>
                <Text style={styles.createBtnText}>+ Create Meeting</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.throw}>
              <Text style={[styles.meetingLabel, styles.th]}>MEETING</Text>
              {['DRAW 1', 'DRAW 2', 'DRAW 3'].map(h => (
                <Text key={h} style={[styles.th, styles.colHeader, { width: DRAW_CHIP_W }]}>
                  {h}
                </Text>
              ))}
            </View>

            {karambolaData.length === 0 ? (
              <View>
                <Text style={styles.noDataText}>
                  No draws scheduled for today.
                </Text>
              </View>
            ) : (
              karambolaData.map((row, i) => (
                <View key={i} style={styles.row}>
                  <Text style={styles.meetingLabel}>{row.name}</Text>
                  {row.draws.map((chip, j) => (
                    <Chip key={j} chip={chip} width={DRAW_CHIP_W} />
                  ))}
                </View>
              ))
            )}
          </View>
        )}

        {/* ── Lucky Sign ── */}
        {showLucky && (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Lucky Sign</Text>
              <TouchableOpacity style={styles.createBtn}>
                <Text style={styles.createBtnText}>+ Create Meeting</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.throw}>
              <Text style={[styles.meetingLabel, styles.th]}>MEETING</Text>
              {['DRAW 1', '—', '—'].map((h, i) => (
                <Text key={i} style={[styles.th, styles.colHeader, { width: DRAW_CHIP_W }]}>
                  {h}
                </Text>
              ))}
            </View>

            {luckySignData.map((row, i) => (
              <View key={i} style={styles.row}>
                <Text style={styles.meetingLabel}>{row.name}</Text>
                {row.draws.map((chip, j) => (
                  <Chip key={j} chip={chip} width={DRAW_CHIP_W} />
                ))}
              </View>
            ))}
          </View>
        )}

        <View style={{ height: 30 }} />
      </ScrollView>

      <MasterDataModal
        visible={masterModal}
        onClose={closeMaster}
        onGoToMasters={() => {
          closeMaster();
          // navigation.navigate('Masters');
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.headerBackground,
  },

  /* Header */
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
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  logoBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: Colors.logoBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoLetter: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  brandName: { fontSize: 16, fontWeight: '700', color: Colors.textDark },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#a8a1a15c',
    borderRadius: 8,
    padding: 4,
    paddingLeft: 6,
    paddingRight: 6,
    gap: 8
  },
  userId: { fontSize: 13, color: Colors.venueText },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.avatarBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarIcon: { fontSize: 14 },
  chevron: { fontSize: 24, color: Colors.venueText },

  /* Breadcrumb */
  breadcrumb: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  breadcrumbText: { fontSize: 12, color: Colors.breadcrumbText },

  /* Scroll */
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 16, paddingTop: 16 },

  pageTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.textDark,
    marginBottom: 14,
  },

  /* Tabs */
  tabsRow: { flexDirection: 'row', gap: 8, marginBottom: 14, paddingRight: 4 },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 7,
  },
  tabActive: {
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: Colors.tabActive,
    borderColor: Colors.tabActive
  },
  tabText: { fontSize: 13, fontWeight: '500', color: Colors.tabTextInactive },
  tabTextActive: { color: Colors.tabTextActive },

  /* Legend */
  legend: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    gap: 14,
  },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  dot: { width: 9, height: 9, borderRadius: 5 },
  legendText: { fontSize: 12, color: Colors.textGrey },
  refreshBtn: {
    marginLeft: 'auto',
    paddingLeft: 6,
    paddingRight: 6,
    paddingBottom: 3,
    borderWidth: 2,
    borderColor: '#5685ed',
    borderRadius: 10,
  },
  refreshIcon: { fontSize: 20, color: Colors.refreshIcon },

  /* Card */
  card: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 14,
    padding: CARD_PADDING,
    marginBottom: 14,
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

  /* Table */
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 7,
  },
  throw: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dce3fa',

    marginHorizontal: -16, // CARD_PADDING value
    paddingHorizontal: 16,
    paddingVertical: 10,

    marginBottom: 7,
  },
  th: {
    color: Colors.thText,
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  colHeader: { textAlign: 'center' },
  noDataText: {
    color: '#2a252590',
    textAlign: 'center'
  },
  masterData: {
    color: '#2837d8ff',
    textDecorationLine: 'underline'
  },
  venueLabel: {
    width: VENUE_W,
    fontSize: 12,
    color: Colors.venueText,
    fontWeight: '500',
  },
  meetingLabel: {
    width: MEETING_W,
    fontSize: 12,
    color: Colors.venueText,
    fontWeight: '500',
  },

  /* Chip */
  chip: {
    paddingVertical: 7,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipText: { color: Colors.chipText, fontSize: 11, fontWeight: '700' },
  dashCell: { fontSize: 13, color: Colors.dashCell, textAlign: 'center' },
});

export default DashboardScreen;