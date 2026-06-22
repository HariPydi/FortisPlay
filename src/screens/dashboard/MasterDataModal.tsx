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
  Image,
} from 'react-native';
import { Colors, FontFamily } from '../../styles/colors';

const masterItemsSet1 = ['Venues', 'Pools', 'Distributions', 'Users'];
const masterItemsSet2 = ['Locations', 'Enclosures', 'Terminals', 'Users KYC'];

const MasterDataModal = ({
  visible,
  onClose,
  onGoToMasters,
}: {
  visible: boolean;
  onClose: () => void;
  onGoToMasters: () => void;
}) => (
  <Modal
    visible={visible}
    transparent
    animationType="fade"
    onRequestClose={onClose}
  >
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={modal.overlay}>
        <TouchableWithoutFeedback>
          <View style={modal.sheet}>
            {/* X close */}
            <TouchableOpacity style={modal.closeBtn} onPress={onClose}>
              <Image
                source={require('../../assets/icons/CloseIcon.png')}
                style={modal.closeIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <View style={modal.contentContainer}>
              <View style={modal.headerContainer}>
                <View style={modal.headerInner}>
                  {/* Orange warning icon */}
                  <View style={modal.iconWrap}>
                    <View style={modal.iconCircle}>
                      <Image
                        source={require('../../assets/icons/AlertCircle.png')}
                        style={modal.alertIcon}
                        resizeMode="contain"
                      />
                    </View>
                  </View>
                  <Text style={modal.title}>Master Data Required</Text>
                </View>
                <Text style={modal.subtitle}>
                  You need to create and configure the required master data
                  before you can create race cards or meetings.
                </Text>
              </View>

              {/* Masters list */}
              <View style={modal.listBox}>
                <Text style={modal.listTitle}>
                  Please set up the following masters
                </Text>
                <View style={modal.listContainer}>
                  <View style={modal.listGrid}>
                    {masterItemsSet1.map((item, i) => (
                      <View key={i} style={modal.listItem}>
                        <Image
                          source={require('../../assets/icons/FileIcon.png')}
                          style={modal.listIcon}
                          resizeMode="contain"
                        />
                        <Text style={modal.listLabel}>{item}</Text>
                      </View>
                    ))}
                  </View>
                  <View style={modal.listGrid}>
                    {masterItemsSet1.map((item, i) => (
                      <View key={i} style={modal.listItem}>
                        <Image
                          source={require('../../assets/icons/FileIcon.png')}
                          style={modal.listIcon}
                          resizeMode="contain"
                        />
                        <Text style={modal.listLabel}>{item}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>

              {/* Info box */}
              <View style={modal.infoBox}>
                <Image
                  source={require('../../assets/icons/info-circle.png')}
                  style={modal.infoIcon}
                  resizeMode="contain"
                />
                <Text style={modal.infoText}>
                  Once master data created, you will be able to create race
                  cards, meetings and scheduled events.
                </Text>
              </View>
            </View>

            {/* Buttons */}
            <View style={modal.btnRow}>
              <TouchableOpacity
                style={modal.cancelBtn}
                onPress={onClose}
                activeOpacity={0.8}
              >
                <Image
                  source={require('../../assets/icons/blue-cross.png')}
                  style={modal.buttonIcon}
                  resizeMode="contain"
                />
                <Text style={modal.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={modal.goBtn}
                onPress={onGoToMasters}
                activeOpacity={0.8}
              >
                <Image
                  source={require('../../assets/icons/arrow-right.png')}
                  style={modal.buttonIcon}
                  resizeMode="contain"
                />
                <Text style={modal.goText}>Go to Masters</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  </Modal>
);

const modal = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  sheet: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    paddingHorizontal: 20,
    paddingVertical: 24,
    gap: 40,
    shadowColor: '#2C2F31',
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 8,
  },
  closeBtn: {
    width: 32,
    height: 32,
    position: 'absolute',
    top: 16,
    right: 18,
    zIndex: 10,
    padding: 4,
  },
  closeIcon: {},
  contentContainer: {
    gap: 16,
  },
  headerContainer: {
    gap: 8,
  },
  headerInner: {
    gap: 12,
  },
  iconWrap: { alignItems: 'center' },
  iconCircle: {
    borderRadius: 36,
    padding: 16,
    backgroundColor: '#FFEBCB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertIcon: {
    width: 43,
    height: 43,
  },
  title: {
    fontFamily: FontFamily.primaryFont,
    fontSize: 20,
    fontWeight: '700',
    color: Colors.textDark,
    lineHeight: 28,
    letterSpacing: 0,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: FontFamily.primaryFont,
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 21, // 14 × 1.5 = 21
    letterSpacing: 0,
    textAlign: 'center',
    color: '#1F232B99',
  },
  listBox: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(53, 58, 81, 0.08)',
    backgroundColor: 'rgba(53, 58, 81, 0.04)',
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 12,
  },
  listTitle: {
    fontFamily: FontFamily.primaryFont,
    fontWeight: '800',
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0,
    color: Colors.textDark,
  },
  listContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  listGrid: { gap: 6 },
  listItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  listIcon: { width: 16, height: 16 },
  listLabel: {
    fontFamily: FontFamily.primaryFont,
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0,
    color: '#353A51',
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(37, 99, 235, 0.12)',
    backgroundColor: 'rgba(37, 99, 235, 0.08)',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },

  infoIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
    marginTop: 2,
  },

  infoText: {
    flex: 1,
    flexShrink: 1,
    fontFamily: FontFamily.primaryFont,
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0,
    color: Colors.textDark,
  },
  btnRow: { height: 44, flexDirection: 'row', gap: 12 },
  cancelBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#2563FF',
    borderRadius: 8,
    paddingVertical: 8,
    paddingLeft: 12,
    paddingRight: 16,
    gap: 4,
  },
  buttonIcon: { width: 20, height: 20 },
  cancelText: { fontSize: 15, fontWeight: '600', color: '#2979FF' },
  goBtn: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563FF',
    borderRadius: 8,
    paddingVertical: 8,
    borderWidth: 1.5,
    borderColor: '#2563FF',
    paddingLeft: 12,
    paddingRight: 16,
    gap: 4,
  },
  goText: { fontSize: 15, fontWeight: '600', color: '#fff' },
});

export default MasterDataModal;
