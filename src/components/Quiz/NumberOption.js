import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function NumberOption({unit = 'hours', value = '', onChange}) {
  
  return (
    <View style={{paddingTop: 20, paddingBottom: 20}}>
      <TextInput
        style={styles.textInput}
        keyboardType="numeric"
        onChangeText={text => onChange(text)}
        value={value}
        maxLength={2}
      />
      <Text style={styles.unitText}>{unit}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  textInput: {
    height: 69,
    backgroundColor: '#F7F7F7',
    borderWidth: 1,
    borderColor: '#ECECEC',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: '#24231F',
  },
  unitText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#24231F',
    marginTop: 6,
    marginLeft: 'auto',
    marginRight: 'auto',
  }
});
