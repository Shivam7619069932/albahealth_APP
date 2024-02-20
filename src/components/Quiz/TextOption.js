import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function TextOption() {
  const [value, setValue] = useState('');
  
  return (
    <View style={{paddingTop: 20, paddingBottom: 20}}>
      <TextInput
        style={styles.textInput}
        editable
        multiline
        numberOfLines={4}
        maxLength={40}
        placeholder="Write your answer here..."
        onChangeText={text => setValue(text)}
        value={value}
      />
      <Text style={styles.leftCharacterText}>2345 characters left</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: '#C5C5C5',
    borderRadius: 14,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    minHeight: 190,
    fontSize: 17,
    color: '#575044',
  },
  leftCharacterText: {
    fontSize: 12,
    fontWeight: 600,
    color: '#B7B7B7',
    marginLeft: 'auto',
    marginTop: 5
  }
});
