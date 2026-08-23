import { StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { colors, fonts } from '../../src/theme/tokens';
import { DEFAULT_PORTIONS, useHousehold } from '../../src/store/household';
import { buildShoppingList } from '../../src/utils/shopping';
import { useBottomSafeArea } from '../../src/utils/safeArea';

export default function TabsLayout() {
  const bottomInset = useBottomSafeArea();
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
          height: 50 + bottomInset,
          paddingTop: 7,
          paddingBottom: bottomInset,
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
          tabBarIcon: ({ color }) => <Ionicons name="grid-outline" size={17} color={color} />,
        }}
      />
      <Tabs.Screen
        name="woche"
        options={{
          title: 'Woche',
          tabBarBadge: weekCount > 0 ? weekCount : undefined,
          tabBarIcon: ({ color }) => <Ionicons name="calendar-outline" size={17} color={color} />,
        }}
      />
      <Tabs.Screen
        name="liste"
        options={{
          title: 'Liste',
          tabBarBadge: listUnchecked > 0 ? listUnchecked : undefined,
          tabBarIcon: ({ color }) => <Ionicons name="list-outline" size={17} color={color} />,
        }}
      />
      <Tabs.Screen
        name="favoriten"
        options={{
          title: 'Favoriten',
          tabBarIcon: ({ color }) => <Ionicons name="heart-outline" size={17} color={color} />,
        }}
      />
    </Tabs>
  );
}
