import { View } from 'react-native';
import AboutScreen from './aboutScreen';
import ImageC from './image';
import PinDetails from './pinDetails';

export default function Index() {
  return (
    <>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} />

      <ImageC
        source={{ uri: 'https://ontheworldmap.com/usa/city/san-diego/sdsu-campus-map.jpg' }}
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
          width: 50,
          height: 50,
          zIndex: 999,
        }}
      />

      <AboutScreen />

      <View style={{ backgroundColor: 'lightblue', width: 2000, height: 100 }} />
    </>
  );
}