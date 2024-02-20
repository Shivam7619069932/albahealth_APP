import { Image, ImageBackground, Text, TouchableOpacity, View } from "react-native";
import WelcomeStyles from "../../styles/WelcomeStyles";
import { Alba, BackgroundWelcome } from "../../../assets";
import { useNavigation } from "@react-navigation/native";

export default function QuestionnaireEndScreen() {
  const navigation = useNavigation();
  const onNext = () => {
    navigation.navigate('QuestionnaireConclusion');
  }

  return (
    <ImageBackground source={BackgroundWelcome} resizeMode="stretch" style={WelcomeStyles.container}>
      <View style={[WelcomeStyles.logoView, {marginTop: Platform.OS === 'ios' ? 40 : 20}]}>
        <Image source={Alba} style={WelcomeStyles.albaLogo} resizeMode="contain" />
      </View>
      <Text style={WelcomeStyles.headlineText}>
        Now its time for [parent #2 name]!
      </Text>
      <Text style={WelcomeStyles.sublineText}>
        Thank you so much for your answers. The following questions are directed to Parent #2, [parent #2 name].
      </Text>
      <TouchableOpacity style={WelcomeStyles.nextButton}
        onPress={() => onNext()}
      >
        <Text style={WelcomeStyles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </ImageBackground>
  )
}
