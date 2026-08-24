import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii } from '../theme/tokens';

export function SearchBar({
  value,
  onChangeText,
  placeholder = 'Rezepte durchsuchen',
}: {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}) {
  return (
    <View style={styles.box}>
      <Ionicons name="search" size={16} color={colors.meta} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.meta}
        style={styles.input}
        returnKeyType="search"
        autoCorrect={false}
      />
      {value.length > 0 && (
        <Pressable hitSlop={8} onPress={() => onChangeText('')}>
          <Ionicons name="close-circle" size={16} color={colors.meta} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderChip,
    borderRadius: radii.pill,
    paddingHorizontal: 14,
    height: 42,
  },
  input: {
    flex: 1,
    fontSize: 14.5,
    color: colors.ink,
    height: '100%',
  },
});
