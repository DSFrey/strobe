import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import Slider from '@react-native-community/slider';
import { Camera, CameraType, FlashMode } from 'expo-camera';

export default function App() {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [isStrobeOn, setStrobeOn] = useState(false);
  const [strobeSpeed, setStrobeSpeed] = useState(1);
  const [isTorchOn, setTorchOn] = useState(false)

  useEffect(() => {
    requestPermission()
  }, [])

  const toggleStrobe = () => {
    setStrobeOn(!isStrobeOn)
  }

  useEffect(() => {
    const interval = isStrobeOn
      ? setInterval(() => {
        setTorchOn(true)
        setTimeout(()=>{
          setTorchOn(false)
        }, (10))
      }, (1000/strobeSpeed))
      : setTorchOn(false);
    return () => clearInterval(interval);
  }, [isStrobeOn, strobeSpeed])

  return (
    <View style={styles.container}>
      <Text style={{color: '#fff', fontSize: 20, marginTop: 20}}>S T R O B E</Text>
      <View style={{width: '100%', height: '75%', backgroundColor: isTorchOn ? '#fff' : '#000'}}></View>
      <Camera type={CameraType.back} flashMode={isTorchOn ? FlashMode.torch : FlashMode.off} style={{ width: 1, height: 1, alignSelf: 'stretch'}}/>
      <Switch
        value={isStrobeOn}
        onValueChange={toggleStrobe}
        trackColor={{false: '#999'}}
      />
      <Slider
        style={{width: '60%', height: 40}}
        value={strobeSpeed}
        minimumValue={1}
        maximumValue={10}
        maximumTrackTintColor='#fff'
        onValueChange={value => setStrobeSpeed(value)}
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
