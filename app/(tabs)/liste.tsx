import { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../../src/components/Header';
import { EmptyState } from '../../src/components/EmptyState';
import { colors, fonts, radii } from '../../src/theme/tokens';
import { DEFAULT_PORTIONS, useHousehold } from '../../src/store/household';
import { buildShoppingList } from '../../src/utils/shopping';
import { formatAmount } from '../../src/utils/format';

export default function ListeScreen() {
  const plan = useHousehold((s) => s.plan);
  const portions = useHousehold((s) => s.portions);
  const checked = useHousehold((s) => s.checked);
  const toggleChecked = useHousehold((s) => s.toggleChecked);

  const groups = useMemo(
    () => buildShoppingList(plan, portions, DEFAULT_PORTIONS),
    [plan, portions],
  );
  const allItems = useMemo(() => groups.flatMap((g) => g.items), [groups]);
  const checkedCount = allItems.filter((item) => checked[item.key]).length;
  const total = allItems.length;
  const progress = total > 0 ? checkedCount / total : 0;

  return (
    <View style={styles.screen}>
      <Header
        title="Einkaufsliste"
        subtitle={`${checkedCount} VON ${total} ERLEDIGT · AUS ${plan.length} REZEPTEN`}
        bottomSpacing={14}
      >
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
        </View>
      </Header>

      {total === 0 ? (
        <EmptyState
          lines={['Die Liste füllt sich automatisch,', 'sobald Rezepte in der Woche sind.']}
        />
      ) : (
        <ScrollView contentContainerStyle={styles.groups}>
          {groups.map((group) => (
            <View key={group.category}>
              <View style={styles.groupHeader}>
                <Text style={styles.groupName}>{group.category}</Text>
                <Text style={styles.groupCount}>{group.items.length} Pos.</Text>
              </View>
              <View style={styles.groupBody}>
                {group.items.map((item, index) => {
                  const isChecked = !!checked[item.key];
                  return (
                    <Pressable
                      key={item.key}
                      onPress={() => toggleChecked(item.key)}
                      style={[
                        styles.itemRow,
                        index > 0 && styles.itemRowBorder,
                        isChecked && styles.itemRowChecked,
                      ]}
                    >
                      <View style={[styles.checkbox, isChecked && styles.checkboxChecked]}>
                        {isChecked && <Ionicons name="checkmark" size={12} color={colors.onAccent} />}
                      </View>
                      <Text
                        style={[styles.itemName, isChecked && styles.strike]}
                        numberOfLines={1}
                      >
                        {item.name}
                      </Text>
                      <Text style={[styles.itemAmount, isChecked && styles.strike]}>
                        {formatAmount(item.amount)} {item.unit}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  progressTrack: {
    marginTop: 14,
    height: 4,
    borderRadius: 99,
    backgroundColor: 'rgba(23,21,15,0.09)',
    overflow: 'hidden',
  },
  progressFill: {
    height: 4,
    borderRadius: 99,
    backgroundColor: colors.accent,
  },
  groups: {
    paddingHorizontal: 18,
    paddingTop: 10,
    gap: 22,
    paddingBottom: 100,
  },
  groupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  groupName: {
    fontFamily: fonts.mono,
    fontSize: 10.5,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: colors.accent,
  },
  groupCount: {
    fontFamily: fonts.mono,
    fontSize: 10.5,
    color: colors.disabled,
  },
  groupBody: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.hairlineSoft,
    overflow: 'hidden',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 13,
    paddingHorizontal: 14,
  },
  itemRowBorder: {
    borderTopWidth: 1,
    borderTopColor: colors.hairlineLight,
  },
  itemRowChecked: {
    opacity: 0.42,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: 'rgba(23,21,15,0.22)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  itemName: {
    flex: 1,
    fontSize: 14.5,
    color: colors.ink,
  },
  itemAmount: {
    fontFamily: fonts.mono,
    fontSize: 12,
    color: colors.metaLight,
  },
  strike: {
    textDecorationLine: 'line-through',
  },
});
