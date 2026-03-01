import { useState } from 'react';
import {
  TouchableOpacity,
  View,
  Alert,
  StyleSheet,
} from 'react-native';
import ImageC from './image';

export default function PinDetails({ source, style }) {
  const [pressed, setPressed] = useState(false);

  const handlePress = () => {
    setPressed(true);
    Alert.alert('Pin Clicked!', 'Textbox will go here.');
  };

  return (
    <TouchableOpacity
      style={[styles.wrapper, style]}
      onPress={handlePress}
      activeOpacity={0.6}
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