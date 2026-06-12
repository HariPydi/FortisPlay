import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {Colors} from '../styles/colors';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

const LoginScreen: React.FC<Props> = ({navigation}) => {
  const [userId, setUserId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = (): void => {
    if (!userId.trim()) {
      Alert.alert('Error', 'Please enter Card ID ');
      return;
    }
    if (!password.trim()) {
      Alert.alert('Error', 'Please enter Password ');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('Dashboard');
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.safeArea}>          {/* ← SafeAreaView outer */}
      <StatusBar barStyle="dark-content" backgroundColor={Colors.backgroundTop} />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>

          <View style={styles.topSection}>
            <View style={styles.logoContainer}>
              <View style={styles.logoOuter}>
                <View style={styles.logoInner}>
                  <Text style={styles.logoLetter}>F</Text>
                </View>
              </View>
            </View>
            <Text style={styles.brandName}>FortisPlay</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Admin</Text>
            <Text style={styles.cardSubtitle}>
              Enter your credentials to continue
            </Text>

            <Text style={styles.inputLabel}>User ID</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Card ID"
                placeholderTextColor={Colors.inputPlaceholder}
                value={userId}
                onChangeText={(text: string) => setUserId(text)}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="default"
              />
            </View>

            <Text style={styles.inputLabel}>Password</Text>
            <View style={styles.inputContainer}>
            <TextInput
  style={styles.textInput}
  placeholder="••••••••"
  placeholderTextColor={Colors.inputPlaceholder}
  value={password}
  onChangeText={(text: string) => setPassword(text)}
  secureTextEntry={false}
  autoCapitalize="none"
  autoCorrect={false}
/>
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowPassword((prev: boolean) => !prev)}
                activeOpacity={0.7}>
                <Text style={styles.eyeIcon}>{showPassword ? '🔒' : '👁️'}</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.loginButton, loading && styles.loginButtonDisabled]}
              onPress={handleLogin}
              disabled={loading}
              activeOpacity={0.85}>
              {loading ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <Text style={styles.loginButtonText}>Login</Text>
              )}
            </TouchableOpacity>
          </View>

          <Text style={styles.footerText}>© 2026 FortisPlay.</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.backgroundTop,   // ← SafeAreaView gets bg color
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  topSection: {
    alignItems: 'center',
    marginTop: 70,
    marginBottom: 32,
  },
  logoContainer: {
    marginBottom: 14,
  },
  logoOuter: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: Colors.logoBlue,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  logoInner: {
    width: 38,
    height: 38,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoLetter: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  brandName: {
    fontSize: 22,
    fontWeight: '600',
    color: Colors.textDark,
    letterSpacing: 0.5,
  },
  card: {
    width: '100%',
    backgroundColor: Colors.cardBackground,
    borderRadius: 22,
    paddingHorizontal: 28,
    paddingVertical: 32,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.09,
    shadowRadius: 18,
    elevation: 10,
  },
  cardTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: Colors.textDark,
    textAlign: 'center',
    marginBottom: 6,
  },
  cardSubtitle: {
    fontSize: 13,
    color: Colors.textGrey,
    textAlign: 'center',
    marginBottom: 28,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.textLabel,
    marginBottom: 7,
    marginTop: 2,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.inputBackground,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    borderRadius: 10,
    marginBottom: 18,
    paddingHorizontal: 14,
  },
  textInput: {
    flex: 1,
    height: 50,
    fontSize: 15,
    color: Colors.textDark,
  },
  eyeButton: {
    paddingLeft: 8,
    paddingVertical: 8,
  },
  eyeIcon: {
    fontSize: 18,
  },
  loginButton: {
    backgroundColor: Colors.primaryBlue,
    borderRadius: 10,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6,
    shadowColor: Colors.primaryBlue,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 7,
  },
  loginButtonDisabled: {
    backgroundColor: '#90CAF9',
    elevation: 0,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  footerText: {
    marginTop: 36,
    fontSize: 12,
    color: Colors.textGrey,
    textAlign: 'center',
  },
});

export default LoginScreen;