import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useEffect, useState } from "react";

const windowWidth = Dimensions.get('window').width;

export default function QRScanner({onScanned}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    console.log("==========================");
    console.log(`Bar code with type ${type}`);
    console.log(data);
    console.log("==========================");
    if (data) {
      onScanned(data);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.scannerWrapper}>
      <View style={{flex: 1, height: '100%', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between'}}>
        <View style={styles.cameraButton}>
          {/* <Ionicons name="camera" size={24} color="white" /> */}
          <AntDesign name="scan1" size={24} color="white" />
        </View>
        {
          scanned && 
          <TouchableOpacity style={styles.cameraButton}>
            <Ionicons name="refresh" size={24} color="white" onPress={() => setScanned(false)} />
          </TouchableOpacity>
        }
      </View>
      <View style={styles.cameraWrapper}>
        {/* QRScanner Module Here */}
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        {/* QRScanner Frame */}
        <View style={[styles.cornerTL, {borderColor: '#000'}]}></View>
        <View style={[styles.cornerTR, {borderColor: '#000'}]}></View>
        <View style={[styles.cornerBL, {borderColor: '#000'}]}></View>
        <View style={[styles.cornerBR, {borderColor: '#000'}]}></View>
        <View style={styles.recordStatus}>
          <Entypo name="controller-record" size={12} color="#000" />
          <Text style={[styles.recordStatusText, {color: "#000"}]}>REC</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  scannerWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  cameraButton: {
    width: 40,
    height: 40,
    borderRadius: 32,
    backgroundColor: Color.info,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraWrapper: {
    width: windowWidth * 0.6,
    height: windowWidth * 0.34,
    backgroundColor: '#fff',
  },
  cornerTL: {
    borderTopWidth: 1,
    borderLeftWidth: 1,
    width: 30,
    height: 30,
    borderColor: '#000',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  cornerTR: {
    borderTopWidth: 1,
    borderRightWidth: 1,
    width: 30,
    height: 30,
    borderColor: '#000',
    position: 'absolute',
    top: 0,
    right: 0,
  },
  cornerBL: {
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    width: 30,
    height: 30,
    borderColor: '#000',
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  cornerBR: {
    borderBottomWidth: 1,
    borderRightWidth: 1,
    width: 30,
    height: 30,
    borderColor: '#000',
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  recordStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: 8,
    top: 3,
  },
  recordStatusText: {
    fontSize: 12,
    color: '#000',
  },
});
