import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { colors, fonts } from '../theme/tokens';

type Props = {
  value: number;
  onChange: (value: number) => void;
};

// Free-form multiplier for `fixedYield`-Rezepte (z.B. 1.32 für eine 23-cm-
// statt 20-cm-Springform) — anders als die Portionenzahl kein Stepper mit
// festen Schritten, da der Faktor meist extern ausgerechnet wird (Flächen-
// verhältnis o.Ä.) und beliebig genau sein kann.
export function YieldFactorInput({ value, onChange }: Props) {
  const [text, setText] = useState(formatFactor(value));

  useEffect(() => {
    setText(formatFactor(value));
  }, [value]);

  function commit() {
    const parsed = Number.parseFloat(text.replace(',', '.'));
    if (Number.isFinite(parsed) && parsed > 0) {
      onChange(parsed);
    } else {
      setText(formatFactor(value));
    }
  }

  return (
    <View style={styles.row}>
      <Text style={styles.times}>×</Text>
      <TextInput
        value={text}
        onChangeText={setText}
        onBlur={commit}
        onSubmitEditing={commit}
        keyboardType="decimal-pad"
        returnKeyType="done"
        style={styles.input}
      />
    </View>
  );
}

function formatFactor(value: number): string {
  return Number.isInteger(value) ? String(value) : String(value).replace('.', ',');
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  times: {
    fontFamily: fonts.mono,
    fontSize: 13,
    color: colors.inkMuted,
  },
  input: {
    fontFamily: fonts.mono,
    fontSize: 13,
    color: colors.accent,
    minWidth: 34,
    textAlign: 'right',
    paddingVertical: 2,
  },
});
