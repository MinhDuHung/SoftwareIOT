import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useDispatch} from 'react-redux';
import {CHANGE_SENSOR_FILTER_STATE} from '../redux/actionType/actions';
const {width, height} = Dimensions.get('window');
const SensorModal = ({
  handleSorting,
  setVisible,
  setViewOptions,
  numberOfQueries,
}: any) => {
  const dispatch = useDispatch();
  return (
    <View style={styles.modal}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <Text style={styles.text}>ID</Text>
        <View style={styles.btn}>
          <TouchableOpacity
            onPress={() => {
              numberOfQueries.current = 1;
              handleSorting('id', 'DESC');
              dispatch({
                type: CHANGE_SENSOR_FILTER_STATE,
                payload: {type: 'id', sortType: 'DESC'},
              });
              setVisible(false);
            }}
            style={{
              justifyContent: 'space-around',
              alignItems: 'center',
              height: 40,
              width: 60,
              borderRadius: 5,
              backgroundColor: '#FECB3E',
            }}>
            <Text style={styles.text1}>Desc</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              numberOfQueries.current = 1;
              handleSorting('id', 'ASC');
              dispatch({
                type: CHANGE_SENSOR_FILTER_STATE,
                payload: {type: 'id', sortType: 'ASC'},
              });
              setVisible(false);
            }}
            style={{
              justifyContent: 'space-around',
              alignItems: 'center',
              height: 40,
              width: 60,
              borderRadius: 5,
              backgroundColor: '#2653B0',
            }}>
            <Text style={styles.text1}>Asc</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <Text style={styles.text}>TEMPERATURE</Text>
        <View style={styles.btn}>
          <TouchableOpacity
            onPress={() => {
              numberOfQueries.current = 1;
              handleSorting('temperature', 'DESC');
              dispatch({
                type: CHANGE_SENSOR_FILTER_STATE,
                payload: {type: 'temperature', sortType: 'DESC'},
              });
              setVisible(false);
            }}
            style={{
              justifyContent: 'space-around',
              alignItems: 'center',
              height: 40,
              width: 60,
              borderRadius: 5,
              backgroundColor: '#FECB3E',
            }}>
            <Text style={styles.text1}>Desc</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              numberOfQueries.current = 1;
              handleSorting('temperature', 'ASC');
              dispatch({
                type: CHANGE_SENSOR_FILTER_STATE,
                payload: {type: 'temperature', sortType: 'ASC'},
              });
              setVisible(false);
            }}
            style={{
              justifyContent: 'space-around',
              alignItems: 'center',
              height: 40,
              width: 60,
              borderRadius: 5,
              backgroundColor: '#2653B0',
            }}>
            <Text style={styles.text1}>Asc</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <Text style={styles.text}>BRIGHTNESS</Text>
        <View style={styles.btn}>
          <TouchableOpacity
            onPress={() => {
              numberOfQueries.current = 1;
              handleSorting('brightness', 'DESC');
              dispatch({
                type: CHANGE_SENSOR_FILTER_STATE,
                payload: {type: 'brightness', sortType: 'DESC'},
              });
              setVisible(false);
            }}
            style={{
              justifyContent: 'space-around',
              alignItems: 'center',
              height: 40,
              width: 60,
              borderRadius: 5,
              backgroundColor: '#FECB3E',
            }}>
            <Text style={styles.text1}>Desc</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              numberOfQueries.current = 1;
              handleSorting('brightness', 'ASC');
              dispatch({
                type: CHANGE_SENSOR_FILTER_STATE,
                payload: {type: 'brightness', sortType: 'ASC'},
              });
              setVisible(false);
            }}
            style={{
              justifyContent: 'space-around',
              alignItems: 'center',
              height: 40,
              width: 60,
              borderRadius: 5,
              backgroundColor: '#2653B0',
            }}>
            <Text style={styles.text1}>Asc</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <Text style={styles.text}>HUMIDITY</Text>
        <View style={styles.btn}>
          <TouchableOpacity
            onPress={() => {
              numberOfQueries.current = 1;
              handleSorting('humidity', 'DESC');
              dispatch({
                type: CHANGE_SENSOR_FILTER_STATE,
                payload: {type: 'humidity', sortType: 'DESC'},
              });
              setVisible(false);
            }}
            style={{
              justifyContent: 'space-around',
              alignItems: 'center',
              height: 40,
              width: 60,
              borderRadius: 5,
              backgroundColor: '#FECB3E',
            }}>
            <Text style={styles.text1}>Desc</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              numberOfQueries.current = 1;
              handleSorting('humidity', 'ASC');
              dispatch({
                type: CHANGE_SENSOR_FILTER_STATE,
                payload: {type: 'humidity', sortType: 'ASC'},
              });
              setVisible(false);
            }}
            style={{
              justifyContent: 'space-around',
              alignItems: 'center',
              height: 40,
              width: 60,
              borderRadius: 5,
              backgroundColor: '#2653B0',
            }}>
            <Text style={styles.text1}>Asc</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <Text style={styles.text}>DATETIME</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => {
              numberOfQueries.current = 1;
              dispatch({
                type: CHANGE_SENSOR_FILTER_STATE,
                payload: {type: 'datetime', sortType: 'DESC'},
              });
              handleSorting('datetime', 'DESC');
              setVisible(false);
            }}
            style={{
              justifyContent: 'space-around',
              alignItems: 'center',
              height: 40,
              width: 60,
              borderRadius: 5,
              backgroundColor: '#FECB3E',
            }}>
            <Text style={styles.text1}>Desc</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              numberOfQueries.current = 1;
              dispatch({
                type: CHANGE_SENSOR_FILTER_STATE,
                payload: {type: 'datetime', sortType: 'ASC'},
              });
              handleSorting('datetime', 'ASC');
              setVisible(false);
            }}
            style={{
              justifyContent: 'space-around',
              alignItems: 'center',
              height: 40,
              width: 60,
              borderRadius: 5,
              backgroundColor: '#2653B0',
            }}>
            <Text style={styles.text1}>Asc</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <Text style={styles.text}>WINDSPEED</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => {
              numberOfQueries.current = 1;
              dispatch({
                type: CHANGE_SENSOR_FILTER_STATE,
                payload: {type: 'windspeed', sortType: 'DESC'},
              });
              handleSorting('windspeed', 'DESC');
              setVisible(false);
            }}
            style={{
              justifyContent: 'space-around',
              alignItems: 'center',
              height: 40,
              width: 60,
              borderRadius: 5,
              backgroundColor: '#FECB3E',
            }}>
            <Text style={styles.text1}>Desc</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              numberOfQueries.current = 1;
              dispatch({
                type: CHANGE_SENSOR_FILTER_STATE,
                payload: {type: 'extra', sortType: 'ASC'},
              });
              handleSorting('extra', 'ASC');
              setVisible(false);
            }}
            style={{
              justifyContent: 'space-around',
              alignItems: 'center',
              height: 40,
              width: 60,
              borderRadius: 5,
              backgroundColor: '#2653B0',
            }}>
            <Text style={styles.text1}>Asc</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          flex: 4,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          borderTopWidth: 2,
          borderTopColor: 'blue',
        }}>
        <Text style={styles.text}>VIEW OPTIONS</Text>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'space-around',
            height: '100%',
          }}>
          <TouchableOpacity
            onPress={() => {
              setVisible(false);
              setViewOptions('All');
              handleSorting('id', 'DESC');
              numberOfQueries.current = 1;
            }}
            style={{
              justifyContent: 'space-around',
              alignItems: 'center',
              height: 30,
              width: 60,
              borderRadius: 5,
              backgroundColor: '#FECB3E',
            }}>
            <Text style={styles.text1}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setVisible(false);
              setViewOptions('Temperature');
              handleSorting('id', 'DESC');
              numberOfQueries.current = 1;
            }}
            style={{
              justifyContent: 'space-around',
              alignItems: 'center',
              height: 30,
              width: 90,
              borderRadius: 5,
              backgroundColor: '#2653B0',
            }}>
            <Text style={styles.text1}>Temp only</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setVisible(false);
              setViewOptions('Brightness');
              handleSorting('id', 'DESC');
              numberOfQueries.current = 1;
            }}
            style={{
              justifyContent: 'space-around',
              alignItems: 'center',
              height: 30,
              width: 90,
              borderRadius: 5,
              backgroundColor: '#2653B0',
            }}>
            <Text style={styles.text1}>Brig only</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setVisible(false);
              setViewOptions('Humidity');
              handleSorting('id', 'DESC');
              numberOfQueries.current = 1;
            }}
            style={{
              justifyContent: 'space-around',
              alignItems: 'center',
              height: 30,
              width: 90,
              borderRadius: 5,
              backgroundColor: '#2653B0',
            }}>
            <Text style={styles.text1}>Humi only</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setVisible(false);
              setViewOptions('windspeed');
              handleSorting('id', 'DESC');
              numberOfQueries.current = 1;
            }}
            style={{
              justifyContent: 'space-around',
              alignItems: 'center',
              height: 30,
              width: 90,
              borderRadius: 5,
              backgroundColor: '#2653B0',
            }}>
            <Text style={styles.text1}>Wind only</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setVisible(false);
              setViewOptions('Date');
              handleSorting('id', 'DESC');
              numberOfQueries.current = 1;
            }}
            style={{
              justifyContent: 'space-around',
              alignItems: 'center',
              height: 30,
              width: 90,
              borderRadius: 5,
              backgroundColor: '#2653B0',
            }}>
            <Text style={styles.text1}>Date only</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SensorModal;

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  text: {flex: 1, color: '#F3485B', fontSize: 15},
  text1: {color: 'white', fontSize: 15},
  modal: {
    height: height * 0.7,
    width: 250,
    backgroundColor: 'white',
    position: 'absolute',
    top: height * 0.17,
    right: 10,
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  txtIn: {
    backgroundColor: '#FECB3E',
    height: 40,
    width: 200,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  searchBar: {
    height: 50,
    width: '100%',
    backgroundColor: 'white',
    marginVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    width: width - 20,
    height: 50,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: 'white',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  titleTxt: {
    fontSize: 13,
    color: 'white',
    borderRightWidth: 1,
    height: '100%',
    borderColor: 'white',
    textAlign: 'center',
    paddingTop: 14,
  },
});
