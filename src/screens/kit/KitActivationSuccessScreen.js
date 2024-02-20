import { Image, ImageBackground, Text, TouchableOpacity, View } from "react-native";
import WelcomeStyles from "../../styles/WelcomeStyles";
import { Alba, BackgroundWelcome } from "../../../assets";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { KitContext } from "../../context";

export default function KitActivationSuccessScreen() {
  const navigation = useNavigation();
  const { activatedKit, setActivatedKit } = useContext(KitContext);
  const onNext = () => {
    setActivatedKit(true);
    navigation.navigate('OnboardingStart');
  }
  
  return (
    <ImageBackground source={BackgroundWelcome} resizeMode="stretch" style={WelcomeStyles.container}>
      <View style={[WelcomeStyles.logoView, {marginTop: Platform.OS === 'ios' ? 40 : 20}]}>
        <Image source={Alba} style={WelcomeStyles.albaLogo} resizeMode="contain" />
      </View>
      <Text style={[WelcomeStyles.headlineText, {maxWidth: 250}]}>
        Kit successfully activated!
      </Text>
      <Text style={[WelcomeStyles.sublineText, {maxWidth: 250, marginTop: 40}]}>
        Now follow the instructions in the Kit's manual.
      </Text>
      <Text style={[WelcomeStyles.sublineText, {maxWidth: 250, marginTop: 20}]}>
        Attention!
      </Text>
      <Text style={[WelcomeStyles.sublineText, {marginTop: 20}]}>
        Do not throw away the diaper. After taking the sample, you will be asked to take a picture of the poop.
      </Text>
      <Text style={[WelcomeStyles.sublineText, {marginTop: 20, maxWidth: 180}]}>
        Press "Next" when you're done.
      </Text>
      <TouchableOpacity style={WelcomeStyles.nextButton}
        onPress={() => onNext()}
      >
        <Text style={WelcomeStyles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </ImageBackground>
  )
}
