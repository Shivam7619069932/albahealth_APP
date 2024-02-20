import { Animated, Dimensions, Easing, Image, Keyboard, KeyboardAvoidingView, Modal, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { MaterialIcons, Octicons } from "@expo/vector-icons";
import { RecordSpin, Wave } from "../../../assets";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { LogContext } from "../../context";
import { Audio } from "expo-av";

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

export default function CryRecordingScreen() {
  const navigation = useNavigation();
  // 
  const { 
    logs, setLogs, currentLogIndex
  } = useContext(LogContext);
  // Audio Recorder
  const AudioRecorder = useRef(new Audio.Recording());
  const [AudioPermission, SetAudioPermission] = useState(false);
  // Audio Player
  const AudioPlayer = useRef(new Audio.Sound());
  const [isPlaying, setIsPlaying] = useState(false);
  // 
  const [recording, setRecording] = useState(false);
  const [recordStoped, setRecordStoped] = useState(false);
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  // Initial Load to get the audio permission
  useEffect(() => {
    GetPermission();
  }, []);
  // Function to get the audio permission
  const GetPermission = async () => {
    const getAudioPerm = await Audio.requestPermissionsAsync();
    SetAudioPermission(getAudioPerm.granted);
    // await Audio.setAudioModeAsync({
    //     allowsRecordingIOS: true,
    //     playsInSilentModeIOS: true,
    // });
  };

  // ========= Animation ========= //
  let rotateValueHolder = new Animated.Value(0);
  useEffect(() => {
    startImageRotateFunction();
  }, [recording]);

  const startImageRotateFunction = () => {
    rotateValueHolder.setValue(0);
    Animated.timing(rotateValueHolder, {
      toValue: 1,
      duration: 1300,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => startImageRotateFunction());
  }

  const RotateData = rotateValueHolder.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // ========== Record ========= //
  const onStartRecord = async () => {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });
    try {
      // Check if user has given the permission to record
      if (AudioPermission === true) {
        try {
          // Prepare the Audio Recorder
          await AudioRecorder.current.prepareToRecordAsync(
            Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
          );
          // Start recording
          await AudioRecorder.current.startAsync();
          setRecording(true);
          setRecordStoped(false);
        } catch (error) {
          console.log(error);
        }
      } else {
        // If user has not given the permission to record, then ask for permission
        GetPermission();
      }
    } catch (error) {}
  }

  const onStopRecord = async () => {
    try {
      // Stop recording
      await AudioRecorder.current.stopAndUnloadAsync();

      // Get the recorded URI here
      const result = AudioRecorder.current.getURI();
      if (result) {
        let _logs = [...logs];
        _logs[currentLogIndex].cryRecord.sound = result;
        setLogs(_logs);
      }

      // Reset the Audio Recorder
      AudioRecorder.current = new Audio.Recording();
      setRecording(false);
      console.log('==== stop record ====');
      setRecordStoped(true);
    } catch (error) {}
  }

  // ========== Play ========== //
  const PlayRecordedAudio = async () => {
    if (!logs[currentLogIndex].cryRecord.sound) {
      return;
    }
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      playsInSilentModeIOS: true,
    });
    try {
      // Load the Recorded URI
      await AudioPlayer.current.loadAsync({ uri: logs[currentLogIndex].cryRecord.sound }, {}, true);

      await AudioPlayer.current.setStatusAsync({ isLooping: false });

      await AudioPlayer.current.setOnPlaybackStatusUpdate(handlePlaybackStatusUpdate);
      // Get Player Status
      const playerStatus = await AudioPlayer.current.getStatusAsync();

      // Play if song is loaded successfully
      if (playerStatus.isLoaded) {
        if (playerStatus.isPlaying === false) {
          AudioPlayer.current.playAsync();
          setIsPlaying(true);
        }
      }
    } catch (error) {}
  };

  async function handlePlaybackStatusUpdate(status) {
    if (status.didJustFinish) {
      // Audio playback has ended, you can perform any required actions here.
      console.log('Audio playback has ended.');
      StopPlaying();
    }
  }

  // Function to stop the playing audio
  const StopPlaying = async () => {
    try {
      //Get Player Status
      const playerStatus = await AudioPlayer.current.getStatusAsync();

      // If song is playing then stop it
      if (playerStatus.isLoaded === true)
        await AudioPlayer.current.unloadAsync();

        setIsPlaying(false);
    } catch (error) {}
  };
  
  // ============ Page Action ============ //
  const onPressClose = () => {
    if (showSubmitForm) {
      setShowSubmitForm(false);
    } else {
      navigation.navigate('ChildLog');
    }
  }

  const onRestart = () => {
    setShowSubmitForm(false);
    setRecordStoped(false);
    setRecording(false);
  }

  const onSubmit = () => {
    setShowSubmitForm(true);
    setRecordStoped(false);
    setRecording(false);
  }

  onChangeGuessMessage = (value) => {
    let _logs = [...logs];
    _logs[currentLogIndex].cryRecord.guessMsg = value;
    setLogs(_logs);
  }

  const onSubmitForm = () => {
    if (!!logs[currentLogIndex].cryRecord.sound && !!logs[currentLogIndex].cryRecord.guessMsg) {
      let _logs = [...logs];
      _logs[currentLogIndex].cryRecord.completed = true;
      setLogs(_logs);
      onPressClose();
    }
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1, backgroundColor: '#ECE9E3'}}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
          <ScrollView>
            <View style={styles.headerView}>
              <TouchableOpacity style={styles.closeButton} onPress={() => onPressClose()}>
                <MaterialIcons name="close" size={20} color="#1C1B1F" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Cry recording</Text>
              <View style={{width: 36}}></View>
            </View>
            {
              showSubmitForm 
              ? <View style={styles.submitFormView}>
                  <Text style={styles.submitFormLabel}>Was there any particular event happening before or in connection to the crying?</Text>
                  <TextInput 
                    style={styles.submitFormInput}
                    multiline 
                    placeholder="Write your answer here..."
                    value={logs[currentLogIndex].cryRecord.guessMsg}
                    onChangeText={(e) => onChangeGuessMessage(e)}
                  />
                  <TouchableOpacity style={[styles.yesButton, {opacity: logs[currentLogIndex].cryRecord.guessMsg ? 1 : 0.25}]}  
                    disabled={!logs[currentLogIndex].cryRecord.sound || !logs[currentLogIndex].cryRecord.guessMsg}
                    onPress={() => onSubmitForm()}
                  >
                    <Text style={styles.modalButtonText}>Submit</Text>
                  </TouchableOpacity>
                </View>
              : <View style={styles.recordStatusView}>
                  {
                    recordStoped
                    ? <Text style={[styles.recordStatusText, {color: '#ACA79C'}]}>Record done.</Text>
                    : recording 
                      ? <Text style={[styles.recordStatusText, {color: '#ACA79C'}]}>Recording...</Text>
                      : <Text style={styles.recordStatusText}>Tap and hold button to record.</Text>
                  }
                  <View style={styles.recordSoundView}>
                    {
                      !!logs[currentLogIndex].cryRecord.sound && !isPlaying
                        ? <TouchableOpacity style={styles.recordActionButton}
                            onPress={() => PlayRecordedAudio()}
                          >
                            <MaterialIcons name="play-arrow" size={24} color="#1C1B1F" />
                          </TouchableOpacity>
                        : !!logs[currentLogIndex].cryRecord.sound && isPlaying 
                          ? <TouchableOpacity style={styles.recordActionButton}
                              onPress={() => StopPlaying()}
                            >
                              <MaterialIcons name="pause" size={24} color="#1C1B1F" />
                            </TouchableOpacity>
                          : <View style={styles.recordActionButton}>
                              <Octicons name="dot-fill" size={24} color="#1C1B1F" />
                            </View>
                    }
                    <Image source={Wave} resizeMode="contain" style={styles.waveImage} />
                  </View>
                  <Text style={styles.recordTimeLog}>00:10</Text>
                </View>
            }
          </ScrollView>
          {
            !showSubmitForm && 
            <>
              <View style={styles.recordButtonWrapper}>
                {
                  recording && 
                  <Animated.Image 
                    source={RecordSpin} 
                    resizeMode="contain" 
                    style={[styles.recordSpin, {transform: [{rotate: RotateData}]}]} 
                  />
                }
                <TouchableOpacity style={styles.recordButton}
                  onPressIn={() => onStartRecord()}
                  onPressOut={() => onStopRecord()}
                >
                  <MaterialIcons name="mic" size={68} color="#5D4A1A" />
                </TouchableOpacity>
              </View>
              {
                recordStoped && 
                <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>Submit captured recording?</Text>
                  <TouchableOpacity style={styles.yesButton} 
                    onPress={() => {
                      onSubmit();
                    }}
                  >
                    <Text style={styles.modalButtonText}>Yes</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.noButton} 
                    onPress={() => onRestart()}
                  >
                    <Text style={styles.modalButtonText}>No, start over</Text>
                  </TouchableOpacity>
                </View>
              }
            </>
          }
        </>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  headerView: {
    paddingTop: 18,
    paddingBottom: 18,
    paddingLeft: 25,
    paddingRight: 25,
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: 'rgba(36,35,31,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#24231F',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  recordStatusView: {
    width: windowWidth - 76,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: (windowHeight - 150) / 2,
    left: 36,
  },
  recordStatusText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  recordTimeLog: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '500',
  },
  recordSoundView: {
    width: '100%',
    height: 58,
    borderRadius: 32,
    backgroundColor: '#FEFEFC',
    marginTop: 17,
    marginBottom: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  recordActionButton: {
    width: 32,
    height: 32,
    borderRadius: 32,
    backgroundColor: '#ECECEC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  waveImage: {
    width: windowWidth - 152,
  },
  recordButtonWrapper: {
    width: 148,
    height: 148,
    borderRadius: 148,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 60,
    alignSelf: 'center',
  },
  recordButton: {
    width: 120,
    height: 120,
    borderRadius: 120,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recordSpin: {
    width: 148,
    height: 148,
    position: 'absolute',
  },
  submitFormView: {
    padding: 24,
    width: '100%',
    height: 400,
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'absolute',
    top: (windowHeight - 400) / 2,
    left: 0,
  },
  submitFormLabel: {
    color: '#000000',
    fontSize: 24,
    fontWeight: 'bold',
  },
  submitFormInput: {
    width: '100%',
    height: 215,
    borderRadius: 16,
    backgroundColor: '#F7F7F7',
    borderWidth: 1,
    borderColor: '#ECECEC',
    marginTop: 18,
    paddingHorizontal: 16,
    paddingTop: 25,
    paddingBottom: 25,
    color: '#000000',
    fontSize: 17,
    fontWeight: '600'
  },
  // modal 
  modalView: {
    marginTop: 'auto',
    alignSelf: 'stretch',
    height: windowHeight,
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
