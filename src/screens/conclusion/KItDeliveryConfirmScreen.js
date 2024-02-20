import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AppStyles from "../../styles/AppStyles";
import { DeliveryTruck, Village } from "../../../assets";
import { DietOption, LanguageOption, MultipleCheckboxOptions, NumberOption, Quiz, SingleOptions, TextOption } from "../../components";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export const windowWidth = Dimensions.get('window').width;

export default function KItDeliveryConfirmScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image source={DeliveryTruck} resizeMode="contain" style={styles.bannerImage} />
      <Text style={styles.headline}>Your First Kit is on your way!</Text>
      <Text style={styles.subline}>Tao the button below when it gets to your house.</Text>
      <TouchableOpacity style={styles.nextButton} 
        onPress={() => navigation.navigate('KitActivation')}
        // onPress={() => navigation.navigate('KitActivationSuccess')}
      >
        <Text style={styles.nextButtonText}>First Kit received</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEAEA', 
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerImage: {
    height: (windowWidth - 40) * 0.93,
    width: windowWidth - 40,
  },
  headline: {
    maxWidth: 210,
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },
  subline: {
    maxWidth: 250,
    marginTop: 30,
    fontSize: 18,
    fontWeight: '500',
    color: '#000000',
    textAlign: 'center',
  },
  nextButton: {
    marginTop: 30,
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
});
