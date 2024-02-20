import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { useContext } from "react";
import { QuestionnaireContext } from "../../context";
import { useNavigation } from "@react-navigation/native";

export default function QuestionnaireBox({ data, title = 'Questions', locked = true }) {
  const navigation = useNavigation();
  const { 
    currentQRE, setCurrentQRE
  } = useContext(QuestionnaireContext);

  const onPressStart = (task, tindex) => {
    setCurrentQRE({
      ...currentQRE,
      data: data,
      QRE: data?.title,
      hasTab: false,
      TabIndex: 0,
      TaskIndex: tindex
    });
    navigation.navigate('Questionnaire');
  }

  const onPressCompletedTask = (tindex) => {
    setCurrentQRE({
      ...currentQRE,
      data: data,
      QRE: data?.title,
      hasTab: false,
      TabIndex: 0,
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
        !locked && data?.tasks.map((task, tindex) =>
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
