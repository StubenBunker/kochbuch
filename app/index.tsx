import { useMemo, useState } from 'react';
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { recipes, RECIPE_CATEGORIES } from '../src/data/recipes';
import { Header } from '../src/components/Header';
import { RecipeCard } from '../src/components/RecipeCard';
import { SearchBar } from '../src/components/SearchBar';
import { EmptyState } from '../src/components/EmptyState';
import { colors } from '../src/theme/tokens';
import { useHousehold } from '../src/store/household';

const CHIPS = ['Alle', ...RECIPE_CATEGORIES];

export default function RezepteScreen() {
  const [filter, setFilter] = useState<string>('Alle');
  const [query, setQuery] = useState('');
  const plan = useHousehold((s) => s.plan);
  const favs = useHousehold((s) => s.favs);
  const toggleAdd = useHousehold((s) => s.toggleAdd);
  const toggleFav = useHousehold((s) => s.toggleFav);

  const filtered = useMemo(() => {
    const byCategory =
      filter === 'Alle' ? recipes : recipes.filter((r) => r.categories.some((c) => c === filter));
    const q = query.trim().toLowerCase();
    if (!q) return byCategory;
    return byCategory.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.categories.some((c) => c.toLowerCase().includes(q)),
    );
  }, [filter, query]);

  return (
    <View style={styles.screen}>
      <Header title="Kochbuch" subtitle={`${recipes.length} REZEPTE`}>
        <View style={styles.searchWrap}>
          <SearchBar value={query} onChangeText={setQuery} />
        </View>
      </Header>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        style={styles.chipScroll}
        contentContainerStyle={styles.chipRow}
      >
        {CHIPS.map((chip) => {
          const active = chip === filter;
          return (
            <Pressable
              key={chip}
              onPress={() => setFilter(chip)}
              style={[styles.chip, active && styles.chipActive]}
            >
              <Text
                style={[styles.chipText, active && styles.chipTextActive]}
                numberOfLines={1}
              >
                {chip}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {filtered.length === 0 ? (
        <EmptyState lines={['Keine Rezepte gefunden.', 'Anderen Suchbegriff oder Filter probieren.']} />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(r) => r.id}
          numColumns={2}
          bounces={false}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.grid}
          renderItem={({ item }) => (
            <RecipeCard
              recipe={item}
              inWeek={plan.includes(item.id)}
              isFav={!!favs[item.id]}
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
  searchWrap: {
    marginTop: 14,
  },
  chipScroll: {
    flexGrow: 0,
    flexShrink: 0,
  },
  chipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 18,
    paddingBottom: 16,
  },
  chip: {
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.borderChip,
  },
  chipActive: {
    backgroundColor: colors.ink,
    borderColor: colors.ink,
  },
  chipText: {
    fontSize: 13,
    lineHeight: 16,
    fontWeight: '500',
    color: colors.inkMuted,
  },
  chipTextActive: {
    color: colors.onAccent,
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
