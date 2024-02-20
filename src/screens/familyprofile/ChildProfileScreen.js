import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import AppStyles from "../../styles/AppStyles";
import { useNavigationState } from '@react-navigation/native';
import { useContext, useEffect } from "react";
import { ProfileContext } from "../../context";
import { CustomDatePicker, PersonalNumberInput } from "../../components";
import Utility from '../../utils/utility';
import MaskInput from 'react-native-mask-input';

export default function ChildProfileScreen({}) {
  const tabIndex = useNavigationState(state => state.index);
  const { setProfileTabIndex, childProfile, setChildProfile } = useContext(ProfileContext)

  useEffect(() => {
    setProfileTabIndex(tabIndex);
  }, [tabIndex]);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={[AppStyles.formGroup, {marginTop: 10}]}>
          <Text style={AppStyles.formLabel}>Child full name</Text>
          <TextInput style={[AppStyles.formInput, childProfile.error && !childProfile.fullname ? AppStyles.formInputError : {}]} 
            value={childProfile.fullname}
            onChangeText={(e) => setChildProfile({...childProfile, fullname: e})}
            placeholder="Child full name"
            maxLength={20}
          />
        </View>
        <View style={[AppStyles.formGroup, {marginTop: 20}]}>
          <Text style={AppStyles.formLabel}>
            Personal number 
            <Text style={{fontStyle: 'italic'}}>(YYYY-MM-DD-XXXX)</Text>
          </Text>
          {/* <CustomDatePicker 
            style={childProfile.error && !childProfile.dob ? AppStyles.formInputError : {}}
            value={childProfile.dob} 
            onChange={(e) => setChildProfile({...childProfile, dob: e})}
            placeholder="YYYY-MM-DD"
          /> */}
          <PersonalNumberInput style={[AppStyles.formInput, childProfile.error && !childProfile.personalnumber ? AppStyles.formInputError : {}]} 
            value={childProfile.personalnumber}
            onChangeText={(e) => setChildProfile({...childProfile, personalnumber: e})}
            placeholder="Personal number"
            inputMode="numeric"
            mask={[/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
          />
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
