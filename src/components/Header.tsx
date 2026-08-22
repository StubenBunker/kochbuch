import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts } from '../theme/tokens';

export function Header({
  title,
  subtitle,
  right,
  bottomSpacing = 12,
  children,
}: {
  title: string;
  subtitle: string;
  right?: React.ReactNode;
  bottomSpacing?: number;
  children?: React.ReactNode;
}) {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: insets.top + 20, paddingHorizontal: 18, paddingBottom: bottomSpacing }}>
      <View style={styles.row}>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
        {right}
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: fonts.serif,
    fontSize: 38,
    lineHeight: 38,
    letterSpacing: -0.5,
    color: colors.ink,
  },
  subtitle: {
    fontFamily: fonts.mono,
    fontSize: 11,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: colors.meta,
    marginTop: 8,
  },
});
