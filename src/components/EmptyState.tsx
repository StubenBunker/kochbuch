import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/tokens';

export function EmptyState({ lines }: { lines: [string, string] }) {
  return (
    <View style={styles.box}>
      <Text style={styles.text}>
        {lines[0]}
        {'\n'}
        {lines[1]}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    marginHorizontal: 18,
    marginTop: 8,
    paddingVertical: 34,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'rgba(23,21,15,0.18)',
    borderRadius: 18,
    alignItems: 'center',
  },
  text: {
    fontSize: 13.5,
    lineHeight: 20,
    color: colors.meta,
    textAlign: 'center',
  },
});
