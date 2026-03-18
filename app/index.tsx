// Main screen of the app. Renders the SDSU campus map image with interactive
// map markers (pins) overlaid on top. Tapping a pin opens a modal popup with
// event details. Also renders the AboutScreen banner at the bottom.
import { useState } from "react";
import { Dimensions, Image, Modal, Pressable, Text, View } from "react-native";
import AboutScreen from "./aboutScreen";
import ImageC from "./image";
import PinDetails from "./pinDetails";

// Get device screen dimensions for responsive positioning
const { width, height } = Dimensions.get('window');

export default function Index() {
  // Controls visibility of the event details modal
  const [modalVis, setModalVis] = useState(false);

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
              <Text style={{alignContent: "center"}}>Aztec Baseball Club 3:30-5:30pm</Text>
            </View>
          </View>
        </Modal>
      </View>

      {/* About section rendered below the map */}
      <AboutScreen />

      {/* Bottom bar decorative strip */}
      <View
        style={{ backgroundColor: "lightblue", position: "absolute", width: width * 5, height: height * 0.125, top: height * 0.875 }}
      />
    </>
  );
}
