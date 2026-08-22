import { StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts } from '../../src/theme/tokens';
import { DEFAULT_PORTIONS, useHousehold } from '../../src/store/household';
import { buildShoppingList } from '../../src/utils/shopping';

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  const plan = useHousehold((s) => s.plan);
  const portions = useHousehold((s) => s.portions);
  const checked = useHousehold((s) => s.checked);

  const weekCount = plan.length;
  const listUnchecked = buildShoppingList(plan, portions, DEFAULT_PORTIONS)
    .flatMap((g) => g.items)
    .filter((item) => !checked[item.key]).length;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.tabInactive,
        tabBarBadgeStyle: {
          backgroundColor: colors.terracotta,
          color: '#FFF',
          fontFamily: fonts.mono,
          fontSize: 9.5,
        },
        tabBarLabelStyle: {
          fontSize: 10.5,
          fontWeight: '500',
        },
        tabBarStyle: {
          position: 'absolute',
          height: 62 + insets.bottom,
          paddingTop: 11,
          paddingBottom: insets.bottom,
          backgroundColor: 'transparent',
          borderTopWidth: 1,
          borderTopColor: 'rgba(23,21,15,0.08)',
        },
        tabBarBackground: () => (
          <BlurView intensity={40} tint="light" style={StyleSheet.absoluteFill} />
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Rezepte',
          tabBarIcon: ({ color, size }) => <Ionicons name="grid-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="woche"
        options={{
          title: 'Woche',
          tabBarBadge: weekCount > 0 ? weekCount : undefined,
          tabBarIcon: ({ color, size }) => <Ionicons name="calendar-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="liste"
        options={{
          title: 'Liste',
          tabBarBadge: listUnchecked > 0 ? listUnchecked : undefined,
          tabBarIcon: ({ color, size }) => <Ionicons name="list-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="favoriten"
        options={{
          title: 'Favoriten',
          tabBarIcon: ({ color, size }) => <Ionicons name="heart-outline" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
