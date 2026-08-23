import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { findRecipe } from '../../src/data/recipes';
import { PortionStepper } from '../../src/components/PortionStepper';
import { RecipePhoto } from '../../src/components/RecipePhoto';
import { colors, fonts, radii } from '../../src/theme/tokens';
import { DEFAULT_PORTIONS, useHousehold } from '../../src/store/household';
import { formatAmount } from '../../src/utils/format';

export default function RecipeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const recipe = findRecipe(id);
  const insets = useSafeAreaInsets();

  const plan = useHousehold((s) => s.plan);
  const favs = useHousehold((s) => s.favs);
  const portions = useHousehold((s) => (recipe ? s.portions[recipe.id] ?? DEFAULT_PORTIONS : DEFAULT_PORTIONS));
  const setPortion = useHousehold((s) => s.setPortion);
  const toggleAdd = useHousehold((s) => s.toggleAdd);
  const toggleFav = useHousehold((s) => s.toggleFav);

  if (!recipe) {
    return (
      <View style={styles.notFound}>
        <Text>Rezept nicht gefunden.</Text>
      </View>
    );
  }

  const inWeek = plan.includes(recipe.id);
  const isFav = !!favs[recipe.id];

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scrollBody} bounces={false}>
        <RecipePhoto recipe={recipe} style={styles.hero} captionSize={11}>
          <Pressable
            style={[styles.circleButton, { position: 'absolute', top: insets.top + 18, left: 16 }]}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={17} color={colors.inkSoft} />
          </Pressable>

          <View style={[styles.heroActions, { top: insets.top + 18, right: 16 }]}>
            <Pressable
              style={[
                styles.circleButton,
                { backgroundColor: inWeek ? colors.accent : 'rgba(255,253,248,0.9)' },
              ]}
              onPress={() => toggleAdd(recipe.id)}
            >
              <Ionicons
                name={inWeek ? 'checkmark' : 'add'}
                size={19}
                color={inWeek ? colors.onAccent : colors.inkSoft}
              />
            </Pressable>

            <Pressable style={styles.circleButton} onPress={() => toggleFav(recipe.id)}>
              <Ionicons
                name={isFav ? 'heart' : 'heart-outline'}
                size={16}
                color={isFav ? colors.terracotta : colors.inkMuted}
              />
            </Pressable>
          </View>
        </RecipePhoto>

        <View style={styles.content}>
          <Text style={styles.eyebrow}>
            {recipe.category} · {recipe.minutes} Min
          </Text>
          <Text style={styles.title}>{recipe.title}</Text>
          <Text style={styles.description}>{recipe.description}</Text>

          <View style={styles.portionCard}>
            <Text style={styles.portionLabel}>Portionen</Text>
            <PortionStepper
              variant="detail"
              value={portions}
              onDecrease={() => setPortion(recipe.id, -1)}
              onIncrease={() => setPortion(recipe.id, 1)}
            />
          </View>

          <Text style={styles.sectionHeading}>Zutaten</Text>
          <View>
            {recipe.ingredients.map((ing, index) => (
              <View
                key={`${ing.name}-${ing.unit}`}
                style={[styles.ingredientRow, index > 0 && styles.ingredientBorder]}
              >
                <Text style={styles.ingredientName}>{ing.name}</Text>
                <Text style={styles.ingredientAmount}>
                  {formatAmount(ing.amount * portions)} {ing.unit}
                </Text>
              </View>
            ))}
          </View>

          {recipe.alternatives && (
            <>
              <Text style={styles.sectionHeading}>Alternativen</Text>
              <Text style={styles.alternativesText}>{recipe.alternatives}</Text>
            </>
          )}

          <Text style={styles.sectionHeading}>Zubereitung</Text>
          <View style={styles.steps}>
            {recipe.steps.map((step, index) => (
              <View key={index} style={styles.stepRow}>
                <Text style={styles.stepNumber}>{index + 1}</Text>
                <Text style={styles.stepText}>{step}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollBody: {
    paddingBottom: 40,
  },
  hero: {
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,253,248,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroActions: {
    position: 'absolute',
    flexDirection: 'row',
    gap: 10,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 22,
  },
  eyebrow: {
    fontFamily: fonts.mono,
    fontSize: 10.5,
    letterSpacing: 1.3,
    textTransform: 'uppercase',
    color: colors.accent,
  },
  title: {
    fontFamily: fonts.serif,
    fontSize: 34,
    lineHeight: 37,
    marginTop: 10,
    color: colors.ink,
  },
  description: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 22,
    color: colors.bodyMuted,
  },
  portionCard: {
    marginTop: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.hairline,
    borderRadius: radii.portionCard,
    padding: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  portionLabel: {
    fontSize: 14.5,
    fontWeight: '600',
    color: colors.ink,
  },
  sectionHeading: {
    marginTop: 26,
    fontFamily: fonts.mono,
    fontSize: 10.5,
    letterSpacing: 1.3,
    textTransform: 'uppercase',
    color: colors.meta,
    marginBottom: 4,
  },
  ingredientRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 10,
    paddingVertical: 9,
  },
  ingredientBorder: {
    borderTopWidth: 1,
    borderTopColor: colors.hairline,
  },
  ingredientName: {
    flex: 1,
    fontSize: 15,
    color: colors.ink,
  },
  ingredientAmount: {
    fontFamily: fonts.mono,
    fontSize: 13,
    color: colors.accent,
  },
  alternativesText: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.bodyMuted,
  },
  steps: {
    gap: 16,
  },
  stepRow: {
    flexDirection: 'row',
    gap: 12,
  },
  stepNumber: {
    fontFamily: fonts.serif,
    fontSize: 24,
    width: 26,
    color: colors.terracotta,
  },
  stepText: {
    flex: 1,
    fontSize: 14.5,
    lineHeight: 22,
    color: colors.inkSoft,
  },
});
