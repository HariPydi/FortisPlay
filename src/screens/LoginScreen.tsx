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
import { Colors } from '../styles/colors';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
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
      source={require('../assets/images/login-bg.jpg')}
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
              source={require('../assets/images/headerLogo.png')}
              style={styles.headerLogo}
              resizeMode="contain"
            />

            {/* Card */}
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
                />
              </View>

              <Text style={styles.inputLabel}>Password</Text>
              <View style={styles.inputContainer}>
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
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
  },
  headerLogo: {
    minHeight: 40,
    width: 326,
  },
  card: {
    width: '100%',
    backgroundColor: Colors.cardBackground,
    borderRadius: 22,
    paddingHorizontal: 28,
    paddingVertical: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.09,
    shadowRadius: 18,
    elevation: 10,
  },
  cardTitle: {
    fontFamily: 'Manrope',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 36,
    letterSpacing: -0.4,
    color: Colors.textDark,
    textAlign: 'center',
    marginBottom: 6,
  },
  cardSubtitle: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 18.2,
    letterSpacing: 0,
    color: '#4A4E64',
    textAlign: 'center',
    marginBottom: 28,
  },
  inputLabel: {
    fontFamily: 'Manrope',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
    letterSpacing: 0,
    color: Colors.textDark,
    marginBottom: 7,
    marginTop: 2,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.inputBackground,
    borderWidth: 1,
    borderColor: 'rgba(53, 58, 81, 0.3)',
    borderRadius: 8,
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
    backgroundColor: Colors.createButton,
    borderRadius: 8,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6,
    shadowColor: Colors.primaryBlue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 7,
  },
  loginButtonDisabled: {
    backgroundColor: '#90CAF9',
    elevation: 0,
  },
  loginButtonText: {
    fontFamily: 'Manrope',
    color: Colors.createButtonText,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
    letterSpacing: 0,
  },
  footerText: {
    fontFamily: 'Inter',
    marginTop: 36,
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 16,
    color: Colors.textGrey,
    textAlign: 'center',
  },
});

export default LoginScreen;