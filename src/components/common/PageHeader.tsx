import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Colors } from '../../styles/colors';
import { ScrollView } from 'react-native-gesture-handler';

type Props = {
  title: string;
  tabs: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onRefresh?: () => void;
};

const PageHeader: React.FC<Props> = ({
  title,
  tabs,
  activeTab,
  setActiveTab,
  onRefresh,
}) => {
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.titleRow}>
          <Text style={styles.pageTitle}>{title}</Text>
          {title === 'Live Events' && (
            <View style={styles.liveContainer}>
              <Image
                source={require('../../assets/icons/signalIcon.png')}
                style={styles.signalIcon}
                resizeMode="contain"
              />
              <View style ={styles.livesem}>
                <Text style={styles.liveText}>LIVE</Text>
                <Text style={styles.liveDateText}>
                  {new Date()
                    .toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                    })
                    .toUpperCase()}{' '}
                  {new Date().toLocaleTimeString('en-GB', {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                  })}
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsRow}
        >
          {tabs.map(tab => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.tabActive]}
              onPress={() => setActiveTab(tab)}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.tabTextActive,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {title === 'Live Events' && (
        <View style={styles.legend}>
          <View style={styles.legendRow}>
            <View style={styles.legendItem}>
              <View
                style={[styles.dot, { backgroundColor: Colors.dotGreen }]}
              />
              <Text style={styles.legendText}>Betting in Progress</Text>
            </View>

            <View style={styles.legendItem}>
              <View style={[styles.dot, { backgroundColor: Colors.dotRed }]} />
              <Text style={styles.legendText}>Betting Stopped</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.refreshBtn} onPress={onRefresh}>
            <Image
              source={require('../../assets/icons/RefreshIcon.png')}
              style={styles.refreshIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    gap: 20,
  },
  pageTitle: {
    fontFamily: 'Manrope',
    fontSize: 22,
    fontWeight: '800',
    color: '#1F232B',
    lineHeight: 36,
    letterSpacing: -0.75,
  },

  signalIcon: {
    width: 20,
    height: 20,
  },
  livesem:{
    gap:4,

  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  liveContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  liveText: {
  fontFamily: 'Manrope-SemiBold',
  fontSize: 10,
  fontWeight: '600',
  lineHeight: 16,
  letterSpacing: 0,
  textTransform: 'uppercase',
},
 liveDateText: {
  fontFamily: 'Manrope-SemiBold',
  fontSize: 12,
  fontWeight: '600',
  lineHeight: 16,
  letterSpacing: 0,
  textAlign: 'center',
  color: '#1F232B',
},

  tabsRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(248, 250, 247, 0.8)',
    borderTopWidth: 0.57,
    borderTopColor: '#F1F5F9',
    gap: 4,
    paddingVertical: 2,
    paddingRight: 4,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 7,
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

  legend: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    gap: 14,
  },
  legendRow: {
    gap: 12,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  dot: {
    width: 9,
    height: 9,
    borderRadius: 5,
  },

  legendText: {
    fontFamily: 'Manrope',
    fontSize: 10,
    fontWeight: '500',
    lineHeight: 15,
    letterSpacing: 0,
    color: 'rgba(15, 23, 42, 0.6)',
  },

  refreshBtn: {
    marginLeft: 'auto',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#2563FF',
    borderRadius: 8,
    gap: 6,
  },

  refreshIcon: {
    width: 18,
    height: 18,
  },
});

export default PageHeader;
