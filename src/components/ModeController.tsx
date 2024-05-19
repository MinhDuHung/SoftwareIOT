import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {memo, useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  cancelAnimation,
} from 'react-native-reanimated';
import axios from 'axios';
import {insertActionApi} from '../utils/API/actionApi';
import convertToVietnamTime from '../utils/functions/convertDateFormat';

const {width, height} = Dimensions.get('window');
const ModeController = ({title}: any) => {
  const rotation = useSharedValue(0);
  const [mode, setMode] = useState(false);
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

  const icons: any = {
    Fan: (
      <Animated.View style={rotateAnim}>
        <MaterialCommunityIcons name="fan" size={50} color={'#03FDF9'} />
      </Animated.View>
    ),
    Light: (
      <MaterialCommunityIcons
        name="lightbulb-on-outline"
        size={50}
        color={mode ? '#FECB3E' : 'gray'}
      />
    ),
    Extra: <Entypo name="air" size={50} color={mode ? '#2653B0' : 'gray'} />,
  };
  return (
    <View style={styles.box}>
      <View style={{flexDirection: 'row', gap: 10}}>
        <TouchableOpacity
          onPress={() => {
            if (title == 'Fan') {
              if (!mode) {
                setMode(true);
                operateFan();
                handleMode('fan', 'On');
              }
            } else if (title == 'Light') {
              handleMode('light', 'On');
              setMode(true);
            } else {
              handleMode('extra', 'On');
              setMode(true);
            }
          }}
          style={[
            styles.btn,
            {
              backgroundColor: mode
                ? 'rgba(0, 235, 90, 1)'
                : 'rgba(7, 127, 59, 0.5)',
            },
          ]}>
          <Text
            style={[
              styles.value,
              {color: mode ? 'white' : 'rgba(188, 164, 165, 1)'},
            ]}>
            On
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (title == 'Fan') {
              if (mode) {
                setMode(false);
                cancelAnimation(rotation);
                handleMode('fan', 'Off');
              }
            } else if (title == 'Light') {
              handleMode('light', 'Off');
              setMode(false);
            } else {
              handleMode('extra', 'Off');
              setMode(false);
            }
          }}
          style={[
            styles.btn,
            {backgroundColor: !mode ? 'red' : 'rgba(153, 79, 84, 0.92)'},
          ]}>
          <Text
            style={[
              styles.value,
              {color: !mode ? 'white' : 'rgba(188, 164, 165, 1)'},
            ]}>
            Off
          </Text>
        </TouchableOpacity>
      </View>
      {icons[title]}
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
    width: width / 3 - 10,
    height: 140,
    borderRadius: 15,
    backgroundColor: '#001030',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
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
