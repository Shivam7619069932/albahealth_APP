import { Image, ImageBackground, Text, TouchableOpacity, View } from "react-native";
import WelcomeStyles from "../../styles/WelcomeStyles";
import { Alba, BackgroundWelcome } from "../../../assets";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";

export default function AboutLogScreen() {
  const navigation = useNavigation();
  const onNext = () => {
    navigation.navigate('ChildLog');
  }

  return (
    <ImageBackground source={BackgroundWelcome} resizeMode="stretch" style={WelcomeStyles.container}>
      <View style={[WelcomeStyles.logoView, {marginTop: Platform.OS === 'ios' ? 40 : 20}]}>
        <Image source={Alba} style={WelcomeStyles.albaLogo} resizeMode="contain" />
      </View>
      <Text style={WelcomeStyles.headlineText}>
        About the Daily Logs
      </Text>
      <Text style={[WelcomeStyles.sublineText, {marginTop: 20}]}>
        Attention!
      </Text>
      <Text style={[WelcomeStyles.sublineText, {marginTop: 20}]}>
        There's a few important things to remember to complete the Daily Logs successfully:
      </Text>
      <View style={[WelcomeStyles.inlineTextWrapper, {marginTop: 40}]}>
        <Entypo name="dot-single" size={24} color="#484848" />
        <Text style={[WelcomeStyles.sublineText]}>
          Must be done in 3 consecutive days. If you miss a day it's not be possible to complete the lost day later.
        </Text>
      </View>
      <View style={[WelcomeStyles.inlineTextWrapper, {marginTop: 20}]}>
        <Entypo name="dot-single" size={24} color="#484848" />
        <Text style={[WelcomeStyles.sublineText]}>
          The Daily Questionnaire must be completed immediately after the Poop Picture was sent.
        </Text>
      </View>
      <TouchableOpacity style={WelcomeStyles.nextButton}
        onPress={() => onNext()}
      >
        <Text style={WelcomeStyles.nextButtonText}>Got it!</Text>
      </TouchableOpacity>
    </ImageBackground>
  )
}
