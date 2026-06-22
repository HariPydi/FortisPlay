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
import { Colors, FontFamily } from '../../styles/colors';
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
      imageStyle={styles.bgImageStyle}
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
                        placeholderTextColor={Colors.textPrimary60}
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
                        placeholderTextColor={Colors.passwordPlaceholderText}
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
  bgImageStyle: {
    opacity: 0.8,
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
    width: 175,
    height: 40,
  },
  card: {
    width: '100%',
    maxWidth: 448,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.white50,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 32,
    gap: 40,
    shadowColor: Colors.shadowColorBlack,
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
    fontFamily: FontFamily.primaryFont,
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 36,
    letterSpacing: -0.4,
    textAlign: 'center',
    color: Colors.textPrimary,
  },
  cardSubtitle: {
    fontFamily: FontFamily.secondaryFont,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 18,
    letterSpacing: 0,
    textAlign: 'center',
    color: Colors.grey1,
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
    fontFamily: FontFamily.primaryFont,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
    letterSpacing: 0,
    color: Colors.textPrimary,
  },
  baseInputContainer: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.textPrimary30,
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  inputContainer: {
    paddingVertical: 12,
  },
  passwordContainer: {
  },
  textInput: {
    fontFamily: FontFamily.primaryFont,
    flex: 1,
    height: 50,
    fontSize: 15,
    color: Colors.textPrimary,
  },
  eyeButton: {
    paddingLeft: 8,
    paddingVertical: 8,
  },
  eyeIcon: {
    fontSize: 18,
  },
  loginButton: {
    backgroundColor: Colors.blue,
    borderRadius: 8,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonDisabled: {
    backgroundColor: '#90CAF9',
  },
  loginButtonText: {
    fontFamily: FontFamily.primaryFont,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
    letterSpacing: 0,
    color: Colors.white,
  },
  footerText: {
    fontFamily: FontFamily.secondaryFont,
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 16,
    letterSpacing: 0,
    color: Colors.textPrimary60,
    textAlign: 'center',
  },
});

export default LoginScreen;