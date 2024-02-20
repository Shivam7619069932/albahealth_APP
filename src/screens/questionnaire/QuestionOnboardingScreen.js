import { Image, ImageBackground, Text, TouchableOpacity, View } from "react-native";
import WelcomeStyles from "../../styles/WelcomeStyles";
import { Alba, BackgroundWelcome } from "../../../assets";

export default function QuestionOnboardingScreen({navigation}) {

  const onClickCreateFamilyProfile = () => {
    navigation.navigate('MainBottomTab');
  }

  return (
    <ImageBackground source={BackgroundWelcome} resizeMode="stretch" style={WelcomeStyles.container}>
      <View style={[WelcomeStyles.logoView, {marginTop: Platform.OS === 'ios' ? 40 : 20}]}>
        <Image source={Alba} style={WelcomeStyles.albaLogo} resizeMode="contain" />
      </View>
      <Text style={WelcomeStyles.headlineText}>Fantastic!</Text>
      <Text style={WelcomeStyles.sublineText}>It's time to our initial questionnaire - don't worry, you just have to answer it once.</Text>
      <TouchableOpacity style={WelcomeStyles.nextButton}
        onPress={() => onClickCreateFamilyProfile()}
      >
        <Text style={WelcomeStyles.nextButtonText}>Let's start!</Text>
      </TouchableOpacity>
    </ImageBackground>
  )
}
