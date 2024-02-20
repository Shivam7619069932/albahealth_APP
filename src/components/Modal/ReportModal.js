import { Dimensions, Image, Modal, Platform, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'; 
import { useContext } from "react";
import { TaskContext } from "../../context";
import { useNavigation } from "@react-navigation/native";

const windowWidth = Dimensions.get('window').width;

export default function ReportModal({visible = false, onRequestClose}) {
  const navigation = useNavigation();
  const { updateReport } = useContext(TaskContext);

  const onSave = () => {
    updateReport();
    onRequestClose();
    navigation.navigate('TasksTab');
  }

  const onShare = () => {
    updateReport();
    onRequestClose();
    navigation.navigate('TasksTab');
  }

  return (
    <View style={visible ? styles.overlayView : {}}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onRequestClose}>
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => onRequestClose()}>
              <MaterialIcons name="close" size={40} color="#808080" />
            </TouchableOpacity>
          </View>
          <View style={styles.modalBody}>
            <Text style={styles.ReportHeadline}>Report in PDF</Text>
            
          </View>
          <Text style={styles.helperText}>All your Reports will be kept under your Profile section.</Text>
          <View style={styles.modalFooter}>
            <TouchableOpacity style={styles.actionButton}
              onPress={() => onSave()}
            >
              <Text style={styles.actionButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}
              onPress={() => onShare()}
            >
              <Text style={styles.actionButtonText}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  overlayView: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#00000088',
    position: 'absolute',
    top: 0,
  },
  modalView: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#00000088',
  },
  modalHeader: {
    marginTop: Platform.OS === 'ios' ? 60 : 30,
    paddingLeft: 30,
    paddingRight: 30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modalBody: {
    flex: 1,
    margin: 20,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 0,
    padding: 15,
    // 
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    // 
    alignItems: 'center',
  },
  helperText: {
    maxWidth: 250,
    fontSize: 14,
    fontWeight: 700,
    color: '#fff',
    textAlign: 'center',
  },
  modalFooter: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 20,
    marginBottom: 20
  },
  actionButton: {
    width: windowWidth * 0.5 - 50,
    height: 56,
    backgroundColor: '#808080',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 56,
  },
  actionButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  ReportHeadline: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 20
  }
});
