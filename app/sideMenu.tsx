import { useState } from "react";
import { Modal, Pressable, ScrollView, Text, useWindowDimensions, View } from "react-native";
import { colors, radius, spacing, tap, typography } from "./constants/theme";

type Entry = {
  Title: string;
  Time: string;
};

// Single event row inside the side menu. Tapping is a no-op for now —
// once Brandon's eventService lands, this will navigate to a detail view.
const SideMenuEntry = (props: Entry) => (
  <Pressable
    accessibilityRole="button"
    accessibilityLabel={`${props.Title}, ${props.Time}`}
    style={({ pressed }) => ({
      width: "100%",
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      borderRadius: radius.md,
      marginBottom: spacing.sm,
      backgroundColor: pressed ? colors.neutral200 : colors.neutral100,
      minHeight: tap.minSize,
      justifyContent: "center",
    })}
  >
    <Text style={{ ...typography.bodyStrong, color: colors.neutral900 }}>{props.Title}</Text>
    <Text style={{ ...typography.caption, color: colors.neutral600 }}>{props.Time}</Text>
  </Pressable>
);

// TODO(brandon): replace this static list with live entries from eventService.
const PLACEHOLDER_EVENTS: Entry[] = [
  { Title: "Aztec Baseball Club", Time: "3:30–5:30 pm" },
  { Title: "Aztec Game Lab", Time: "2:00–5:00 pm" },
  { Title: "Aztec Game Lab", Time: "2:00–5:00 pm" },
  { Title: "Aztec Game Lab", Time: "2:00–5:00 pm" },
  { Title: "Aztec Game Lab", Time: "2:00–5:00 pm" },
  { Title: "Aztec Game Lab", Time: "2:00–5:00 pm" },
  { Title: "Aztec Game Lab", Time: "2:00–5:00 pm" },
  { Title: "Aztec Game Lab", Time: "2:00–5:00 pm" },
];

export const SideMenu = function () {
  const { width } = useWindowDimensions();
  const [sideModalVis, setSideModalVis] = useState(false);

  const panelWidth = Math.min(Math.max(width * 0.78, 260), 360);

  return (
    <>
      {/* Trigger pinned top-left of the screen. ≥44pt tap target. */}
      <Pressable
        onPress={() => setSideModalVis(true)}
        accessibilityRole="button"
        accessibilityLabel="Open events list"
        style={({ pressed }) => ({
          position: "absolute",
          top: spacing.md,
          left: spacing.md,
          minHeight: tap.minSize,
          paddingHorizontal: spacing.md,
          paddingVertical: spacing.sm,
          borderRadius: radius.md,
          backgroundColor: pressed ? colors.scarletDark : colors.scarlet,
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          shadowColor: colors.black,
          shadowOpacity: 0.18,
          shadowRadius: 6,
          shadowOffset: { width: 0, height: 2 },
          elevation: 3,
        })}
      >
        <Text style={{ ...typography.button, color: colors.scarletInk }}>Events</Text>
      </Pressable>

      <Modal
        visible={sideModalVis}
        animationType="slide"
        transparent
        onRequestClose={() => setSideModalVis(false)}
      >
        {/* Tap outside the panel to dismiss. */}
        <Pressable
          onPress={() => setSideModalVis(false)}
          accessibilityLabel="Close events list"
          style={{ flex: 1, backgroundColor: colors.overlay, flexDirection: "row" }}
        >
          <Pressable
            // Inner pressable swallows taps so the panel itself doesn't dismiss.
            onPress={(e) => e.stopPropagation?.()}
            style={{
              width: panelWidth,
              height: "100%",
              backgroundColor: colors.white,
              paddingTop: spacing.xl,
              paddingHorizontal: spacing.lg,
              shadowColor: colors.black,
              shadowOpacity: 0.2,
              shadowRadius: 12,
              shadowOffset: { width: 2, height: 0 },
              elevation: 6,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: spacing.lg }}>
              <Text style={{ ...typography.h2, color: colors.neutral900 }}>Events</Text>
              <Pressable
                onPress={() => setSideModalVis(false)}
                accessibilityRole="button"
                accessibilityLabel="Close events list"
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                style={{
                  width: tap.minSize,
                  height: tap.minSize,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: radius.pill,
                }}
              >
                <Text style={{ ...typography.h2, color: colors.neutral600 }}>×</Text>
              </Pressable>
            </View>

            <ScrollView
              style={{ flex: 1, marginBottom: spacing.lg }}
              contentContainerStyle={{ paddingBottom: spacing.xl }}
              showsVerticalScrollIndicator={false}
            >
              {PLACEHOLDER_EVENTS.map((entry, idx) => (
                <SideMenuEntry key={`${entry.Title}-${idx}`} Title={entry.Title} Time={entry.Time} />
              ))}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
};
