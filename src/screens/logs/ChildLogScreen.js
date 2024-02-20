import { Dimensions, Image, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import AppStyles from "../../styles/AppStyles";
import { DailyLogsProgress, DietOption, LanguageOption, MultipleCheckboxOptions, NumberOption, Quiz, SingleOptions, TextOption } from "../../components";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useContext, useEffect, useState } from "react";
import { LogContext, TaskContext } from "../../context";
import moment from 'moment';

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

export default function ChildLogScreen() {
  const navigation = useNavigation();
  const { 
    poopPic, dailyQRE, cryRecord,
    time, setTime,
    logs, setLogs,
    currentLogIndex, setCurrentLogIndex
  } = useContext(LogContext);
  const { reportAvailable, setReportAvailable } = useContext(TaskContext);

  useEffect(() => {
    let interval;

    if (time > 0) {
      interval = setInterval(() => {
        setTime(time - 1)
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    }
  }, [time]);

  const formatTime = (seconds) => {
    let hours = Math.floor(seconds / (60 * 60));
    let remainingSeconds = seconds % (60 * 60);
    let minutes = Math.floor(remainingSeconds / 60);
    remainingSeconds = remainingSeconds % 60;
    return `${hours}h:${minutes}m:${remainingSeconds}s`;
  }
  
  const onPressClose = () => {
    navigation.navigate('MainBottomTab', {screen: 'TasksTab'});
  }

  const onSubmit = () => {
    setReportAvailable(true);
    let _logs = [...logs];
    _logs[currentLogIndex].submitted = true;
    setLogs(_logs);
    // 
    let cDate = new Date();
    let cY = cDate.getFullYear();
    let cM = cDate.getMonth() + 1;
    let cD = cDate.getDate();
    let cHH = cDate.getHours();
    let cMM = cDate.getMinutes();
    let cSS = cDate.getSeconds();
    let tdy = new Date(`${cY}-${cM < 10 ? '0'+cM : cM}-${cD < 10 ? '0'+cD : cD} ${cHH < 10 ? '0'+cHH : cHH}:${cMM < 10 ? '0'+cMM : cMM}:${cSS < 10 ? '0'+cSS : cSS}`);
    let tmr = new Date(`${cY}-${cM < 10 ? '0'+cM : cM}-${cD < 10 ? '0'+cD : cD} 23:59:59`);
    let diff = moment.duration(moment(tmr).diff(moment(tdy))).asSeconds();
    setTime(diff);
  }

  return (
    <View style={{flex: 1, backgroundColor: '#FEFEFC'}}>
      <View style={styles.headerView}>
        <TouchableOpacity style={styles.closeButton} onPress={() => onPressClose()}>
          <MaterialIcons name="close" size={20} color="#1C1B1F" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Child log</Text>
        <View style={{width: 36}}></View>
      </View>
      <ScrollView style={{flex: 1, padding: 16}}>
        <DailyLogsProgress />
        <TouchableOpacity style={styles.menuButton}
          onPress={() => navigation.navigate('PoopPicture')}
        >
          <View>
            <View style={styles.menuButtonTitleWrapper}>
              <Text style={styles.menuButtonTitle}>Poop picture</Text>
              {
                !!logs[currentLogIndex].poopPic && 
                <MaterialIcons name="check-circle" size={20} color="#65D6A3" style={{marginLeft: 5}} />
              }
            </View>
            <Text style={styles.menuButtonDescription}>
              Take a picture of your baby's poop. Make sure there's a good illumination, preferably natural light.
            </Text>
          </View>
          <MaterialIcons name="arrow-forward-ios" size={16} color="#BCBCBC" style={styles.menuIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton} 
          // disabled={!logs[currentLogIndex].poopPic}
          onPress={() => navigation.navigate('DailyQuestionnaire')}
        >
          <View>
            <View style={styles.menuButtonTitleWrapper}>
              <Text style={styles.menuButtonTitle}>Daily questionnaire</Text>
              {
                logs[currentLogIndex].dailyQRE.completed &&
                <MaterialIcons name="check-circle" size={20} color="#65D6A3" style={{marginLeft: 5}} />
              }
            </View>
            <Text style={styles.menuButtonDescription}>
              A few questions so we can understand your baby's routine.
            </Text>
          </View>
          <MaterialIcons name="arrow-forward-ios" size={16} color="#BCBCBC" style={styles.menuIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton}
          // disabled={!logs[currentLogIndex].dailyQRE.completed}
          onPress={() => navigation.navigate('CryRecording')}
        >
          <View>
            <View style={styles.menuButtonTitleWrapper}>
              <Text style={styles.menuButtonTitle}>
                Cry recording
                <Text style={{fontSize: 12}}>(optional)</Text>
              </Text>
              {
                logs[currentLogIndex].cryRecord.completed &&
                <MaterialIcons name="check-circle" size={20} color="#65D6A3" style={{marginLeft: 5}} />
              }
            </View>
            <Text style={styles.menuButtonDescription}>
              Capture the sound of your baby crying.
            </Text>
          </View>
          <MaterialIcons name="arrow-forward-ios" size={16} color="#BCBCBC" style={styles.menuIcon} />
        </TouchableOpacity>
      </ScrollView>
      <View style={AppStyles.fixedBottomButtonWrapper}>
        {
          !!logs[currentLogIndex].poopPic && logs[currentLogIndex].dailyQRE.completed && logs[currentLogIndex].cryRecord.completed && !logs[currentLogIndex].submitted &&
          <View style={styles.submitNotifyView}>
            <Text style={styles.submitNotifyHeadline}>Good Job!</Text>
            <Text style={styles.submitNotifySubline}>You can submit this log now if you want to.</Text>
          </View>
        }
        <TouchableOpacity style={[AppStyles.formButton, (!logs[currentLogIndex].poopPic || !logs[currentLogIndex].dailyQRE.completed) ? styles.disabledButton: {}]} 
          disabled={(!logs[currentLogIndex].poopPic || !logs[currentLogIndex].dailyQRE.completed)}
          onPress={() => onSubmit()}
        >
          <Text style={[AppStyles.formButtonText, (!logs[currentLogIndex].poopPic || !logs[currentLogIndex].dailyQRE.completed) ? styles.disabledButtonText : {}]}>Submit log</Text>
        </TouchableOpacity>
      </View>
      {
        !!time && 
        <View style={styles.overlayView}>
          <View style={styles.headerView}>
            <TouchableOpacity style={styles.closeButton} onPress={() => onPressClose()}>
              <MaterialIcons name="close" size={20} color="#1C1B1F" />
            </TouchableOpacity>
          </View>
          <View style={styles.overlayNotifyView}>
            <Text style={styles.overlayNotifyHeadline}>Log successfully submitted.</Text>
            <Text style={styles.overlayNotifySubline}>NEXT LOG AVAILABLE IN {formatTime(time)}</Text>
          </View>
        </View>
      }
    </View>
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
    // borderBottomWidth: 2,
    // borderColor: '#ECECEC',
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
  headerTitle: {
    color: '#24231F',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  menuButton: {
    backgroundColor: '#ECE9E3',
    borderWidth: 1,
    borderColor: '#ECECEC',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16
  },
  menuButtonTitleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuButtonTitle: {
    color: '#24231F',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  menuButtonDescription: {
    color: '#24231F',
    fontSize: 14,
    fontWeight: '500',
    opacity: 0.4,
    maxWidth: windowWidth - 100,
  },
  disabledButton: {
    backgroundColor: '#ECECEC',
  },
  disabledButtonText: {
    color: '#BCBCBC',
  },
  submitNotifyView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitNotifyHeadline: {
    color: '#000000',
    fontSize: 17.5,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  submitNotifySubline: {
    color: '#5E5E5E',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 18,
  },
  overlayView: {
    width: windowWidth,
    height:windowHeight,
    backgroundColor: '#FFFFFFBB',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  overlayNotifyView: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 110,
  },
  overlayNotifyHeadline: {
    color: '#000000',
    fontSize: 17.5,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  overlayNotifySubline: {
    color: '#FF0000',
    fontSize: 11,
    fontWeight: 'bold',
  }
});
