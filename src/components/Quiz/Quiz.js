import { Dimensions, Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import { QuizBackground, Robot } from "../../../assets";

export const windowWidth = Dimensions.get('window').width;

export default function Quiz({title = "", text = ""}) {
  return (
    <View>
      <Text style={styles.quizTitle}>{title}</Text>
      <View style={styles.quizWrapper}>
        <ImageBackground source={QuizBackground} resizeMode="stretch" style={styles.quizBackground}>
          <Text style={styles.quizText}>{text}</Text>
        </ImageBackground>
        <Image source={Robot} resizeMode="contain" style={styles.robot} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  quizTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#20201D',
    marginBottom: 8,
  },
  quizWrapper: {
    position: 'relative',
    flexDirection: 'row',
  },
  quizBackground: {
    width: windowWidth - 150,
    minHeight: 100,
    padding: 20,
    paddingRight: 60,
  },
  quizText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#20201D',
  },
  robot: {
    width: 100,
    height: 100,
    position: 'absolute',
    right: 0,
  },
});
