import { useState } from "react";
import { Modal, Pressable, Text, useWindowDimensions, View } from "react-native";
import EventList from "./components/EventList";
import { colors, radius, spacing, tap, typography } from "./constants/theme";
import { MOCK_EVENTS } from "./utils/mockEvents";

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

            {/* TODO(brandon/B5): replace MOCK_EVENTS + loading=false with live Firebase data */}
            <View style={{ flex: 1, marginBottom: spacing.lg }}>
              <EventList events={MOCK_EVENTS} loading={false} />
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
};
