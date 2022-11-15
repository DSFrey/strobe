import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { Camera, CameraType, FlashMode } from 'expo-camera';

export default function App() {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [isStrobeOn, setStrobeOn] = useState(false);
  const [strobeSpeed, setStrobeSpeed] = useState(1);
  const [isTorchOn, setTorchOn] = useState(false)
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    requestPermission()
  }, [])

  const toggleStrobe = () => {
    setStrobeOn(!isStrobeOn)
  }

  useEffect(() => {
    const interval = isStrobeOn
      ? setInterval(() => {
        setCounter(counter => counter + 1)
        setTorchOn(true)
        setTimeout(()=>{
          setTorchOn(false)
        }, 1000)
      }, 2000)
      : setTorchOn(false);
    return () => clearInterval(interval);
  }, [isStrobeOn])

  return (
    <View style={styles.container}>
      <Text>STROBE</Text>
      {permission ? <Text>{`${isTorchOn}, ${counter}`}</Text> : null}
      <Camera type={CameraType.back} flashMode={isTorchOn ? FlashMode.torch : FlashMode.off} style={{ flex: 1, width: '100%', height: '100%', alignSelf: 'stretch'}}/>
      <Switch
        value={isStrobeOn}
        onValueChange={toggleStrobe}
      />
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
