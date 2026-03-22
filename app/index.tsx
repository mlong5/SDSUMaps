// Main screen of the app. Renders the SDSU campus map image with interactive
// map markers (pins) overlaid on top. Tapping a pin opens a modal popup with
// event details. Also renders the AboutScreen banner at the bottom.
import { useState } from "react";
import { Dimensions, Image, Modal, Pressable, Text, TextInput, View } from "react-native";
import AboutScreen from "./aboutScreen";
import ImageC from "./image";
import PinDetails from "./pinDetails";

// Get device screen dimensions for responsive positioning
const { width, height } = Dimensions.get('window');

export default function Index() {
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
    <>
      {/* Spacer view to push content into layout flow */}
      <View
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      />

      {/* SDSU campus map image loaded from remote URL */}
      <ImageC
        source={{
          uri: "https://ontheworldmap.com/usa/city/san-diego/sdsu-campus-map.jpg",
        }}
        style={{
          width: width * 0.9,
          height: height * 0.9,
          justifyContent: "flex-start",
          position: "relative",
          alignItems: "center",
          margin: "auto",
        }}
      />

      {/* Overlay container for all map markers, positioned on top of the map */}
      <View style={{ position: "relative", top: 0, left: 0, width: "100%", height: "100%" }}>

        {/* PinDetails marker — tapping shows an alert with placeholder text */}
        <PinDetails
          source={require("../assets/images/marker.png")}
          style={{
            position: "absolute",
            top: height * 0.25,
            left: width * 0.05,
            width: width * 0.3,
            height: height * 0.0625,
            zIndex: 999,
          }}
        />

        {/* Second marker — tapping opens the event details modal */}
        <Pressable onPress={() => setModalVis(true)}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Image
              source={require("../assets/images/marker.png")}
              style={{
                position: "absolute",
                bottom: height * 0.5,
                left: width * 0.5,
                width: width * 0.03,
                height: height * 0.05,
                zIndex: 999,
              }}
            />
          </View>
        </Pressable>

        {/* Modal popup shown when a marker is tapped, displays event info */}
        <Modal visible={modalVis} animationType="fade" transparent={true}>
          <View style={{ position: "absolute", top: height * 0.45, left: width * 0.45 }}>
            <View
              style={{
                margin: width * 0.015,
                backgroundColor: "lightgray",
                borderRadius: 20,
                padding: width * 0.0275,
                alignItems: "center",
                shadowColor: "#000",
                justifyContent: "space-between",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
              }}
            >
              {/* Close button dismisses the modal */}
              <Pressable onPress={() => setModalVis(false)}>
                <Text
                  style={{
                    position: "relative",
                    bottom: height * 0.01125,
                    left: width * 0.075,
                    fontSize: width * 0.01,
                    color: "light-blue",
                  }}
                >
                  Close
                </Text>
              </Pressable>

              {/* Event details text — currently hardcoded, will be dynamic later */}
              {/* TODO(dvicente4482-sys) - update it so it can display and event objects information isntead of static text*/}
              <Text style={{alignContent: "center"}}>Aztec Baseball Club 3:30-5:30pm</Text>
            </View>
          </View>
        </Modal>
      </View>
      <Modal visible={addEventVis} animationType="slide" transparent={true}>
        <View style={{ position: "absolute", top: height * 0.25, left: width * 0.1, backgroundColor: "white", padding: 20, borderRadius: 10 }}>
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

        </View>
      </Modal>

       {/* Button to open the Add Event form */}
      <Pressable 
        onPress={() => setAddEventVis(true)}
        style={{ position: "absolute", bottom: height * 0.14, right: width * 0.05, zIndex: 1000, backgroundColor: "red", padding: 10 }}
      >
        <Text>+ Add Event</Text>
      </Pressable>
      {/* About section rendered below the map */}
      <AboutScreen />

      {/* Bottom bar decorative strip */}
      <View
        style={{ backgroundColor: "lightblue", position: "absolute", width: width * 5, height: height * 0.125, top: height * 0.875 }}
      />
    </>
  );
}
