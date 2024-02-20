import { 
  View, 
  Text, 
  KeyboardAvoidingView, 
  TouchableWithoutFeedback, 
  Keyboard, 
  Platform, 
  ImageBackground, 
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView
} from "react-native";
import AppStyles from "../../styles/AppStyles";
import { Alba, AlbaWhite, Baby, TextLogo, appBackground, cardBackground } from "../../../assets";
import { Ionicons } from '@expo/vector-icons';
import { useContext, useState } from "react";
import { AuthContext, RootContext } from "../../context";
import Utility from '../../utils/utility';

export default function RegisterScreen({navigation}) {
  const [pwdShow, setPwdShow] = useState(false);
  const [pwdConfirmShow, setPwdConfirmShow] = useState(false);
  const { signupData, setSignupData, SignUp } = useContext(AuthContext);
  const { showToast } = useContext(RootContext);
  const [error, setError] = useState({
    email: '',
    password: '',
    password_confirmation: ''
  });

  const onPressLogin = () => {
    navigation.navigate('Login');
  }

  const onPressRegsiter = async () => {
    if (Utility.isValidEmail(signupData.email) && Utility.isValidPasswordCommon(signupData.password) && signupData.password_confirmation === signupData.password) {
      // navigation.navigate('ActivateNotification');
      const res = await SignUp();
      if (res.success) {
        navigation.navigate('ActivateNotification');
      } else {
        let _password = '';
        let _password_confirmation = '';
        if (res?.errors) {
          if (res?.errors?.password) {
            let perr = res?.errors?.password;
            for (let i = 0; i < perr.length; i++) {
              if (perr[i].includes('confirmation')) {
                _password_confirmation = _password_confirmation ? _password_confirmation : perr[i];
              } else {
                _password = _password ? _password : perr[i];
              }
            }
          }
          let err = {
            email: res?.errors?.email ? res?.errors?.email[0] : '',
            password: _password,
            password_confirmation: _password_confirmation
          };
          setError(err);
          // 
          if (err.email) {
            showToast(err.email);
          } else if (err.password) {
            showToast(err.password);
          } else if (err.password_confirmation) {
            showToast(err.password_confirmation);
          }
        }
      }
    } else {
      let _err = {};
      if (!Utility.isValidEmail(signupData.email)) {
        _err.email = 'Invalid Email';
      } else {
        _err.email = '';
      }
      if (!Utility.isValidPasswordCommon(signupData.password)) {
        _err.password = 'Invalid Password';
      } else {
        _err.password = '';
      }
      if (!signupData.password_confirmation || signupData.password_confirmation !== signupData.password) {
        _err.password_confirmation = 'Does not matched password';
      } else {
        _err.password_confirmation = '';
      }
      setError(_err);
    }
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={AppStyles.RootContainer}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ImageBackground source={Baby} resizeMode="cover" style={AppStyles.backgroundImage}>
          <View style={[styles.titleWrapper, {marginTop: Platform.OS === 'ios' ? 40 : 20}]}>
            <Image source={AlbaWhite} style={styles.albaLogo} />
            <Text style={styles.subline}>Join 300 families to help advance child health research.</Text>
          </View>
          <View style={styles.formCard}>
            <View style={styles.formGroup}>
              <TextInput style={[styles.emailInput, error.email ? AppStyles.formInputError : {}]} 
                inputMode="email"
                value={signupData.email}
                onChangeText={(e) => setSignupData({...signupData, email: e})}
                placeholder="Email"
              />
              <View style={styles.inputDivider}></View>
              <View style={AppStyles.formInlineInput}>
                <TextInput style={[styles.passwordInput, error.password ? AppStyles.formInputError : {}]} 
                  secureTextEntry={!pwdShow}
                  value={signupData.password}
                  onChangeText={(e) => setSignupData({...signupData, password: e})}
                  placeholder="Password"
                />
                <TouchableOpacity style={AppStyles.formInputButton} onPress={() => setPwdShow(!pwdShow)}>
                  <Ionicons name={pwdShow ? "eye" : "eye-off"} size={24} color="#BCBCBC" />
                </TouchableOpacity>
              </View>
              <View style={styles.inputDivider}></View>
              <View style={AppStyles.formInlineInput}>
                <TextInput style={[styles.passwordInput2, error.password_confirmation ? AppStyles.formInputError : {}]} 
                  secureTextEntry={!pwdConfirmShow}
                  value={signupData.password_confirmation}
                  onChangeText={(e) => setSignupData({...signupData, password_confirmation: e})}
                  placeholder="Confirm Password"
                />
                <TouchableOpacity style={AppStyles.formInputButton} onPress={() => setPwdConfirmShow(!pwdConfirmShow)}>
                  <Ionicons name={pwdConfirmShow ? "eye" : "eye-off"} size={24} color="#BCBCBC" />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity style={styles.registerButton}
              onPress={() => onPressRegsiter()}
            >
              <Text style={styles.registerButtonText}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginButton} 
              onPress={() => onPressLogin()}
            >
              <Text style={styles.loginButtonText}>Already have a account? Log in</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  titleWrapper: {
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 18,
    paddingBottom: 18,
  },
  albaLogo: {
    width: 32,
    height: 32,
    marginBottom: 10
  },
  subline: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  formCard: {
    backgroundColor: '#FEFEFC',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 25,
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 40,
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
  },
  formGroup: {
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: '#ECECEC',
    borderRadius: 16,
  },
  emailInput: {
    backgroundColor: '#F4F4F4',
    color: '#24231F', // '#BCBCBC',
    borderColor: '#ECECEC',
    height: 52,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 16,
    fontWeight: '500',
  },
  passwordInput: {
    backgroundColor: '#F4F4F4',
    color: '#24231F', // '#BCBCBC',
    borderColor: '#ECECEC',
    height: 52,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 16,
    fontWeight: '500',
  },
  passwordInput2: {
    backgroundColor: '#F4F4F4',
    color: '#24231F', // '#BCBCBC',
    borderColor: '#ECECEC',
    height: 52,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 16,
    fontWeight: '500',
  },
  inputDivider: {
    width: '100%',
    borderColor: '#ECECEC',
    borderTopWidth: 1,
  },
  forgotLink: {
    margin: 15,
    height: 37,
    alignItems: 'center',
    justifyContent: 'center',
  },
  forgotLinkText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#24231F',
  },
  registerButton: {
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D6CDB7',
    borderRadius: 16,
    marginTop: 15,
  },
  registerButtonText: {
    color: '#24231F',
    fontSize: 16,
    fontWeight: '500',
  },
  loginButton: {
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderRadius: 16,
    borderColor: '#ECEEF4',
    marginTop: 15,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#24231F',
  }
});
