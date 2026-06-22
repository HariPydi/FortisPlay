import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Colors, FontFamily } from '../../styles/colors';
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
      <View style={styles.topContainer}>
        <View style={styles.titleRow}>
          <Text style={styles.pageTitle}>{title}</Text>
          {title === 'Live Events' && (
            <View style={styles.liveContainer}>
              <Image
                source={require('../../assets/icons/signalIcon.png')}
                style={styles.signalIcon}
                resizeMode="contain"
              />
              <View style={styles.livesem}>
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
                style={[styles.dot, styles.greendot]}
              />
              <Text style={styles.legendText}>Betting in Progress</Text>
            </View>

            <View style={styles.legendItem}>
              <View style={[styles.dot, styles.redDot]} />
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
    gap: 20,
  },
  topContainer: {
    gap: 12,
  },
  pageTitle: {
    fontFamily: FontFamily.primaryFont,
    fontSize: 22,
    fontWeight: '800',
    color: Colors.textDark,
    lineHeight: 36,
    letterSpacing: -0.75,
  },
  liveContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  signalIcon: {
    width: 20,
    height: 20,
  },
  livesem: {
    // gap: 4,
  },
  liveText: {
    fontFamily: FontFamily.primaryFont,
    fontSize: 10,
    fontWeight: '600',
    lineHeight: 16,
    letterSpacing: 0,
    textTransform: 'uppercase',
    color: Colors.textDark60,
  },
  liveDateText: {
    fontFamily: FontFamily.primaryFont,
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 16,
    letterSpacing: 0,
    textAlign: 'center',
    color: Colors.textDark,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  tabsRow: {
    flexDirection: 'row',
    backgroundColor: Colors.dashBackground80,
    borderTopWidth: 0.57,
    borderTopColor: Colors.tabsBorder,
    borderRadius: 4,
    gap: 4,
    paddingVertical: 2,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 7,
  },
  tabActive: {
    borderRadius: 20,
    backgroundColor: Colors.textDark,
  },
  tabText: {
    fontFamily: FontFamily.primaryFont,
    fontSize: 13,
    fontWeight: '800',
    color: Colors.testDark80,
    lineHeight: 20,
    letterSpacing: -0.4,
  },
  tabTextActive: { color: Colors.white },

  legend: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
  },
  greendot: {
    backgroundColor: Colors.dotGreen,
    shadowColor: Colors.dotGreen,
  },
  redDot: {
    backgroundColor: Colors.dotRed,
    shadowColor: Colors.dotRed,
  },
  legendText: {
    fontFamily: FontFamily.primaryFont,
    fontSize: 10,
    fontWeight: '700',
    lineHeight: 15,
    letterSpacing: 0,
    color: Colors.textSlate60,
  },
  refreshBtn: {
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
