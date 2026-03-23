// AboutScreen displays a tagline/description for the app.
// Rendered as a banner section within the main Index screen.
import { StyleSheet, Text, View } from 'react-native';

export default function AboutScreen() {
  return (
    <View style={styles2.container}>
      <Text style={styles2.text}>Welcome to SDSU Maps! Click on an event to find out more details</Text>
    </View>
  );
}

const styles2 = StyleSheet.create({
  container: {
    backgroundColor: '#25292e', // dark background for contrast
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  text: {
    color: '#fff',
  },
});
