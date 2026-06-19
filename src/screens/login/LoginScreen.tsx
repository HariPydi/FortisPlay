import React, { useState } from 'react';
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
  ImageBackground,
  Image,
} from 'react-native';
import { Colors } from '../../styles/colors';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
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
    <ImageBackground
      source={require('../../assets/images/login-bg.jpg')}
      style={styles.bgImage}
      resizeMode="cover">
      <SafeAreaView style={styles.safeArea}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>

            {/* Logo */}
            <Image
              source={require('../../assets/images/headerLogo.png')}
              style={styles.headerLogo}
              resizeMode="contain"
            />

            {/* Card */}
            <View style={styles.card}>
              <View style={styles.textContainer}>
                <Text style={styles.cardTitle}>Admin</Text>
                <Text style={styles.cardSubtitle}>
                  Enter your credentials to continue
                </Text>
              </View>

              <View style={styles.formContainer}>
                <View style={styles.inputGroup}>
                  <View style={styles.formRow}>
                    <Text style={styles.inputLabel}>User ID</Text>
                    <View style={[styles.baseInputContainer, styles.inputContainer]}>
                      <TextInput
                        style={styles.textInput}
                        placeholder="Card ID"
                        placeholderTextColor={Colors.inputPlaceholder}
                        value={userId}
                        onChangeText={(text: string) => setUserId(text)}
                        autoCapitalize="none"
                        autoCorrect={false}
                      />
                    </View>
                  </View>

                  <View style={styles.formRow}>
                    <Text style={styles.inputLabel}>Password</Text>
                    <View style={[styles.baseInputContainer, styles.passwordContainer]}>
                      <TextInput
                        style={styles.textInput}
                        placeholder="••••••••"
                        placeholderTextColor={Colors.passwordPlaceholder}
                        value={password}
                        onChangeText={(text: string) => setPassword(text)}
                        secureTextEntry={!showPassword}
                        autoCapitalize="none"
                        autoCorrect={false}
                      />
                      <TouchableOpacity
                        style={styles.eyeButton}
                        onPress={() => setShowPassword(prev => !prev)}
                        activeOpacity={0.7}>
                        <Text style={styles.eyeIcon}>
                          {/* {showPassword ? '🙈' : '👁️'} */}
                          {showPassword ? '🔒' : '👁️'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                <TouchableOpacity
                  style={[
                    styles.loginButton,
                    loading && styles.loginButtonDisabled,
                  ]}
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
            </View>

            <Text style={styles.footerText}>© 2026 FortisPlay.</Text>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flexGrow: 1,
    alignItems: 'center',
    padding: 32,
  },
  headerLogo: {
    width: '100%',
  },
  card: {
    width: '100%',
    maxWidth: 448,
    backgroundColor: Colors.cardBackground,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 32,
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
  textContainer: {
    gap: 16,
  },
  cardTitle: {
    fontFamily: 'Manrope',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 36,
    letterSpacing: -0.4,
    textAlign: 'center',
    color: '#353A51',
  },
  cardSubtitle: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 18,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#4A4E64',
  },
  formContainer: {
    gap: 32,
  },
  inputGroup: {
    gap: 24,
  },
  formRow: {
    gap: 6.5,
  },
  inputLabel: {
    fontFamily: 'Manrope',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
    letterSpacing: 0,
    color: '#353A51',
  },
  baseInputContainer: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(53, 58, 81, 0.3)',
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  inputContainer: {
    paddingVertical: 12,
  },
  passwordContainer: {
  },
  textInput: {
    fontFamily: 'Manrope',
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
    backgroundColor: '#2563FF',
    borderRadius: 8,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonDisabled: {
    backgroundColor: '#90CAF9',
  },
  loginButtonText: {
    fontFamily: 'Manrope',
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
    letterSpacing: 0,
  },
  footerText: {
    fontFamily: 'Inter',
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 16,
    letterSpacing: 0,
    color: 'rgba(53, 58, 81, 0.6',
    textAlign: 'center',
  },
});

export default LoginScreen;