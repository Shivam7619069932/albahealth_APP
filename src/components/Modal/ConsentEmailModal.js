import { Dimensions, Image, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons, MaterialIcons } from '@expo/vector-icons'; 
import { useContext, useEffect, useState } from "react";
import { ProfileContext, TaskContext } from "../../context";
import { useNavigation } from "@react-navigation/native";

const windowWidth = Dimensions.get('window').width;

export default function ConsentEmailModal({visible = false, onRequestClose, onSend}) {
  const navigation = useNavigation();
  const { partnerProfile } = useContext(ProfileContext);
  const [partnerEmail, setPartnerEmail] = useState(partnerProfile.email);

  useEffect(() => {
    setPartnerEmail(partnerProfile.email);
  }, [visible, partnerProfile]);

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
              We also need the Partner to consent to the same terms.
            </Text>
            <Text style={styles.sublineText}>
              We will send the consent document to Partner in the e-mail below.
            </Text>
            <Text style={styles.sublineText}>
              The Partner need to read and consent in order to continue.
            </Text>
            <View style={styles.formGroup}>
              <Text style={styles.formLabelText}>Partner e-mail</Text>
              <TextInput 
                inputMode="email"
                style={styles.formInput}
                value={partnerEmail}
                onChangeText={(e) => setPartnerEmail(e)}
                maxLength={50}
              />
              <TouchableOpacity onPress={() => setPartnerEmail('')}>
                <Text style={styles.wrongEmailText}>Wrong e-mail?</Text>
              </TouchableOpacity>
            </View>
            <View style={{marginBottom: 120}}></View>
          </ScrollView>
          <View style={styles.modalFooter}>
            <TouchableOpacity style={[styles.consentButton, !partnerEmail ? styles.disabledButton : {}]}
              disabled={!partnerEmail}
              onPress={() => onSend()}
            >
              <Text style={[styles.consentButtonText, !partnerEmail ? styles.disabledButtonText : {}]}>Send consent</Text>
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
  formGroup: {
    marginTop: 40,
  },
  formLabelText: {
    color: '#818181',
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 5,
  },
  formInput: {
    width: '100%',
    height: 48,
    borderRadius: 16,
    backgroundColor: '#F7F7F7',
    borderWidth: 1,
    borderColor: '#ECECEC',
    paddingHorizontal: 16,
    color: '#24231F',
    fontSize: 16,
    fontWeight: '500',
  },
  wrongEmailText: {
    marginTop: 8,
    color: '#24231F',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  }
});
