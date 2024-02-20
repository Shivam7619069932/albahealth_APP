import { Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import AppStyles from "../../styles/AppStyles";
import { useNavigationState } from '@react-navigation/native';
import { useContext, useEffect, useRef, useState } from "react";
import { ProfileContext } from "../../context";
import PhoneInput from 'react-native-phone-input';
import { CustomDatePicker, PersonalNumberInput } from "../../components";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Utility from '../../utils/utility';
import MaskInput from 'react-native-mask-input';

export default function ParentProfileScreen({}) {
  const tabIndex = useNavigationState(state => state.index);
  const { setProfileTabIndex, parentProfile, setParentProfile, } = useContext(ProfileContext)
  const phoneRef = useRef(undefined);
  const [role, setRole] = useState('');

  useEffect(() => {
    setProfileTabIndex(tabIndex);
  }, [tabIndex]);

  return (
    <KeyboardAvoidingView 
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView style={styles.container}>
          <View style={styles.innerContainer}>
            <View style={AppStyles.formGroup}>
              <Text style={AppStyles.formLabel}>Full name</Text>
              <TextInput style={[AppStyles.formInput, parentProfile.error && !parentProfile.fullname ? AppStyles.formInputError : {}]} 
                value={parentProfile.fullname}
                onChangeText={(e) => setParentProfile({...parentProfile, fullname: e})}
                placeholder="Full name"
                maxLength={20}
              />
            </View>
            <View style={[AppStyles.formGroup, {marginTop: 20}]}>
              <Text style={AppStyles.formLabel}>
                Personal number 
                <Text style={{fontStyle: 'italic'}}>(YYYY-MM-DD-XXXX)</Text>
              </Text>
              {/* <CustomDatePicker 
                style={parentProfile.error && !parentProfile.dob ? AppStyles.formInputError : {}}
                value={parentProfile.dob} 
                onChange={(e) => setParentProfile({...parentProfile, dob: e})}
                placeholder="YYYY-MM-DD"
              /> */}
              <PersonalNumberInput style={[AppStyles.formInput, parentProfile.error && !parentProfile.personalnumber ? AppStyles.formInputError : {}]} 
                value={parentProfile.personalnumber}
                onChangeText={(e) => setParentProfile({...parentProfile, personalnumber: e})}
                placeholder="Personal number"
                inputMode="numeric"
                mask={[/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
              />
              
            </View>
            <View style={[AppStyles.formGroup, {marginTop: 20}]}>
              <Text style={AppStyles.formLabel}>Phone</Text>
              <PhoneInput ref={phoneRef} style={[AppStyles.formInput, parentProfile.error && !parentProfile.phone ? AppStyles.formInputError : {}]} 
                initialCountry={'se'}
                // onPressFlag={onPressFlag}
                initialValue={parentProfile.phone}
                onChangePhoneNumber={(e) => setParentProfile({...parentProfile, phone: e})}
              />
            </View>
            <View style={[AppStyles.formGroup, {marginTop: 20}]}>
              <Text style={AppStyles.formLabel}>Address line 1</Text>
              <TextInput style={[AppStyles.formInput, parentProfile.error && !parentProfile.address1 ? AppStyles.formInputError : {}]} 
                value={parentProfile.address1}
                onChangeText={(e) => setParentProfile({...parentProfile, address1: e})}
                placeholder="Address line 1"
                maxLength={50}
              />
            </View>
            <View style={[AppStyles.formGroup, {marginTop: 20}]}>
              <Text style={AppStyles.formLabel}>Address line 2</Text>
              <TextInput style={[AppStyles.formInput, parentProfile.error && !parentProfile.address2 ? AppStyles.formInputError : {}]} 
                value={parentProfile.address2}
                onChangeText={(e) => setParentProfile({...parentProfile, address2: e})}
                placeholder="Address line 2"
                maxLength={50}
              />
            </View>
            <View style={[AppStyles.formGroup, {marginTop: 20}]}>
              <Text style={AppStyles.formLabel}>City</Text>
              <TextInput style={[AppStyles.formInput, parentProfile.error && !parentProfile.city ? AppStyles.formInputError : {}]} 
                value={parentProfile.city}
                onChangeText={(e) => setParentProfile({...parentProfile, city: e})}
                placeholder="City"
                maxLength={20}
              />
            </View>
            <View style={[AppStyles.formGroup, {marginTop: 20}]}>
              <Text style={AppStyles.formLabel}>ZIP code</Text>
              <TextInput style={[AppStyles.formInput, parentProfile.error && !parentProfile.zip ? AppStyles.formInputError : {}]} 
                value={parentProfile.zip}
                onChangeText={(e) => setParentProfile({...parentProfile, zip: e})}
                placeholder="ZIP code"
                maxLength={10}
              />
            </View>
            <View style={[AppStyles.formGroup, {marginTop: 20}]}>
              <Text style={AppStyles.formLabelHead}>What best describe your role in your family?</Text>
              <TouchableOpacity style={[
                  AppStyles.formOptionButton, 
                  {marginTop: 20}, 
                  role === 'Biological mother' ? AppStyles.formOptionButtonSelected : {},
                  role !== 'Other' && parentProfile.error && !parentProfile.role ? AppStyles.formInputError : {}
                ]}
                onPress={() => {
                  setRole('Biological mother');
                  setParentProfile({...parentProfile, role: 'Biological mother'})
                }}
              >
                <Text style={AppStyles.formOptionButtonText}>Biological mother</Text>
                {
                  role === 'Biological mother' && 
                  <MaterialCommunityIcons name="check" size={20} color="#1C1B1F" />
                }
              </TouchableOpacity>
              <TouchableOpacity style={[
                  AppStyles.formOptionButton, 
                  {marginTop: 10}, 
                  role === 'Adoptive mother' ? AppStyles.formOptionButtonSelected : {},
                  role !== 'Other' && parentProfile.error && !parentProfile.role ? AppStyles.formInputError : {}
                ]}
                onPress={() => {
                  setRole('Adoptive mother');
                  setParentProfile({...parentProfile, role: 'Adoptive mother'})
                }}
              >
                <Text style={AppStyles.formOptionButtonText}>Adoptive mother</Text>
                {
                  role === 'Adoptive mother' && 
                  <MaterialCommunityIcons name="check" size={20} color="#1C1B1F" />
                }
              </TouchableOpacity>
              <TouchableOpacity style={[
                  AppStyles.formOptionButton, 
                  {marginTop: 10}, 
                  role === 'Biological father' ? AppStyles.formOptionButtonSelected : {},
                  role !== 'Other' && parentProfile.error && !parentProfile.role ? AppStyles.formInputError : {}
                ]}
                onPress={() => {
                  setRole('Biological father');
                  setParentProfile({...parentProfile, role: 'Biological father'})
                }}
              >
                <Text style={AppStyles.formOptionButtonText}>Biological father</Text>
                {
                  role === 'Biological father' && 
                  <MaterialCommunityIcons name="check" size={20} color="#1C1B1F" />
                }
              </TouchableOpacity>
              <TouchableOpacity style={[
                  AppStyles.formOptionButton, 
                  {marginTop: 10}, 
                  role === 'Adoptive father' ? AppStyles.formOptionButtonSelected : {},
                  role !== 'Other' && parentProfile.error && !parentProfile.role ? AppStyles.formInputError : {}
                ]}
                onPress={() => {
                  setRole('Adoptive father');
                  setParentProfile({...parentProfile, role: 'Adoptive father'})
                }}
              >
                <Text style={AppStyles.formOptionButtonText}>Adoptive father</Text>
                {
                  role === 'Adoptive father' && 
                  <MaterialCommunityIcons name="check" size={20} color="#1C1B1F" />
                }
              </TouchableOpacity>
              <TouchableOpacity style={[
                  AppStyles.formOptionButton, 
                  {marginTop: 10}, 
                  role === 'Other' ? AppStyles.formOptionButtonSelected : {},
                  parentProfile.error && !parentProfile.role ? AppStyles.formInputError : {}
                ]}
                onPress={() => {
                  setRole('Other');
                  setParentProfile({...parentProfile, role: ''});
                }}
              >
                <Text style={AppStyles.formOptionButtonText}>Other (please specify)</Text>
                {
                  role === 'Other' && 
                  <MaterialCommunityIcons name="check" size={20} color="#1C1B1F" />
                }
              </TouchableOpacity>
              {
                role === 'Other' && 
                <TextInput style={[AppStyles.formInput, {marginTop: 10}, parentProfile.error && !parentProfile.role ? AppStyles.formInputError : {}]} 
                  value={parentProfile.role}
                  onChangeText={(e) => setParentProfile({...parentProfile, role: e})}
                />
              }
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFEFC',
  },
  innerContainer: {
    flex: 1,
    paddingTop: 20,
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 120, // 60
  },
});
