import React, { useContext, useEffect, useState } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { RootContext } from '../context';
import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Loader } from '../components';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import FamilyProfileStartScreen from '../screens/familyprofile/FamilyProfileStartScreen';
import FamilyProfileScreen from '../screens/familyprofile/FamilyProfileScreen';
// import ConsentAScreen from '../screens/consents/ConsentAScreen';
// import ConsentBScreen from '../screens/consents/ConsentBScreen';
import QuestionOnboardingScreen from '../screens/questionnaire/QuestionOnboardingScreen';
import MainBottomTabNavigator from './MainBottomTabNavigator';
import OnboardingStartScreen from '../screens/onboarding/OnboardingStartScreen';
import OnboardingReportScreen from '../screens/onboarding/OnboardingReportScreen';
import OnboardingTaskScreen from '../screens/onboarding/OnboardingTaskScreen';
import OnboardingProfileScreen from '../screens/onboarding/OnboardingProfileScreen';
import QuestionnaireScreen from '../screens/questionnaire/QuestionnaireScreen';
import QuestionnaireEndScreen from '../screens/questionnaire/QuestionnaireEndScreen';
import QuestionnaireConclusionScreen from '../screens/questionnaire/QuestionnaireConclusionScreen';
import KitActivationScreen from '../screens/kit/KitActivationScreen';
import KitActivationSuccessScreen from '../screens/kit/KitActivationSuccessScreen';
import KitQuestionnaireScreen from '../screens/kit/KitQuestionnaireScreen';
import AboutLogScreen from '../screens/logs/AboutLogScreen';
import ChildLogScreen from '../screens/logs/ChildLogScreen';
import PoopPictureScreen from '../screens/logs/PoopPictureScreen';
import DailyQuestionnaireScreen from '../screens/logs/DailyQuestionnaireScreen';
import CryRecordingScreen from '../screens/logs/CryRecordingScreen';
import ActivateNotificationScreen from '../screens/auth/ActivateNotificationScreen';

const Stack = createNativeStackNavigator();
export const windowHeight = Dimensions.get('window').height;

export default function RootStackNavigator() {
  const { loading } = useContext(RootContext);
  const { toast, showToast } = useContext(RootContext);
  
  return (
    <View style={{flex: 1}}>
    {
      loading && 
      <Loader />
    }
    <ErrorMessageModal 
      visible={!!toast} 
      message={toast}
      onRequestClose={() => showToast('')} 
    />
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{headerShown: true}}
      >
        {/* Auth */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{title: '', headerShown: false}}
        />
        <Stack.Screen 
          name="Register" 
          component={RegisterScreen} 
          options={{title: '', headerShown: false}}
        />
        <Stack.Screen 
          name="ActivateNotification" 
          component={ActivateNotificationScreen} 
          options={{title: '', headerShown: false}}
        />
        {/* Family Profile */}
        <Stack.Screen 
          name="FamilyProfileStart" 
          component={FamilyProfileStartScreen} 
          options={{title: '', headerShown: false}}
        />
        <Stack.Screen 
          name="FamilyProfile" 
          component={FamilyProfileScreen} 
          options={{title: '', headerShown: false}}
        />
        <Stack.Screen 
          name="QuestionnaireOnboarding" 
          component={QuestionOnboardingScreen} 
          options={{title: '', headerShown: false}}
        />
        <Stack.Screen 
          name="MainBottomTab" 
          component={MainBottomTabNavigator} 
          options={{title: '', headerShown: false}}
        />
        {/* Questionnaire */}
        <Stack.Screen 
          name="Questionnaire" 
          component={QuestionnaireScreen} 
          options={{title: '', headerShown: false}}
        />
        <Stack.Screen 
          name="QuestionnaireEnd" 
          component={QuestionnaireEndScreen} 
          options={{title: '', headerShown: false}}
        />
        <Stack.Screen 
          name="QuestionnaireConclusion" 
          component={QuestionnaireConclusionScreen} 
          options={{title: '', headerShown: false}}
        />
        {/* Kit */}
        <Stack.Screen 
          name="KitActivation" 
          component={KitActivationScreen} 
          options={{title: '', headerShown: false}}
        />
        <Stack.Screen 
          name="KitActivationSuccess" 
          component={KitActivationSuccessScreen} 
          options={{title: '', headerShown: false}}
        />
        <Stack.Screen 
          name="KitQuestionnaire" 
          component={KitQuestionnaireScreen} 
          options={{title: '', headerShown: false}}
        />
        {/* Onboarding */}
        <Stack.Screen 
          name="OnboardingStart" 
          component={OnboardingStartScreen} 
          options={{title: '', headerShown: false}}
        />
        <Stack.Screen 
          name="OnboardingReport" 
          component={OnboardingReportScreen} 
          options={{title: '', headerShown: false}}
        />
        <Stack.Screen 
          name="OnboardingTasks" 
          component={OnboardingTaskScreen} 
          options={{title: '', headerShown: false}}
        />
        <Stack.Screen 
          name="OnboardingProfile" 
          component={OnboardingProfileScreen} 
          options={{title: '', headerShown: false}}
        />
        {/* Logs */}
        <Stack.Screen 
          name="AboutLog" 
          component={AboutLogScreen} 
          options={{title: '', headerShown: false}}
        />
        <Stack.Screen 
          name="ChildLog" 
          component={ChildLogScreen} 
          options={{title: '', headerShown: false}}
        />
        <Stack.Screen 
          name="PoopPicture" 
          component={PoopPictureScreen} 
          options={{title: '', headerShown: false}}
        />
        <Stack.Screen 
          name="DailyQuestionnaire" 
          component={DailyQuestionnaireScreen} 
          options={{title: '', headerShown: false}}
        />
        <Stack.Screen 
          name="CryRecording" 
          component={CryRecordingScreen} 
          options={{title: '', headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </View>
  )
}

const ErrorMessageModal = ({visible, message, onRequestClose}) => {

  useEffect(() => {
    setTimeout(() => {
      onRequestClose();
    }, 3000);
  }, [message]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}>
      <View style={styles.modalView}>
        <View style={styles.errorMessageView}>
          <Text style={styles.errorMessageText}>{message}</Text>
          <TouchableOpacity style={styles.errorMessageCloseButton}
            onPress={onRequestClose}
          >
            <Ionicons name="close" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalView: {
    marginBottom: 'auto',
    alignSelf: 'stretch',
    // height: 250,
    backgroundColor: '#9E0000',
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
  errorMessageView: {
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: 'red',
  },
  errorMessageText: {
    width: '60%',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  errorMessageCloseButton: {
    marginLeft: 'auto',
  }
});
