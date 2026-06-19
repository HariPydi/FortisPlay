import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AppBreadcrumb from '../../components/common/AppBreadcrumb';
import PageHeader from '../../components/common/PageHeader';
import ScreenLayout from '../../components/layout/ScreenLayout';
import { MASTERTABS } from '../../data/dummyData';
import { Colors, FontFamily } from '../../styles/colors';
import DistributionsTab from './distributions/DistributionsTab';
import UsersKYCTab from './users-kyc/UsersKYCTab';
import VenuesTab from './venues/VenuesTab';

const TAB_COMPONENTS = {
  Venues: VenuesTab,
  // Pools: PoolsTab,
  // 'LS Prize': LSPrizeTab,
  Distributions: DistributionsTab,
  // Enclosures: EnclosuresTab,
  // Terminals: TerminalsTab,
  // Users: UsersTab,
  'Users KYC': UsersKYCTab,
  // Locations: LocationsTab,
};

type Props = {
  navigation?: any;
};

const ComingSoonTab = ({ title }: { title: string }) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={{ color: Colors.textGrey, marginTop: 12 }}>
      {title} content goes here...
    </Text>
  </View>
);

const MastersScreen: React.FC<Props> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState<string>('Venues');

  const ActiveTab =
    TAB_COMPONENTS[
    activeTab as keyof typeof TAB_COMPONENTS
    ];

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
          tabs={MASTERTABS}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onRefresh={() => {
            console.log('refresh');
          }}
        />

        {ActiveTab ? (
          <ActiveTab navigation={navigation} />
        ) : (
          <ComingSoonTab title={activeTab} />
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
});

export default MastersScreen;