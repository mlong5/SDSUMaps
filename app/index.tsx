import { useState } from "react";
import { Dimensions, Image, Modal, Pressable, Text, View } from "react-native";
import AboutScreen from "./aboutScreen";
import ImageC from "./image";
import PinDetails from "./pinDetails";


const { width, height } = Dimensions.get('window');

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
          width: width * 0.9,
          height: height * 0.9,
          justifyContent: "flex-start",
          position: "relative",
          alignItems: "center",
          margin: "auto",
        }}
      />
      {/* Markers Container */}
      <View style={{ position: "relative", top: 0, left: 0, width: "100%", height: "100%" }}>
        {/* Marker */}
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

        {/* Marker with bottom, left as position */}
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
              <Text style={{alignContent: "center"}}>Aztec Baseball Club 3:30-5:30pm</Text>
            </View>
          </View>
        </Modal>
      </View>

      <AboutScreen />
      <View
        style={{ backgroundColor: "lightblue",position: "absolute", width: width * 5, height: height * 0.125, top: height * 0.875 }}
      />
    </>
  );
}
