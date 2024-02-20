import { Image, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import FamilyProfileTopTabNavigator from "../../navigation/FamilyProfileTopTabNavigator";
import AppStyles from "../../styles/AppStyles";
import { useNavigation } from '@react-navigation/native';
import { useContext, useState } from "react";
import { AuthContext, ProfileContext } from "../../context";
import { Alba } from "../../../assets";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { SignOut } = useContext(AuthContext);
  const [notification, setNotification] = useState({
    enable: true,
    push: true,
    email: true,
    sms: false
  });
  const [lang, setLang] = useState({
    en: true,
    se: false
  });

  const onSave = () => {
    
  }

  const onPressSignOut = async () => {
    const data = await SignOut();
    if (data) {
      navigation.navigate(`Login`);
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.titleWrapper}>
          <Image source={Alba} resizeMode="contain" style={styles.albaLogo} />
          <Text style={styles.titleText}>Profile</Text>
        </View>
        <View style={{paddingHorizontal: 25, marginTop: 30}}>
          <TouchableOpacity style={styles.menuItem} onPress={() => onPressSignOut()}>
            <Text style={styles.menuItemText}>Sign Out</Text>
            <MaterialIcons name="arrow-forward-ios" size={24} color="#616161" />
          </TouchableOpacity>
          <View style={styles.diverLine}></View>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>Edit Family Profile</Text>
            <MaterialIcons name="arrow-forward-ios" size={24} color="#616161" />
          </TouchableOpacity>
          <View style={styles.diverLine}></View>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuItemText}>Change password</Text>
            <MaterialIcons name="arrow-forward-ios" size={24} color="#616161" />
          </TouchableOpacity>
          <View style={styles.diverLine}></View>
          <TouchableOpacity style={styles.menuItem}
            onPress={() => navigation.navigate('ChangeAnswer')}
          >
            <Text style={styles.menuItemText}>Change answer</Text>
            <MaterialIcons name="arrow-forward-ios" size={24} color="#616161" />
          </TouchableOpacity>
          <View style={styles.diverLine}></View>
          <View style={styles.optionView}>
            <View style={[styles.inlineView, {marginBottom: 10, justifyContent: 'space-between'}]}>
              <Text style={[styles.menuItemText]}>Notifications</Text>
              <Switch
                trackColor={{false: '#CDCDCD', true: '#97CF95'}}
                thumbColor={notification.enable ? '#FFFFFF' : '#FFFFFF'}
                ios_backgroundColor="#CDCDCD"
                onValueChange={() => setNotification({...notification, enable: !notification.enable})}
                value={notification.enable}
              />
            </View>
            {
              notification.enable && 
              <>
                <View style={styles.inlineView}>
                  <TouchableOpacity onPress={() => setNotification({...notification, push: !notification.push})}>
                    <MaterialCommunityIcons name={notification.push ? "checkbox-outline" : "checkbox-blank-outline"} size={24} color="#575044" />
                  </TouchableOpacity>
                  <Text style={styles.optionText}>Push notifications</Text>
                </View>
                <View style={styles.inlineView}>
                  <TouchableOpacity onPress={() => setNotification({...notification, email: !notification.email})}>
                    <MaterialCommunityIcons name={notification.email ? "checkbox-outline" : "checkbox-blank-outline"} size={24} color="#575044" />
                  </TouchableOpacity>
                  <Text style={styles.optionText}>E-mail</Text>
                </View>
                <View style={styles.inlineView}>
                  <TouchableOpacity onPress={() => setNotification({...notification, sms: !notification.sms})}>
                    <MaterialCommunityIcons name={notification.sms ? "checkbox-outline" : "checkbox-blank-outline"} size={24} color="#575044" />
                  </TouchableOpacity>
                  <Text style={styles.optionText}>SMS</Text>
                </View>
              </>
            }
          </View>
          <View style={styles.diverLine}></View>
          <View style={styles.optionView}>
            <Text style={[styles.menuItemText, {marginBottom: 10}]}>Language</Text>
            <View style={styles.inlineView}>
              <TouchableOpacity onPress={() => setLang({...lang, en: true, se: false})}>
                <MaterialIcons name={lang.en ? "radio-button-on" : "radio-button-off"} size={24} color="#575044" />
              </TouchableOpacity>
              <Text style={styles.optionText}>English</Text>
            </View>
            <View style={styles.inlineView}>
              <TouchableOpacity onPress={() => setLang({...lang, en: false, se: true})}>
                <MaterialIcons name={lang.se ? "radio-button-on" : "radio-button-off"} size={24} color="#575044" />
              </TouchableOpacity>
              <Text style={styles.optionText}>Svenska</Text>
            </View>
          </View>
          <TouchableOpacity style={[AppStyles.formButton, {marginTop: 30}]}
            onPress={() => onSave()}
          >
            <Text style={AppStyles.formButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuItemText: {
    color: '#616161',
    fontSize: 17,
    fontWeight: 'bold',
  },
  diverLine: {
    width: '100%',
    borderTopWidth: 1,
    borderColor: '#E4E4E4',
    marginVertical: 10,
  },
  optionView: {
    flexDirection: 'column',
  },
  inlineView: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 5
  },
  optionText: {
    color: '#696969',
    fontSize: 14,
    fontWeight: 'bold',
    paddingLeft: 15,
  }
});
