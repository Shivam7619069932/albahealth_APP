import { Image, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import FamilyProfileTopTabNavigator from "../../navigation/FamilyProfileTopTabNavigator";
import AppStyles from "../../styles/AppStyles";
import { useNavigation } from '@react-navigation/native';
import { useContext, useEffect, useState } from "react";
import { ProfileContext } from "../../context";
import { Alba } from "../../../assets";
import { ConsentEmailModal, ConsentModal } from "../../components";
import { LogBox } from 'react-native';
import Utility from '../../utils/utility';

export default function FamilyProfileScreen() {
  const navigation = useNavigation();
  const { 
    profileTabIndex, 
    parentProfile, setParentProfile,
    partnerProfile, setPartnerProfile,
    childProfile, setChildProfile,
    GetFamilyProfile,
    UpdateParentProfile,
    UpdatePartnerProfile,
    UpdateChildProfile
  } = useContext(ProfileContext);
  const [openConsentModal, setOpenConsentModal] = useState(false);
  const [openConsentEmailModal, setOpenConsentEmailModal] = useState(false);

  LogBox.ignoreAllLogs();

  useEffect(() => {
    GetFamilyProfile();
  }, []);

  const onPressContinue = async () => {
    if (profileTabIndex === 0) {
      if (parentProfile.fullname && parentProfile.personalnumber && parentProfile.phone && parentProfile.address1 && parentProfile.address2 && parentProfile.city && parentProfile.zip && parentProfile.role) {
        // setParentProfile({...parentProfile, completed: true, error: false});
        const res = await UpdateParentProfile(parentProfile);
        if (res.success) {
          navigation.navigate('PartnerProfile');
        }
      } else {
        setParentProfile({...parentProfile, completed: false, error: true});
      }
    } else if (profileTabIndex === 1) {
      if (partnerProfile.nopartner) {
        let _partnerProfile = {...partnerProfile, completed: true, error: false, fullname: '', email: '', personalnumber: '', role: ''};
        setPartnerProfile(_partnerProfile);
        const res = await UpdatePartnerProfile(_partnerProfile);
        if (res.success) {
          navigation.navigate('ChildProfile');
        }
      } else {
        if (partnerProfile.fullname && Utility.isValidEmail(partnerProfile.email) && partnerProfile.personalnumber && partnerProfile.role) {
          // setPartnerProfile({...partnerProfile, completed: true, error: false});
          const res = await UpdatePartnerProfile(partnerProfile);
          if (res.success) {
            navigation.navigate('ChildProfile');
          }
        } else {
          setPartnerProfile({...partnerProfile, completed: false, error: true});
        }
      }
    } else {
      if (childProfile.fullname && childProfile.personalnumber) {
        // setChildProfile({...childProfile, completed: true, error: false});
        const res = await UpdateChildProfile(childProfile);
        if (res.success) {
          setOpenConsentModal(true);
        }
      } else {
        setChildProfile({...childProfile, completed: false, error: true});
      }
    }
  }
  

  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <Image source={Alba} resizeMode="contain" style={styles.albaLogo} />
        <Text style={styles.titleText}>Family profile</Text>
      </View>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FamilyProfileTopTabNavigator />
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <View style={AppStyles.fixedBottomButtonWrapper}>
        <TouchableOpacity style={AppStyles.formButton}
          onPress={() => onPressContinue()}
        >
          <Text style={AppStyles.formButtonText}>{profileTabIndex === 2 ? 'Save and continue' : 'Save and continue'}</Text>
        </TouchableOpacity>
      </View>
      {/*  */}
      <ConsentModal 
        visible={openConsentModal} 
        onRequestClose={() => setOpenConsentModal(false)} 
        onConsent={() => {
          setOpenConsentModal(false);
          setOpenConsentEmailModal(true);
        }}
      />
      <ConsentEmailModal 
        visible={openConsentEmailModal} 
        onRequestClose={() => setOpenConsentEmailModal(false)} 
        onSend={() => {
          setOpenConsentEmailModal(false);
          navigation.navigate('QuestionnaireOnboarding');
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titleWrapper: {
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 18,
    paddingBottom: 18,
  },
  albaLogo: {
    width: 32,
    height: 32,
    marginBottom: 15,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: '#24231F',
  }
});
