import { Dimensions, Image, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons, MaterialIcons } from '@expo/vector-icons'; 
import { useContext, useState } from "react";
import { TaskContext } from "../../context";
import { useNavigation } from "@react-navigation/native";

const windowWidth = Dimensions.get('window').width;

export default function ConsentModal({visible = false, onRequestClose, onConsent}) {
  const navigation = useNavigation();
  const [consent1, setConsent1] = useState(false);
  const [consent2, setConsent2] = useState(false);
  const [consent3, setConsent3] = useState(false);

  return (
    <View style={visible ? styles.overlayView : {}}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onRequestClose}>
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <TouchableOpacity style={styles.modalCloseButton} 
              onPress={() => onRequestClose()}
            >
              <MaterialIcons name="close" size={20} color="#1C1B1F" />
            </TouchableOpacity>
            <Text style={styles.modalTitleText}>Consent</Text>
          </View>
          <ScrollView style={styles.modalBody}>
            <Text style={styles.titleText}>Consent</Text>
            <Text style={styles.headlineText}>
              Before continuing, we need you to consent to the following terms.
            </Text>
            <Text style={styles.sublineText}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </Text>
            <Text style={styles.sublineText}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
            </Text>
            <Text style={styles.sublineText}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
            </Text>
            <Text style={styles.sublineText}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
            </Text>
            {/*  */}
            <Text style={styles.termsHeadlineText}>
              I have received oral and/or written information about the study and have had the opportunity to ask questions. I will retain the written information.
            </Text>
            <View style={styles.termsAgreeView}>
              <TouchableOpacity 
                onPress={() => setConsent1(!consent1)}
              >
                <Ionicons name={consent1 ? "checkbox-outline" : "square-outline"} size={25} color={consent1 ? "#575044" : "#D7D7D7"} />
              </TouchableOpacity>
              <Text style={[styles.termsAgreeText, {marginLeft: 10}]}>
                I consent (for me and my partner) to participate in the project titled PREVENT 1.
              </Text>
            </View>
            <View style={styles.termsAgreeView}>
              <TouchableOpacity 
                onPress={() => setConsent2(!consent2)}
              >
                <Ionicons name={consent2 ? "checkbox-outline" : "square-outline"} size={25} color={consent2 ? "#575044" : "#D7D7D7"} />
              </TouchableOpacity>
              <Text style={[styles.termsAgreeText, {marginLeft: 10}]}>
                I consent (for me and my partner) to my samples being stored and processed as described in the research participant information.
              </Text>
            </View>
            <Text style={styles.termsHeadlineText}>
              I have been informed that the samples I provide may be used for future research that is not described in the information provided to me as a research participant. I have also been informed that in the event my samples are to be used in future research, the Ethical Review Board must review the new project and decide whether to ask for my consent again.
            </Text>
            <View style={styles.termsAgreeView}>
              <TouchableOpacity 
                onPress={() => setConsent3(!consent3)}
              >
                <Ionicons name={consent3 ? "checkbox-outline" : "square-outline"} size={25} color={consent3 ? "#575044" : "#D7D7D7"} />
              </TouchableOpacity>
              <Text style={[styles.termsAgreeText, {marginLeft: 10}]}>
                I consent to having my data stored for future research.
              </Text>
            </View>
            <View style={{marginBottom: 120}}></View>
          </ScrollView>
          <View style={styles.modalFooter}>
            <TouchableOpacity style={[styles.consentButton, !(consent1 && consent2 && consent3) ? styles.disabledButton : {}]}
              disabled={!(consent1 && consent2 && consent3)}
              onPress={() => onConsent()}
            >
              <Text style={[styles.consentButtonText, !(consent1 && consent2 && consent3) ? styles.disabledButtonText : {}]}>Yes, I have read and I consent.</Text>
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
    marginTop: Platform.OS === 'ios' ? 80 : 40,
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FEFEFC',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  modalHeader: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
    position: 'relative',
  },
  modalCloseButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#ECECEC',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 25,
  },
  modalTitleText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#24231F',
  },
  modalFooter: {
    width: '100%',
    marginBottom: 40,
    position: 'absolute',
    bottom: 0,
    paddingLeft: 25,
    paddingRight: 25,
  },
  consentButton: {
    width: '100%',
    height: 52,
    backgroundColor: '#D6CDB7',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  disabledButton: {
    backgroundColor: '#ECECEC',
  },
  consentButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  disabledButtonText: {
    color: '#BCBCBC',
  },
  modalBody: {
    flex: 1,
    width: '100%',
    paddingLeft: 25,
    paddingRight: 25,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#24231F',
    marginTop: 20
  },
  headlineText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#24231F',
    marginTop: 20
  },
  sublineText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#484848',
    marginTop: 20
  },
  termsHeadlineText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 20,
  },
  termsAgreeView: {
    flexDirection: 'row',
    marginTop: 20,
  },
  termsAgreeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#969696',
  },
});
