import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import { Colors } from '../../styles/colors';

type Props = {
  visible: boolean;
  onClose: () => void;
  navigation: any;
  activeScreen: string;
};

type MenuItem = {
  label: string;
  screen: string;
};

const menuItems: MenuItem[] = [
  { label: 'Dashboard', screen: 'Dashboard', },
  { label: 'Event Day', screen: 'EventDay', },
  { label: 'Masters', screen: 'Masters', },
  { label: 'Allotments', screen: 'Allotments', },
  { label: 'Reports', screen: 'Reports', },
  { label: 'CCTV', screen: 'CCTV', },
  { label: 'Collection Merger', screen: 'CollectionMerger', },
];

const Sidebar: React.FC<Props> = ({ visible, onClose, navigation, activeScreen }) => {
  const handleNavigate = (screen: string): void => {
    onClose();
    navigation.navigate(screen);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.sidebar}>

              {/* Sidebar Header */}
              <View style={styles.sidebarHeader}>
                <View style={styles.logoBox}>
                  <Text style={styles.logoLetter}>F</Text>
                </View>
                <Text style={styles.brandName}>FortisPlay</Text>
                <TouchableOpacity
                  style={styles.closeBtn}
                  onPress={onClose}
                  activeOpacity={0.7}>
                  <Text style={styles.closeIcon}>✕</Text>
                </TouchableOpacity>
              </View>

              {/* Menu Items */}
              <ScrollView
                style={styles.menuScroll}
                showsVerticalScrollIndicator={false}>
                <View style={styles.menuList}>
                  {menuItems.map(item => (
                    <TouchableOpacity
                      key={item.screen}
                      style={[
                        styles.menuItem,
                        activeScreen === item.screen && styles.menuItemActive,
                      ]}
                      onPress={() => handleNavigate(item.screen)}
                      activeOpacity={0.7}>
                      {/* <Text style={styles.menuIcon}>{item.icon}</Text> */}
                      <Text
                        style={[
                          styles.menuLabel,
                          activeScreen === item.screen && styles.menuLabelActive,
                        ]}>
                        {item.label}
                      </Text>
                      {activeScreen === item.screen && (
                        <View style={styles.activeIndicator} />
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>

              {/* Footer */}
              <View style={styles.sidebarFooter}>
                <Text style={styles.footerText}>© 2026 FortisPlay</Text>
              </View>

            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    flexDirection: 'row',
  },
  sidebar: {
    width: 270,
    backgroundColor: '#FFFFFF',
    height: '100%',
    paddingTop: 50,
    shadowColor: '#000',
    shadowOffset: { width: 3, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 12,
  },

  // Header
  sidebarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    marginBottom: 8,
  },
  logoBox: {
    width: 36,
    height: 36,
    borderRadius: 9,
    backgroundColor: Colors.logoBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoLetter: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
  brandName: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.textDark,
    marginLeft: 10,
    flex: 1,
  },
  closeBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F4F4F4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    fontSize: 13,
    color: '#666666',
    fontWeight: '600',
  },

  // Menu
  menuScroll: {
    flex: 1,
  },
  menuList: {
    paddingHorizontal: 12,
    paddingTop: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 13,
    borderRadius: 10,
    marginBottom: 2,
    gap: 12,
  },
  menuItemActive: {
    backgroundColor: '#EEF2FF',
  },

  menuLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: '#444444',
    flex: 1,
  },
  menuLabelActive: {
    color: Colors.primaryBlue,
    fontWeight: '700',
  },
  activeIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primaryBlue,
  },

  // Footer
  sidebarFooter: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  footerText: {
    fontSize: 12,
    color: '#AAAAAA',
    textAlign: 'center',
  },
});

export default Sidebar;