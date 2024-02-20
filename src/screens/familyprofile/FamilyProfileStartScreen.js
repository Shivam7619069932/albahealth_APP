import { Image, ImageBackground, Text, TouchableOpacity, View } from "react-native";
import WelcomeStyles from "../../styles/WelcomeStyles";
import { Alba, BackgroundWelcome } from "../../../assets";
import { useContext } from "react";
import { ProfileContext } from "../../context";

export default function FamilyProfileStartScreen({navigation}) {
  const { GenerateFamilyProfile } = useContext(ProfileContext);

  const onClickCreateFamilyProfile = async () => {
    const res = await GenerateFamilyProfile();
    if (res.success) {
      navigation.navigate('FamilyProfile');
    }
  }

  return (
    <ImageBackground source={BackgroundWelcome} resizeMode="stretch" style={WelcomeStyles.container}>
      <View style={[WelcomeStyles.logoView, {marginTop: Platform.OS === 'ios' ? 40 : 20}]}>
        <Image source={Alba} style={WelcomeStyles.albaLogo} resizeMode="contain" />
      </View>
      <Text style={WelcomeStyles.headlineText}>Welcome!</Text>
      <Text style={WelcomeStyles.sublineText}>Before we start, we need to know each other a little better.</Text>
      <TouchableOpacity style={WelcomeStyles.nextButton}
        onPress={() => onClickCreateFamilyProfile()}
      >
        <Text style={WelcomeStyles.nextButtonText}>Create family profile</Text>
      </TouchableOpacity>
    </ImageBackground>
  )
}
