// Root layout for the app using Expo Router's Stack navigator.
// Defines the screen stack and titles for each route.
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    // SafeAreaProvider must wrap the navigator so screens can read insets
    // (notch, home indicator) via useSafeAreaInsets / SafeAreaView.
    <SafeAreaProvider>
      <Stack>
        {/* Main map screen */}
        <Stack.Screen name="index" options={{ headerShown: false, orientation: "default" }} />
        {/* About page (currently unused in navigation but registered) */}
        <Stack.Screen name="about" options={{ title: 'About' }} />
      </Stack>
    </SafeAreaProvider>
  );
}
