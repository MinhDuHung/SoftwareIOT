import { Dimensions, FlatList, Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Menu from '../components/Menu';
import Ionicons from 'react-native-vector-icons/Ionicons'
const { width, height } = Dimensions.get("window")

const generateRandomData = () => {
  const id = Math.floor(Math.random() * 1000);
  const temperature = Math.floor(Math.random() * 100);
  const humidity = Math.floor(Math.random() * 100);
  const brightness = Math.floor(Math.random() * 1000);
  const randomDate = new Date(Date.now() - Math.floor(Math.random() * 10000000000));
  const datetime = `${randomDate.getDate()}/${randomDate.getMonth() + 1}/${randomDate.getFullYear()} ${randomDate.getHours()}:${randomDate.getMinutes()}:${randomDate.getSeconds()}`;

  return {
    id,
    temperature,
    humidity,
    brightness,
    datetime,
  };
};
const SensorHistory = ({ navigation }: any) => {
  const [data, setData] = useState(Array.from({ length: 20 }, () => generateRandomData()));
  const [text, setText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [visible, setVisible] = useState(false)

  const handleSearching = () => {
    if(text == ''){
      setData(Array.from({ length: 20 }, () => generateRandomData()))
      return
    }
    const filteredData = data.filter(item => {
      const searchTermLower = text.toLowerCase();
      return (
        item.id.toString().includes(searchTermLower) ||
        item.temperature.toString().includes(searchTermLower) ||
        item.humidity.toString().includes(searchTermLower) ||
        item.brightness.toString().includes(searchTermLower) ||
        item.datetime.toLowerCase().includes(searchTermLower)
      );
    });
    setText('')
    setData(filteredData)
  }
  const handleSortingAsc = (param: any) => {
    let sortedData = [...data]
    if (param == 'id') {
      sortedData = sortedData.sort((a, b) => a.id - b.id);
    } else if (param == 'temperature') {
      sortedData = sortedData.sort((a, b) => a.temperature - b.temperature);
    } else if (param == 'brightness') {
      sortedData = sortedData.sort((a, b) => a.brightness - b.brightness);
    } else if (param == 'humidity') {
      sortedData = sortedData.sort((a, b) => a.humidity - b.humidity);
    } else {
      sortedData = sortedData.sort((a, b) => {
        let [day, month, year, hour, minute, second] = a.datetime.split(/[\s/:]+/);
        const dateA: any = new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}Z`);
        [day, month, year, hour, minute, second] = b.datetime.split(/[\s/:]+/);
        const dateB: any = new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}Z`);
        return dateA - dateB;
      });
    }
    setData(sortedData);
  };
  const handleSortingDesc = (param: any) => {
    let sortedData = [...data]
    if (param == 'id') {
      sortedData = sortedData.sort((a, b) => b.id - a.id);
    } else if (param == 'temperature') {
      sortedData = sortedData.sort((a, b) => b.temperature - a.temperature);
    } else if (param == 'brightness') {
      sortedData = sortedData.sort((a, b) => b.brightness - a.brightness);
    } else if (param == 'humidity') {
      sortedData = sortedData.sort((a, b) => b.humidity - a.humidity);
    } else {
      sortedData = sortedData.sort((a, b) => {
        let [day, month, year, hour, minute, second] = a.datetime.split(/[\s/:]+/);
        const dateA: any = new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}Z`);
        [day, month, year, hour, minute, second] = b.datetime.split(/[\s/:]+/);
        const dateB: any = new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}Z`);
        return dateB - dateA;
      });
    }
    setData(sortedData);
  };
  return (
    <View style={{ flex: 1, backgroundColor: '#2653B0', padding: 10 }}>
      <Text style={{ color: 'white', fontSize: 40, fontWeight: 'bold' }}>SENSOR HISTORY</Text>
      <View style={styles.searchBar}>
        <TextInput
          value={text}
          style={styles.txtIn}
          placeholderTextColor={'#2653B0'}
          onChangeText={t => setText(t)}
          placeholder='Find whatever you want'
        />
        <TouchableOpacity
          onPress={() => handleSearching()}
          style={{ height: 40, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 5, }}>
          <Ionicons name='search-circle' color={'#F3485B'} size={40} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setVisible(!visible)}
          style={{ height: 40, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 5, }}>
          <Ionicons name='filter' color={'#F3485B'} size={40} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={() => {
          return (
            <View style={styles.title}>
              <Text style={[styles.titleTxt, { flex: 1 }]}>ID</Text>
              <View style={{ height: '100%', width: 1, backgroundColor: 'white' }} />

              <Text style={[styles.titleTxt, { flex: 1 }]}>TEMP</Text>
              <View style={{ height: '100%', width: 1, backgroundColor: 'white' }} />

              <Text style={[styles.titleTxt, { flex: 1 }]}>BRIG</Text>
              <View style={{ height: '100%', width: 1, backgroundColor: 'white' }} />

              <Text style={[styles.titleTxt, { flex: 1 }]}>HUMI</Text>
              <View style={{ height: '100%', width: 1, backgroundColor: 'white' }} />

              <Text style={[styles.titleTxt, { flex: 2 }]}>DATETIME</Text>
            </View>
          )
        }}
        renderItem={({ item, index }) => {
          return (
            <View style={styles.title}>
              <Text style={[styles.titleTxt, { flex: 1 }]}>{item.id}</Text>
              <View style={{ height: '100%', width: 1, backgroundColor: 'white' }} />

              <Text style={[styles.titleTxt, { flex: 1 }]}>{item.temperature} °C</Text>
              <View style={{ height: '100%', width: 1, backgroundColor: 'white' }} />

              <Text style={[styles.titleTxt, { flex: 1 }]}>{item.brightness} Lux</Text>
              <View style={{ height: '100%', width: 1, backgroundColor: 'white' }} />

              <Text style={[styles.titleTxt, { flex: 1 }]}>{item.humidity} %</Text>
              <View style={{ height: '100%', width: 1, backgroundColor: 'white' }} />

              <Text style={[styles.titleTxt, { flex: 2 }]}>{item.datetime}</Text>
            </View>
          )
        }}

        ListFooterComponent={() => {
          return (
            <View style={{ width: '100%', height: 1, backgroundColor: 'white' }} />
          )
        }}
      />
      <Menu navigation={navigation} />
      {
        visible && <View style={styles.modal}>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
            <Text style={styles.text}>ID</Text>
            <View style={styles.btn}>
              <TouchableOpacity
                onPress={() => {
                  handleSortingDesc('id')
                  setVisible(false)
                }}
                style={{ justifyContent: 'space-around', alignItems: 'center', height: 40, width: 60, borderRadius: 5, backgroundColor: '#FECB3E', }}>
                <Text style={styles.text1}>Desc</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handleSortingAsc('id')
                  setVisible(false)
                }}
                style={{ justifyContent: 'space-around', alignItems: 'center', height: 40, width: 60, borderRadius: 5, backgroundColor: '#2653B0', }}>
                <Text style={styles.text1}>Asc</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
            <Text style={styles.text}>TEMPERATURE</Text>
            <View style={styles.btn}>
              <TouchableOpacity
                onPress={() => {
                  handleSortingDesc('temperature')
                  setVisible(false)
                }}
                style={{ justifyContent: 'space-around', alignItems: 'center', height: 40, width: 60, borderRadius: 5, backgroundColor: '#FECB3E', }}>
                <Text style={styles.text1}>Desc</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handleSortingAsc('temperature')
                  setVisible(false)
                }}
                style={{ justifyContent: 'space-around', alignItems: 'center', height: 40, width: 60, borderRadius: 5, backgroundColor: '#2653B0', }}>
                <Text style={styles.text1}>Asc</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
            <Text style={styles.text}>BRIGHTNESS</Text>
            <View style={styles.btn}>
              <TouchableOpacity
                onPress={() => {
                  handleSortingDesc('brightness')
                  setVisible(false)
                }}
                style={{ justifyContent: 'space-around', alignItems: 'center', height: 40, width: 60, borderRadius: 5, backgroundColor: '#FECB3E', }}>
                <Text style={styles.text1}>Desc</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handleSortingAsc('brightness')
                  setVisible(false)
                }}
                style={{ justifyContent: 'space-around', alignItems: 'center', height: 40, width: 60, borderRadius: 5, backgroundColor: '#2653B0', }}>
                <Text style={styles.text1}>Asc</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
            <Text style={styles.text}>HUMIDITY</Text>
            <View style={styles.btn}>
              <TouchableOpacity
                onPress={() => {
                  handleSortingDesc('humidity')
                  setVisible(false)
                }}
                style={{ justifyContent: 'space-around', alignItems: 'center', height: 40, width: 60, borderRadius: 5, backgroundColor: '#FECB3E', }}>
                <Text style={styles.text1}>Desc</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handleSortingAsc('humidity')
                  setVisible(false)
                }}
                style={{ justifyContent: 'space-around', alignItems: 'center', height: 40, width: 60, borderRadius: 5, backgroundColor: '#2653B0', }}>
                <Text style={styles.text1}>Asc</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
            <Text style={styles.text}>DATETIME</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity
                onPress={() => {
                  handleSortingDesc('datetime')
                  setVisible(false)
                }}
                style={{ justifyContent: 'space-around', alignItems: 'center', height: 40, width: 60, borderRadius: 5, backgroundColor: '#FECB3E', }}>
                <Text style={styles.text1}>Desc</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handleSortingAsc('datetime')
                  setVisible(false)
                }}
                style={{ justifyContent: 'space-around', alignItems: 'center', height: 40, width: 60, borderRadius: 5, backgroundColor: '#2653B0', }}>
                <Text style={styles.text1}>Asc</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      }
    </View >
  )
}

export default SensorHistory

const styles = StyleSheet.create({
  btn: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
  text: { flex: 1, color: '#F3485B', fontSize: 15 },
  text1: { color: 'white', fontSize: 15 },
  modal: {
    height: height * .4, width: 250, backgroundColor: 'white', position: 'absolute', top: height * .17, right: 10,
    borderRadius: 20, paddingHorizontal: 10
  },
  txtIn: {
    backgroundColor: '#FECB3E', height: 40, width: 200, borderRadius: 5, paddingHorizontal: 10
  },
  searchBar: {
    height: 50, width: '100%', backgroundColor: 'white', marginVertical: 15, paddingHorizontal: 20,
    borderRadius: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'
  },
  title: {
    width: '100%', height: 50, borderWidth: 1, borderBottomWidth: 0, borderColor: 'white', justifyContent: 'space-around',
    alignItems: 'center', flexDirection: 'row',
  },
  titleTxt: {
    fontSize: 13, color: 'white', paddingLeft: 10
  }
});
