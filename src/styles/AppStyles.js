import { StyleSheet, Dimensions, Platform } from "react-native";
import Color from "../constants/Color";

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

export const AppStyles = StyleSheet.create({
  RootContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  boxWithShadow: {
    width: windowWidth - 40,
    borderRadius: 20,
    // shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.11,
    shadowRadius: 2,  
    elevation: 16,
  },
  cardBackground: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 30,
    paddingBottom: 30,
    borderRadius: 20,
    overflow: 'hidden',
    alignItems: 'flex-start',
  },
  formGroup: {
    width: '100%',
  },
  formLabel: {
    fontSize: 12,
    color: '#818181',
    fontWeight: '500',
    marginBottom: 4,
  },
  formLabelHead: {
    fontSize: 16,
    fontWeight: '600',
    color: '#24231F',
  },
  formInput: {
    width: '100%',
    height: 48,
    backgroundColor: '#F7F7F7',
    borderColor: '#ECECEC',
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 15,
    color: '#24231F',
    fontSize: 16,
    fontWeight: "600",
    justifyContent: 'center',
  },
  formInputText: {
    color: '#24231F',
    fontSize: 16,
    fontWeight: "600",
  },
  formInputError: {
    borderColor: '#E47C7C',
    borderWidth: 1,
    backgroundColor: '#FFF0EF',
  },
  formErrMsg: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#E47C7C',
    marginLeft: 4,
    marginTop: 4
  },
  formInlineInput: {
    position: 'relative',
    justifyContent: 'center'
  },
  formInputButton: {
    position: 'absolute',
    right: 14,
  },
  formButton: {
    width: '100%',
    height: 52,
    borderRadius: 16,
    backgroundColor: '#D6CDB7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#24231F',
  },
  formDivider: {
    width: '100%',
    height: 0.5,
    backgroundColor: '#DBDBDB',
  },
  formOptionButton: {
    width: '100%',
    height: 48,
    borderRadius: 16,
    backgroundColor: '#FEFEFC',
    borderColor: '#ECEEF4',
    borderWidth: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 15,
  },
  formOptionButtonText: {
    color: '#24231F',
    fontSize: 16,
    fontWeight: '500',
    flexDirection: 'row',
  },
  formOptionButtonSelected: {
    borderWidth: 1.5,
    borderColor: '#A9CDF8',
    backgroundColor: '#A9CDF84D',
  },
  formCheckboxView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  formCheckboxText: {
    color: '#575044',
    fontSize: 15,
    fontWeight: 600,
  },
  linkText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#708FBD',
    textDecorationLine: 'underline',
  },
  onBoardingLogo: {
    alignItems: 'center',
  },
  onBoardingAlba: {
    width: 40,
    height: 40,
  },
  onBoardingTextLogo: {
    width: 120,
    height: 30,
  },
  onBoardingBanner: {
    position: 'relative',
    width: windowWidth - 100,
    paddingTop: 100,
  },
  onBoardingArcText: {
    position: 'absolute',
    width: windowWidth - 100,
  },
  onBoardingRobot: {
    width: windowWidth - 100,
    height: windowWidth - 100,
  },
  fixedBottomButtonWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    // backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 0,
    paddingBottom: 40,
    paddingLeft: 25,
    paddingRight: 25,
    // borderTopWidth: 1,
    // borderColor: 'lightgray',
  },
  appHeaderView: {
    paddingTop: 18,
    paddingBottom: 18,
    paddingLeft: 25,
    paddingRight: 25,
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    width: '100%',
  },
  appHeaderLogo: {
    width: 32,
    height: 32,
  },
  appBodyView: {
    padding: 16,
  },
  logProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: '#ECECEC',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#BCBCBC',
    borderStyle: 'dashed',
  },
  logProgressText: {
    color: '#24231F',
    fontSize: 16,
    fontWeight: '600',
  },
  logProgressDots: {
    width: 84,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logProgressDot: {
    width: 20,
    height: 20,
    borderRadius: 20,
    backgroundColor: '#BCBCBC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logProgressCompleted: {
    backgroundColor: '#24231F',
  },
  logProgressActive: {
    borderWidth: 5,
    borderColor: '#24231F',
    backgroundColor: '#ECECEC',
  }
});

export default AppStyles;
