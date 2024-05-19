import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React, {memo} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import Entypo from 'react-native-vector-icons/Entypo';

const Sensor = ({value, title}: any) => {
  const backgroundColor =
    title == 'Temperature'
      ? '#F3485B'
      : title == 'Brightness'
      ? '#FECB3E'
      : title == 'Humidity'
      ? '#2653B0'
      : 'pink';
  return (
    <View style={styles.box}>
      <AnimatedCircularProgress
        size={95}
        width={15}
        fill={title == 'Brightness' ? value / 10 : value}
        tintColor={backgroundColor}
        backgroundColor="#3d5875">
        {fill => (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={styles.txt}>{title}</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.value}>{value}</Text>
              {title == 'Tempurature' ? (
                <MaterialCommunityIcons
                  name="temperature-celsius"
                  color={'white'}
                  size={15}
                />
              ) : title == 'Humidity' ? (
                <MaterialCommunityIcons
                  name="water-percent"
                  color={'white'}
                  size={20}
                />
              ) : title == 'Brightness' ? (
                <MaterialCommunityIcons
                  name="brightness-7"
                  color={'white'}
                  size={15}
                />
              ) : (
                <Entypo name="air" size={15} color={'white'} />
              )}
            </View>
          </View>
        )}
      </AnimatedCircularProgress>
    </View>
  );
};

export default memo(Sensor);

const styles = StyleSheet.create({
  box: {
    flex: 1,
    height: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  txt: {
    fontSize: 10,
    color: 'white',
  },
  value: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
  },
});
