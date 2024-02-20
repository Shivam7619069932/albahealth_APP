import { Dimensions, ImageBackground, Modal, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Camera } from 'expo-camera';
import { useContext, useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LogContext } from "../../context";

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

export default function PoopPictureScreen() {
  const navigation = useNavigation();
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  // 
  const { logs, setLogs, currentLogIndex } = useContext(LogContext);
  const [showNotify, setShowNotify] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
      if (cameraStatus.status === 'granted') {
        setShowNotify(true);
        setTimeout(() => {
          setShowNotify(false);
        }, 1500);
      }
    })();
  }, []);

  // const takePicture = async () => {
  //   if (camera) {
  //     const photo = await camera.takePictureAsync();
  //     console.log('=== picture ===', photo);
  //     addPhoto(photo);
  //   }
  //   return;
  // }

  if (hasCameraPermission === null ) {
    return <View />;
  }
  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const onPressClose = () => {
    navigation.navigate('ChildLog');
  }

  const takePicture = async () => {
    if (camera) {
      const pic = await camera.takePictureAsync();
      let _logs = [...logs];
      _logs[currentLogIndex].poopPic = pic;
      setLogs(_logs);
      setShowSubmitModal(true);
    }
    return;
  }

  const onSubmitPhoto = () => {
    setShowSubmitModal(false);
    onPressClose();
  }

  const onRetakePhoto = () => {
    let _logs = [...logs];
    _logs[currentLogIndex].poopPic = null;
    setLogs(_logs);
    setShowSubmitModal(false);
  }

  return (
    <View style={{flex: 1}}>
      <Camera 
        ref={ref => setCamera(ref)}
        style={styles.fixedRatio} 
        type={type}
        // ratio={'16:9'} 
      />
      <View style={styles.headerView}>
        <TouchableOpacity style={styles.closeButton} onPress={() => onPressClose()}>
          <MaterialIcons name="close" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      {
        showNotify && 
        <View style={styles.notifyView}>
          <Text style={styles.notifyText}>Camera</Text>
          <Text style={styles.notifyText}>on</Text>
        </View>
      }
      <TouchableOpacity style={styles.captureButton} onPress={() => takePicture()}>
        <MaterialIcons name="camera-alt" size={56} color="#5E4A1A" />
      </TouchableOpacity>
      {/*  */}
      <SubmitModal 
        visible={showSubmitModal}
        onRequestClose={() => setShowSubmitModal(false)}
        onYes={() => onSubmitPhoto()}
        onNo={() => onRetakePhoto()}
      />
    </View>
  )
}

const SubmitModal = ({visible, onRequestClose, onYes, onNo}) => {
  const { logs, currentLogIndex } = useContext(LogContext);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}>
      <ImageBackground style={styles.modalView}
        source={{
          uri: logs[currentLogIndex].poopPic && logs[currentLogIndex].poopPic.uri,
        }}
        resizeMode="contain"
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Submit captured photo?</Text>
          <TouchableOpacity style={styles.yesButton} 
            onPress={() => {
              onYes();
            }}
          >
            <Text style={styles.modalButtonText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.noButton} 
            onPress={() => onNo()}
          >
            <Text style={styles.modalButtonText}>No, retake photo</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </Modal>
  )
}

const styles = StyleSheet.create({
  fixedRatio: {
    flex: 1,
  },
  headerView: {
    paddingTop: 18,
    paddingBottom: 18,
    paddingLeft: 25,
    paddingRight: 25,
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    flexDirection: 'row',
    alignItems: 'center',
    // 
    position: 'absolute',
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    borderWidth: 1.5,
    // borderColor: 'rgba(36,35,31,0.2)',
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifyView: {
    position: 'absolute',
    width: 100,
    height: 100,
    top: (windowHeight - 100) / 2,
    left: (windowWidth - 100) / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifyText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  captureButton: {
    width: 120,
    height: 120,
    borderRadius: 120,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    // 
    position: 'absolute',
    bottom: 70,
    alignSelf: 'center',
  },
  // modal 
  modalView: {
    marginTop: 'auto',
    alignSelf: 'stretch',
    height: windowHeight,
    width: windowWidth,
    backgroundColor: '#00000000',
    borderRadius: 0,
    padding: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: 'space-between',
  },
  modalContent: {
    marginTop: 'auto',
    width: '100%',
    height: 235,
    backgroundColor: '#fff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 45,
  },
  modalTitle: {
    color: '#24231F',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  yesButton: {
    width: '100%',
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D6CDB7',
    marginTop: 24,
  },
  noButton: {
    width: '100%',
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#ECEEF4',
    marginTop: 12,
  },
  modalButtonText: {
    color: '#24231F',
    fontSize: 16,
    fontWeight: '500',
  }
});
