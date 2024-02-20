import { StyleSheet, Text, View } from "react-native";
import RotatingLogo from "../Logo/RotatingLogo";

export default function Loader({label = 'Loading...', message = ''}) {
  return (
    <View style={styles.loadingView}>
      <RotatingLogo duration={2200} />
      {
        label &&
        <Text style={[styles.statusText, {marginTop: 20}]}>{label}</Text>
      }
      {
        message &&
        <Text style={[styles.statusText, {marginTop: 60}]}>{message}</Text>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  loadingView: {
    flex: 1,
    backgroundColor: '#ffffff88',
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 9999,
  },
  statusText: {
    fontSize: 14,
    textAlign: 'center',
    maxWidth: 250,
  }
});
