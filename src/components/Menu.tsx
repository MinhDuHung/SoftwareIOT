import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {useRoute} from '@react-navigation/native';
const {width, height} = Dimensions.get('window');
const Menu = ({navigation, screen}: any) => {
  const route = useRoute();
  const [isOpen, setIsOpen] = useState(false);

  const TouchableOpacityAnim =
    Animated.createAnimatedComponent(TouchableOpacity);

  function handlePressBarMenu() {
    setIsOpen(!isOpen);
  }
  const screensData = [
    'Dashboard',
    'SensorHistory',
    'ActionHistory',
    'Profile',
  ];

  const bottom =
    screen == 'Profile' ? height - 70 : screen !== 'Dashboard' ? 20 : 160;
  return (
    <View
      style={{
        width,
        height: 40,
        flex: 1,
        position: 'absolute',
        bottom,
        left: 10,
        flexDirection: 'row',
      }}>
      <TouchableOpacity
        onPressIn={() => {
          handlePressBarMenu();
        }}
        style={{
          height: 40,
          width: 40,
          borderRadius: 10,
          backgroundColor: '#68F7B7',
          zIndex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={[
            {
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              transform: [{rotate: !isOpen ? '90deg' : '0deg'}],
            },
          ]}>
          <FontAwesome name="chevron-right" size={20} color={'white'} />
        </View>
      </TouchableOpacity>
      <View
        style={{
          width: width * 0.83,
          flexDirection: 'row',
          marginLeft: 10,
          height: 40,
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        {isOpen &&
          screensData.map((item, index) => {
            return (
              <TouchableOpacityAnim
                onPress={() => {
                  if ('Dashboard' == route.name) {
                    navigation.navigate(item);
                  } else if (item == 'Dashboard') {
                    navigation.reset({
                      index: 0,
                      routes: [{name: item}],
                    });
                  } else navigation.navigate(item);
                }}
                key={index}
                style={[
                  {
                    height: 40,
                    paddingHorizontal: 7,
                    borderRadius: 5,
                    backgroundColor: 'white',
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                ]}>
                <Text
                  style={{color: '#2653B0', fontSize: 12, fontWeight: 'bold'}}>
                  {item}
                </Text>
              </TouchableOpacityAnim>
            );
          })}
      </View>
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({});
