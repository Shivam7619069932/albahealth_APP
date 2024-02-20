import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default function MultipleCheckboxOptions({options = []}) {
  const [selected, setSelected] = useState([]);
  
  return (
    <View style={{paddingTop: 20, paddingBottom: 20}}>
      {
        options && options.map((option, index) =>
          <TouchableOpacity key={index}
            style={[styles.quizOptionButton, {
              marginTop: index !== 0 ? 5 : 0,
              height: options.length === 2 ? 70 : options.length === 3 ? 60 : options.length === 4 ? 50 : 43,
              backgroundColor: selected === index ? '#EDE2C9' : '#E9E6DF',
              borderColor: selected === index ? '#757473' : '#E9E6DF'
            }]} 
            onPress={() => {
              if (selected.includes(index)) {
                let _selected = selected;
                setSelected(_selected.filter(el => el !== index));
              } else {
                setSelected(current => [...current, index])
              }
            }}
          >
            <Ionicons 
              name={selected.includes(index) ? "checkbox-outline" : "square-outline"} 
              size={25} 
              color={selected.includes(index) ? "#575044" : "#D7D7D7"} 
            />
            <Text style={[styles.quizOptionButtonText, {
              color: selected === index ? '#20201D' : '#575044',
              fontWeight: selected === index ? 'bold' : '600',
            }]}>Rural</Text>
          </TouchableOpacity>
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  quizOptionButton: {
    width: '100%',
    minHeight: 43,
    backgroundColor: '#E9E6DF',
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 14,
    borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  quizOptionButtonText: {
    marginLeft: 10,
    fontSize: 17,
    fontWeight: 600,
    color: '#575044',
  }
});
