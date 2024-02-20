import React from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import { appBackground } from "../../../assets";

export default function BackgroundLayout({}) {
  return (
    <ImageBackground source={appBackground} resizeMode="cover" style={styles.image}>
      <Text style={styles.text}>Inside</Text>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
  },
});
