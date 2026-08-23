import { useSafeAreaInsets } from 'react-native-safe-area-context';

// The tallest real iOS home-indicator inset is 34pt. When the app runs as a
// standalone PWA (Added to Home Screen), iOS/Safari sometimes reports a much
// larger `env(safe-area-inset-bottom)` — as if still reserving room for the
// browser's own bottom bar, which no longer exists in standalone mode. Capping
// at the real native maximum keeps native iOS correct and fixes the web/PWA case.
const MAX_HOME_INDICATOR_INSET = 34;

export function useBottomSafeArea(): number {
  const insets = useSafeAreaInsets();
  return Math.min(insets.bottom, MAX_HOME_INDICATOR_INSET);
}
