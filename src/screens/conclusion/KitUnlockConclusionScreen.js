import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AppStyles from "../../styles/AppStyles";
import { Village } from "../../../assets";
import { DietOption, LanguageOption, MultipleCheckboxOptions, NumberOption, Quiz, SingleOptions, TextOption } from "../../components";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export const windowWidth = Dimensions.get('window').width;

export default function KitUnlockConclusionScreen() {
  const navigation = useNavigation();

  return (
    <View style={AppStyles.RootContainer}>
      <ScrollView style={{flex: 1}}>
        <Image source={Village} resizeMode="contain" style={styles.bannerImage} />
        <View style={{flex: 1, padding: 40}}>
          <Text style={styles.amazingText}>Amazing! 🎉</Text>
          <Text style={styles.subline}>You completed all 000 questions.</Text>
          <View style={styles.cardView}>
            <View style={styles.kitUnlockedView}>
              <Text style={styles.kitUnlockedText}>First Kit unlocked!</Text>
            </View>
            <Text style={styles.addressLabelText}>Your kit will be sent to the following address:</Text>
            <View style={styles.addressValueView}>
              <Text style={styles.addressValueText}>
                Igeldamsgatan 5, 1601 
                Stockholm, Stockholm lan,
                Sweden
                112 49
              </Text>
            </View>
            <TouchableOpacity style={styles.wrongAddressButton}>
              <Text style={styles.wrongAddressButtonText}>Wrong address?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <View style={styles.nextButtonWrapper}>
        <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('QuestionConclusionC')}>
          <Text style={styles.nextButtonText}>Confirm and send First Kit</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  bannerImage: {
    flex: 1,
    height: windowWidth * 0.465,
    width: windowWidth,
  },
  nextButtonWrapper: {
    width: '100%',
    paddingLeft: 40,
    paddingRight: 40,
    paddingBottom: 60,
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
  },
  nextButton: {
    width: '100%',
    height: 56,
    borderRadius: 56,
    backgroundColor: '#75CC9C',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  amazingText: {
    fontSize: 46,
    fontWeight: 'bold',
    color: '#A88C42',
    textAlign: 'center',
  },
  subline: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  cardView: {
    backgroundColor: '#E9E6DF',
    padding: 30,
    borderRadius: 14,
    paddingTop: 100,
    marginTop: 10
  },
  kitUnlockedView: {
    width: windowWidth - 40,
    height: 38,
    backgroundColor: '#CFC6B0',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 30,
    left: -20,
    transform: [{rotate: '-5deg'}],
    // shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 2,  
    elevation: 8,
  },
  kitUnlockedText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#575044',
  },
  addressLabelText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#575044',
  },
  addressValueView: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#B9B09B',
  },
  addressValueText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#A88C42'
  },
  wrongAddressButton: {
    marginTop: 5,
    marginLeft: 'auto',
  },
  wrongAddressButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#708FBD',
  }
});
