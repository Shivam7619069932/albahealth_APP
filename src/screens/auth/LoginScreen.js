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
import { Alba, AlbaWhite, Baby, TextLogo, cardBackground } from "../../../assets";
import { Ionicons } from '@expo/vector-icons';
import { useContext, useState } from "react";
import { AuthContext, RootContext } from "../../context";
import Utility from '../../utils/utility';


export default function LoginScreen({navigation}) {
  const [pwdShow, setPwdShow] = useState(false);
  const { signinData, setSigninData, SignIn } = useContext(AuthContext);
  const { showToast } = useContext(RootContext);
  const [error, setError] = useState({
    email: '',
    password: ''
  });

  const onPressLogin = async () => {
    if (Utility.isValidEmail(signinData.email) && Utility.isValidPasswordCommon(signinData.password)) {
      // navigation.navigate('MainBottomTab');
      const res = await SignIn();
      console.log('=== Login Res ===', res);
      if (res.success) {
        setError({
          email: '',
          password: ''
        });
        navigation.navigate('MainBottomTab');
      } else {
        if (res?.errors) {
          setError({
            email: res?.errors?.email ? res?.errors?.email : '',
            password: res?.errors?.password ? res?.errors?.password : ''
          });
          // 
          if (res?.errors?.email) {
            showToast(res?.errors?.email);
          } else if (res?.errors?.password) {
            showToast(res?.errors?.password);
          }
        } else {
          setError({
            email: 'Invalid Email',
            password: 'Invalid Password'
          });
          // 
          if (res?.message) {
            showToast(res?.message);
          }
        }
      }
    } else {
      let _err = {};
      if (!Utility.isValidEmail(signinData.email)) {
        _err.email = 'Invalid Email';
      } else {
        _err.email = '';
      }
      if (!Utility.isValidPasswordCommon(signinData.password)) {
        _err.password = 'Invalid Password';
      } else {
        _err.password = '';
      }
      setError(_err);
    }
  }

  const onPressRegsiter = () => {
    navigation.navigate('Register');
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
              <TextInput style={[styles.emailInput, !!error.email ? AppStyles.formInputError : {},]} 
                inputMode="email"
                value={signinData.email}
                onChangeText={(e) => setSigninData({...signinData, email: e})}
                placeholder="Email"
              />
              <View style={styles.inputDivider}></View>
              <View style={AppStyles.formInlineInput}>
                <TextInput style={[styles.passwordInput, !!error.password ? AppStyles.formInputError : {}]} 
                  secureTextEntry={!pwdShow}
                  value={signinData.password}
                  onChangeText={(e) => setSigninData({...signinData, password: e})}
                  placeholder="Password"
                />
                <TouchableOpacity style={AppStyles.formInputButton} onPress={() => setPwdShow(!pwdShow)}>
                  <Ionicons name={pwdShow ? "eye" : "eye-off"} size={24} color="#BCBCBC" />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity style={styles.forgotLink}
              onPress={() => {}}
            >
              <Text style={styles.forgotLinkText}>Forgot password?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginButton}
              onPress={() => onPressLogin()}
            >
              <Text style={styles.loginButtonText}>Log in</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.registerButton} 
              onPress={() => onPressRegsiter()}
            >
              <Text style={styles.registerButtonText}>No account? Register now</Text>
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
  loginButton: {
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D6CDB7',
    borderRadius: 16,
  },
  loginButtonText: {
    color: '#24231F',
    fontSize: 16,
    fontWeight: '500',
  },
  registerButton: {
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderRadius: 16,
    borderColor: '#ECEEF4',
    marginTop: 15,
  },
  registerButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#24231F',
  }
});
