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
        }, 100)
      }, 200)
      : setTorchOn(false);
    return () => clearInterval(interval);
  }, [isStrobeOn])

  return (
    <View style={styles.container}>
      <Text style={{color: '#fff', margin: 20}}>STROBE</Text>
      <View style={{width: '100%', height: '80%', backgroundColor: isTorchOn ? '#fff' : '#000'}}></View>
      <Camera type={CameraType.back} flashMode={isTorchOn ? FlashMode.torch : FlashMode.off} style={{ width: 1, height: 1, alignSelf: 'stretch'}}/>
      {permission ? <Text>{`${isTorchOn}, ${counter}`}</Text> : null}
      <Switch
        value={isStrobeOn}
        onValueChange={toggleStrobe}
        style={{trackColor: '#999'}}
      />
      <StatusBar style="auto" />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
