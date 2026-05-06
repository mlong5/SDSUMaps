import { useState } from 'react';
import {
  ImageSourcePropType,
  Modal,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
  ViewStyle
} from 'react-native';
import EventList from './components/EventList';
import { colors, radius, spacing, tap, typography } from './constants/theme';
import ImageC from './image';
import { MOCK_EVENTS } from './utils/mockEvents';

type PinDetailsProps = {
  source: ImageSourcePropType;
  style: StyleProp<ViewStyle>;
  location: string;
};

export default function PinDetails({ source, style, location }: PinDetailsProps) {
  const { width } = useWindowDimensions();
  const [modalVis, setModalVis] = useState(false);
  const events = MOCK_EVENTS.filter(e => e.location === location);

  return (
    <>
      <TouchableOpacity
        style={[styles.wrapper, style]}
        onPress={() => setModalVis(true)}
        activeOpacity={0.7}
      >
        <ImageC
          source={source}
          style={styles.image}
          contentFit="contain"
        />
      </TouchableOpacity>

      <Modal
        visible={modalVis}
        animationType="fade"
        transparent
        onRequestClose={() => setModalVis(false)}
        supportedOrientations={["portrait", "portrait-upside-down", "landscape", "landscape-left", "landscape-right"]}
      >
        <Pressable
          onPress={() => setModalVis(false)}
          style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: colors.overlay }}
          accessibilityLabel={`Close ${location} events`}
        >
          <Pressable
            onPress={(e) => e.stopPropagation?.()}
            style={{
              width: Math.min(width * 0.85, 360),
              backgroundColor: colors.white,
              borderRadius: radius.lg,
              paddingTop: spacing.lg,
              paddingBottom: spacing.lg,
              paddingHorizontal: spacing.lg,
              maxHeight: 420,
            }}
          >
            <Pressable
              onPress={() => setModalVis(false)}
              accessibilityRole="button"
              accessibilityLabel="Close dialog"
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              style={{
                position: "absolute",
                top: spacing.sm,
                right: spacing.sm,
                width: tap.minSize,
                height: tap.minSize,
                alignItems: "center",
                justifyContent: "center",
                zIndex: 2,
              }}
            >
              <Text style={{ ...typography.h3, color: colors.neutral600 }}>×</Text>
            </Pressable>

            <Text style={{ ...typography.h3, color: colors.neutral900, marginBottom: spacing.sm, marginRight: tap.minSize }}>
              {location}
            </Text>
            <View style={{ flex: 0 }}>
              <EventList events={events} loading={false} />
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    zIndex: 999,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
