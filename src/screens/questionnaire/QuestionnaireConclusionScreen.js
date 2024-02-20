import { Dimensions, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import WelcomeStyles from "../../styles/WelcomeStyles";
import { Alba, IceGif } from "../../../assets";
import { useNavigation } from "@react-navigation/native";
import { AlbaCustomBarChart, AlbaStatsChart } from "../../components";

export const windowWidth = Dimensions.get('window').width;

export default function QuestionnaireConclusionScreen() {
  const navigation = useNavigation();
  const onNext = () => {
    navigation.navigate('MainBottomTab');
  }

  return (
    <View style={[WelcomeStyles.container, {paddingLeft: 0, paddingRight: 0}]}>
      <Image source={IceGif} resizeMode="cover" style={styles.CelebrationGif} />
      <ScrollView style={{paddingHorizontal: 25}}>
        <View style={[WelcomeStyles.logoView, {marginTop: Platform.OS === 'ios' ? 40 : 20}]}>
          <Image source={Alba} style={WelcomeStyles.albaLogo} resizeMode="contain" />
        </View>
        <Text style={WelcomeStyles.headlineText}>
          Amazing! 🎉
        </Text>
        <Text style={WelcomeStyles.sublineText}>
          You completed all 000 questions.
        </Text>
        <View style={{marginTop: 25}}>
          <AlbaCustomBarChart />
        </View>
        <View style={{marginTop: 25, marginBottom: 25}}>
          <AlbaStatsChart />
        </View>
      </ScrollView>
      <View style={{paddingHorizontal: 25}}>
        <TouchableOpacity style={WelcomeStyles.nextButton}
          onPress={() => onNext()}
        >
          <Text style={WelcomeStyles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  CelebrationGif: {
    flex: 1,
    height: windowWidth * 0.6,
    width: windowWidth,
    position: 'absolute',
    top: 0,
  },
});
