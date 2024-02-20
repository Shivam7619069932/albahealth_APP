import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import AppStyles from "../../styles/AppStyles";
import { useState } from "react";
import { useNavigation } from '@react-navigation/native';

export default function ConsentBScreen() {
  const navigation = useNavigation();

  const onPressSend = () => {
    navigation.navigate('QuestionnaireOnboarding');
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.titleWrapper}>
          <Text style={styles.titleText}>Consent</Text>
        </View>
        <View style={{padding: 20}}>
          <Text style={AppStyles.sublineText}>
            We also need the Parent #2 to consent to the same terms.
          </Text>
        </View>
        <View style={AppStyles.formDivider}></View>
        <View style={{paddingTop: 20, paddingLeft: 40, paddingRight: 40}}>
          <View>
            <Text style={[styles.sublineText, {color: '#000'}]}>
              We will send the consent document to Parent #2 in the e-mail below.
            </Text>
          </View>
          <View style={{marginTop: 20}}>
            <Text style={[styles.sublineText, {color: '#000'}]}>
              The Parent #2 need to read and consent in order to continue.
            </Text>
          </View>
          <View style={{marginTop: 20}}>
            <Text style={AppStyles.formLabel}>E-mail</Text>
            <TextInput style={AppStyles.formInput} />
            <TouchableOpacity style={{marginStart: 'auto', marginTop: 10}}>
              <Text style={AppStyles.linkText}>Wrong e-mail?</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{padding: 40, paddingBottom: 60}}>
          <TouchableOpacity style={AppStyles.formButton}
            onPress={() => onPressSend()}
          >
            <Text style={AppStyles.formButtonText}>Send consent</Text>
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
    padding: 20,
    paddingBottom: 0,
    marginTop: Platform.OS === 'ios' ? 40 : 20,
  },
  titleText: {
    fontSize: 30,
    fontWeight: "bold",
    color: '#000',
  },
  headlineText: {
    color: '#505050',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sublineText: {
    color: '#505050',
    fontSize: 16,
  },
  scrollBottomButton: {
    position: 'absolute',
    bottom: 60,
    right: 20,
  },
  scrollBottomButtonImg: {
    width: 60,
    height: 60,
  }
});
