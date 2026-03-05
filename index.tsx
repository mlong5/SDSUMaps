import { useState } from "react";
import { Pressable, View, Image, Modal, Text } from "react-native";
import AboutScreen from "./aboutScreen";
import ImageC from "./image";
import PinDetails from "./pinDetails";
import { Button } from "@react-navigation/elements";

export default function Index() {
  const [modalVis, setModalVis] = useState(false);

  return (
    <>
      <View
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      />
      <ImageC
        source={{
          uri: "https://ontheworldmap.com/usa/city/san-diego/sdsu-campus-map.jpg",
        }}
        style={{
          width: "90%",
          height: "90%",
          justifyContent: "flex-start",
          position: "relative",
          alignItems: "center",
          margin: "auto",
        }}
      />
      {/* Marker */}
      <PinDetails
        source={require("../assets/images/marker.png")}
        style={{
          position: "absolute",
          top: 200,
          left: 200,
          width: 100,
          height: 50,
          zIndex: 999,
        }}
      />

      {/* Clickable Marker */}
      <Pressable onPress={() => setModalVis(true)}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image
            source={require("../assets/images/marker.png")}
            style={{
              position: "absolute",
              bottom: 360,
              left: 176,
              width: 100,
              height: 60,
              zIndex: 999,
            }}
          />
        </View>
        <Modal visible={modalVis} animationType="fade" transparent={true}>
          <View style={{ position: "relative", top: 50, left: 0 }}>
            <View
              style={{
                margin: 80,
                backgroundColor: "lightgray",
                borderRadius: 20,
                padding: 35,
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
              }}
            >
              <Pressable onPress={() => setModalVis(false)}>
                <Text
                  style={{
                    position: "relative",
                    bottom: 25,
                    left: 90,
                    fontSize: 12,
                    color: "grey",
                  }}
                >
                  Close
                </Text>
              </Pressable>
              <Text style={{}}>Event in the Love Library</Text>
            </View>
          </View>
        </Modal>
      </Pressable>

      <AboutScreen />
      <View
        style={{ backgroundColor: "lightblue", width: 2000, height: 100 }}
      />
    </>
  );
}
