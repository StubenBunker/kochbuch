import { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, usePathname } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts, radii, shadow } from '../theme/tokens';
import { DEFAULT_PORTIONS, useHousehold } from '../store/household';
import { buildShoppingList } from '../utils/shopping';

type Section = {
  path: '/' | '/woche' | '/liste' | '/favoriten';
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
};

const SECTIONS: Section[] = [
  { path: '/', label: 'Rezepte', icon: 'grid-outline' },
  { path: '/woche', label: 'Woche', icon: 'calendar-outline' },
  { path: '/liste', label: 'Liste', icon: 'list-outline' },
  { path: '/favoriten', label: 'Favoriten', icon: 'heart-outline' },
];

export function NavMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  const plan = useHousehold((s) => s.plan);
  const portions = useHousehold((s) => s.portions);
  const checked = useHousehold((s) => s.checked);

  const weekCount = plan.length;
  const listUnchecked = buildShoppingList(plan, portions, DEFAULT_PORTIONS)
    .flatMap((g) => g.items)
    .filter((item) => !checked[item.key]).length;

  const badges: Partial<Record<Section['path'], number>> = {
    '/woche': weekCount,
    '/liste': listUnchecked,
  };

  const current = SECTIONS.find((s) => s.path === pathname) ?? SECTIONS[0];

  return (
    <>
      <Pressable style={styles.trigger} onPress={() => setOpen(true)}>
        <Text style={styles.triggerText}>{current.label}</Text>
        <Ionicons name="chevron-down" size={14} color={colors.ink} />
      </Pressable>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={StyleSheet.absoluteFill} onPress={() => setOpen(false)}>
          <View style={[styles.panel, { top: insets.top + 58 }]}>
            {SECTIONS.map((section) => {
              const active = section.path === pathname;
              const badge = badges[section.path];
              return (
                <Pressable
                  key={section.path}
                  style={[styles.row, active && styles.rowActive]}
                  onPress={() => {
                    setOpen(false);
                    router.replace(section.path);
                  }}
                >
                  <Ionicons
                    name={section.icon}
                    size={18}
                    color={active ? colors.accent : colors.inkMuted}
                  />
                  <Text style={[styles.rowLabel, active && styles.rowLabelActive]}>
                    {section.label}
                  </Text>
                  {!!badge && (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>{badge}</Text>
                    </View>
                  )}
                </Pressable>
              );
            })}
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderChip,
    borderRadius: 999,
    paddingVertical: 9,
    paddingHorizontal: 14,
  },
  triggerText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.ink,
  },
  panel: {
    position: 'absolute',
    right: 18,
    width: 200,
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.hairline,
    padding: 6,
    ...shadow.card,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 11,
    paddingHorizontal: 10,
    borderRadius: radii.sm,
  },
  rowActive: {
    backgroundColor: 'rgba(46,94,67,0.12)',
  },
  rowLabel: {
    flex: 1,
    fontSize: 14.5,
    fontWeight: '500',
    color: colors.ink,
  },
  rowLabelActive: {
    fontWeight: '600',
    color: colors.accent,
  },
  badge: {
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    paddingHorizontal: 4,
    backgroundColor: colors.terracotta,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontFamily: fonts.mono,
    fontSize: 9.5,
    color: '#FFF',
  },
});
