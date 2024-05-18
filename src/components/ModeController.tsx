import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, {
  Extrapolation,
  Easing,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
  interpolateColor,
  withSequence,
  cancelAnimation,
} from 'react-native-reanimated';
import axios from 'axios';
import {insertActionApi} from '../utils/API/actionApi';
import convertToVietnamTime from '../utils/functions/convertDateFormat';

const {width, height} = Dimensions.get('window');
const ModeController = ({title}: any) => {
  const rotation = useSharedValue(0);
  const [lightMode, setLightMode] = useState(false);
  const [fanMode, setFanMode] = useState(false);
  const handleMode = async (device: string, mode: string) => {
    const datetime = convertToVietnamTime(new Date());
    try {
      const result = await axios.post(insertActionApi, {
        device,
        mode,
        datetime,
      });
      if (result.status == 201) {
        console.log('inserted Action successfully');
      }
    } catch (error) {
      console.error('error insert action', error);
    }
  };

  const rotateAnim = useAnimatedStyle(() => {
    return {
      transform: [{rotateZ: `${rotation.value}deg`}],
    };
  });

  const operateFan = () => {
    rotation.value = 0;
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 1000,
        easing: Easing.linear,
      }),
      -1,
    );
  };

  if (title == 'Fan') {
    return (
      <View style={[styles.box]}>
        <View style={{flexDirection: 'row', gap: 10}}>
          <TouchableOpacity
            onPress={() => {
              if (!fanMode) {
                setFanMode(true);
                operateFan();
                handleMode('fan', 'On');
              }
            }}
            style={[
              styles.btn,
              {
                backgroundColor: fanMode
                  ? 'rgba(0, 235, 90, 1)'
                  : 'rgba(7, 127, 59, 0.5)',
              },
            ]}>
            <Text
              style={[
                styles.value,
                {color: fanMode ? 'white' : 'rgba(188, 164, 165, 1)'},
              ]}>
              On
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (fanMode) {
                setFanMode(false);
                cancelAnimation(rotation);
                handleMode('fan', 'Off');
              }
            }}
            style={[
              styles.btn,
              {backgroundColor: !fanMode ? 'red' : 'rgba(153, 79, 84, 0.92)'},
            ]}>
            <Text
              style={[
                styles.value,
                {color: !fanMode ? 'white' : 'rgba(188, 164, 165, 1)'},
              ]}>
              Off
            </Text>
          </TouchableOpacity>
        </View>
        <Animated.View style={rotateAnim}>
          <MaterialCommunityIcons name="fan" size={70} color={'#03FDF9'} />
        </Animated.View>
      </View>
    );
  }

  return (
    <View style={[styles.box]}>
      <View style={{flexDirection: 'row', gap: 10}}>
        <TouchableOpacity
          onPress={() => {
            if (!lightMode) {
              setLightMode(true);
              handleMode('light', 'On');
            }
          }}
          style={[
            styles.btn,
            {
              backgroundColor: lightMode
                ? 'rgba(0, 235, 90, 1)'
                : 'rgba(7, 127, 59, 0.5)',
            },
          ]}>
          <Text
            style={[
              styles.value,
              {color: lightMode ? 'white' : 'rgba(188, 164, 165, 1)'},
            ]}>
            On
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (lightMode) {
              setLightMode(false);
              handleMode('light', 'Off');
            }
          }}
          style={[
            styles.btn,
            {backgroundColor: !lightMode ? 'red' : 'rgba(153, 79, 84, 0.92)'},
          ]}>
          <Text
            style={[
              styles.value,
              {color: !lightMode ? 'white' : 'rgba(188, 164, 165, 1)'},
            ]}>
            Off
          </Text>
        </TouchableOpacity>
      </View>
      <MaterialCommunityIcons
        name="lightbulb-on"
        size={70}
        color={lightMode ? 'yellow' : 'gray'}
      />
    </View>
  );
};

export default memo(ModeController);

const styles = StyleSheet.create({
  btn: {
    height: 40,
    width: '40%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: width / 2 - 20,
    height: 140,
    borderRadius: 15,
    backgroundColor: '#001030',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    fontSize: 16,
    color: 'white',
  },
  value: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});
