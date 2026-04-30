// Main screen of the app. Renders the SDSU campus map image with interactive
// map markers (pins) overlaid on top. Tapping a pin opens a modal popup with
// event details. Also renders the AboutScreen banner at the bottom.
import { useState } from "react";
import { Image, Modal, Platform, Pressable, ScrollView, Text, TextInput, useWindowDimensions, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import AboutScreen from "./aboutScreen";
import { colors, radius, spacing, tap, typography } from "./constants/theme";
import ImageC from "./image";
import PinDetails from "./pinDetails";
import { SideMenu } from './sideMenu';

export default function Index() {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const isLandscape = width > height;
  const isIOS = Platform.OS === "ios";
  const topBarHeight = 56;
  const bottomBarHeight = 50;
  const mapWidth = width;
  // Subtract notch/home-indicator insets so the ScrollView doesn't get clipped
  // under iPhone's status bar or home indicator in portrait.
  const mapHeight = Math.max(height - topBarHeight - bottomBarHeight - insets.top - insets.bottom, 0);

  // Controls visibility of the event details modal
  const [modalVis, setModalVis] = useState(false);
  const [addEventVis, setAddEventVis] = useState(false);
  const [eventName, setEventName] = useState("");
  const [eventDesc, setEventDesc] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventDate, setEventDate] = useState("");

  function validateAndSubmitEvent() {
    if (!eventName || !eventDesc || !eventTime || !eventDate) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // Simple YYYY-MM-DD format check
    if (!dateRegex.test(eventDate)) {
      alert("Please enter a valid date in YYYY-MM-DD format.");
      return;
    }
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/; // Simple HH:MM 24-hour format check
    if (!timeRegex.test(eventTime)) {
      alert("Please enter a valid time in HH:MM 24-hour format.");
      return;
    }
    const parsedDate = new Date(`${eventDate}T${eventTime}:00`);
    if (isNaN(parsedDate.getTime())) {
      alert("Please enter a valid date and time.");
      return;
    }

    // If validation passes, log the event details (or submit to backend)

    console.log({ eventName, eventDesc, eventTime, eventDate });
    alert("Event submitted successfully!");
    setAddEventVis(false);
  }

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

        {/* PinDetails marker — tapping shows an alert with placeholder text */}
        <PinDetails
          source={require("../assets/images/marker.png")}
          style={{
            position: "absolute",
            top: mapHeight * 0.42,
            left: mapWidth * 0.17,
            width: mapWidth * 0.05,
            height: mapHeight * 0.13,
            zIndex: 999,
          }}
        />

        {/* Second marker — tapping opens the event details modal */}
        <Pressable
          onPress={() => setModalVis(true)}
          style={{ position: "absolute", top: mapHeight * 0.4, left: mapWidth * 0.5, width: mapWidth * 0.04, height: mapHeight * 0.065, zIndex: 9999 }}
        >
          <Image
            source={require("../assets/images/marker.png")}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </Pressable>

        {/* Modal popup shown when a marker is tapped, displays event info.
            Backdrop tap and Android hardware back both dismiss. */}
        <Modal
          visible={modalVis}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setModalVis(false)}
          supportedOrientations={[
            "portrait",
            "portrait-upside-down",
            "landscape",
            "landscape-left",
            "landscape-right",
          ]}
        >
          <Pressable
            onPress={() => setModalVis(false)}
            style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: colors.overlay }}
            accessibilityLabel="Close event details"
          >
            <Pressable
              // Inner pressable swallows taps so backdrop dismiss only fires
              // outside the card body.
              onPress={(e) => e.stopPropagation?.()}
              style={{
                minWidth: Math.min(width * 0.7, 320),
                maxWidth: 360,
                backgroundColor: colors.white,
                borderRadius: radius.lg,
                paddingVertical: spacing.lg,
                paddingHorizontal: spacing.lg,
              }}
            >
              {/* Close X — visible affordance, ≥44pt hit area, top-right. */}
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

              <Text style={{ ...typography.h3, color: colors.neutral900, marginBottom: spacing.xs, marginRight: tap.minSize }}>
                Aztec Baseball Club
              </Text>
              {/* TODO(dvicente4482-sys): wire to dynamic event object instead of static text */}
              <Text style={{ ...typography.body, color: colors.neutral700 }}>
                3:30 – 5:30 pm
              </Text>
            </Pressable>
          </Pressable>
        </Modal>
      </View>
      </ScrollView>

      <Modal
        visible={addEventVis}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setAddEventVis(false)}
        supportedOrientations={[
          "portrait",
          "portrait-upside-down",
          "landscape",
          "landscape-left",
          "landscape-right",
        ]}
      >
        <View style={{ flex: 1 }}>
          <View style={{ position: "absolute", top: isLandscape ? height * 0.1 : height * 0.25, left: width * 0.08, width: Math.min(width * 0.72, 420), backgroundColor: "white", borderRadius: 10, maxHeight: isLandscape ? height * 0.8 : height * 0.6 }}>
          <ScrollView contentContainerStyle={{ padding: 20 }} keyboardShouldPersistTaps="handled">
            <TextInput placeholder="Event Name" value={eventName} onChangeText={setEventName} style={{ marginBottom: 10, borderBottomWidth: 1 }} />
            <TextInput placeholder="Event Description" value={eventDesc} onChangeText={setEventDesc} style={{ marginBottom: 10, borderBottomWidth: 1 }} />
            <TextInput placeholder="Event Time" value={eventTime} onChangeText={setEventTime} style={{ marginBottom: 10, borderBottomWidth: 1 }} />
            <TextInput placeholder="Event Date" value={eventDate} onChangeText={setEventDate} style={{ marginBottom: 10, borderBottomWidth: 1 }} />
            <Pressable onPress={() => setAddEventVis(false)} style={{ backgroundColor: "lightblue", padding: 10, borderRadius: 5 }}>
              <Text>Cancel</Text>
            </Pressable>
            <Pressable onPress={() => validateAndSubmitEvent()} style={{ backgroundColor: "lightgreen", padding: 10, borderRadius: 5, marginTop: 10 }}>
              <Text>Submit</Text>
            </Pressable>
          </ScrollView>
          </View>
        </View>
      </Modal>

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
      <SideMenu />

      </View>
    </SafeAreaView>
  );
}
