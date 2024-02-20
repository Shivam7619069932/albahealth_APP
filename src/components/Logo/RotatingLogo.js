import { useEffect } from "react";
import { StyleSheet, View, Dimensions, Animated, Easing } from "react-native";
import { Alba } from "../../../assets";

const windowWidth = Dimensions.get('window').width;

export default function RotatingLogo({size = windowWidth * 0.15, duration = 3000}) {
  let rotateValueHolder = new Animated.Value(0);

  useEffect(() => {
    startImageRotateFunction();
  }, []);

  const startImageRotateFunction = () => {
    rotateValueHolder.setValue(0);
    Animated.timing(rotateValueHolder, {
      toValue: 1,
      duration: duration,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => startImageRotateFunction());
  }

  const RotateData = rotateValueHolder.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View>
      <Animated.Image
        style={{width: size, height: size, transform: [{rotate: RotateData}]}}
        source={Alba}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  logoImg: {
    width: '100%'
  }
});