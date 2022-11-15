import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Camera, CameraType } from 'expo-camera';

export default function App() {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [isStrobeOn, setStrobeOn] = useState(false);
  const [strobeSpeed, setStrobeSpeed] = useState(1);

  useEffect(() => {
    requestPermission()
  }, [])

  return (
    <View style={styles.container}>
      <Text>STROBE</Text>
      {permission ? <Text>{permission.status}</Text> : null}
      <StatusBar style="auto" />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
