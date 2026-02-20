import { View } from 'react-native';
import AboutScreen from './aboutScreen';

export default function Index() {
  return (
    <>
    <View style={{ flex: 1, 
        justifyContent: "center",
        alignItems: "center",
    }}>
    </View>

    <AboutScreen />


    <View style={{ backgroundColor: 'lightblue', width: 2000, height: 100 }}>
    </View>
    
    
    </>

  );
}
