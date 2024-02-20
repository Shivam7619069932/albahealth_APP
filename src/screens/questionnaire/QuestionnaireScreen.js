import { Dimensions, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AppStyles from "../../styles/AppStyles";
import { DietOption, LanguageOption, MultipleCheckboxOptions, NumberOption, Quiz, SingleOptions, TextOption } from "../../components";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useContext, useEffect, useState } from "react";
import { QuestionnaireContext } from "../../context";

export const windowWidth = Dimensions.get('window').width;

export default function QuestionnaireScreen() {
  const navigation = useNavigation();
  const { 
    babyDietQRE,
    currentQRE, setCurrentQRE,
    updateQRE,
    // task, setTask
  } = useContext(QuestionnaireContext);
  const [task, setTask] = useState(undefined);
  const [QAIndex, setQAIndex] = useState(0);

  useEffect(() => {
    let _task = {};
    if (currentQRE.data) {
      if (currentQRE.hasTab) {
        _task = currentQRE.data.tabs[currentQRE.TabIndex].tasks[currentQRE.TaskIndex];
      } else {
        _task = currentQRE.data.tasks[currentQRE.TaskIndex];
      }
    }
    setTask(_task);
    // check the last QA
    let _QAIndex = 0;
    for (let i = 0; i < _task.qa.length; i++) {
      if (!_task.qa[i].answer) {
        _QAIndex = i;
        break;
      } else {
        if (i === _task.qa.length - 1) {
          _QAIndex = i;
        }
      }
    }
    setQAIndex(_QAIndex);
    console.log('=== QAI ===', _QAIndex);
  }, [currentQRE]);

  const onPressClose = () => {
    navigation.navigate('MainBottomTab');
  }

  const handleAnswer = (value) => {
    let _task = {...task};
    _task.qa[QAIndex].answer = value;
    setTask(_task);
  }

  const onPressNext = () => {
    if (QAIndex === task.qa.length - 1) {
      let _task = {...task};
      _task.completed = true;
      updateQRE(_task, currentQRE);
      if (currentQRE.QRE === 'Baby diet' && currentQRE.TaskIndex === babyDietQRE.tasks.length - 1) {
        // navigation.navigate('QuestionnaireConclusion');
        navigation.navigate('MainBottomTab', {screen: 'TasksTab'});
      } else {
        // let _currentQRE = {...currentQRE};
        // if (currentQRE.hasTab) {
        //   console.log('== has tab ==');
        //   if (currentQRE.TaskIndex < currentQRE.data.tabs[currentQRE.TabIndex].tasks.length - 1) {
        //     console.log('== TaskIndex increase ==');
        //     _currentQRE.TaskIndex += 1;
        //     setCurrentQRE(_currentQRE);
        //   } else {
        //     if (currentQRE.TabIndex < currentQRE.data.tabs.length - 1) {
        //       console.log('== TabIndex increase ==');
        //       _currentQRE.TabIndex += 1;
        //       _currentQRE.TaskIndex = 0;
        //       setCurrentQRE(_currentQRE);
        //     } else {
        //       navigation.navigate('MainBottomTab', {screen: 'TasksTab'});
        //     }
        //   }
        // } else {
        //   console.log('== no tab ==');
        //   if (currentQRE.TaskIndex < currentQRE.data.tasks.length - 1) {
        //     console.log('== TaskIndex increase ==');
        //     _currentQRE.TaskIndex += 1;
        //     setCurrentQRE(_currentQRE);
        //   } else {
        //     navigation.navigate('MainBottomTab', {screen: 'TasksTab'});
        //   }
        // }
        navigation.navigate('MainBottomTab', {screen: 'TasksTab'});
      }
    } else {
      setQAIndex(current => current + 1);
    }
  }

  const onPressBack = () => {
    if (QAIndex === 0) {
      navigation.navigate('MainBottomTab', {screen: 'TasksTab'});
    } else {
      setQAIndex(current => current - 1);
    }
  }

  return (
    <View style={{flex: 1, backgroundColor: '#FEFEFC'}}>
      <View style={styles.headerView}>
        <TouchableOpacity style={styles.closeButton} onPress={() => onPressClose()}>
          <MaterialIcons name="close" size={20} color="#1C1B1F" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{task?.title}</Text>
        <View style={{width: 36}}></View>
      </View>
      <View style={styles.progressView}>
        <View style={[
          styles.currentProgressView,
          {
            width: `${Math.round((QAIndex + 1) / task?.qa.length * 100)}%`
          }
        ]}></View>
      </View>
      <ScrollView style={{flex: 1}}>
        <View style={styles.actionView}>
          <TouchableOpacity onPress={() => onPressBack()}>
            <MaterialIcons name="arrow-back" size={24} color="#000000" />
          </TouchableOpacity>
        </View>
        <View style={styles.QAView}>
          <Text style={styles.questionText}>{task?.qa[QAIndex].question}</Text>
          {
            task?.qa[QAIndex].optiontype === 'single' && 
            <SingleOptions 
              options={task?.qa[QAIndex].options}
              unit={task?.qa[QAIndex].unit}
              value={task?.qa[QAIndex].answer}
              onSelect={(value) => handleAnswer(value)}
            />
          }
          {
            task?.qa[QAIndex].optiontype === 'number' && 
            <NumberOption 
              options={task?.qa[QAIndex].options}
              unit={task?.qa[QAIndex].unit}
              value={task?.qa[QAIndex].answer}
              onChange={(value) => handleAnswer(value)}
            />
          }
        </View>
      </ScrollView>
      <View style={AppStyles.fixedBottomButtonWrapper}>
        <TouchableOpacity 
          style={[AppStyles.formButton, {opacity: !task?.qa[QAIndex].answer ? 0.25 : 1}]} 
          disabled={!task?.qa[QAIndex].answer}
          onPress={() => onPressNext()}
        >
          <Text style={AppStyles.formButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
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
  progressView: {
    width: '100%',
    height: 4,
    backgroundColor: '#ECECEC'
  },
  currentProgressView: {
    backgroundColor: '#24231F',
    height: 4,
    width: 120,
  },
  actionView: {
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 25,
    paddingBottom: 18,
  },
  QAView: {
    paddingLeft: 25,
    paddingRight: 25,
  },
  questionText: {
    color: '#24231F',
    fontSize: 24,
    fontWeight: 'bold',
  }
});
