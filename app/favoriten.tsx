import { useMemo } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { recipes } from '../src/data/recipes';
import { Header } from '../src/components/Header';
import { RecipeCard } from '../src/components/RecipeCard';
import { EmptyState } from '../src/components/EmptyState';
import { colors } from '../src/theme/tokens';
import { useHousehold } from '../src/store/household';

export default function FavoritenScreen() {
  const plan = useHousehold((s) => s.plan);
  const favs = useHousehold((s) => s.favs);
  const toggleAdd = useHousehold((s) => s.toggleAdd);
  const toggleFav = useHousehold((s) => s.toggleFav);

  const favRecipes = useMemo(() => recipes.filter((r) => favs[r.id]), [favs]);

  return (
    <View style={styles.screen}>
      <Header title="Favoriten" subtitle={`${favRecipes.length} GESPEICHERT`} />

      {favRecipes.length === 0 ? (
        <EmptyState lines={['Noch nichts gespeichert.', 'Tippe das ♡ auf einem Rezept.']} />
      ) : (
        <FlatList
          data={favRecipes}
          keyExtractor={(r) => r.id}
          numColumns={2}
          bounces={false}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.grid}
          renderItem={({ item }) => (
            <RecipeCard
              recipe={item}
              inWeek={plan.includes(item.id)}
              isFav
              onToggleFav={() => toggleFav(item.id)}
              onToggleWeek={() => toggleAdd(item.id)}
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  row: {
    gap: 14,
  },
  grid: {
    gap: 16,
    paddingHorizontal: 18,
    paddingBottom: 100,
  },
});
