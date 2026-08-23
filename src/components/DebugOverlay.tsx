import { useEffect, useState } from 'react';
import { Platform, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// TEMPORARY diagnostic overlay for the iOS "extra space below the tab bar in
// standalone/home-screen mode" bug. Remove once diagnosed.
export function DebugOverlay() {
  const insets = useSafeAreaInsets();
  const [webInfo, setWebInfo] = useState<Record<string, string | number>>({});

  useEffect(() => {
    if (Platform.OS !== 'web' || typeof window === 'undefined') return;
    const probe = document.createElement('div');
    probe.style.position = 'fixed';
    probe.style.bottom = '0';
    probe.style.paddingBottom = 'env(safe-area-inset-bottom)';
    document.body.appendChild(probe);
    const envBottom = getComputedStyle(probe).paddingBottom;
    probe.remove();

    setWebInfo({
      standalone: String((window.navigator as any).standalone ?? 'n/a'),
      displayModeStandalone: String(window.matchMedia('(display-mode: standalone)').matches),
      innerHeight: window.innerHeight,
      visualViewportHeight: window.visualViewport?.height ?? -1,
      docClientHeight: document.documentElement.clientHeight,
      envSafeAreaBottom: envBottom,
      devicePixelRatio: window.devicePixelRatio,
    });
  }, []);

  return (
    <View
      pointerEvents="none"
      style={{
        position: 'absolute',
        top: 4,
        left: 4,
        right: 4,
        zIndex: 9999,
        backgroundColor: 'rgba(0,0,0,0.75)',
        padding: 6,
        borderRadius: 6,
      }}
    >
      <Text style={{ color: '#0f0', fontSize: 9 }}>
        insets top/bottom: {insets.top}/{insets.bottom}
        {'\n'}
        {Object.entries(webInfo)
          .map(([k, v]) => `${k}: ${v}`)
          .join('\n')}
      </Text>
    </View>
  );
}
