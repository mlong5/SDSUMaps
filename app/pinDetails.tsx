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

type PinDetailsProps = {
  source: ImageSourcePropType;
  style: StyleProp<ViewStyle>;
};

export default function PinDetails({ source, style }: PinDetailsProps) {
  const [pressed, setPressed] = useState(false);

  const handlePress = () => {
    setPressed(true);
    Platform.OS === 'web' ? alert('instead textbox') : Alert.alert('instead textbox')
  };

  return (
    <TouchableOpacity
      style={[styles.wrapper, style]}
      onPress={handlePress}
      activeOpacity={0.0}
    >
      <ImageC
        source={source}
        style={styles.image}
        contentFit="contain"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    zIndex: 999,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});