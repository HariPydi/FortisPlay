import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  Platform,
} from 'react-native';
import {Colors} from '../styles/colors';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {
  navigation?: any;
};

type KYCFormData = {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  countryCode: string;
  mobileNumber: string;
  dateOfBirth: string;
  nearestOutlet: string;
  documentType: string;
  documentId: string;
  uploadDocument: string;
  uploadSelfie: string;
  occupation: string;
  sourceOfIncome: string;
  income: string;
  nationality: string;
};

const countryCodeOptions = ['+91 India', '+1 USA', '+44 UK', '+61 Australia'];
const nearestOutletOptions = ['Outlet 1', 'Outlet 2', 'Outlet 3'];
const documentTypeOptions = ['Passport', 'Aadhar Card', 'Driving License', 'Voter ID'];
const occupationOptions = ['Employed', 'Self Employed', 'Business', 'Student', 'Retired'];
const sourceOfIncomeOptions = ['Salary', 'Business', 'Investment', 'Other'];
const incomeOptions = ['Below 1L', '1L - 5L', '5L - 10L', 'Above 10L'];
const nationalityOptions = ['Indian', 'American', 'British', 'Australian'];

type DropdownField =
  | 'countryCode'
  | 'nearestOutlet'
  | 'documentType'
  | 'occupation'
  | 'sourceOfIncome'
  | 'income'
  | 'nationality'
  | null;

const KYCPersonalInfoScreen: React.FC<Props> = ({navigation}) => {
  const [firstName, setFirstName] = useState<string>('');
  const [middleName, setMiddleName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [countryCode, setCountryCode] = useState<string>('');
  const [mobileNumber, setMobileNumber] = useState<string>('');
  const [dateOfBirth, setDateOfBirth] = useState<string>('');
  const [nearestOutlet, setNearestOutlet] = useState<string>('');
  const [documentType, setDocumentType] = useState<string>('');
  const [documentId, setDocumentId] = useState<string>('');
  const [uploadDocument, setUploadDocument] = useState<string>('');
  const [uploadSelfie, setUploadSelfie] = useState<string>('');
  const [occupation, setOccupation] = useState<string>('');
  const [sourceOfIncome, setSourceOfIncome] = useState<string>('');
  const [income, setIncome] = useState<string>('');
  const [nationality, setNationality] = useState<string>('');
  const [openDropdown, setOpenDropdown] = useState<DropdownField>(null);

  const handleSubmit = (): void => {
    const data: KYCFormData = {
      firstName, middleName, lastName, email,
      countryCode, mobileNumber, dateOfBirth, nearestOutlet,
      documentType, documentId, uploadDocument, uploadSelfie,
      occupation, sourceOfIncome, income, nationality,
    };
    console.log('KYC Data:', data);
    navigation?.goBack();
  };

  const toggleDropdown = (field: DropdownField): void => {
    setOpenDropdown(openDropdown === field ? null : field);
  };

  const Dropdown = ({
    field,
    value,
    options,
    onSelect,
  }: {
    field: DropdownField;
    value: string;
    options: string[];
    onSelect: (val: string) => void;
  }) => (
    <View>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => toggleDropdown(field)}
        activeOpacity={0.8}>
        <Text style={[styles.dropdownText, !value && styles.placeholder]}>
          {value || 'Select'}
        </Text>
        <Text style={styles.dropdownArrow}>▼</Text>
      </TouchableOpacity>
      {openDropdown === field && (
        <View style={styles.dropdownList}>
          {options.map(option => (
            <TouchableOpacity
              key={option}
              style={[
                styles.dropdownItem,
                value === option && styles.dropdownItemActive,
              ]}
              onPress={() => {
                onSelect(option);
                setOpenDropdown(null);
              }}
              activeOpacity={0.7}>
              <Text
                style={[
                  styles.dropdownItemText,
                  value === option && styles.dropdownItemTextActive,
                ]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );

  const FileUpload = ({label, value}: {label: string; value: string}) => (
    <View style={styles.fileUploadContainer}>
      <TouchableOpacity style={styles.chooseFileBtn} activeOpacity={0.8}>
        <Text style={styles.chooseFileBtnText}>Choose File</Text>
      </TouchableOpacity>
      <Text style={styles.fileNameText} numberOfLines={1}>
        {value || 'No file...'}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>KYC Personal Info</Text>
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

        {/* First Name + Middle Name */}
        <View style={styles.row}>
          <View style={styles.halfField}>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={styles.input}
              placeholder=""
              placeholderTextColor="#BBBBBB"
              value={firstName}
              onChangeText={setFirstName}
              autoCorrect={false}
            />
          </View>
          <View style={styles.halfField}>
            <Text style={styles.label}>Middle Name</Text>
            <TextInput
              style={styles.input}
              placeholder=""
              placeholderTextColor="#BBBBBB"
              value={middleName}
              onChangeText={setMiddleName}
              autoCorrect={false}
            />
          </View>
        </View>

        {/* Last Name + Email */}
        <View style={styles.row}>
          <View style={styles.halfField}>
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={styles.input}
              placeholder=""
              placeholderTextColor="#BBBBBB"
              value={lastName}
              onChangeText={setLastName}
              autoCorrect={false}
            />
          </View>
          <View style={styles.halfField}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder=""
              placeholderTextColor="#BBBBBB"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
        </View>

        {/* Country Code + Mobile Number */}
        <View style={styles.row}>
          <View style={styles.halfField}>
            <Text style={styles.label}>Country Code</Text>
            <Dropdown
              field="countryCode"
              value={countryCode}
              options={countryCodeOptions}
              onSelect={setCountryCode}
            />
          </View>
          <View style={styles.halfField}>
            <Text style={styles.label}>Mobile Number</Text>
            <TextInput
              style={styles.input}
              placeholder=""
              placeholderTextColor="#BBBBBB"
              value={mobileNumber}
              onChangeText={setMobileNumber}
              keyboardType="phone-pad"
            />
          </View>
        </View>

        {/* Date of Birth + Nearest Outlet */}
        <View style={styles.row}>
          <View style={styles.halfField}>
            <Text style={styles.label}>Date of Birth</Text>
            <View style={styles.dateContainer}>
              <TextInput
                style={styles.dateInput}
                placeholder="DD/MM/YYYY"
                placeholderTextColor="#BBBBBB"
                value={dateOfBirth}
                onChangeText={setDateOfBirth}
                keyboardType="numeric"
              />
              <Text style={styles.calendarIcon}>📅</Text>
            </View>
          </View>
          <View style={styles.halfField}>
            <Text style={styles.label}>Nearest Outlet</Text>
            <Dropdown
              field="nearestOutlet"
              value={nearestOutlet}
              options={nearestOutletOptions}
              onSelect={setNearestOutlet}
            />
          </View>
        </View>

        {/* Document Type + Document ID */}
        <View style={styles.row}>
          <View style={styles.halfField}>
            <Text style={styles.label}>Document Type</Text>
            <Dropdown
              field="documentType"
              value={documentType}
              options={documentTypeOptions}
              onSelect={setDocumentType}
            />
          </View>
          <View style={styles.halfField}>
            <Text style={styles.label}>Document ID</Text>
            <TextInput
              style={styles.input}
              placeholder=""
              placeholderTextColor="#BBBBBB"
              value={documentId}
              onChangeText={setDocumentId}
              autoCorrect={false}
            />
          </View>
        </View>

        {/* Upload Document + Upload Selfie */}
        <View style={styles.row}>
          <View style={styles.halfField}>
            <Text style={styles.label}>Upload Document</Text>
            <FileUpload label="Upload Document" value={uploadDocument} />
          </View>
          <View style={styles.halfField}>
            <Text style={styles.label}>Upload Selfie</Text>
            <FileUpload label="Upload Selfie" value={uploadSelfie} />
          </View>
        </View>

        {/* Occupation + Source of Income */}
        <View style={styles.row}>
          <View style={styles.halfField}>
            <Text style={styles.label}>Occupation</Text>
            <Dropdown
              field="occupation"
              value={occupation}
              options={occupationOptions}
              onSelect={setOccupation}
            />
          </View>
          <View style={styles.halfField}>
            <Text style={styles.label}>Source of Income</Text>
            <Dropdown
              field="sourceOfIncome"
              value={sourceOfIncome}
              options={sourceOfIncomeOptions}
              onSelect={setSourceOfIncome}
            />
          </View>
        </View>

        {/* Income + Nationality */}
        <View style={styles.row}>
          <View style={styles.halfField}>
            <Text style={styles.label}>Income</Text>
            <Dropdown
              field="income"
              value={income}
              options={incomeOptions}
              onSelect={setIncome}
            />
          </View>
          <View style={styles.halfField}>
            <Text style={styles.label}>Nationality</Text>
            <Dropdown
              field="nationality"
              value={nationality}
              options={nationalityOptions}
              onSelect={setNationality}
            />
          </View>
        </View>

        <View style={{height: 100}} />
      </ScrollView>

      {/* Footer Submit */}
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
    color: '#1A1A2E',
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

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A2E',
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
    height: 50,
  },

  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    paddingHorizontal: 14,
    backgroundColor: '#FFFFFF',
    height: 50,
  },
  dateInput: {
    flex: 1,
    fontSize: 14,
    color: '#1A1A2E',
  },
  calendarIcon: {
    fontSize: 16,
  },

  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    paddingHorizontal: 14,
    height: 50,
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
    fontSize: 11,
    color: '#555555',
  },
  dropdownList: {
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    marginTop: 4,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 8,
    zIndex: 999,
  },
  dropdownItem: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#F0F0F0',
  },
  dropdownItemActive: {
    backgroundColor: '#EEF2FF',
  },
  dropdownItemText: {
    fontSize: 13,
    color: '#444444',
  },
  dropdownItemTextActive: {
    color: Colors.primaryBlue,
    fontWeight: '600',
  },

  fileUploadContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    paddingHorizontal: 8,
    height: 50,
    backgroundColor: '#FFFFFF',
    gap: 8,
  },
  chooseFileBtn: {
    borderWidth: 1.5,
    borderColor: Colors.primaryBlue,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  chooseFileBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.primaryBlue,
  },
  fileNameText: {
    fontSize: 12,
    color: '#BBBBBB',
    flex: 1,
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

export default KYCPersonalInfoScreen;