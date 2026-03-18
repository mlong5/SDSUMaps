// AboutScreen displays a tagline/description for the app.
// Rendered as a banner section within the main Index screen.
import { StyleSheet, Text, View } from 'react-native';

export default function AboutScreen() {
  return (
    <View style={styles2.container}>
      <Text style={styles2.text}>A fun map for the whole family</Text>
    </View>
  );
}

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e', // dark background for contrast
    justifyContent: 'center',
    alignItems: 'center',
    height: "auto",
  },
  text: {
    color: '#fff',
  },
});
