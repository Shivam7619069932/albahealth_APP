import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import AppStyles from "../../styles/AppStyles";
import { useNavigationState } from '@react-navigation/native';
import { useContext, useEffect, useState } from "react";
import { ProfileContext } from "../../context";
import { CustomDatePicker, PersonalNumberInput } from "../../components";
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Utility from '../../utils/utility';
import MaskInput from 'react-native-mask-input';

export default function PartnerProfileScreen({}) {
  const tabIndex = useNavigationState(state => state.index);
  const { setProfileTabIndex, partnerProfile, setPartnerProfile } = useContext(ProfileContext);
  const [role, setRole] = useState('');

  useEffect(() => {
    setProfileTabIndex(tabIndex);
  }, [tabIndex]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={AppStyles.formGroup}>
          <View style={[AppStyles.formCheckboxView, {paddingTop: 0, paddingBottom: 20}]}>
            <TouchableOpacity onPress={() => setPartnerProfile({...partnerProfile, nopartner: !partnerProfile.nopartner})}>
              <Ionicons name={partnerProfile.nopartner ? "checkbox-outline" : "square-outline"} size={25} color={partnerProfile.nopartner ? "#575044" : "#D7D7D7"} />
            </TouchableOpacity>
            <Text style={[AppStyles.formCheckboxText, {marginLeft: 5}]}>No partner.</Text>
          </View>
        </View>
        <View style={AppStyles.formDivider}></View>
        <View style={{opacity: partnerProfile.nopartner ? 0.1 : 1}}>
          <View style={AppStyles.formGroup}>
            <Text style={[AppStyles.formLabel, {marginTop: 20}]}>Partner full name</Text>
            <TextInput style={[AppStyles.formInput, !partnerProfile.nopartner && partnerProfile.error && !partnerProfile.fullname ? AppStyles.formInputError : {}]} 
              editable={!partnerProfile.nopartner}
              value={partnerProfile.fullname}
              onChangeText={(e) => setPartnerProfile({...partnerProfile, fullname: e})}
              placeholder="Partner full name"
              maxLength={20}
            />
          </View>
          <View style={[AppStyles.formGroup, {marginTop: 20}]}>
            <Text style={AppStyles.formLabel}>Partner e-mail</Text>
            <TextInput style={[AppStyles.formInput, !partnerProfile.nopartner && partnerProfile.error && !Utility.isValidEmail(partnerProfile.email) ? AppStyles.formInputError : {}]} 
              editable={!partnerProfile.nopartner}
              value={partnerProfile.email}
              onChangeText={(e) => setPartnerProfile({...partnerProfile, email: e})}
              placeholder="Partner e-mail"
              inputMode="email"
              maxLength={50}
            />
          </View>
          <View style={[AppStyles.formGroup, {marginTop: 20}]}>
            <Text style={AppStyles.formLabel}>
              Personal number 
              <Text style={{fontStyle: 'italic'}}>(YYYY-MM-DD-XXXX)</Text>
            </Text>
            <PersonalNumberInput style={[AppStyles.formInput, partnerProfile.error && !partnerProfile.personalnumber ? AppStyles.formInputError : {}]} 
              value={partnerProfile.personalnumber}
              onChangeText={(e) => setPartnerProfile({...partnerProfile, personalnumber: e})}
              placeholder="Personal number"
              inputMode="numeric"
              mask={[/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
              editable={!partnerProfile.nopartner}
            />
          </View>
          <View style={[AppStyles.formGroup, {marginTop: 20}]}>
            <Text style={AppStyles.formLabelHead}>What best describe your role in your family?</Text>
            <TouchableOpacity 
              disabled={partnerProfile.nopartner}
              style={[
                AppStyles.formOptionButton, 
                {marginTop: 20}, 
                role === 'Biological mother' ? AppStyles.formOptionButtonSelected : {},
                role !== 'Other' && !partnerProfile.nopartner && partnerProfile.error && !partnerProfile.role ? AppStyles.formInputError : {}
              ]}
              onPress={() => {
                setRole('Biological mother');
                setPartnerProfile({...partnerProfile, role: 'Biological mother'})
              }}
            >
              <Text style={AppStyles.formOptionButtonText}>Biological mother</Text>
              {
                role === 'Biological mother' && 
                <MaterialCommunityIcons name="check" size={20} color="#1C1B1F" />
              }
            </TouchableOpacity>
            <TouchableOpacity 
              disabled={partnerProfile.nopartner}
              style={[
                AppStyles.formOptionButton, 
                {marginTop: 10}, 
                role === 'Adoptive mother' ? AppStyles.formOptionButtonSelected : {},
                role !== 'Other' && !partnerProfile.nopartner && partnerProfile.error && !partnerProfile.role ? AppStyles.formInputError : {}
              ]}
              onPress={() => {
                setRole('Adoptive mother');
                setPartnerProfile({...partnerProfile, role: 'Adoptive mother'})
              }}
            >
              <Text style={AppStyles.formOptionButtonText}>Adoptive mother</Text>
              {
                role === 'Adoptive mother' && 
                <MaterialCommunityIcons name="check" size={20} color="#1C1B1F" />
              }
            </TouchableOpacity>
            <TouchableOpacity 
              disabled={partnerProfile.nopartner}
              style={[
                AppStyles.formOptionButton, 
                {marginTop: 10}, 
                role === 'Biological father' ? AppStyles.formOptionButtonSelected : {},
                role !== 'Other' && !partnerProfile.nopartner && partnerProfile.error && !partnerProfile.role ? AppStyles.formInputError : {}
              ]}
              onPress={() => {
                setRole('Biological father');
                setPartnerProfile({...partnerProfile, role: 'Biological father'})
              }}
            >
              <Text style={AppStyles.formOptionButtonText}>Biological father</Text>
              {
                role === 'Biological father' && 
                <MaterialCommunityIcons name="check" size={20} color="#1C1B1F" />
              }
            </TouchableOpacity>
            <TouchableOpacity 
              disabled={partnerProfile.nopartner}
              style={[
                AppStyles.formOptionButton, 
                {marginTop: 10}, 
                role === 'Adoptive father' ? AppStyles.formOptionButtonSelected : {},
                role !== 'Other' && !partnerProfile.nopartner && partnerProfile.error && !partnerProfile.role ? AppStyles.formInputError : {}
              ]}
              onPress={() => {
                setRole('Adoptive father');
                setPartnerProfile({...partnerProfile, role: 'Adoptive father'})
              }}
            >
              <Text style={AppStyles.formOptionButtonText}>Adoptive father</Text>
              {
                role === 'Adoptive father' && 
                <MaterialCommunityIcons name="check" size={20} color="#1C1B1F" />
              }
            </TouchableOpacity>
            <TouchableOpacity 
              disabled={partnerProfile.nopartner}
              style={[
                AppStyles.formOptionButton, 
                {marginTop: 10}, 
                role === 'Other' ? AppStyles.formOptionButtonSelected : {},
                !partnerProfile.nopartner && partnerProfile.error && !partnerProfile.role ? AppStyles.formInputError : {}
              ]}
              onPress={() => {
                setRole('Other');
                setPartnerProfile({...partnerProfile, role: ''});
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
              <TextInput style={[AppStyles.formInput, {marginTop: 10}, !partnerProfile.nopartner && partnerProfile.error && !partnerProfile.role ? AppStyles.formInputError : {}]} 
                editable={!partnerProfile.nopartner}
                value={partnerProfile.role}
                onChangeText={(e) => setPartnerProfile({...partnerProfile, role: e})}
              />
            }
          </View>
        </View>
      </View>
    </ScrollView>
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
    paddingBottom: 120, 
  },
});
