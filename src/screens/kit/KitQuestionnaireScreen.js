import { Dimensions, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AppStyles from "../../styles/AppStyles";
import { DietOption, LanguageOption, MultipleCheckboxOptions, NumberOption, Quiz, SingleOptions, TextOption } from "../../components";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useContext, useEffect, useState } from "react";
import { KitContext } from "../../context";

export const windowWidth = Dimensions.get('window').width;

export default function KitQuestionnaireScreen() {
  const navigation = useNavigation();
  const { 
    kitQRE, setKitQRE
  } = useContext(KitContext);
  const [QAIndex, setQAIndex] = useState(0);

  // useEffect(() => {
  //   setTask(kitQRE);
  // }, [kitQRE]);

  const onPressClose = () => {
    navigation.navigate('MainBottomTab');
  }

  const handleAnswer = (value) => {
    let _kitQRE = {...kitQRE};
    _kitQRE.qa[QAIndex].answer = value;
    setKitQRE(_kitQRE);
  }

  const onPressNext = () => {
    // console.log('>>>', kitQRE.qa.length - 1, QAIndex);return;
    if (QAIndex < kitQRE.qa.length - 1) {
      setQAIndex(current => current + 1);
    } else {
      setKitQRE({...kitQRE, completed: true});
      navigation.navigate('MainBottomTab');
    }
  }

  const onPressBack = () => {
    if (QAIndex === 0) {

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
        <Text style={styles.headerTitle}>{kitQRE?.title}</Text>
        <View style={{width: 36}}></View>
      </View>
      <View style={styles.progressView}>
        <View style={[
          styles.currentProgressView,
          {
            width: `${Math.round((QAIndex + 1) / kitQRE?.qa.length * 100)}%`
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
          <Text style={styles.questionText}>{kitQRE?.qa[QAIndex].question}</Text>
          {
            kitQRE?.qa[QAIndex].optiontype === 'single' && 
            <SingleOptions 
              options={kitQRE?.qa[QAIndex].options}
              unit={kitQRE?.qa[QAIndex].unit}
              value={kitQRE?.qa[QAIndex].answer}
              onSelect={(value) => handleAnswer(value)}
            />
          }
          {
            kitQRE?.qa[QAIndex].optiontype === 'number' && 
            <NumberOption 
              options={kitQRE?.qa[QAIndex].options}
              unit={kitQRE?.qa[QAIndex].unit}
              value={kitQRE?.qa[QAIndex].answer}
              onChange={(value) => handleAnswer(value)}
            />
          }
        </View>
      </ScrollView>
      <View style={AppStyles.fixedBottomButtonWrapper}>
        <TouchableOpacity style={[AppStyles.formButton, {opacity: kitQRE.qa[QAIndex].answer ? 1 : 0.25}]} 
          disabled={!kitQRE.qa[QAIndex].answer}
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
