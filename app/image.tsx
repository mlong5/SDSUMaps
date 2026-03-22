// Thin wrapper around expo-image's Image component.
// Using expo-image instead of React Native's built-in Image gives better
// caching, performance, and format support (e.g. WebP, SVG).
import { Image, ImageProps } from 'expo-image';

export default function ImageC(props: ImageProps) {
  return (
    // Spread all props through so this component is a drop-in replacement
    <Image
      {...props}
    />
  );
}
