import { Dimensions, Image, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import AppStyles from "../../styles/AppStyles";
import { DietOption, LanguageOption, MultipleCheckboxOptions, NumberOption, Quiz, SingleOptions, TextOption } from "../../components";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useContext, useEffect, useState } from "react";
import { QuestionnaireContext } from "../../context";

export const windowWidth = Dimensions.get('window').width;

export default function ChangeAnswerScreen() {
  const navigation = useNavigation();
  const { 
    householdQRE, familyHealthQRE, babyHealthQRE, parentsDietQRE, babyDietQRE
  } = useContext(QuestionnaireContext);
  
  const onPressClose = () => {
    navigation.navigate('Profile');
  }

  return (
    <View style={{flex: 1, backgroundColor: '#FEFEFC'}}>
      <View style={styles.headerView}>
        <TouchableOpacity style={styles.closeButton} onPress={() => onPressClose()}>
          <MaterialIcons name="close" size={20} color="#1C1B1F" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Change answer</Text>
        <View style={{width: 36}}></View>
      </View>
      <ScrollView style={{flex: 1}}>
        <View style={styles.searchForm}>
          <Text style={styles.searchFormLabel}>Which answer you want to change?</Text>
          <View style={styles.searchGroup}>
            <TextInput style={styles.searchInput} />
            <MaterialIcons name="search" size={18} color="black" style={styles.searchIcon} />
          </View>
        </View>
        {/*  */}
        <View style={styles.QREView}>
          <Text style={styles.QRETitle}>{householdQRE.title}</Text>
          {
            !!householdQRE.tasks && householdQRE.tasks.map((tsk, tindex) =>
              <TouchableOpacity style={styles.TSKButton} key={tindex}>
                <Text style={styles.TSKButtonText}>{tsk.title}</Text>
              </TouchableOpacity>
            )
          }
          <View style={styles.dividerLine}></View>
        </View>
        {/*  */}
        <View style={styles.QREView}>
          <Text style={styles.QRETitle}>{babyHealthQRE.title}</Text>
          {
            !!babyHealthQRE.tasks && babyHealthQRE.tasks.map((tsk, tindex) =>
              <TouchableOpacity style={styles.TSKButton} key={tindex}>
                <Text style={styles.TSKButtonText}>{tsk.title}</Text>
              </TouchableOpacity>
            )
          }
          <View style={styles.dividerLine}></View>
        </View>
        {/*  */}
        <View style={styles.QREView}>
          <Text style={styles.QRETitle}>{babyDietQRE.title}</Text>
          {
            !!babyDietQRE.tasks && babyDietQRE.tasks.map((tsk, tindex) =>
              <TouchableOpacity style={styles.TSKButton} key={tindex}>
                <Text style={styles.TSKButtonText}>{tsk.title}</Text>
              </TouchableOpacity>
            )
          }
          <View style={styles.dividerLine}></View>
        </View>
        {/*  */}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  headerView: {
    paddingTop: 18,
    paddingBottom: 18,
    paddingLeft: 25,
    paddingRight: 25,
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: '#ECECEC',
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#ECECEC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#24231F',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  searchForm: {
    padding: 25,
  },
  searchFormLabel: {
    color: '#5E5E5E',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
  },
  searchGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    width: '100%',
    height: 40,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: '#BFBFBF',
    backgroundColor: '#FFFFFF',
    paddingLeft: 15,
    paddingRight: 30,
  },
  searchIcon: {
    position: 'absolute',
    right: 10,
  },
  QREView: {

  },
  QRETitle: {
    color: '#20201D',
    fontSize: 22,
    fontWeight: 'bold',
    paddingHorizontal: 25,
    paddingTop: 20,
    paddingBottom: 10,
  },
  TSKButton: {
    width: '100%',
    height: 30,
    borderTopWidth: 1,
    borderColor: '#E4E4E4',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  TSKButtonText: {
    color: '#6C6C6C',
    fontSize: 16,
    fontWeight: '600',
  },
  dividerLine: {
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#E4E4E4',
  }
});
