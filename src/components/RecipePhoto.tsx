import type { PropsWithChildren } from 'react';
import { Image, StyleSheet, Text, View, type ViewStyle } from 'react-native';
import type { Recipe } from '../data/types';
import { fonts } from '../theme/tokens';

type Props = PropsWithChildren<{
  recipe: Recipe;
  style: ViewStyle;
  captionSize?: number;
  showCaption?: boolean;
}>;

// Fixed-size frame so every card/hero/thumbnail crops to the same box instead of
// stretching — real photos use resizeMode="cover", the placeholder keeps the tint block.
export function RecipePhoto({ recipe, style, captionSize = 10, showCaption = true, children }: Props) {
  return (
    <View style={[styles.frame, style, { backgroundColor: recipe.tint }]}>
      {recipe.photo ? (
        <Image
          source={recipe.photo}
          style={[StyleSheet.absoluteFill, { width: '100%', height: '100%' }]}
          resizeMode="cover"
        />
      ) : showCaption ? (
        <Text style={[styles.caption, { fontSize: captionSize }]}>Foto: {recipe.title}</Text>
      ) : null}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  caption: {
    fontFamily: fonts.mono,
    color: 'rgba(23,21,15,0.42)',
  },
});
