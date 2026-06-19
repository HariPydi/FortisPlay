import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  Platform,
  Image,
} from 'react-native';
import { Colors, FontFamily } from '../styles/colors';
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
const documentTypeOptions = [
  'Passport',
  'Aadhar Card',
  'Driving License',
  'Voter ID',
];
const occupationOptions = [
  'Employed',
  'Self Employed',
  'Business',
  'Student',
  'Retired',
];
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

const KYCPersonalInfoScreen: React.FC<Props> = ({ navigation }) => {
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
      firstName,
      middleName,
      lastName,
      email,
      countryCode,
      mobileNumber,
      dateOfBirth,
      nearestOutlet,
      documentType,
      documentId,
      uploadDocument,
      uploadSelfie,
      occupation,
      sourceOfIncome,
      income,
      nationality,
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
        activeOpacity={0.8}
      >
        <Text style={[styles.dropdownText, !value && styles.placeholder]}>
          {value || 'Select'}
        </Text>
        <Image
          source={require('../assets/icons/chevron-down.png')}
          style={styles.chevronDownIcon}
          resizeMode="contain"
        />
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
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.dropdownItemText,
                  value === option && styles.dropdownItemTextActive,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );

  const FileUpload = ({ value }: { label: string; value: string }) => (
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
          activeOpacity={0.7}
        >
          <Image
            source={require('../assets/icons/CloseIcon.png')}
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
              <Image
                source={require('../assets/icons/calendar.png')}
                style={styles.calendarIcon}
                resizeMode="contain"
              />
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

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Footer Submit */}
      <View style={styles.footerDivider} />
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={handleSubmit}
          activeOpacity={0.85}
        >
          <Image
            source={require('../assets/icons/PlusIcon.png')}
            style={styles.PlusIcon}
            resizeMode="contain"
          />
          <Text style={styles.submitBtnText}> Submit</Text>
        </TouchableOpacity>
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
    height: 69,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 16,
    paddingRight: 16,
    paddingBottom: 16,
    paddingLeft: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#1F232B14',
  },
  headerTitle: {
    fontFamily: 'Manrope-Bold',
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
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F4F4F4',
    justifyContent: 'center',
    alignItems: 'center',
  },

  scroll: { flex: 1 },
  scrollContent: {
    padding: 20,
  },

  row: {
    flexDirection: 'row',
    gap: 16,
    // marginBottom: 20,
  },
  halfField: {
    flex: 1,
    gap: 6,
  },

  label: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
    letterSpacing: 0,
    color: '#353A51',
    marginBottom: 8,
    textAlignVertical: 'center',
  },

  input: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#353A514D',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    fontSize: 14,
    color: '#1A1A2E',
  },
  chevronDownIcon: {
    width: 20,
    height: 20,
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
    fontFamily: 'Manrope-Regular',
    fontSize: 14,
    fontWeight: '400',
    color: '#353A5199',
    lineHeight: 14,
    letterSpacing: 0,
  },
  calendarIcon: {
    width: 20,
    height: 20,
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
    shadowOffset: { width: 0, height: 2 },
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

  // fileUploadContainer: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   borderWidth: 1.5,
  //   borderColor: '#E0E0E0',
  //   borderRadius: 10,
  //   paddingHorizontal: 8,
  //   height: 50,
  //   backgroundColor: '#FFFFFF',
  //   gap: 8,
  // },
  fileUploadContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    paddingTop: 8,
    paddingRight: 12,
    paddingBottom: 8,
    paddingLeft: 8,

    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#353A514D',

    backgroundColor: '#FFFFFF',

    gap: 8,
  },
  chooseFileBtn: {
    paddingTop: 4,
    paddingRight: 8,
    paddingBottom: 4,
    paddingLeft: 8,

    borderWidth: 1,
    borderColor: Colors.primaryBlue,
    borderRadius: 8,

    alignItems: 'center',
    justifyContent: 'center',
  },

  chooseFileBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.primaryBlue,
    borderRadius: 8,
  },
  fileNameText: {
    fontSize: 14,
    color: '#BBBBBB',
    fontWeight: 400,
    lineHeight: 14,
    flex: 1,
  },

  footer: {
    alignItems: 'flex-end',
    paddingVertical: 16,
    paddingHorizontal: 32,
    backgroundColor: '#FFFFFF',
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

export default KYCPersonalInfoScreen;
