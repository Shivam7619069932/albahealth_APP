import { StyleSheet, Dimensions } from "react-native";
import Color from "../constants/Color";

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

export const WelcomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFEFC',
    paddingLeft: 25,
    paddingRight: 25,
  },
  logoView: {
    paddingTop: 18,
    marginBottom: 18,
  },
  albaLogo: {
    width: 32,
    height: 32,
  },
  headlineText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#24231F',
    marginBottom: 20,
  },
  sublineText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#484848',
  },
  nextButton: {
    width: '100%',
    height: 52,
    borderRadius: 16,
    backgroundColor: '#D6CDB7',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
    marginBottom: 40,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#24231F',
  },
  inlineTextWrapper: {
    width: '100%',
    flexDirection: 'row',
  }
});

export default WelcomeStyles;
