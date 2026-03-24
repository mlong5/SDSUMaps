import { useState } from "react";
import { Dimensions, Image, Modal, Pressable, Text, View } from "react-native";

const { width, height } = Dimensions.get('window');

type Entry = {
    Title: string,
    Time: string
}

const SideMenuEntry = (props: Entry) => {
    return (
        <Pressable style={{ backgroundColor: "darkgray", alignSelf: "flex-start", padding: 5, borderRadius: 5 }}>
            <Text>{props.Title}</Text>
            <Text style={{ fontSize: 10, color: "gray" }}>{props.Time}</Text>
        </Pressable>
    )
}

export const SideMenu = function () {
    const [sideModalVis, setSideModalVis] = useState(false);

    return (
        <>
            <Pressable onPress={() => (setSideModalVis(true))} style={{
                position: 'absolute',
                top: 70,
                left: 30
            }}>
                <Text style={{
                    textAlign: "center",
                    backgroundColor: "darkgray",
                    alignSelf: "flex-end",
                    padding: 5,
                    borderRadius: 5,
                    zIndex: 1000
                }}>
                    Open{"\n"}Events List
                </Text>
            </Pressable >

            <Modal visible={sideModalVis} animationType="slide" transparent={true}>
                <View style={{ position: "absolute", top: height * 0.06, left: 0 }}>
                    <View
                        style={{
                            margin: width * 0.015,
                            height: height * 0.85,
                            width: 275,
                            backgroundColor: "lightgrey",
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
                        <Pressable onPress={() => setSideModalVis(false)}>
                            <Text
                                style={{
                                    position: "relative",
                                    bottom: 30,
                                    left: 120,
                                    // bottom: height * 0.041125,
                                    // left: width * 0.082,
                                    // fontSize: 10,
                                    color: "dark_grey",
                                    backgroundColor: "darkgray",
                                    alignSelf: "flex-end",
                                    padding: 5,
                                    borderRadius: 5,
                                }}
                            >
                                X
                            </Text>
                        </Pressable>
                        {/* TODO Change these to reflect entries in the database */}
                        <View style={{
                            flexDirection: "column",
                            alignItems: "flex-start",
                            justifyContent: "space-between",
                            direction: "ltr",
                            bottom: 200,
                            right: 30
                        }}>
                            <Text style={{ fontSize: 25 }}>
                                Events List
                            </Text> <Text style={{ fontSize: 4 }}>{"\n"}</Text>
                            <SideMenuEntry Title="Aztec Baseball Club" Time="3:30-5:30pm" /> <Text style={{ fontSize: 4 }}>{"\n"}</Text>
                            <SideMenuEntry Title="Aztec Game Lab" Time="2:00-5:00pm" /> <Text style={{ fontSize: 4 }}>{"\n"}</Text>
                            <SideMenuEntry Title="Aztec Game Lab" Time="2:00-5:00pm" /> <Text style={{ fontSize: 4 }}>{"\n"}</Text>
                            <SideMenuEntry Title="Aztec Game Lab" Time="2:00-5:00pm" /> <Text style={{ fontSize: 4 }}>{"\n"}</Text>
                            <SideMenuEntry Title="Aztec Game Lab" Time="2:00-5:00pm" /> <Text style={{ fontSize: 4 }}>{"\n"}</Text>
                            <SideMenuEntry Title="Aztec Game Lab" Time="2:00-5:00pm" /> <Text style={{ fontSize: 4 }}>{"\n"}</Text>
                            <SideMenuEntry Title="Aztec Game Lab" Time="2:00-5:00pm" /> <Text style={{ fontSize: 4 }}>{"\n"}</Text>
                            <SideMenuEntry Title="Aztec Game Lab" Time="2:00-5:00pm" /> <Text style={{ fontSize: 4 }}>{"\n"}</Text>
                        </View>
                    </View>
                </View>
            </Modal >
        </>


    )



}