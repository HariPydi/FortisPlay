import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  Image,
} from 'react-native';
import { Colors, FontFamily } from '../../../styles/colors';
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

const AddVenueScreen: React.FC<Props> = ({ navigation }) => {
  const [venueCode, setVenueCode] = useState<string>('');
  const [venueName, setVenueName] = useState<string>('');
  const [venueClassification, setVenueClassification] = useState<string>('');
  const [combined, setCombined] = useState<string>('');
  const [status, setStatus] = useState<'Active' | 'Deactive'>('Active');
  const [showClassDropdown, setShowClassDropdown] = useState<boolean>(false);
  const [showCombinedDropdown, setShowCombinedDropdown] =
    useState<boolean>(false);

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
          onPress={() => navigation?.goBack()}
          activeOpacity={0.7}
        >
          <Image
            source={require('../../../assets/icons/CloseIcon.png')}
            style={styles.closeIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Venue Code + Venue Name Row */}
        <View style={styles.row}>
          <View style={styles.halfField}>
            <Text style={styles.label}>Venue Code</Text>
            <TextInput
              style={styles.input}
              placeholder="eg: MDS"
              placeholderTextColor="#353A5199"
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
              placeholderTextColor="#353A5199"
              value={venueName}
              onChangeText={setVenueName}
              autoCorrect={false}
            />
          </View>
        </View>

        <View style={styles.inputRow}>
          {/* Venue Classification Dropdown */}
          <View style={styles.field}>
            <Text style={styles.label}>Venue Classification</Text>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => {
                setShowClassDropdown(!showClassDropdown);
                setShowCombinedDropdown(false);
              }}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.dropdownText,
                  !venueClassification && styles.placeholder,
                ]}
              >
                {venueClassification || 'Select'}
              </Text>
              <Image
                source={require('../../../assets/icons/chevron-down.png')}
                style={styles.chevronDownIcon}
                resizeMode="contain"
              />
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
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.dropdownItemText,
                        venueClassification === option &&
                        styles.dropdownItemTextActive,
                      ]}
                    >
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
              activeOpacity={0.8}
            >
              <Text
                style={[styles.dropdownText, !combined && styles.placeholder]}
              >
                {combined || 'Select'}
              </Text>
              <Image
                source={require('../../../assets/icons/chevron-down.png')}
                style={styles.chevronDownIcon}
                resizeMode="contain"
              />
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
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.dropdownItemText,
                        combined === option && styles.dropdownItemTextActive,
                      ]}
                    >
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>

        {/* Status Radio Buttons */}
        <View style={styles.radioContainer}>
          <Text style={styles.label}>Status</Text>
          <View style={styles.radioRow}>
            <TouchableOpacity
              style={styles.radioOption}
              onPress={() => setStatus('Active')}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.radioOuter,
                  status === 'Active' && styles.radioOuterActive,
                ]}
              >
                {status === 'Active' && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.radioLabel}>Active</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.radioOption}
              onPress={() => setStatus('Deactive')}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.radioOuter,
                  status === 'Deactive' && styles.radioOuterActive,
                ]}
              >
                {status === 'Deactive' && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.radioLabel}>Deactive</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Footer Submit Button */}
      <View style={styles.footerDivider} />
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={handleSubmit}
          activeOpacity={0.85}
        >
          <Image
            source={require('../../../assets/icons/PlusIcon.png')}
            style={styles.plusIcon}
            resizeMode="contain"
          />
          <Text style={styles.submitBtnText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 25,
    },
    shadowOpacity: 0.25,
    shadowRadius: 25,

    elevation: 16,
  },
  header: {
    height: 69,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    paddingVertical: 16,
    paddingRight: 16,
    paddingLeft: 20,

    borderBottomWidth: 1,
    borderBottomColor: '#1F232B14',
  },
  headerTitle: {
    fontFamily: FontFamily.primaryFont,
    fontSize: 20,
    fontWeight: '700',
    color: '#1F232B',
    lineHeight: 36,
    letterSpacing: -0.75,
    textAlignVertical: 'center',
  },
  closeIcon: {
    width: 24,
    height: 24,
  },

  divider: {
    height: 1,
    backgroundColor: '#EEEEEE',
  },

  scroll: { flex: 1 },
  scrollContent: {
    padding: 20,
    gap: 20,
  },

  row: {
    flexDirection: 'row',
    gap: 16,
  },
  inputRow: {
    gap: 16,
  },
  halfField: {
    flex: 1,
    gap: 6,
  },
  field: {
    gap: 6,
  },

  label: {
    fontFamily: FontFamily.primaryFont,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
    letterSpacing: 0,
    color: '#353A51',
  },

  input: {
    borderWidth: 1,
    borderColor: '#353A514D',
    borderRadius: 8,

    paddingVertical: 8,
    paddingHorizontal: 16,

    fontSize: 14,
    color: '#1A1A2E',
    backgroundColor: '#FFFFFF',
  },

  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#353A514D',
    borderRadius: 8,
    paddingRight: 12,
    paddingLeft: 16,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
  },
  dropdownText: {
    fontFamily: FontFamily.primaryFont,
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A2E',
    flex: 1,
  },
  placeholder: {
    fontFamily: FontFamily.primaryFont,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 14,
    letterSpacing: 0,
    color: '#3551354d',
  },
  chevronDownIcon: {
    width: 20,
    height: 20,
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
    shadowOffset: { width: 0, height: 2 },
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

  radioContainer: {
    gap: 16,
  },
  radioRow: {
    flexDirection: 'row',
    gap: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#1F232B4D',
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
    fontFamily: FontFamily.primaryFont,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    letterSpacing: 0,
    color: '#1F232B',
  },

  footer: {
    alignItems: 'flex-end',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  footerDivider: {
    height: 1,
    backgroundColor: '#1F232B14',
  },
  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.primaryBlue,
    borderWidth: 1.5,
    borderRadius: 8,
    borderColor: Colors.primaryBlue,
    paddingRight: 16,
    paddingLeft: 12,
    paddingVertical: 8,
  },
  plusIcon: {
    width: 20,
    height: 20,
  },
  submitBtnText: {
    fontFamily: FontFamily.primaryFont,
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 16,
    letterSpacing: 0,
    color: '#FFFFFF',
  },
});

export default AddVenueScreen;
