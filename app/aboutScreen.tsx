// AboutScreen renders a thin tagline banner pinned to the bottom of the
// main map screen. Kept intentionally short — the full About copy lives
// elsewhere; this is a one-line "what is this app" cue for new users.
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from './constants/theme';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text} numberOfLines={1} accessibilityRole="text">
        {"SDSU Maps · tap a pin to see what's happening on campus"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.scarlet,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    paddingHorizontal: spacing.md,
  },
  text: {
    ...typography.caption,
    color: colors.scarletInk,
  },
});
