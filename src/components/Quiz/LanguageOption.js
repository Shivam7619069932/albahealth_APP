import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import SelectDropdown from 'react-native-select-dropdown'
import { windowWidth } from "./Quiz";

export default function LanguageOption() {
  const [noBreakfast, setNoBreakfast] = useState(false);
  const countries = ["Egypt", "Canada", "Australia", "Ireland"];
  
  return (
    <View style={{paddingTop: 20, paddingBottom: 20}}>
      <SelectDropdown
        buttonStyle={styles.selectButton}
        buttonTextStyle={styles.selectButtonText}
        data={countries}
        renderDropdownIcon={() => <Ionicons name="chevron-down" size={24} color="black" />}
        dropdownIconPosition="right"
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index)
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          return selectedItem
        }}
        rowTextForSelection={(item, index) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return item
        }}
        rowTextStyle={{textAlign: 'left', paddingLeft: 10, paddingRight: 10}}
      />
      <View style={[styles.inlineView, {marginTop: 10}]}>
        <SelectDropdown
          buttonStyle={[styles.selectButton, {width: windowWidth - 120}]}
          buttonTextStyle={styles.selectButtonText}
          data={countries}
          renderDropdownIcon={() => <Ionicons name="chevron-down" size={24} color="black" />}
          dropdownIconPosition="right"
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index)
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item
          }}
          rowTextStyle={{textAlign: 'left', paddingLeft: 10, paddingRight: 10}}
        />
        <TouchableOpacity style={styles.cancelButton}>
          <Ionicons name="ios-close" size={24} color="#9E0000" />
        </TouchableOpacity>
      </View>
      <View style={[styles.inlineView, {justifyContent: 'center', marginTop: 50}]}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setNoBreakfast(!noBreakfast)}
        >
          <Text style={styles.addButtonText}>Add language</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  selectButton: {
    width: windowWidth - 80,
    height: 60,
    borderRadius: 14,
    borderWidth: 4,
    borderColor: '#E9E6DF',
    backgroundColor: '#fff00',
  },
  selectButtonText: {
    fontSize: 17,
    fontWeight: 600,
    color: '#575044',
    textAlign: 'left',
  },
  inlineView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  addButton: {
    width: 210,
    height: 43,
    borderRadius: 43,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#A5C5F4',
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  cancelButton: {
    padding: 5
  }
});
