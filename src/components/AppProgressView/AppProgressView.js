import { Image, LayoutAnimation, NativeModules, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome5, MaterialIcons, Octicons } from '@expo/vector-icons';
import { ProgressGradient } from "../../../assets";
import { useContext, useEffect, useState } from "react";
import { LogContext, QuestionnaireContext, KitContext } from "../../context";
import AppStyles from "../../styles/AppStyles";

const {UIManager} = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

export default function AppProgressView() {
  const {
    householdQRE, setHouseholdQRE,
    familyHealthQRE, setFamilyHealthQRE,
    babyHealthQRE, setBabyHealthQRE,
    parentsDietQRE, setParentsDietQRE,
    babyDietQRE, setBabyDietQRE,
  } = useContext(QuestionnaireContext);
  const { activatedKit, kitQRE } = useContext(KitContext);
  const { logs } = useContext(LogContext);
  const [progress, setProgress] = useState({
    familyQuestions: false,
    takeGutSample: false,
    sampleQuestions: false,
    dailyLogs: false,
  });
  const [completedPercent, setCompletedPercent] = useState(0);
  const [pgsTime, setPgsTime] = useState(0);

  useEffect(() => {
    let _progress = {
      familyQuestions: (householdQRE.completed && familyHealthQRE.completed && babyHealthQRE.completed),
      takeGutSample: activatedKit,
      sampleQuestions: (babyDietQRE.completed && parentsDietQRE.completed),
      dailyLogs: logs[2].submitted
    };
    setProgress(_progress);
    // 
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
    if (activatedKit) {
      count += 1;
    }
    // if (kitQRE.completed) {
    //   count += 1;
    // }
    if (logs[2].submitted) {
      count +=1;
    }
    if (parentsDietQRE.completed) {
      count += 1;
    }
    if (babyDietQRE.completed) {
      count += 1;
    }
    setCompletedPercent(Math.round(count * 100 / 7));
    // Progress Animation
    let duration = 0;
    let pgsWidth = {...pgsWidth};
    if (_progress.familyQuestions) {
      duration += 1;
    }
    if (_progress.takeGutSample) {
      duration += 1;
    }
    if (_progress.sampleQuestions) {
      duration += 1;
    }
    setPgsTime(duration);
    
  }, [householdQRE, familyHealthQRE, babyHealthQRE, parentsDietQRE, babyDietQRE, activatedKit, logs]);

  useEffect(() => {
    let interval;

    if (pgsTime > 0) {
      interval = setInterval(() => {
        LayoutAnimation.easeInEaseOut();
        setPgsTime(pgsTime - 1)
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    }
  }, [pgsTime]);

  const animatedWidth = (type, index, time) => {
    let w = 0;
    if (type === 'completed') {
      w = 100 - 100 * time * (index + 1);
    } else if (type === 'active') {
      w = 50 - 50 * time * (index + 1);
    }
    return w+'%';
  }

  return (
    <View style={styles.appProgressView}>
      <View style={styles.topView}>
        <Image source={ProgressGradient} style={styles.progressLineDefault} resizeMode="stretch" />
        {/*  */}
        <View style={styles.progressItem}>
          <View style={styles.progressStep}>
            <View 
              style={[
                styles.progressLine, 
                {
                  width: progress.familyQuestions ? animatedWidth('completed', 0, pgsTime) : animatedWidth('active', 0, pgsTime), 
                  backgroundColor: progress.familyQuestions ? '#65D6A3' : '#2D8CFF'
                }
              ]}
            ></View>
            <View 
              style={[
                styles.progressIcon, 
                {backgroundColor: progress.familyQuestions ? '#3CAE7B' : '#A9CDF8'}
              ]}
            >
              {
                progress.familyQuestions 
                ? <Octicons name="check-circle-fill" size={16} color="#65D6A3" />
                : <FontAwesome5 name="map-marker-alt" size={16} color="#2D8CFF" />
              }
            </View>
          </View>
          <Text style={styles.progressText}>Questions</Text>
        </View>
        {/*  */}
        <View style={styles.progressItem}>
          <View style={styles.progressStep}>
            <View 
              style={[
                styles.progressLine, 
                {
                  width: progress.takeGutSample ? animatedWidth('completed', 1, pgsTime) : progress.familyQuestions ? animatedWidth('active', 1, pgsTime) : '0%', 
                  backgroundColor: progress.takeGutSample ? '#65D6A3' : progress.familyQuestions ? '#2D8CFF' : '#FEFEFC'
                }
              ]}
            ></View>
            <View 
              style={[
                styles.progressIcon, 
                {backgroundColor: progress.takeGutSample ? '#3CAE7B' : progress.familyQuestions ? '#A9CDF8' : '#FEFEFC'}
              ]}
            >
              {
                progress.takeGutSample 
                ? <Octicons name="check-circle-fill" size={16} color="#65D6A3" />
                : progress.familyQuestions 
                  ? <FontAwesome5 name="map-marker-alt" size={16} color="#2D8CFF" />
                  : <MaterialIcons name="lock" size={16} color="#ECECEC" />
              }
            </View>
          </View>
          <Text style={styles.progressText}>Take gut sample</Text>
        </View>
        {/*  */}
        <View style={styles.progressItem}>
          <View style={styles.progressStep}>
            <View 
              style={[
                styles.progressLine, 
                {
                  width: progress.sampleQuestions ? animatedWidth('completed', 2, pgsTime) : progress.takeGutSample ? animatedWidth('active', 2, pgsTime) : '0%', 
                  backgroundColor: progress.sampleQuestions ? '#65D6A3' : progress.takeGutSample ? '#2D8CFF' : '#FEFEFC'
                }
              ]}
            ></View>
            <View 
              style={[
                styles.progressIcon, 
                {backgroundColor: progress.sampleQuestions ? '#3CAE7B' : progress.takeGutSample ? '#A9CDF8' : '#FEFEFC'}
              ]}
            >
              {
                progress.sampleQuestions 
                ? <Octicons name="check-circle-fill" size={16} color="#65D6A3" />
                : progress.takeGutSample 
                  ? <FontAwesome5 name="map-marker-alt" size={16} color="#2D8CFF" />
                  : <MaterialIcons name="lock" size={16} color="#ECECEC" />
              }
            </View>
          </View>
          <Text style={styles.progressText}>Sample questions</Text>
        </View>
        {/*  */}
        <View style={styles.progressItem}>
          <View style={styles.progressStep}>
            <View 
              style={[
                styles.progressLine, 
                {
                  width: progress.dailyLogs ? '0%' : progress.sampleQuestions ? '0%' : '0%', 
                  backgroundColor: progress.dailyLogs ? '#65D6A3' : progress.sampleQuestions ? '#2D8CFF' : '#FEFEFC'
                }
              ]}
            ></View>
            <View 
              style={[
                styles.progressIcon, 
                {backgroundColor: progress.dailyLogs ? '#3CAE7B' : progress.sampleQuestions ? '#A9CDF8' : '#FEFEFC'}
              ]}
            >
              {
                progress.dailyLogs 
                ? <Octicons name="check-circle-fill" size={16} color="#65D6A3" />
                : progress.sampleQuestions 
                  ? <FontAwesome5 name="map-marker-alt" size={16} color="#2D8CFF" />
                  : <MaterialIcons name="lock" size={16} color="#ECECEC" />
              }
            </View>
          </View>
          <Text style={styles.progressText}>Daily logs</Text>
        </View>
        {/*  */}
      </View>
      <View style={styles.bottomView}>
        <TouchableOpacity style={[styles.bottomButton, {flex: 4}]}
          disabled={true}
        >
          <Text style={styles.bottomButtonText}>{completedPercent}% Completed</Text>
        </TouchableOpacity>
        {
          activatedKit && 
          <TouchableOpacity style={[styles.bottomButton, {flex: 6}]} 
            disabled={true}
          >
            <Text style={styles.bottomButtonText}>🔥 3 day streak</Text>
            {/* <View style={[AppStyles.logProgressDots, {width: 66}]}>
              <View style={[AppStyles.logProgressDot, logs[0].submitted ? AppStyles.logProgressCompleted : AppStyles.logProgressActive]}>
                {logs[0].submitted && <MaterialIcons name="check" size={16} color="#ECECEC" />}
              </View>
              <View style={[AppStyles.logProgressDot, logs[1].submitted ? AppStyles.logProgressCompleted : logs[0].submitted && !logs[1].submitted ? AppStyles.logProgressActive : {}]}>
                {logs[1].submitted && <MaterialIcons name="check" size={16} color="#ECECEC" />}
              </View>
              <View style={[AppStyles.logProgressDot, logs[2].submitted ? AppStyles.logProgressCompleted : logs[0].submitted && logs[1].submitted && !logs[2].submitted ? AppStyles.logProgressActive : {}]}>
                {logs[2].submitted && <MaterialIcons name="check" size={16} color="#ECECEC" />}
              </View>
            </View> */}
            <View style={[AppStyles.logProgressDots, {width: 66}]}>
              {
                logs.map((item, index) =>
                  item.submitted 
                  ? <View 
                      style={[AppStyles.logProgressDot, AppStyles.logProgressCompleted]}
                      key={index}
                    >
                      <MaterialIcons name="check" size={16} color="#ECECEC" />
                    </View>
                  : index !== 0 
                    ? <View 
                        style={[AppStyles.logProgressDot, logs[index - 1].submitted ? AppStyles.logProgressActive : {}]}
                        key={index}
                      >
                      </View>
                    : <View 
                        style={[AppStyles.logProgressDot, !item.submitted && (!!item.poopPic || !!item.dailyQRE.qa[0].answer || item.cryRecord.completed) ? AppStyles.logProgressActive : {}]}
                        key={index}
                      >
                      </View>
                )
              }
            </View>
          </TouchableOpacity>
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  appProgressView: {
    width: '100%',
    backgroundColor: '#E2ECF8',
    padding: 20,
    borderRadius: 16,
  },
  topView: {
    flex: 4,
    flexDirection: 'row',
  },
  progressLineDefault: {
    width: '100%',
    height: 4,
    borderRadius: 2,
    position: 'absolute',
    top: 12,
  },
  progressItem: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  progressStep: {
    width: '100%',
    alignItems: 'center',
  },
  progressLine: {
    width: '100%',
    height: 4,
    borderRadius: 2,
    position: 'absolute',
    top: 12,
    left: '50%',
  },
  progressIcon: {
    width: 28,
    height: 28,
    borderRadius: 12,
    backgroundColor: '#3CAE7B',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  progressText: {
    color: '#484848',
    fontSize: 11,
    fontWeight: '500',
    textAlign: 'center'
  },
  bottomView: {
    flexDirection: 'row',
    flex: 2,
    gap: 4,
  },
  bottomButton: {
    height: 29,
    flex: 1,
    backgroundColor: 'rgba(45,140,255,0.1)',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16
  },
  bottomButtonText: {
    color: '#484848',
    fontSize: 14,
    fontWeight: '500',
  }
});
