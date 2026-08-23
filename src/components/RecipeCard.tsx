import { Pressable, StyleSheet, Text, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import type { Recipe } from '../data/types';
import { colors, fonts, radii, shadow } from '../theme/tokens';
import { RecipePhoto } from './RecipePhoto';

type Props = {
  recipe: Recipe;
  inWeek: boolean;
  isFav: boolean;
  onToggleFav: () => void;
  onToggleWeek: () => void;
};

const GUTTER = 18;
const COLUMN_GAP = 14;

export function RecipeCard({ recipe, inWeek, isFav, onToggleFav, onToggleWeek }: Props) {
  const { width: windowWidth } = useWindowDimensions();
  // Fixed width instead of flex:1 — otherwise a lone card left over in the last
  // row (odd recipe count) stretches to fill the whole row instead of staying
  // the same size as every other card.
  const cardWidth = (windowWidth - GUTTER * 2 - COLUMN_GAP) / 2;

  return (
    <Pressable style={{ width: cardWidth }} onPress={() => router.push(`/recipe/${recipe.id}`)}>
      <RecipePhoto recipe={recipe} style={styles.photo}>
        <Pressable
          hitSlop={8}
          onPress={(e) => {
            e.stopPropagation();
            onToggleFav();
          }}
          style={styles.favButton}
        >
          <Ionicons
            name={isFav ? 'heart' : 'heart-outline'}
            size={14}
            color={isFav ? colors.terracotta : colors.meta}
          />
        </Pressable>

        <Pressable
          hitSlop={8}
          onPress={(e) => {
            e.stopPropagation();
            onToggleWeek();
          }}
          style={[
            styles.addButton,
            { backgroundColor: inWeek ? colors.accent : colors.surface },
          ]}
        >
          <Ionicons
            name={inWeek ? 'checkmark' : 'add'}
            size={19}
            color={inWeek ? colors.onAccent : colors.ink}
          />
        </Pressable>
      </RecipePhoto>

      <Text style={styles.title} numberOfLines={2}>
        {recipe.title}
      </Text>
      <Text style={styles.meta}>
        {recipe.minutes} Min · {recipe.category}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  photo: {
    height: 138,
    borderRadius: radii.lg,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  favButton: {
    position: 'absolute',
    top: 8,
    left: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.85)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow.card,
  },
  title: {
    marginTop: 9,
    fontSize: 14.5,
    fontWeight: '600',
    lineHeight: 18,
    color: colors.ink,
  },
  meta: {
    marginTop: 5,
    fontFamily: fonts.mono,
    fontSize: 10.5,
    letterSpacing: 0.4,
    color: colors.meta,
  },
});
