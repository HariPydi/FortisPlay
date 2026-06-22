import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import PageHeader from '../../components/common/PageHeader';
import ScreenLayout from '../../components/layout/ScreenLayout';
import { DASHBOARDTABS, horseData, karambolaData, luckySignData } from '../../data/dummyData';
import { Colors } from '../../styles/colors';
import { HorseRacingTable, MeetingTable } from './DashboardTable';
import MasterDataModal from './MasterDataModal';

type Props = {
  navigation?: any;
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
      // contentContainerStyle={styles.scrollContent}
      >

        <PageHeader
          title="Live Events"
          tabs={DASHBOARDTABS}
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
                    source={require('../../assets/icons/PlusIcon.png')}
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
                    source={require('../../assets/icons/PlusIcon.png')}
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
                    source={require('../../assets/icons/PlusIcon.png')}
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
  // scrollContent: { paddingHorizontal: 16, paddingTop: 8,paddingBottom:16, },

  cardWrapper: {
    paddingTop: 16,
    gap: 16
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.textSlate10,
    overflow: 'hidden',
    shadowColor: Colors.black,
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
    paddingVertical: 16,
    paddingHorizontal: 12,
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

  // No Data Container
  noDataContainer: { paddingVertical: 16, alignItems: 'center' },
  noDataText: { color: '#2a252590', textAlign: 'center' },
  masterData: { color: '#2837d8ff', textDecorationLine: 'underline' },
});

export default DashboardScreen;