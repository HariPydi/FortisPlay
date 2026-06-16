import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import {Colors} from '../styles/colors';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {
  navigation?: any;
};

type VenueFormData = {
  venueCode: string;
  venueName: string;
  venueClassification: string;
  combined: string;
  status: 'Active' | 'Deactive';
};

const classificationOptions = ['Major', 'Minor', 'Local'];
const combinedOptions = ['Yes', 'No'];

const AddVenueScreen: React.FC<Props> = ({navigation}) => {
  const [venueCode, setVenueCode] = useState<string>('');
  const [venueName, setVenueName] = useState<string>('');
  const [venueClassification, setVenueClassification] = useState<string>('');
  const [combined, setCombined] = useState<string>('');
  const [status, setStatus] = useState<'Active' | 'Deactive'>('Active');
  const [showClassDropdown, setShowClassDropdown] = useState<boolean>(false);
  const [showCombinedDropdown, setShowCombinedDropdown] = useState<boolean>(false);

  const handleSubmit = (): void => {
    const data: VenueFormData = {
      venueCode,
      venueName,
      venueClassification,
      combined,
      status,
    };
    console.log('New Venue:', data);
    navigation?.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Add Venue</Text>
        <TouchableOpacity
          style={styles.closeBtn}
          onPress={() => navigation?.goBack()}
          activeOpacity={0.7}>
          <Text style={styles.closeIcon}>✕</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled">

        {/* Venue Code + Venue Name Row */}
        <View style={styles.row}>
          <View style={styles.halfField}>
            <Text style={styles.label}>Venue Code</Text>
            <TextInput
              style={styles.input}
              placeholder="eg: MDS"
              placeholderTextColor="#BBBBBB"
              value={venueCode}
              onChangeText={setVenueCode}
              autoCapitalize="characters"
              autoCorrect={false}
            />
          </View>
          <View style={styles.halfField}>
            <Text style={styles.label}>Venue Name</Text>
            <TextInput
              style={styles.input}
              placeholder="eg: Madras"
              placeholderTextColor="#BBBBBB"
              value={venueName}
              onChangeText={setVenueName}
              autoCorrect={false}
            />
          </View>
        </View>

        {/* Venue Classification Dropdown */}
        <View style={styles.field}>
          <Text style={styles.label}>Venue Classification</Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => {
              setShowClassDropdown(!showClassDropdown);
              setShowCombinedDropdown(false);
            }}
            activeOpacity={0.8}>
            <Text style={[styles.dropdownText, !venueClassification && styles.placeholder]}>
              {venueClassification || 'Select'}
            </Text>
            <Text style={styles.dropdownArrow}>▼</Text>
          </TouchableOpacity>
          {showClassDropdown && (
            <View style={styles.dropdownList}>
              {classificationOptions.map(option => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.dropdownItem,
                    venueClassification === option && styles.dropdownItemActive,
                  ]}
                  onPress={() => {
                    setVenueClassification(option);
                    setShowClassDropdown(false);
                  }}
                  activeOpacity={0.7}>
                  <Text
                    style={[
                      styles.dropdownItemText,
                      venueClassification === option && styles.dropdownItemTextActive,
                    ]}>
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Combined Dropdown */}
        <View style={styles.field}>
          <Text style={styles.label}>Combined</Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => {
              setShowCombinedDropdown(!showCombinedDropdown);
              setShowClassDropdown(false);
            }}
            activeOpacity={0.8}>
            <Text style={[styles.dropdownText, !combined && styles.placeholder]}>
              {combined || 'Select'}
            </Text>
            <Text style={styles.dropdownArrow}>▼</Text>
          </TouchableOpacity>
          {showCombinedDropdown && (
            <View style={styles.dropdownList}>
              {combinedOptions.map(option => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.dropdownItem,
                    combined === option && styles.dropdownItemActive,
                  ]}
                  onPress={() => {
                    setCombined(option);
                    setShowCombinedDropdown(false);
                  }}
                  activeOpacity={0.7}>
                  <Text
                    style={[
                      styles.dropdownItemText,
                      combined === option && styles.dropdownItemTextActive,
                    ]}>
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Status Radio Buttons */}
        <View style={styles.field}>
          <Text style={styles.label}>Status</Text>
          <View style={styles.radioRow}>
            <TouchableOpacity
              style={styles.radioOption}
              onPress={() => setStatus('Active')}
              activeOpacity={0.7}>
              <View style={[styles.radioOuter, status === 'Active' && styles.radioOuterActive]}>
                {status === 'Active' && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.radioLabel}>Active</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.radioOption}
              onPress={() => setStatus('Deactive')}
              activeOpacity={0.7}>
              <View style={[styles.radioOuter, status === 'Deactive' && styles.radioOuterActive]}>
                {status === 'Deactive' && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.radioLabel}>Deactive</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{height: 100}} />
      </ScrollView>

      {/* Footer Submit Button */}
      <View style={styles.footer}>
        <View style={styles.footerDivider} />
        <View style={styles.footerContent}>
          <TouchableOpacity
            style={styles.submitBtn}
            onPress={handleSubmit}
            activeOpacity={0.85}>
            <Text style={styles.submitBtnText}>+ Submit</Text>
          </TouchableOpacity>
        </View>
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 18,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1F232B',
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F4F4F4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    fontSize: 14,
    color: '#555555',
    fontWeight: '600',
  },

  divider: {
    height: 1,
    backgroundColor: '#EEEEEE',
  },

  scroll: {flex: 1},
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 16,
  },

  row: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  halfField: {
    flex: 1,
  },
  field: {
    marginBottom: 20,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#353A51',
    marginBottom: 8,
  },

  input: {
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: '#1A1A2E',
    backgroundColor: '#FFFFFF',
  },

  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
  },
  dropdownText: {
    fontSize: 14,
    color: '#1A1A2E',
    flex: 1,
  },
  placeholder: {
    color: '#BBBBBB',
  },
  dropdownArrow: {
    fontSize: 12,
    color: '#555555',
  },
  dropdownList: {
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    marginTop: 4,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  dropdownItem: {
    paddingHorizontal: 14,
    paddingVertical: 13,
    borderBottomWidth: 0.5,
    borderBottomColor: '#F0F0F0',
  },
  dropdownItemActive: {
    backgroundColor: '#EEF2FF',
  },
  dropdownItemText: {
    fontSize: 14,
    color: '#444444',
  },
  dropdownItemTextActive: {
    color: Colors.primaryBlue,
    fontWeight: '600',
  },

  radioRow: {
    flexDirection: 'row',
    gap: 28,
    marginTop: 4,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#C0C0C0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioOuterActive: {
    borderColor: Colors.primaryBlue,
  },
  radioInner: {
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: Colors.primaryBlue,
  },
  radioLabel: {
    fontSize: 15,
    color: '#1A1A2E',
    fontWeight: '500',
  },

  footer: {
    backgroundColor: '#FFFFFF',
  },
  footerDivider: {
    height: 1,
    backgroundColor: '#EEEEEE',
  },
  footerContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    alignItems: 'flex-end',
  },
  submitBtn: {
    backgroundColor: Colors.primaryBlue,
    borderRadius: 12,
    paddingHorizontal: 28,
    paddingVertical: 14,
    shadowColor: Colors.primaryBlue,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AddVenueScreen;