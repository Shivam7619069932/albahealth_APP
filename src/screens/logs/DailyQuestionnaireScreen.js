import { Dimensions, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AppStyles from "../../styles/AppStyles";
import { DietOption, LanguageOption, MultipleCheckboxOptions, NumberOption, Quiz, SingleOptions, TextOption } from "../../components";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useContext, useEffect, useState } from "react";
import { LogContext } from "../../context";

export const windowWidth = Dimensions.get('window').width;

export default function DailyQuestionnaireScreen() {
  const navigation = useNavigation();
  const { 
    logs, setLogs, currentLogIndex
  } = useContext(LogContext);
  const [QAIndex, setQAIndex] = useState(0);

  useEffect(() => {
    let _QAIndex = 0;
    for (let i = 0; i < logs[currentLogIndex].dailyQRE.qa.length; i++) {
      if (!logs[currentLogIndex].dailyQRE.qa[i].answer) {
        _QAIndex = i;
        break;
      } else {
        if (i === logs[currentLogIndex].dailyQRE.qa.length - 1) {
          _QAIndex = i;
        }
      }
    }
  }, [currentLogIndex, logs]);

  const onPressClose = () => {
    navigation.navigate('ChildLog');
  }

  const handleAnswer = (value) => {
    let _logs = [...logs];
    _logs[currentLogIndex].dailyQRE.qa[QAIndex].answer = value;
    setLogs(_logs);
  }

  const onPressNext = () => {
    if (QAIndex < logs[currentLogIndex].dailyQRE.qa.length - 1) {
      setQAIndex(current => current + 1);
    } else {
      let _logs = [...logs];
      _logs[currentLogIndex].dailyQRE.completed = true;
      setLogs(_logs);
      navigation.navigate('ChildLog');
    }
  }

  const onPressBack = () => {
    if (QAIndex === 0) {
      navigation.navigate('ChildLog');
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
        <Text style={styles.headerTitle}>{logs[currentLogIndex].dailyQRE?.title}</Text>
        <View style={{width: 36}}></View>
      </View>
      <View style={styles.progressView}>
        <View style={[
          styles.currentProgressView,
          {
            width: `${Math.round((QAIndex + 1) / logs[currentLogIndex].dailyQRE?.qa.length * 100)}%`
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
          <Text style={styles.questionText}>{logs[currentLogIndex].dailyQRE?.qa[QAIndex].question}</Text>
          {
            logs[currentLogIndex].dailyQRE?.qa[QAIndex].optiontype === 'single' && 
            <SingleOptions 
              options={logs[currentLogIndex].dailyQRE?.qa[QAIndex].options}
              unit={logs[currentLogIndex].dailyQRE?.qa[QAIndex].unit}
              value={logs[currentLogIndex].dailyQRE?.qa[QAIndex].answer}
              onSelect={(value) => handleAnswer(value)}
            />
          }
          {
            logs[currentLogIndex].dailyQRE?.qa[QAIndex].optiontype === 'number' && 
            <NumberOption 
              options={logs[currentLogIndex].dailyQRE?.qa[QAIndex].options}
              unit={logs[currentLogIndex].dailyQRE?.qa[QAIndex].unit}
              value={logs[currentLogIndex].dailyQRE?.qa[QAIndex].answer}
              onChange={(value) => handleAnswer(value)}
            />
          }
        </View>
      </ScrollView>
      <View style={AppStyles.fixedBottomButtonWrapper}>
        <TouchableOpacity style={[AppStyles.formButton, {opacity: logs[currentLogIndex].dailyQRE.qa[QAIndex].answer ? 1 : 0.25}]} 
          disabled={!logs[currentLogIndex].dailyQRE.qa[QAIndex].answer}
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
