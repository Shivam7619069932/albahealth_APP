import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function SingleOptions({options = [], value = '', onSelect}) {
  
  return (
    <View style={{paddingTop: 20, paddingBottom: 20}}>
      {
        options && options.map((option, index) =>
          <TouchableOpacity key={index}
            style={[styles.quizOptionButton, {
              marginTop: index !== 0 ? 12 : 0,
              height: options.length === 2 ? 70 : options.length === 3 ? 60 : options.length === 4 ? 50 : 48,
              backgroundColor: option === value ? '#E5EFFB' : '#FEFEFC',
              borderColor: option === value ? '#B8D5F8' : '#ECEEF4'
            }]} 
            onPress={() => onSelect(option)}
          >
            <Text style={[styles.quizOptionButtonText, {
              color: option === value ? '#20201D' : '#575044',
              fontWeight: option === value ? 'bold' : '600',
            }]}>{option}</Text>
            {
              option === value && <MaterialIcons name="check" size={20} color="#1C1B1F" />
            }
          </TouchableOpacity>
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  quizOptionButton: {
    width: '100%',
    minHeight: 48,
    backgroundColor: '#FEFEFC',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#ECEEF4',
  },
  quizOptionButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#24231F',
  }
});
