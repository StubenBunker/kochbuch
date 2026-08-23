import { useEffect, useCallback } from 'react';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useFonts, InstrumentSerif_400Regular } from '@expo-google-fonts/instrument-serif';
import { DMMono_400Regular, DMMono_500Medium } from '@expo-google-fonts/dm-mono';
import { colors } from '../src/theme/tokens';
import { initHouseholdSync } from '../src/store/household';

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    InstrumentSerif_400Regular,
    DMMono_400Regular,
    DMMono_500Medium,
  });

  useEffect(() => {
    initHouseholdSync();
  }, []);

  const onLayout = useCallback(() => {
    if (fontsLoaded) SplashScreen.hide();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: colors.background }} onLayout={onLayout}>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colors.background },
            animation: 'none',
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="woche" />
          <Stack.Screen name="liste" />
          <Stack.Screen name="favoriten" />
          <Stack.Screen
            name="recipe/[id]"
            options={{ presentation: 'modal', animation: 'default' }}
          />
        </Stack>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
