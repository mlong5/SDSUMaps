// Main screen of the app. Renders the SDSU campus map image with interactive
// map markers (pins) overlaid on top. Tapping a pin opens a modal popup with
// event details. Also renders the AboutScreen banner at the bottom.
import { useState } from "react";
import { Image, Modal, Platform, Pressable, ScrollView, Text, TextInput, useWindowDimensions, View } from "react-native";
import AboutScreen from "./aboutScreen";
import ImageC from "./image";
import PinDetails from "./pinDetails";

export default function Index() {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const isIOS = Platform.OS === "ios";
  const enableScrollTest = true;
  const topBarHeight = 56;
  const bottomBarHeight = 50;
  const mapWidth = width;
  const mapHeight = Math.max(height - topBarHeight - bottomBarHeight, 0);
  //mapHeight is made dependent on topbar height and bottom bar height for spacing

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
    //Main container for top banner, map, and bottom banner
    <View style={{ width: "100%", height: "100%", flexDirection: "column" }}>
      <View
        style={{
          height: topBarHeight,
          width: "100%",
          backgroundColor: "#ffffff",
          justifyContent: "center",
          alignItems: "center",
          borderBottomWidth: 1,
          borderBottomColor: "#d1d5db",
        }}
      >
        <Text style={{ color: "#111827", fontSize: 20, fontWeight: "700" }}>SDSU Maps</Text>
        {/*Actual banner text*/}
      </View>

      {/* SDSU campus map with pins anchored inside one responsive wrapper */}
      <ScrollView
        style={{ width: mapWidth, height: mapHeight }}
        contentContainerStyle={{ width: mapWidth, height: mapHeight }}
        minimumZoomScale={isIOS ? 0.6 : 1}
        maximumZoomScale={isIOS ? 3 : 1}
        bouncesZoom={isIOS}
        centerContent
        pinchGestureEnabled={isIOS}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
      <View style={{ width: mapWidth, height: mapHeight, position: "relative" }}>
        <ImageC
          source={{
            uri: "https://ontheworldmap.com/usa/city/san-diego/sdsu-campus-map.jpg",
          }}
          style={{
            width: "100%",
            height: "100%",
          }}
          contentFit="cover"
          //important for if really covering total image map area or not
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

        {/* Modal popup shown when a marker is tapped, displays event info */}
        <Modal
          visible={modalVis}
          animationType="fade"
          transparent={true}
          supportedOrientations={[
            "portrait",
            "portrait-upside-down",
            "landscape",
            "landscape-left",
            "landscape-right",
          ]}
        >
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
            <View
              style={{
                width: Math.min(width * 0.4, 230),
                backgroundColor: "lightgray",
                borderRadius: 20,
                padding: 16,
                alignItems: "center",
                justifyContent: "space-between",
                top: isLandscape ? height * 0.03 : height * 0.04,
                left: width * 0.04,
              }}
            >
              {/* Close button dismisses the modal */}
              <Pressable onPress={() => setModalVis(false)}>
                <Text
                  style={{
                    fontSize: 14,
                    color: "#2b6cb0",
                    marginBottom: 8,
                  }}
                >
                  Close
                </Text>
              </Pressable>

              {/* Event details text — currently hardcoded, will be dynamic later */}
              {/* TODO(dvicente4482-sys) - update it so it can display and event objects information instead of static text*/}
              <Text style={{ textAlign: "left"}}>Aztec Baseball Club 3:30-5:30pm</Text>
            </View>
          </View>
        </Modal>
      </View>
      </ScrollView>

      <Modal
        visible={addEventVis}
        animationType="slide"
        transparent={true}
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

       {/* Button to open the Add Event form */}
      <Pressable 
        onPress={() => setAddEventVis(true)}
        style={{ position: "absolute", bottom: bottomBarHeight + 10, right: 20, zIndex: 1000, backgroundColor: "red", padding: 10, borderRadius: 5 }}
      >
        <Text>+ Add Event</Text>
      </Pressable>

      <View style={{ height: bottomBarHeight, width: "100%" }}>
        <AboutScreen />
      </View>
    </View>
  );
}
