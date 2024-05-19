import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
const {width, height} = Dimensions.get('window');
const Warning = () => {
  const warning = useSharedValue(0);
  const warningAnim = useAnimatedStyle(() => {
    return {
      opacity: interpolate(warning.value, [0, 1], [0, 1], Extrapolation.CLAMP),
    };
  });
  useEffect(() => {
    if (1) {
      const loop = setInterval(() => {
        warning.value = warning.value == 0 ? 1 : 0;
      }, 400);
      return () => clearInterval(loop);
    }
  });
  return (
    <Animated.View style={[styles.warning, warningAnim]}>
      <Text style={{fontSize: 16, color: 'red', fontWeight: 'bold'}}>
        High temperature!!!
      </Text>
    </Animated.View>
  );
};

export default Warning;

const styles = StyleSheet.create({
  warning: {
    zIndex: 1,
    position: 'absolute',
    top: 0,
    height: 50,
    width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(253, 231, 103,.9)',
  },
});
