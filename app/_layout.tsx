import '@/i18n';
import { Picker } from '@react-native-picker/picker';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import React from 'react';
import { useTranslation } from 'react-i18next';
import 'react-native-reanimated';
import * as Linking from 'expo-linking';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Button, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import MeetingWebView from './MeetingWebView';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = React.useState(i18n.language);
  const [showMeeting, setShowMeeting] = React.useState(false);
  const [meetingUrl, setMeetingUrl] = React.useState('https://demo-ios.bigbluebutton.org');

  const handleLanguageChange = (lang: string) => {
    setSelectedLanguage(lang);
    i18n.changeLanguage(lang);
  };

  // Handle deep links
  React.useEffect(() => {
    // Handle initial URL when app is opened from a deep link
    const handleInitialURL = async () => {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) {
        handleDeepLink(initialUrl);
      }
    };

    // Handle deep links when app is already running
    const subscription = Linking.addEventListener('url', (event) => {
      handleDeepLink(event.url);
    });

    handleInitialURL();

    return () => {
      subscription.remove();
    };
  }, []);

  const cleanupUrl = (url: string): string => {
    // Remove duplicate https:// or http:// patterns (with or without slashes)
    // e.g., "https://https://example.com" -> "https://example.com"
    // e.g., "https://https:/example.com" -> "https://example.com"
    // e.g., "https://http:example.com" -> "https://example.com"
    return url.replace(/^(https?:\/\/)(?:https?:\/?\/?)+/i, '$1');
  };

  const handleDeepLink = (url: string) => {
    // Parse the deep link URL
    // Expected format: bigbluebutton-tablet://room+name/server/path
    // Example: bigbluebutton-tablet://room+name/demo-ios-bbb30.bbb.imdt.dev/rooms/xy8-0jk-asw-v1f/join
    // The room name is legacy and not used, we extract server/path

    const parsed = Linking.parse(url);

    // Check if URL is in query parameter (backward compatibility)
    if (parsed.queryParams?.url) {
      const meetingUrlParam = Array.isArray(parsed.queryParams.url)
        ? parsed.queryParams.url[0]
        : parsed.queryParams.url;
      const decodedUrl = decodeURIComponent(meetingUrlParam);
      setMeetingUrl(cleanupUrl(decodedUrl));
      setShowMeeting(true);
    }
    // Main format: bigbluebutton-tablet://room+name/server/path
    else if (parsed.hostname && parsed.path) {
      // hostname is "room+name", path is "/server/path"
      // We need to extract server from the path and reconstruct as https://server/path
      // Decode the path first since it may contain URL-encoded characters
      const decodedPath = decodeURIComponent(parsed.path);
      const pathParts = decodedPath.split('/').filter(part => part.length > 0);

      if (pathParts.length > 0) {
        // First part after room name is the server
        const server = pathParts[0];
        // Remaining parts form the path
        const remainingPath = pathParts.slice(1).join('/');
        const meetingUrl = `https://${server}/${remainingPath}`;
        setMeetingUrl(cleanupUrl(meetingUrl));
        setShowMeeting(true);
      }
    }
    // Check if URL is in the path directly (backward compatibility)
    else if (parsed.path && parsed.path.startsWith('http')) {
      const decodedUrl = decodeURIComponent(parsed.path);
      setMeetingUrl(cleanupUrl(decodedUrl));
      setShowMeeting(true);
    }
    // Check if hostname contains the URL (backward compatibility)
    else if (parsed.hostname && parsed.hostname.includes('http')) {
      // Reconstruct the URL from hostname and path
      const fullUrl = parsed.hostname + (parsed.path || '');
      const decodedUrl = decodeURIComponent(fullUrl);
      setMeetingUrl(cleanupUrl(decodedUrl));
      setShowMeeting(true);
    }
  };

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  if (showMeeting) {
    return (
      <MeetingWebView
        url={meetingUrl}
        onClose={() => setShowMeeting(false)}
      />
    );
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ThemedView style={styles.container}>
          <KeyboardAvoidingView
            style={styles.inner}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          >
            <ThemedText type="title" style={styles.title}>
              {t('home.title')}
            </ThemedText>
            <ThemedText type="subtitle" style={styles.subtitle}>
              {t('home.subtitle')}
            </ThemedText>

            <View style={styles.card}>
              <ThemedText style={styles.inputLabel}>{t('home.inputLabel')}</ThemedText>
              <TextInput
                placeholder={t('home.inputPlaceholder')}
                autoFocus={true}
                style={styles.input}
                placeholderTextColor="#888"
                value={meetingUrl}
                onChangeText={setMeetingUrl}
                onSubmitEditing={() => setShowMeeting(true)}
              />
              <Button title={t('home.joinButton')} onPress={() => setShowMeeting(true)} color="#0a7ea4" />
            </View>

            <View style={styles.spacer} />

            {/* Language Picker */}
            {/* Removed from here */}
          </KeyboardAvoidingView>
          {/* Language Picker moved here for bottom-left alignment */}
          <View style={styles.languagePickerContainer}>
            <Picker
              selectedValue={selectedLanguage}
              onValueChange={handleLanguageChange}
              style={{ color: '#000', fontSize: 16 }}
            >
              <Picker.Item label="English" value="en" />
              <Picker.Item label="Deutsch" value="de" />
              <Picker.Item label="Português (Brasil)" value="pt-BR" />
            </Picker>
          </View>
        </ThemedView>
      </TouchableWithoutFeedback>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  inner: {
    width: '100%',
    maxWidth: 420,
    alignItems: 'center',
  },
  title: {
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    marginBottom: 24,
    textAlign: 'center',
  },
  card: {
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.04)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  inputLabel: {
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    height: 44,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  spacer: {
    height: 24,
  },
  languagePickerContainer: {
    position: 'absolute',
    left: 24,
    bottom: 24,
    width: 270,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 8,
    padding: 4,
    // Optional: add shadow for visibility
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
});
