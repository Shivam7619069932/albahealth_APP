import { StyleSheet, Dimensions } from "react-native";
import Color from "../constants/Color";

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

export const OnboardingStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFEFC',
  },
  logoView: {
    paddingTop: 18,
    marginBottom: 18,
    paddingLeft: 25,
    paddingRight: 25,
  },
  highlightView: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
    paddingLeft: 25,
    paddingRight: 25,
  },
  onBoardingText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    width: 275,
  },
  nextButton: {
    width: '100%',
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D6CDB7',
    borderRadius: 16,
    marginTop: 35,
  },
  slideDots: {
    width: 51,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 15,
  },
  slideDotSkin: {
    width: 11,
    height: 11,
    borderRadius: 11,
    backgroundColor: '#D9D9D9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  slideDot: {
    width: 5,
    height: 5,
    borderRadius: 5,
    backgroundColor: '#000000',
  },
  bottomTabView: {
    backgroundColor: 'rgba(254,254,252,0.85)',
    height: 110,
    borderTopWidth: 1,
    borderColor: '#ECECEC',
    flexDirection: 'row',
    position: 'relative',
    width: windowWidth,
    bottom: 0,
    left: 0,
    right: 0,
  },
  overlayView: {
    position: 'absolute',
    flex: 1,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#00000055',
    zIndex: 99
  },
  highlight: {
    position: 'relative',
    zIndex: 999,
  },
  tabBarActive: {
    width: 89,
    height: 89,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default OnboardingStyles;
