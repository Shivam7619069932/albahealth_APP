import { Alert, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { QRScan } from "../../../assets";
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

export default function KitActivationScreen() {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      console.log('=== camera status ===', status);
      if (status === 'denied') {
        Alert("Camera permission denied");
        return;
      }
      let _hasPermission = status === 'granted';
      setHasPermission(_hasPermission);
      if (_hasPermission === null) {
        Alert("Requesting for camera permission");
      }
      if (_hasPermission === false) {
        Alert("No access to camera");
      }
      if (_hasPermission) {
        navigation.navigate('KitActivation');
      }
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
      // onScanned(data);
      navigation.navigate('KitActivationSuccess');
    }
  };

  const onPressClose = () => {
    navigation.navigate('MainBottomTab');
  }

  return (
    <View style={styles.overlayView}>
      <View style={styles.headerView}>
        <TouchableOpacity style={styles.closeButton} onPress={() => onPressClose()}>
          <MaterialIcons name="close" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      <View style={styles.topView}>
        <Text style={styles.topText}>Scan the QR code in the box to activate the kit.</Text>
      </View>
      <View style={styles.middleView}>
        <View style={styles.QRScanWrapper}>
          <View style={styles.QRconnerTL}></View>
          <View style={styles.QRconnerTR}></View>
          <View style={styles.QRconnerBL}></View>
          <View style={styles.QRconnerBR}></View>
          <View style={styles.QRScannerView}>
            {
              !!hasPermission &&
              <BarCodeScanner
                // onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                onBarCodeScanned={handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
              />
            }
          </View>
        </View>
      </View>
      <View style={styles.bottomView}>
        <Image source={QRScan} style={styles.scanImg} resizeMode="contain" />
      </View>
    </View>
  )
}

const styles=StyleSheet.create({
  overlayView: {
    flex: 1,
    backgroundColor: '#00000055'
  },
  headerView: {
    paddingTop: 18,
    paddingBottom: 18,
    paddingLeft: 25,
    paddingRight: 25,
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 999,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#ECECEC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topView: {
    flex:1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  topText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    maxWidth: 290,
    textAlign: 'center',
    marginBottom: 20,
  },
  middleView: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  QRScanWrapper: {
    width: windowHeight * 0.3,
    height: windowHeight * 0.3,
    maxWidth: windowWidth - 40,
    maxHeight: windowWidth - 40,
    position: 'relative',
    padding: 15,
  },
  QRconnerTL: {
    width: 60,
    height: 60,
    borderTopWidth: 5,
    borderLeftWidth: 5,
    borderColor: '#fff',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  QRconnerTR: {
    width: 60,
    height: 60,
    borderTopWidth: 5,
    borderRightWidth: 5,
    borderColor: '#fff',
    position: 'absolute',
    top: 0,
    right: 0,
  },
  QRconnerBL: {
    width: 60,
    height: 60,
    borderBottomWidth: 5,
    borderLeftWidth: 5,
    borderColor: '#fff',
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  QRconnerBR: {
    width: 60,
    height: 60,
    borderBottomWidth: 5,
    borderRightWidth: 5,
    borderColor: '#fff',
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  QRScannerView: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
  bottomView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanImg: {
    width: windowHeight * 0.2,
    height: windowHeight * 0.2,
    maxWidth: windowWidth * 0.5,
    maxHeight: windowWidth * 0.5,
    marginBottom: 20,
  }
});
