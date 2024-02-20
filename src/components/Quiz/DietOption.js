import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default function DietOption() {
  const [noBreakfast, setNoBreakfast] = useState(false);
  
  return (
    <View style={{paddingTop: 20, paddingBottom: 20}}>
      <View style={styles.inlineView}>
        <Text style={styles.labelText}>Carbs</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Carbs</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Moderate</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>High</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inlineView}>
        <Text style={styles.labelText}>Protein</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Carbs</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Moderate</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>High</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inlineView}>
        <Text style={styles.labelText}>Fat</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Carbs</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Moderate</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>High</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.inlineView, {justifyContent: 'flex-start', marginTop: 10}]}>
        <TouchableOpacity
          onPress={() => setNoBreakfast(!noBreakfast)}
        >
          <Ionicons 
            name={noBreakfast ? "checkbox-outline" : "square-outline"} 
            size={25} 
            color={noBreakfast ? "#575044" : "#D7D7D7"} 
          />
        </TouchableOpacity>
        <Text style={styles.noBreakfastText}>I don't eat breakfast.</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  inlineView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  labelText: {
    width: 60,
    fontSize: 16,
    fontWeight: 600,
    color: '#575044',
  },
  button: {
    height: 43,
    paddingLeft: 11,
    paddingRight: 11,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    backgroundColor: '#E9E6DF',
  },
  buttonText: {
    fontSize: 17,
    fontWeight: 600,
    color: '#575044',
  },
  noBreakfastText: {
    marginLeft: 10,
    color: '#575044',
    fontSize: 16,
    fontWeight: 600,
  }
});
