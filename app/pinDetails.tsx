// PinDetails renders a single map marker pin as a tappable image.
// On press, it shows an alert (native on mobile, browser alert on web)
// with placeholder event info. The `pressed` state tracks whether the
// pin has been tapped at least once.
import { useState } from 'react';
import {
  Alert,
  ImageSourcePropType,
  Platform,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle
} from 'react-native';
import ImageC from './image';

// Props accepted by PinDetails:
//   source — the marker image asset
//   style  — position/size styles applied by the parent (absolute positioning)
type PinDetailsProps = {
  source: ImageSourcePropType;
  style: StyleProp<ViewStyle>;
};

export default function PinDetails({ source, style }: PinDetailsProps) {
  // Tracks whether this pin has ever been pressed
  const [pressed, setPressed] = useState(false);

  const handlePress = () => {
    setPressed(true);
    // Use browser alert on web, native Alert dialog on iOS/Android
    Platform.OS === 'web' ? alert('Gym Club 2-3:15pm') : Alert.alert('Gym Club 2-3:15pm') ;
  };

  return (
    // TouchableOpacity wraps the pin image to make it pressable.
    // activeOpacity=0 means no visual dimming on press.
    <TouchableOpacity
      style={[styles.wrapper, style]}
      onPress={handlePress}
      activeOpacity={0.0}
    >
      <ImageC
        source={source}
        style={styles.image}
        contentFit="contain" // scale image to fit without cropping
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    zIndex: 999, // render above the map image
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
