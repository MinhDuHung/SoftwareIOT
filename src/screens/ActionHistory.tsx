import { Dimensions, FlatList, Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Menu from '../components/Menu';
import Ionicons from 'react-native-vector-icons/Ionicons'
import axios from 'axios';
import { getAllActionsApi, handleSortingAscApi, handleSortingChosenOneApi } from '../utils/API/actionApi';
import ModalComp from '../components/ModalComp';
import _ from 'lodash';
const { width, height } = Dimensions.get("window")

const ActionHistory = ({ navigation }: any) => {
  const [data, setData] = useState<any>([]);
  const [text, setText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [page, setpage] = useState(0)
  const [viewOptions, setViewOptions] = useState('All')
  const number = useRef(1)

  const getActionData = async () => {
    try {
      const result = await axios.get(getAllActionsApi, {
        params: {
          number: number.current
        }
      })
      if (result.status == 200) {
        setData((result.data))
      }
    } catch (error) {
      console.error('error get action data ', error)
    }
  };

  useEffect(() => {
    getActionData()
  }, [])

  const handleSearching = () => {
    if (text == '') {
      getActionData()
      return
    }
    const filteredData = data.filter((item: any) => {
      const searchTermLower = text.toLowerCase();
      return (
        item.id.toString().includes(searchTermLower) ||
        item.device.toString().includes(searchTermLower) ||
        item.mode.toString().includes(searchTermLower) ||
        item.datetime.toLowerCase().includes(searchTermLower)
      );
    });
    setText('')
    setData(filteredData)
  }

  const handleSortingChosenOne = async (type: string, action: string) => {
    number.current = 1
    try {
      const respone = await axios.get(handleSortingChosenOneApi, {
        params: {
          type,
          number: number.current,
          action
        }
      })
      if (respone.status == 200) {
        setData(respone.data)
        setpage(0)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleSorting = async (type: string, sortType: string) => {
    number.current = 1
    try {
      const respone = await axios.get(handleSortingAscApi, {
        params: {
          type: type,
          sortType,
          number: number.current
        }
      })
      if (respone.status == 200) {
        setData(respone.data)
        setpage(0)
      }
    } catch (error) {
      console.log(error)
    }

  };

  const handlePaging = async (action: string) => {
    if (action === 'plus' && (page + 1) % 5 == 0 && data[4].length == 12) {
      number.current++;
      await getActionData()
      setpage(pre => pre + 1)
    } else if (action === 'plus' && data[page % 5].length == 12) {
      setpage(pre => pre + 1)
    } else if (action === 'minus' && (page) % 5 == 0 && page > 0) {
      number.current--
      await getActionData()
      setpage(pre => pre - 1)
    } else if (action === 'minus' && page >= 1) {
      setpage(pre => pre - 1)
    }
  }
  return (
    <View style={{ flex: 1, backgroundColor: '#2653B0', padding: 10 }}>
      <Text style={{ color: 'white', fontSize: 40, fontWeight: 'bold' }}>ACTION HISTORY</Text>
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

      <View style={{ flex: 1 }}>
        <View style={styles.page}>
          <FlatList
            data={data[(page) % 5]}
            keyExtractor={(item, index) => index.toString()}
            ListHeaderComponent={() => {
              return (
                <View style={styles.title}>
                  <Text style={[styles.titleTxt, { flex: 1 }]}>ID</Text>
                  {(viewOptions == 'All' || viewOptions == "Device") && <Text style={[styles.titleTxt, { flex: 1 }]}>DEVICE</Text>}
                  {(viewOptions == 'All' || viewOptions == "Mode") && <Text style={[styles.titleTxt, { flex: 1 }]}>MODE</Text>}
                  {(viewOptions == 'All' || viewOptions == "Date") && <Text style={[styles.titleTxt, { flex: 2 }]}>DATETIME</Text>}
                </View>
              )
            }}
            renderItem={({ item, index }) => {
              return (
                <View style={styles.title}>
                  <Text style={[styles.titleTxt, { flex: 1 }]}>{item.id}</Text>
                  {(viewOptions == 'All' || viewOptions == "Device") && <Text style={[styles.titleTxt, { flex: 1 }]}>{item.device == 1 ? 'Fan' : 'Light'}</Text>}
                  {(viewOptions == 'All' || viewOptions == "Mode") && <Text style={[styles.titleTxt, { flex: 1 }]}>{item.mode == 1 ? 'On' : 'Off'}</Text>}
                  {(viewOptions == 'All' || viewOptions == "Date") && <Text style={[styles.titleTxt, { flex: 2 }]}>{item.datetime}</Text>}
                </View>
              )
            }}
            ListFooterComponent={() => {
              return (
                <View style={{ width: '100%', height: 1, backgroundColor: 'white' }} />
              )
            }}
          />
        </View>
      </View>

      <View style={{ position: 'absolute', flexDirection: 'row', bottom: 20, right: 20, gap: 10, alignItems: 'center' }}>
        <TouchableOpacity
          onPress={_.debounce(() => handlePaging('minus'), 200)}
          style={styles.pagingBtn}
        >
          <View style={{ width: 15, height: 3, backgroundColor: 'white' }} />
        </TouchableOpacity>
        <Text style={{ color: 'white', fontSize: 20, fontStyle: 'italic' }}>{page + 1}</Text>
        <TouchableOpacity
          onPress={_.debounce(() => handlePaging('plus'), 200)}
          style={styles.pagingBtn}
        >
          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>+</Text>
        </TouchableOpacity>
      </View>

      <Menu navigation={navigation} screen={'ActionHistory'} />
      {
        visible && <ModalComp handleSorting={handleSorting} setVisible={setVisible} setViewOptions={setViewOptions} handleSortingChosenOne={handleSortingChosenOne} />
      }
    </View >
  )
}

export default ActionHistory

const styles = StyleSheet.create({
  page: {
    width: width - 20, height: height * .7
  },
  pagingBtn: {
    justifyContent: 'center', alignItems: 'center', height: 30, width: 30, borderRadius: 5, backgroundColor: '#FECB3E'
  },
  btn: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
  text: { flex: 1, color: '#F3485B', fontSize: 15 },
  text1: { color: 'white', fontSize: 15 },
  modal: {
    height: height * .5, width: 250, backgroundColor: 'white', position: 'absolute', top: height * .17, right: 10,
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
    width: width - 20, height: 40, borderWidth: 1, borderBottomWidth: 0, borderColor: 'white', justifyContent: 'space-around',
    alignItems: 'center', flexDirection: 'row',
  },
  titleTxt: {
    fontSize: 13, color: 'white', borderRightWidth: 1, height: '100%', borderColor: 'white', textAlign: 'center', paddingTop: 10
  }
});
