import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useContext, useEffect, useState } from "react";
import { QuestionnaireContext } from "../../context";
import { useNavigation, useIsFocused } from "@react-navigation/native";

export default function QuestionnaireTabBox({ data, hasTab = false, title = 'Questions', locked = true }) {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { 
    currentQRE, setCurrentQRE
  } = useContext(QuestionnaireContext);
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    // if (isFocused && hasTab) {
    //   let tabs = data?.tabs;
    //   for (let i = 0; i < tabs?.length; i++) {
    //     if (i === 0 && !tabs[i].completed) {
    //       setTabIndex(0);
    //       setCurrentQRE({
    //         ...currentQRE,
    //         TabIndex: 0
    //       });
    //       break;
    //     } else if (tabs[i - 1].completed) {
    //       setTabIndex(i);
    //       setCurrentQRE({
    //         ...currentQRE,
    //         TabIndex: i
    //       });
    //       break;
    //     } else {
    //       continue;
    //     }
    //   }
    // } else {
      if (currentQRE.TabIndex < data?.tabs.length) {
        setTabIndex(currentQRE.TabIndex);
      }
    // }
  }, [currentQRE, data, hasTab]);

  const onPressStart = (task, tindex) => {
    setCurrentQRE({
      ...currentQRE,
      data: data,
      QRE: data?.title,
      hasTab: true,
      TabIndex: tabIndex,
      TaskIndex: tindex
    });
    navigation.navigate('Questionnaire');
  }

  const onPressCompletedTask = (tindex) => {
    setCurrentQRE({
      ...currentQRE,
      data: data,
      QRE: data?.title,
      hasTab: true,
      TabIndex: tabIndex,
      TaskIndex: tindex
    });
    navigation.navigate('Questionnaire');
  }

  return (
    <View style={[styles.boxView, locked ? styles.boxLocked : {}]}>
      <Text style={[styles.boxTitle, locked ? styles.boxLockedTitle : {}]}>{title}</Text>
      <View style={styles.questionnaireTitleWrapper}>
        <Text style={[styles.questionnaireTitle, locked ? styles.boxLockedTitle : {}]}>{data?.title}</Text>
        {locked && <MaterialIcons name="lock" size={20} color="#BCBCBC" />}
      </View>
      {
        !locked && !!data?.tabs && 
        <View style={styles.tabsView}>
          {
            data?.tabs.map((tab, index) =>
              <TouchableOpacity style={[styles.tabButton, tabIndex === index ? styles.tabButtonActive : tab.completed ? styles.tabButtonCompleted : {}]} key={index}
                disabled={tab.locked}
                onPress={() => setCurrentQRE({...currentQRE, TabIndex: index})}
              >
                <Text style={[styles.tabButtonText, tabIndex === index ? styles.tabButtonTextActive : tab.completed ? styles.tabButtonTextCompleted : {}]}>
                  {tab?.title}
                </Text>
                <MaterialCommunityIcons 
                  name={
                    tab.completed ? "check-circle" : 
                      index === 0 ? "pencil-circle" : 
                        data?.tabs[index - 1].completed ? "pencil-circle" : "lock"
                  } 
                  size={16} 
                  color={tabIndex === index ? "#24231F" : tab.completed ? "#24231F" : "rgba(12,12,12,0.25)"} 
                  style={{marginLeft: 4}}
                />
              </TouchableOpacity> 
            )
          }
        </View>
      }
      {
        !locked && data?.tabs.filter((item,index) => index === tabIndex)[0].tasks.map((task, tindex) =>
          task.locked 
          ? <View style={styles.quizButton} key={tindex}>
              <Text style={styles.quizButtonText}>{task?.title}</Text>
            </View>
          : task.completed 
            ? <TouchableOpacity style={styles.quizButton} key={tindex}
                onPress={() => onPressCompletedTask(tindex)}
              >
                <Text style={styles.quizButtonText}>{task?.title}</Text>
                <View style={[styles.startButton, {backgroundColor: 'transparent'}]}>
                  <MaterialIcons name="check" size={20} color="#1C1B1F" />
                </View>
              </TouchableOpacity>
            : <View style={[styles.quizButton, {backgroundColor: '#E0DDD8'}]} key={tindex}>
                <Text style={styles.quizButtonText}>{task?.title}</Text>
                <TouchableOpacity style={styles.startButton}
                  onPress={() => onPressStart(task, tindex)}
                >
                  <Text style={styles.startButtonText}>Start</Text>
                </TouchableOpacity>
              </View>
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  boxView: {
    width: '100%',
    padding: 20,
    borderRadius: 16,
    backgroundColor: '#ECE9E3',
    marginBottom: 20,
  },
  boxLocked: {
    backgroundColor: '#ECECEC'
  },
  boxTitle: {
    color: '#24231F',
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
  },
  questionnaireTitleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  questionnaireTitle: {
    color: '#24231F',
    fontSize: 20,
    fontWeight: 'bold',
  },
  boxLockedTitle: {
    color: '#BCBCBC'
  },
  tabsView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ECECEC',
    borderRadius: 10,
    marginTop: 10,
  },
  tabButton: {
    flex: 1,
    height: 29,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 2,
  },
  tabButtonCompleted: {
    backgroundColor: '#E9E2D4',
  },
  tabButtonActive: {
    backgroundColor: '#FFFFFF',
  },
  tabButtonText: {
    color: 'rgba(12,12,12,0.25)',
    fontSize: 14,
    fontWeight: '500',
  },
  tabButtonTextCompleted: {
    color: '#24231F',
  },
  tabButtonTextActive: {
    color: '#24231F',
  },
  quizButton: {
    width: '100%',
    height: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.02)',
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  quizButtonText: {
    color: '#484848',
    fontSize: 16,
    fontWeight: '500',
  },
  startButton: {
    width: 58,
    height: 30,
    borderRadius: 8,
    backgroundColor: '#FEFEFC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  startButtonText: {
    color: '#24231F',
    fontSize: 14,
    fontWeight: '500',
  }
});
