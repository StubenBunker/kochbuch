import { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { findRecipe } from '../../src/data/recipes';
import { Header } from '../../src/components/Header';
import { EmptyState } from '../../src/components/EmptyState';
import { PortionStepper } from '../../src/components/PortionStepper';
import { RecipePhoto } from '../../src/components/RecipePhoto';
import { colors, fonts, radii } from '../../src/theme/tokens';
import { DEFAULT_PORTIONS, useHousehold } from '../../src/store/household';
import { buildShoppingList } from '../../src/utils/shopping';

export default function WocheScreen() {
  const plan = useHousehold((s) => s.plan);
  const portions = useHousehold((s) => s.portions);
  const setPortion = useHousehold((s) => s.setPortion);
  const removeFromPlan = useHousehold((s) => s.removeFromPlan);
  const portionFor = (id: string) => portions[id] ?? DEFAULT_PORTIONS;

  const planRecipes = useMemo(
    () => plan.map((id) => findRecipe(id)).filter((r): r is NonNullable<typeof r> => !!r),
    [plan],
  );

  const totalPortions = planRecipes.reduce((sum, r) => sum + portionFor(r.id), 0);
  const shoppingLineCount = useMemo(
    () => buildShoppingList(plan, portions, DEFAULT_PORTIONS).flatMap((g) => g.items).length,
    [plan, portions],
  );

  return (
    <View style={styles.screen}>
      <Header
        title="Diese Woche"
        subtitle={`${planRecipes.length} REZEPTE · ${totalPortions} PORTIONEN`}
        bottomSpacing={16}
      />

      {planRecipes.length === 0 ? (
        <EmptyState lines={['Noch keine Rezepte geplant.', 'Tippe das + in der Galerie.']} />
      ) : (
        <ScrollView contentContainerStyle={styles.list}>
          {planRecipes.map((recipe) => (
            <View key={recipe.id} style={styles.rowCard}>
              <RecipePhoto recipe={recipe} style={styles.thumb} showCaption={false} />
              <View style={styles.rowBody}>
                <Text style={styles.rowTitle} numberOfLines={2}>
                  {recipe.title}
                </Text>
                <PortionStepper
                  variant="plan"
                  value={portionFor(recipe.id)}
                  onDecrease={() => setPortion(recipe.id, -1)}
                  onIncrease={() => setPortion(recipe.id, 1)}
                />
              </View>
              <Pressable hitSlop={12} onPress={() => removeFromPlan(recipe.id)} style={styles.removeButton}>
                <Ionicons name="close" size={18} color={colors.disabled} />
              </Pressable>
            </View>
          ))}

          <Pressable style={styles.cta} onPress={() => router.navigate('/liste')}>
            <Text style={styles.ctaText}>Einkaufsliste ansehen · {shoppingLineCount} Zutaten</Text>
          </Pressable>
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
  list: {
    paddingHorizontal: 18,
    gap: 10,
    paddingBottom: 100,
  },
  rowCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.hairlineSoft,
  },
  thumb: {
    width: 62,
    height: 62,
    borderRadius: radii.sm,
  },
  rowBody: {
    flex: 1,
    gap: 8,
  },
  rowTitle: {
    fontSize: 14.5,
    fontWeight: '600',
    lineHeight: 18,
    color: colors.ink,
  },
  removeButton: {
    padding: 6,
  },
  cta: {
    marginTop: 10,
    backgroundColor: colors.accent,
    borderRadius: radii.lg,
    paddingVertical: 17,
    alignItems: 'center',
  },
  ctaText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.onAccent,
  },
});
