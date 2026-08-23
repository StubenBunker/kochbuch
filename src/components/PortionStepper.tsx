import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts } from '../theme/tokens';

type Props = {
  value: number;
  onDecrease: () => void;
  onIncrease: () => void;
  variant: 'detail' | 'plan';
};

export function PortionStepper({ value, onDecrease, onIncrease, variant }: Props) {
  const isDetail = variant === 'detail';
  const circleSize = isDetail ? 34 : 26;
  const iconSize = isDetail ? 18 : 15;
  const gap = isDetail ? 14 : 10;

  return (
    <View style={[styles.row, { gap }]}>
      <Pressable
        hitSlop={10}
        onPress={(e) => {
          e.stopPropagation();
          onDecrease();
        }}
        style={[styles.circle, { width: circleSize, height: circleSize, borderRadius: circleSize / 2 }]}
      >
        <Ionicons name="remove" size={iconSize} color={colors.inkMuted} />
      </Pressable>
      {isDetail ? (
        <Text style={styles.countDetail}>{value}</Text>
      ) : (
        <Text style={styles.countPlan}>{value} Portionen</Text>
      )}
      <Pressable
        hitSlop={10}
        onPress={(e) => {
          e.stopPropagation();
          onIncrease();
        }}
        style={[styles.circle, { width: circleSize, height: circleSize, borderRadius: circleSize / 2 }]}
      >
        <Ionicons name="add" size={iconSize} color={colors.inkMuted} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countDetail: {
    fontFamily: fonts.serif,
    fontSize: 26,
    minWidth: 26,
    textAlign: 'center',
    color: colors.ink,
  },
  countPlan: {
    fontFamily: fonts.mono,
    fontSize: 11.5,
    minWidth: 78,
    textAlign: 'center',
    color: colors.inkMuted,
  },
});
