// Root layout for the app using Expo Router's Stack navigator.
// Defines the screen stack and titles for each route.
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    // Stack navigator wraps all screens with a native navigation header
    <Stack>
      {/* Main map screen */}
      <Stack.Screen name="index" options={{ title: 'Map Home' }} />
      {/* About page (currently unused in navigation but registered) */}
      <Stack.Screen name="about" options={{ title: 'About' }} />
    </Stack>
  );
}
