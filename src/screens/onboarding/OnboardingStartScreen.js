import { Image, ImageBackground, Text, TouchableOpacity, View } from "react-native";
import WelcomeStyles from "../../styles/WelcomeStyles";
import { Alba, BackgroundWelcome } from "../../../assets";
import { useNavigation } from "@react-navigation/native";

export default function OnboardingStartScreen() {
  const navigation = useNavigation();
  const onNext = () => {
    navigation.navigate('OnboardingReport');
  }
  
  return (
    <ImageBackground source={BackgroundWelcome} resizeMode="stretch" style={WelcomeStyles.container}>
      <View style={[WelcomeStyles.logoView, {marginTop: Platform.OS === 'ios' ? 40 : 20}]}>
        <Image source={Alba} style={WelcomeStyles.albaLogo} resizeMode="contain" />
      </View>
      <Text style={[WelcomeStyles.headlineText, {maxWidth: 250}]}>
        Welcome back!
      </Text>
      <Text style={[WelcomeStyles.sublineText, {maxWidth: 250, marginTop: 30}]}>
        You are all set!
      </Text>
      <Text style={[WelcomeStyles.sublineText, {maxWidth: 250}]}>
        Let me show you around.
      </Text>
      <TouchableOpacity style={WelcomeStyles.nextButton}
        onPress={() => onNext()}
      >
        <Text style={WelcomeStyles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </ImageBackground>
  )
}
