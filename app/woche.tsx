import { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { findRecipe } from '../src/data/recipes';
import { Header } from '../src/components/Header';
import { EmptyState } from '../src/components/EmptyState';
import { PortionStepper } from '../src/components/PortionStepper';
import { RecipePhoto } from '../src/components/RecipePhoto';
import { colors, fonts, radii } from '../src/theme/tokens';
import { DEFAULT_PORTIONS, useHousehold } from '../src/store/household';

export default function WocheScreen() {
  const plan = useHousehold((s) => s.plan);
  const portions = useHousehold((s) => s.portions);
  const cart = useHousehold((s) => s.cart);
  const setPortion = useHousehold((s) => s.setPortion);
  const removeFromPlan = useHousehold((s) => s.removeFromPlan);
  const toggleCart = useHousehold((s) => s.toggleCart);
  const portionFor = (id: string) => portions[id] ?? DEFAULT_PORTIONS;

  const planRecipes = useMemo(
    () => plan.map((id) => findRecipe(id)).filter((r): r is NonNullable<typeof r> => !!r),
    [plan],
  );

  const totalPortions = planRecipes.reduce(
    (sum, r) => sum + (r.fixedYield ? 0 : portionFor(r.id)),
    0,
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
        <ScrollView contentContainerStyle={styles.list} bounces={false}>
          {planRecipes.map((recipe) => {
            const inCart = !!cart[recipe.id];
            return (
              <Pressable
                key={recipe.id}
                style={styles.rowCard}
                onPress={() => router.push(`/recipe/${recipe.id}`)}
              >
                <RecipePhoto recipe={recipe} style={styles.thumb} showCaption={false} />
                <View style={styles.rowBody}>
                  <Text style={styles.rowTitle} numberOfLines={2}>
                    {recipe.title}
                  </Text>
                  {recipe.fixedYield ? (
                    <Text style={styles.fixedYieldLabel}>{recipe.fixedYield.label}</Text>
                  ) : (
                    <PortionStepper
                      variant="plan"
                      value={portionFor(recipe.id)}
                      onDecrease={() => setPortion(recipe.id, -1)}
                      onIncrease={() => setPortion(recipe.id, 1)}
                    />
                  )}
                </View>
                <Pressable
                  hitSlop={12}
                  onPress={(e) => {
                    e.stopPropagation();
                    toggleCart(recipe.id);
                  }}
                  style={styles.iconButton}
                >
                  <Ionicons
                    name={inCart ? 'cart' : 'cart-outline'}
                    size={19}
                    color={inCart ? colors.accent : colors.disabled}
                  />
                </Pressable>
                <Pressable
                  hitSlop={12}
                  onPress={(e) => {
                    e.stopPropagation();
                    removeFromPlan(recipe.id);
                  }}
                  style={styles.iconButton}
                >
                  <Ionicons name="close" size={18} color={colors.disabled} />
                </Pressable>
              </Pressable>
            );
          })}
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
  iconButton: {
    padding: 6,
  },
  fixedYieldLabel: {
    fontFamily: fonts.mono,
    fontSize: 11.5,
    color: colors.inkMuted,
  },
});
