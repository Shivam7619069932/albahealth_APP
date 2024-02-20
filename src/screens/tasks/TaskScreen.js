import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AppStyles from "../../styles/AppStyles";
import { Alba } from "../../../assets";
import { AppProgressView, DailyLogsProgress, DietOption, LanguageOption, MultipleCheckboxOptions, NumberOption, QuestionnaireBox, QuestionnaireTabBox, Quiz, ReportModal, SingleOptions, TaskBabyHealth, TaskFamilyHealth, TaskHousehold, TaskListItem, TextOption } from "../../components";
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useContext, useEffect, useState } from "react";
import { KitContext, LogContext, QuestionnaireContext } from "../../context";
import { useFocusEffect, useNavigation, useIsFocused } from "@react-navigation/native";

export const windowWidth = Dimensions.get('window').width;

export default function TaskScreen() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { 
    householdQRE,
    familyHealthQRE,
    babyHealthQRE,
    parentsDietQRE,
    babyDietQRE
  } = useContext(QuestionnaireContext);
  const { activatedKit, kitQRE } = useContext(KitContext);
  const { 
    poopPic, dailyQRE, cryRecord, time, setTime, logs, setCurrentLogIndex
  } = useContext(LogContext);
  // 
  const [openReportModal, setOpenReportModal] = useState(false);
  // 
  const [completedTasks, setCompletedTasks] = useState(0);
  const [showCompletedTasks, setShowCompletedTasks] = useState(false);

  useFocusEffect(() => {
    let count = 0;
    if (householdQRE.completed) {
      count += 1;
    }
    if (familyHealthQRE.completed) {
      count += 1;
    }
    if (babyHealthQRE.completed) {
      count += 1;
    }
    // 
    if (activatedKit) {
      count += 1;
    }
    if (kitQRE.completed) {
      count += 1;
    }
    if (poopPic && dailyQRE.completed) {
      count +=1;
    }
    // 
    if (parentsDietQRE.completed) {
      count += 1;
    }
    if (babyDietQRE.completed) {
      count += 1;
    }
    // 
    setCompletedTasks(count);
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener("tabPress", async (e) => {
      setShowCompletedTasks(false);
    });

    return () => unsubscribe();
  }, [navigation]);

  useEffect(() => {
    setShowCompletedTasks(false);
  }, [isFocused]);

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

  const onPressStartKitActivation = () => {
    navigation.navigate('KitActivation');
  }

  const onPressStartDailyLogs = () => {
    let _currentLogIndex = 0;
    if (logs) {
      for (let i = 0; i < logs.length; i++) {
        if (!logs[i].submitted) {
          _currentLogIndex = i;
          break;
        }
      }
      setCurrentLogIndex(_currentLogIndex);
    }
    // 
    if (!logs[0].submitted) {
      navigation.navigate('AboutLog');
    } else if (!logs[2].submitted) {
      navigation.navigate('ChildLog');
    }
  }

  return (
    <View style={{flex: 1}}>
      <ScrollView style={{flex: 1}}>
        <View style={AppStyles.appHeaderView}>
          <Image source={Alba} style={AppStyles.appHeaderLogo} resizeMode="contain" />
        </View>
        <View style={AppStyles.appBodyView}>
          <AppProgressView />
        </View>
        <View style={{flex: 1, padding: 16}}>
          {
            completedTasks > 0 && !showCompletedTasks &&
            <TouchableOpacity style={styles.completeTasksBubble}
              onPress={() => setShowCompletedTasks(true)}
            >
              <Text style={styles.completeTasksBubbleText}>+ {completedTasks} completed tasks</Text>
            </TouchableOpacity>
          }
          {/* Household */}
          {
            (showCompletedTasks || !householdQRE.completed) &&
            <QuestionnaireBox data={householdQRE} title="Questions" locked={false} />
          }
          {/* Family Health */}
          {
            (showCompletedTasks || !familyHealthQRE.completed) &&
            <QuestionnaireTabBox data={familyHealthQRE} hasTab={true} title="Questions" locked={!householdQRE.completed} />
          }
          {/* Baby Health */}
          {
            (showCompletedTasks || !babyHealthQRE.completed) &&
            <QuestionnaireBox data={babyHealthQRE} title="Questions" locked={!familyHealthQRE.completed} />
          }
          {/* Kit Activation */}
          {
            (showCompletedTasks || !activatedKit) &&
            <View style={[styles.taskBox, !babyHealthQRE.completed ? styles.taskBoxLocked : {}]}>
              <Text style={[styles.taskBoxTitle, !babyHealthQRE.completed ? styles.taskBoxLockedTitle : {}]}>Kit activation</Text>
              {
                activatedKit 
                ? <MaterialIcons name="check" size={20} color="#1C1B1F" />
                : babyHealthQRE.completed
                  ? <TouchableOpacity style={styles.startButton}
                      onPress={() => onPressStartKitActivation()}
                    >
                      <Text style={styles.startButtonText}>Start</Text>
                    </TouchableOpacity>
                  : <MaterialIcons name="lock" size={20} color="#BCBCBC" />
              }
            </View>
          }
          {/* Kit Questionnaire */}
          {
            // (showCompletedTasks || !kitQRE.completed) &&
            // <>
            // {
            //   kitQRE.completed 
            //   ? <TouchableOpacity style={[styles.taskBox]}
            //       onPress={() => navigation.navigate('KitQuestionnaire')}
            //     >
            //       <Text style={[styles.taskBoxTitle]}>Kit questionnaire</Text>
            //       <MaterialIcons name="check" size={20} color="#1C1B1F" />
            //     </TouchableOpacity>
            //   : <View style={[styles.taskBox, !activatedKit ? styles.taskBoxLocked : {}]}>
            //       <Text style={[styles.taskBoxTitle, !activatedKit ? styles.taskBoxLockedTitle : {}]}>Kit questionnaire</Text>
            //       {
            //         activatedKit
            //         ? <TouchableOpacity style={styles.startButton}
            //             onPress={() => navigation.navigate('KitQuestionnaire')}
            //           >
            //             <Text style={styles.startButtonText}>Start</Text>
            //           </TouchableOpacity>
            //         : <MaterialIcons name="lock" size={20} color="#BCBCBC" />
            //       }
            //     </View>
            // }
            // </>
          }
          {/* Daily Logs */}
          {
            !logs[0].submitted
            ? <View style={[styles.taskBox, !activatedKit ? styles.taskBoxLocked : {}]}>
                <Text style={[styles.taskBoxTitle, !activatedKit ? styles.taskBoxLockedTitle : {}]}>Daily logs</Text>
                {
                  !activatedKit 
                  ? <MaterialIcons name="lock" size={20} color="#BCBCBC" />
                  : <TouchableOpacity style={styles.startButton}
                      onPress={() => onPressStartDailyLogs()}
                    >
                      <Text style={styles.startButtonText}>Start</Text>
                    </TouchableOpacity>
                }
              </View>
            : showCompletedTasks || !logs[2].submitted 
              ? <View style={[styles.taskBox, {flexDirection: 'column', paddingHorizontal: 8, paddingBottom: 9}]}>
                  <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 12}}>
                    <Text style={[styles.taskBoxTitle]}>Daily logs</Text>
                    {
                      !!time && 
                      <Text style={{fontSize: 10, fontWeight: 'bold', color: '#FF0000'}}>NEW LOG AVAILABLE IN {Math.floor(time / (60 * 60))}h</Text>
                    }
                  </View>
                  <TouchableOpacity style={{marginTop: 16, width: '100%', opacity: (!!time || !!logs[2].submitted) ? 0.25 : 1}}
                    disabled={!!time || !!logs[2].submitted}
                    onPress={() => onPressStartDailyLogs()}
                  >
                    <DailyLogsProgress />
                  </TouchableOpacity>
                </View>
              : null
          }
          {/* Baby Diet */}
          {
            (showCompletedTasks || !babyDietQRE.completed) &&
            <QuestionnaireBox data={babyDietQRE} title="Sample questions" locked={!activatedKit} />
          }
          {/* Parents Diet */}
          {
            (showCompletedTasks || !parentsDietQRE.completed) &&
            <QuestionnaireTabBox data={parentsDietQRE} hasTab={true} title="Sample questions" locked={!activatedKit} />
          }
          {/* Report */}
          <View style={[styles.taskBox, !logs[2].submitted ? styles.taskBoxLocked : {}, {flexDirection: 'column', alignItems: 'flex-start'}]}>
            <Text style={[styles.taskBoxTitle, !logs[2].submitted ? styles.taskBoxLockedTitle : {}]}>Report</Text>
            {/* {
              submitEnd
              ? <TouchableOpacity style={styles.startButton}
                  onPress={() => navigation.navigate('MainBottomTab', {screen: 'ReportTab'})}
                >
                  <Text style={styles.startButtonText}>View</Text>
                </TouchableOpacity>
              : <MaterialIcons name="lock" size={20} color="#BCBCBC" />
            } */}
            <Text style={{marginTop: 10, opacity: 0.5}}>After the end of the study, your result will be available for you</Text>
          </View>
        </View>
      </ScrollView>
      {/*  */}
      <ReportModal 
        visible={openReportModal} 
        onRequestClose={() => setOpenReportModal(false)} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  completeTasksBubble: {
    width: 151,
    height: 29,
    borderRadius: 10,
    backgroundColor: 'rgba(254,254,252,0.4)',
    borderWidth: 1.5,
    borderColor: '#ECECEC',
    alignItems: 'center',
    justifyContent: 'center',
    // shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,  
    elevation: 8,
    // 
    position: 'absolute',
    zIndex: 999,
    left: (windowWidth - 151) / 2
  },
  completeTasksBubbleText: {
    color: '#484848',
    fontSize: 14,
    fontWeight: '500',
  },
  taskBox: {
    backgroundColor: '#ECE9E3',
    borderWidth: 1,
    borderColor: '#ECECEC',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 27,
    marginBottom: 20,
  },
  taskBoxLocked: {
    backgroundColor: '#ECECEC'
  },
  taskBoxTitle: {
    color: '#24231F',
    fontSize: 20,
    fontWeight: 'bold',
  },
  taskBoxLockedTitle: {
    color: '#BCBCBC'
  },
  startButton: {
    width: 58,
    height: 30,
    borderRadius: 8,
    backgroundColor: '#FEFEFC',
    borderWidth: 1,
    borderColor: '#ECECEC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  startButtonText: {
    color: '#24231F',
    fontSize: 14,
    fontWeight: '500',
  },
});
