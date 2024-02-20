import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useState } from "react";
import { Dimensions, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

export default function ReportScreen() {
  const navigation = useNavigation();
  const [showSaveOption, setShowSaveOption] = useState(true);

  useFocusEffect(() => {
    setShowSaveOption(true);
  });

  const onClose = () => {
    setShowSaveOption(false);
    navigation.navigate('MainBottomTab', {screen: 'TasksTab'});
  }

  const onSave = () => {

  }

  const onShare = () => {

  }

  return (
    <View style={styles.container}>
      <SubmitModal 
        visible={showSaveOption}
        onRequestClose={() => setShowSaveOption(false)}
        onClose={() => onClose()}
        onSave={() => onSave()}
        onShare={() => onShare()}
      />
    </View>
  )
}

const SubmitModal = ({visible, onRequestClose, onClose, onSave, onShare}) => {
  const [fullScreenMode, setFullScreenMode] = useState(false);

  const onZoom = () => {
    setFullScreenMode(!fullScreenMode);
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}>
      <View style={styles.modalView}>
        <View style={styles.headerView}>
          <TouchableOpacity style={styles.closeButton} onPress={() => onClose()}>
            <MaterialIcons name="close" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        <View style={[styles.pdfView, fullScreenMode ? styles.fullSceen: {}]}>
          <Text style={styles.pdfViewTitle}>Report in PDF</Text>
          <ScrollView>

          </ScrollView>
          <TouchableOpacity style={[styles.pdfZoom, fullScreenMode ? {right: 30, bottom: 40} : {}]}
            onPress={() => onZoom()}
          >
            {
              fullScreenMode 
              ? <Feather name="minimize" size={28} color="black" /> 
              : <MaterialIcons name="zoom-out-map" size={28} color="black" />
            }
          </TouchableOpacity>
        </View>
        {/*  */}
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Submit captured recording?</Text>
          <TouchableOpacity style={styles.yesButton} 
            onPress={() => {
              onSave();
            }}
          >
            <Text style={styles.modalButtonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.noButton} 
            onPress={() => onShare()}
          >
            <Text style={styles.modalButtonText}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5E5E5E',
  },
  // modal 
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
  headerView: {
    paddingTop: 18,
    paddingBottom: 18,
    paddingLeft: 25,
    paddingRight: 25,
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pdfView: {
    width: windowWidth - 100,
    height: windowHeight - 380,
    backgroundColor: '#C2C2C2',
    marginHorizontal: 50,
    // shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,  
    elevation: 4,
  },
  fullSceen: {
    width: windowWidth,
    height: windowHeight,
    marginHorizontal: 0,
    position: 'absolute',
    top: 0,
    bottom: 0,
    zIndex: 999,
  },
  pdfViewTitle: {
    color: '#000000',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 40,
  },
  pdfZoom: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    // 
    position: 'absolute',
    bottom: 8,
    right: 10,
  },
  modalContent: {
    marginTop: 'auto',
    width: '100%',
    height: 235,
    backgroundColor: '#fff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 45,
  },
  modalTitle: {
    color: '#24231F',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  yesButton: {
    width: '100%',
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D6CDB7',
    marginTop: 24,
  },
  noButton: {
    width: '100%',
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#ECEEF4',
    marginTop: 12,
  },
  modalButtonText: {
    color: '#24231F',
    fontSize: 16,
    fontWeight: '500',
  }
});
