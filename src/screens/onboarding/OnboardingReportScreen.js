import { Image, ImageBackground, Text, TouchableOpacity, View } from "react-native";
import AppStyles from "../../styles/AppStyles";
import OnboardingStyles from "../../styles/OnboardingStyles";
import { Alba, FocusCircle, Profile, Report, ReportWhite, Task } from "../../../assets";
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { styles as BTStyles } from '../../components/TabBar/CustomBottomTabBar';
import WelcomeStyles from "../../styles/WelcomeStyles";

export default function OnboardingReportScreen() {
  const navigation = useNavigation();

  const onNext = () => {
    navigation.navigate('OnboardingTasks');
  }

  return (
    <View style={OnboardingStyles.container}>
      <View style={[OnboardingStyles.logoView, {marginTop: Platform.OS === 'ios' ? 40 : 20}]}>
        <Image source={Alba} style={WelcomeStyles.albaLogo} resizeMode="contain" />
      </View>
      <View style={[OnboardingStyles.highlightView, OnboardingStyles.highlight]}>
        <Text style={[OnboardingStyles.onBoardingText, {marginTop: 30}]}>REPORT</Text>
        <Text style={[OnboardingStyles.onBoardingText]}>
          After the end of the study, your result will be available for you.
        </Text>
        <TouchableOpacity style={OnboardingStyles.nextButton}
          onPress={() => onNext()}
        >
          <Text style={AppStyles.formButtonText}>Next</Text>
        </TouchableOpacity>
        <View style={OnboardingStyles.slideDots}>
          <View style={OnboardingStyles.slideDotSkin}>
            <View style={OnboardingStyles.slideDot}></View>
          </View>
          <View style={OnboardingStyles.slideDotSkin}>
          </View>
          <View style={OnboardingStyles.slideDotSkin}>
          </View>
        </View>
      </View>
      {/*  */}
      <View style={OnboardingStyles.bottomTabView}>
        <View style={BTStyles.tabBarElement}>
          <View style={BTStyles.tabBarButton}>
            <Image style={BTStyles.tabIcon} 
              source={Report} 
              resizeMode='contain' 
            />
            <Text style={[BTStyles.tabLabelText, {color: '#484848' }]}>
              Report
            </Text>
          </View>
        </View>
        <View style={BTStyles.tabBarElement}>
          <View style={BTStyles.tabBarButton}>
            <Image style={BTStyles.tabIcon} 
              source={Task} 
              resizeMode='contain' 
            />
            <Text style={[BTStyles.tabLabelText, {color: '#484848' }]}>
              Tasks
            </Text>
          </View>
        </View>
        <View style={BTStyles.tabBarElement}>
          <View style={BTStyles.tabBarButton}>
            <Image style={BTStyles.tabIcon} 
              source={Profile} 
              resizeMode='contain' 
            />
            <Text style={[BTStyles.tabLabelText, {color: '#484848' }]}>
              Profile
            </Text>
          </View>
        </View>
      </View>
      <View style={[OnboardingStyles.bottomTabView, OnboardingStyles.highlight, {position: "absolute", backgroundColor: '#00000000'}]}>
        <View style={BTStyles.tabBarElement}>
          <ImageBackground source={FocusCircle} resizeMode="contain" style={OnboardingStyles.tabBarActive}>
            <Image style={BTStyles.tabIcon} 
              source={ReportWhite} 
              resizeMode='contain' 
            />
            <Text style={[BTStyles.tabLabelText, {color: '#FFFFFF' }]}>
              Report
            </Text>
          </ImageBackground>
        </View>
        <View style={BTStyles.tabBarElement}>
        </View>
        <View style={BTStyles.tabBarElement}>
        </View>
      </View>
      {/*  */}
      <View style={OnboardingStyles.overlayView}></View>
    </View>
  )
}
