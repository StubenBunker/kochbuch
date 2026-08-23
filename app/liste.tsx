import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../src/components/Header';
import { EmptyState } from '../src/components/EmptyState';
import { SHOPPING_CATEGORY_ORDER } from '../src/data/recipes';
import type { ShoppingCategory } from '../src/data/types';
import { colors, fonts, radii } from '../src/theme/tokens';
import { DEFAULT_PORTIONS, useHousehold } from '../src/store/household';
import { buildShoppingList, mergeCustomItems } from '../src/utils/shopping';
import { formatAmount } from '../src/utils/format';

export default function ListeScreen() {
  const plan = useHousehold((s) => s.plan);
  const portions = useHousehold((s) => s.portions);
  const cart = useHousehold((s) => s.cart);
  const checked = useHousehold((s) => s.checked);
  const customItems = useHousehold((s) => s.customItems);
  const toggleChecked = useHousehold((s) => s.toggleChecked);
  const addCustomItem = useHousehold((s) => s.addCustomItem);
  const removeCustomItem = useHousehold((s) => s.removeCustomItem);

  const [newItemText, setNewItemText] = useState('');
  const [newItemCategory, setNewItemCategory] = useState<ShoppingCategory>('Sonstiges');

  const cartIds = useMemo(() => plan.filter((id) => cart[id]), [plan, cart]);
  const groups = useMemo(
    () => mergeCustomItems(buildShoppingList(cartIds, portions, DEFAULT_PORTIONS), customItems),
    [cartIds, portions, customItems],
  );
  const allItems = useMemo(() => groups.flatMap((g) => g.items), [groups]);
  const checkedCount = allItems.filter((item) => checked[item.key]).length;
  const total = allItems.length;
  const progress = total > 0 ? checkedCount / total : 0;

  function submitNewItem() {
    const trimmed = newItemText.trim();
    if (!trimmed) return;
    addCustomItem(trimmed, newItemCategory);
    setNewItemText('');
    setNewItemCategory('Sonstiges');
  }

  return (
    <View style={styles.screen}>
      <Header
        title="Einkaufsliste"
        subtitle={`${checkedCount} VON ${total} ERLEDIGT · AUS ${cartIds.length} REZEPTEN`}
        bottomSpacing={14}
      >
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
        </View>
      </Header>

      <ScrollView contentContainerStyle={styles.groups} bounces={false}>
        <View style={styles.addRow}>
          <TextInput
            value={newItemText}
            onChangeText={setNewItemText}
            onSubmitEditing={submitNewItem}
            placeholder="Artikel hinzufügen…"
            placeholderTextColor={colors.meta}
            returnKeyType="done"
            style={styles.addInput}
          />
          <Pressable style={styles.addButton} onPress={submitNewItem}>
            <Ionicons name="add" size={20} color={colors.onAccent} />
          </Pressable>
        </View>

        {newItemText.length > 0 && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            bounces={false}
            contentContainerStyle={styles.categoryRow}
          >
            {SHOPPING_CATEGORY_ORDER.map((cat) => {
              const active = cat === newItemCategory;
              return (
                <Pressable
                  key={cat}
                  onPress={() => setNewItemCategory(cat)}
                  style={[styles.categoryChip, active && styles.categoryChipActive]}
                >
                  <Text style={[styles.categoryChipText, active && styles.categoryChipTextActive]}>
                    {cat}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        )}

        {total === 0 ? (
          <EmptyState
            lines={
              plan.length === 0
                ? ['Die Liste füllt sich automatisch,', 'sobald Rezepte in der Woche sind.']
                : ['Wähle bei "Diese Woche" per Warenkorb-Symbol,', 'wofür du einkaufen willst.']
            }
          />
        ) : (
          groups.map((group) => (
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
                      {item.custom ? (
                        <Pressable
                          hitSlop={10}
                          onPress={(e) => {
                            e.stopPropagation();
                            removeCustomItem(item.key.replace('custom:', ''));
                          }}
                        >
                          <Ionicons name="close" size={16} color={colors.disabled} />
                        </Pressable>
                      ) : (
                        <Text style={[styles.itemAmount, isChecked && styles.strike]}>
                          {formatAmount(item.amount)} {item.unit}
                        </Text>
                      )}
                    </Pressable>
                  );
                })}
              </View>
            </View>
          ))
        )}
      </ScrollView>
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
  addRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  addInput: {
    flex: 1,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.hairline,
    borderRadius: radii.lg,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 14.5,
    color: colors.ink,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryRow: {
    gap: 8,
    marginTop: -10,
  },
  categoryChip: {
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.borderChip,
  },
  categoryChipActive: {
    backgroundColor: colors.ink,
    borderColor: colors.ink,
  },
  categoryChipText: {
    fontSize: 12.5,
    fontWeight: '500',
    color: colors.inkMuted,
  },
  categoryChipTextActive: {
    color: colors.onAccent,
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
