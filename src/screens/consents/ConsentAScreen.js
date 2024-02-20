import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AppStyles from "../../styles/AppStyles";
import { Ionicons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import { ScrollBottom } from "../../../assets";
import { useNavigation } from '@react-navigation/native';

export default function ConsentAScreen() {
  const navigation = useNavigation();
  const [consent1, setConsent1] = useState(false);
  const [consent2, setConsent2] = useState(false);
  const [consent3, setConsent3] = useState(false);
  const scrollViewRef = useRef();
  const [scrollPos, setScrollPos] = useState(0);

  const onPressConsent = () => {
    if (consent1 && consent2 && consent3) {
      navigation.navigate('ConsentB');
    }
  }

  const handleScroll = (e) => {
    console.log('=== e ===', e.nativeEvent.contentOffset.y);
    let pos = e.nativeEvent.contentOffset.y;
    setScrollPos(pos);
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}
        ref={scrollViewRef}
        onScroll={handleScroll}
      >
        <View style={styles.titleWrapper}>
          <Text style={styles.titleText}>Consent</Text>
        </View>
        <View style={{padding: 20}}>
          <Text style={AppStyles.sublineText}>
            Before continuing, we need you to consent to the following terms.
          </Text>
        </View>
        <View style={AppStyles.formDivider}></View>
        <View style={{padding: 20}}>
          <View>
            <Text style={styles.headlineText}>Lorem ipsum dolor sit amet</Text>
            <Text style={styles.sublineText}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </Text>
          </View>
          <View style={{marginTop: 20}}>
            <Text style={styles.headlineText}>Lorem ipsum dolor sit amet</Text>
            <Text style={styles.sublineText}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
            </Text>
          </View>
          <View style={{marginTop: 20}}>
            <Text style={styles.headlineText}>Lorem ipsum dolor sit amet</Text>
            <Text style={styles.sublineText}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
            </Text>
          </View>
          <View style={{marginTop: 20}}>
            <Text style={styles.headlineText}>Lorem ipsum dolor sit amet</Text>
            <Text style={styles.sublineText}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
            </Text>
          </View>
        </View>
        <View style={{padding: 20}}>
          <Text style={styles.headlineText}>
            I have received oral and/or written 
            information about the 1) study and 2) 
            potential future research, and I have had 
            the opportunity to ask questions. I will 
            retain the written information.
          </Text>
          <View style={{flexDirection: 'row', marginTop: 20}}>
            <TouchableOpacity onPress={() => setConsent1(!consent1)}>
              <Ionicons name={consent1 ? "checkbox-outline" : "square-outline"} size={25} color={consent1 ? "#575044" : "#D7D7D7"} />
            </TouchableOpacity>
            <Text style={[styles.sublineText, {marginLeft: 10}]}>
              I consent (for me and my partner) to participate in the project titled PREVENT.
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 20}}>
            <TouchableOpacity onPress={() => setConsent2(!consent2)}>
              <Ionicons name={consent2 ? "checkbox-outline" : "square-outline"} size={25} color={consent2 ? "#575044" : "#D7D7D7"} />
            </TouchableOpacity>
            <Text style={[styles.sublineText, {marginLeft: 10}]}>
              I consent (for me and my partner) to my samples being stored and processed as 
              described in the research participant information.
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 20}}>
            <TouchableOpacity onPress={() => setConsent3(!consent3)}>
              <Ionicons name={consent3 ? "checkbox-outline" : "square-outline"} size={25} color={consent3 ? "#575044" : "#D7D7D7"} />
            </TouchableOpacity>
            <Text style={[styles.sublineText, {marginLeft: 10}]}>
              I consent (for me and my partner) to having my data stored for future research.
            </Text>
          </View>
        </View>
        <View style={{padding: 20, paddingBottom: 60}}>
          <TouchableOpacity style={[
              AppStyles.formButton, 
              {opacity: !(consent1 && consent2 && consent3) ? 0.5 : 1}
            ]}
            disabled={!(consent1 && consent2 && consent3)}
            onPress={() => onPressConsent()}
          >
            <Text style={AppStyles.formButtonText}>Yes, I have read and I consent.</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {
        scrollPos < 800 && 
        <TouchableOpacity style={styles.scrollBottomButton}
          onPress={() => scrollViewRef.current.scrollToEnd({animated: true})}
        >
          <Image source={ScrollBottom} style={styles.scrollBottomButtonImg} />
        </TouchableOpacity>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titleWrapper: {
    padding: 20,
    paddingBottom: 0,
    marginTop: Platform.OS === 'ios' ? 40 : 20,
  },
  titleText: {
    fontSize: 30,
    fontWeight: "bold",
    color: '#000',
  },
  headlineText: {
    color: '#505050',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sublineText: {
    color: '#505050',
    fontSize: 16,
  },
  scrollBottomButton: {
    position: 'absolute',
    bottom: 60,
    right: 20,
  },
  scrollBottomButtonImg: {
    width: 60,
    height: 60,
  }
});
