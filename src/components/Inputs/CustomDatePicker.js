import DateTimePicker from '@react-native-community/datetimepicker';
import { useEffect, useState } from 'react';
import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AppStyles from '../../styles/AppStyles';
import moment from 'moment';

export const windowHeight = Dimensions.get('window').height;

export default function CustomDatePicker({value, onChange, placeholder='YYYY-MM-DD', style={}, disabled=false}) {
  // const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  return (
    <View>
      <TouchableOpacity 
        disabled={disabled} 
        style={[AppStyles.formInput, style]} 
        onPress={() => setShowDatePicker(!showDatePicker)}
      >
        <Text style={AppStyles.formInputText}>{!value ? placeholder : moment(value).format('YYYY-MM-DD')}</Text>
      </TouchableOpacity>
      <DatePickerModal 
        visible={showDatePicker} 
        onRequestClose={() => setShowDatePicker(false)} 
        value={value}
        onSelect={(d) => {
          onChange(d);
          setShowDatePicker(false);
        }}
      />
    </View>
  )
}

const DatePickerModal = ({visible, onRequestClose, value, onSelect}) => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    setDate(value ? value : new Date());
  }, [value]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}>
      <View style={styles.modalView}>
        <View style={styles.modalContent}>
          <View>
            <TouchableOpacity style={styles.cancelButton} 
              onPress={() => {
                setDate(value);
                onRequestClose();
              }}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.selectButton} 
              onPress={() => onSelect(date)}
            >
              <Text style={styles.modalButtonText}>Select</Text>
            </TouchableOpacity>
          </View>
          <DateTimePicker 
            value={date} 
            mode="date"
            display="spinner"
            onChange={(e, d) => setDate(d)}
          />
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalView: {
    marginTop: 'auto',
    alignSelf: 'stretch',
    height: windowHeight,
    backgroundColor: '#00000000',
    borderRadius: 0,
    padding: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: 'space-between',
  },
  modalContent: {
    marginTop: 'auto',
    width: '100%',
    height: 250,
    backgroundColor: '#fff',
  },
  cancelButton: {
    width: 80,
    alignItems: 'center',
    paddingTop: 10,
  },
  selectButton: {
    width: 80,
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    paddingTop: 10,
  },
  modalButtonText: {
    fontSize: 16
  },
});
