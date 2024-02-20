import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import WelcomeStyles from "../../styles/WelcomeStyles";
import { Alba, BackgroundWelcome, FocusCircleDark } from "../../../assets";

export default function ActivateNotificationScreen({navigation}) {

  const onPressNext = () => {
    navigation.navigate('FamilyProfileStart');
  }

  return (
    <ImageBackground source={BackgroundWelcome} resizeMode="stretch" style={WelcomeStyles.container}>
      <View style={[WelcomeStyles.logoView, {marginTop: Platform.OS === 'ios' ? 40 : 20}]}>
        <Image source={Alba} style={WelcomeStyles.albaLogo} resizeMode="contain" />
      </View>
      <Text style={WelcomeStyles.headlineText}>Activate notifications!</Text>
      <Text style={WelcomeStyles.sublineText}>Allow notifications in the next window, so we can make sure to remind you when it's time to complete your tasks.</Text>
      <View style={styles.popupWrapper}>
        <View style={styles.popupView}>
          <View style={styles.popupBody}>
            <Text style={styles.popupHeadline}>“Prevent App” Would Like to Send You Notifications</Text>
            <Text style={styles.popupSubline}>Notifications may include alerts, sounds, and icon badges. These can be configured in Settings.</Text>
          </View>
          <View style={styles.popupFooter}>
            <TouchableOpacity style={styles.allowButton}
              disabled={true}
            >
              <Text style={styles.allowButtonText}>Don't Allow</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.allowButton, {borderLeftWidth: 0.25}]}
              disabled={true}
            >
              <Text style={[styles.allowButtonText, {fontWeight: 'bold'}]}>Allow</Text>
              <Image source={FocusCircleDark} resizeMode="contain" 
                style={styles.activeCircle}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <TouchableOpacity style={WelcomeStyles.nextButton}
        onPress={() => onPressNext()}
      >
        <Text style={WelcomeStyles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  popupWrapper: {
    width: '100%',
    alignItems: 'center',
    marginTop: 80,
  },
  popupView: {
    backgroundColor: '#F6F6F6',
    borderRadius: 12,
    flexDirection: 'column',
    maxWidth: 250,
  },
  popupBody: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 15,
  },
  popupHeadline: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 9,
  },
  popupSubline: {
    fontSize: 12,
    fontWeight: '400',
    color: '#000000',
    textAlign: 'center',
  },
  popupFooter: {
    borderTopWidth: 0.25,
    borderTopColor: '#BBBBBB',
    flexDirection: 'row',
  },
  allowButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderTopColor: '#BBBBBB',
  },
  allowButtonText: {
    fontSize: 16,
    color: '#057AF5',
  },
  activeCircle: {
    width: 105,
    height: 105,
    position: 'absolute',
    top: -33,
  }
});
