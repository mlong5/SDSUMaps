// Main screen of the app. Renders the SDSU campus map image with interactive
// map markers (pins) overlaid on top. Tapping a pin opens a modal popup with
// event details. Also renders the AboutScreen banner at the bottom.
import { useState } from "react";
import { Platform, Pressable, ScrollView, Text, useWindowDimensions, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import AboutScreen from "./aboutScreen";
import AddEventModal from "./components/AddEventModal";
import { LOCATIONS } from "./constants/locations";
import { colors, radius, spacing, tap, typography } from "./constants/theme";
import ImageC from "./image";
import PinDetails from "./pinDetails";
import { SideMenu } from './sideMenu';

export default function Index() {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const isIOS = Platform.OS === "ios";
  const topBarHeight = 56;
  const bottomBarHeight = 50;
  const mapWidth = width;
  // Subtract notch/home-indicator insets so the ScrollView doesn't get clipped
  // under iPhone's status bar or home indicator in portrait.
  const mapHeight = Math.max(height - topBarHeight - bottomBarHeight - insets.top - insets.bottom, 0);

  const [addEventVis, setAddEventVis] = useState(false);
  const [sideMenuOpen, setSideMenuOpen] = useState(false);

  return (
    // SafeAreaView keeps top bar below the iPhone notch/status bar and the
    // floating Add Event button above the home indicator, on iOS portrait.
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }} edges={["top", "bottom"]}>
      <View style={{ flex: 1, flexDirection: "column" }}>
      <View
        style={{
          height: topBarHeight,
          width: "100%",
          backgroundColor: colors.white,
          justifyContent: "center",
          alignItems: "center",
          borderBottomWidth: 1,
          borderBottomColor: colors.neutral300,
        }}
      >
        <Text style={{ ...typography.h2, color: colors.scarlet }}>SDSU Maps</Text>
      </View>

      {/* SDSU campus map with pins anchored inside one responsive wrapper.
          minimumZoomScale=1 prevents users from pinch-zooming below the
          container size, which on iOS portrait used to leave the map
          shrunken with white space around it. */}
      <ScrollView
        style={{ width: mapWidth, height: mapHeight }}
        contentContainerStyle={{ width: mapWidth, height: mapHeight }}
        minimumZoomScale={1}
        maximumZoomScale={isIOS ? 3 : 1}
        bouncesZoom={isIOS}
        centerContent
        pinchGestureEnabled={isIOS}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
      <View style={{ width: mapWidth, height: mapHeight, position: "relative" }}>
        {/* TASK C1: campus map is now bundled locally instead of fetched from
            an external URL (faster load, works offline, and lets us swap in
            a higher-res official SDSU map by replacing this single asset).
            TODO(bryan): replace sdsu_campus_map.jpg with a higher-resolution
            export from https://map.sdsu.edu before final submission. */}
        <ImageC
          source={require("../assets/images/sdsu_campus_map.jpg")}
          style={{
            width: "100%",
            height: "100%",
          }}
          contentFit="contain"
        />

        {/* Storm Hall West pin — shows Aztec Game Lab events */}
        <PinDetails
          source={require("../assets/images/marker.png")}
          location={LOCATIONS.STORM_HALL_WEST_111}
          onSeeAll={() => setSideMenuOpen(true)}
          style={{
            position: "absolute",
            top: mapHeight * 0.42,
            left: mapWidth * 0.17,
            width: mapWidth * 0.05,
            height: mapHeight * 0.13,
            zIndex: 999,
          }}
        />

        {/* Tony Gwynn Stadium pin — shows Aztec Baseball Club events */}
        <PinDetails
          source={require("../assets/images/marker.png")}
          location={LOCATIONS.TONY_GWYNN_STADIUM}
          onSeeAll={() => setSideMenuOpen(true)}
          style={{
            position: "absolute",
            top: mapHeight * 0.4,
            left: mapWidth * 0.5,
            width: mapWidth * 0.04,
            height: mapHeight * 0.065,
            zIndex: 999,
          }}
        />
      </View>
      </ScrollView>

      <AddEventModal visible={addEventVis} onClose={() => setAddEventVis(false)} />

      {/* Floating "Add Event" button. bottom offset clears the AboutScreen
          banner; minHeight=tap.minSize keeps the hit target ≥44pt. */}
      <Pressable
        onPress={() => setAddEventVis(true)}
        accessibilityRole="button"
        accessibilityLabel="Add a new campus event"
        style={({ pressed }) => ({
          position: "absolute",
          bottom: bottomBarHeight + spacing.md,
          right: spacing.lg,
          zIndex: 1000,
          minHeight: tap.minSize,
          paddingHorizontal: spacing.lg,
          paddingVertical: spacing.sm,
          borderRadius: radius.pill,
          backgroundColor: pressed ? colors.scarletDark : colors.scarlet,
          alignItems: "center",
          justifyContent: "center",
          shadowColor: colors.black,
          shadowOpacity: 0.18,
          shadowRadius: 6,
          shadowOffset: { width: 0, height: 2 },
          elevation: 3,
        })}
      >
        <Text style={{ ...typography.button, color: colors.scarletInk }}>+ Add Event</Text>
      </Pressable>

      <View style={{ height: bottomBarHeight, width: "100%" }}>
        <AboutScreen />
      </View>

      {/* Side menu (just seperated for ease of access, cleaner imo) */}
      <SideMenu
        open={sideMenuOpen}
        onOpen={() => setSideMenuOpen(true)}
        onClose={() => setSideMenuOpen(false)}
      />

      </View>
    </SafeAreaView>
  );
}
