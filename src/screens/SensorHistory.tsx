import { Dimensions, FlatList, Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Menu from '../components/Menu';
import Ionicons from 'react-native-vector-icons/Ionicons'
import SensorHistoryBody from '../components/SensorHistoryBody';
import { FlashList } from '@shopify/flash-list';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { getAllSensorsApi, handleSortingAscDescApi } from '../utils/API/sensorApi';
import _ from 'lodash';
import SensorInstruction from '../components/SensorInstruction';
import SensorModal from '../components/SensorModal';
const { width, height } = Dimensions.get("window")

const SensorHistory = ({ navigation }: any) => {
  const [visible, setVisible] = useState(false)
  const number = useRef(1)
  const [page, setpage] = useState(0)
  const [openInstruction, setOpenInstruction] = useState(false)
  const [viewOptions, setViewOptions] = useState('All')
  const ref = useRef<FlashList<any>>(null)
  const { filter, isLoading } = useSelector((state: any) => state.sensorFilterReducer)
  const [data, setData] = useState<any>([])

  const getSensorData = async () => {
    try {
      if (!filter.type) {
        const result = await axios.get(getAllSensorsApi, {
          params: {
            number: number.current,
          }
        })

        if (result.status == 200) {
          setData([...data, ...result.data])
        }
      } else if (filter.sortType) {
        await _handleSorting(filter.type, filter.sortType)
      }
    } catch (error) {
      console.error('error get action data ', error)
    }
  }

  useEffect(() => {
    getSensorData()
  }, [])

  const handleSorting = async (type: string, sortType: string) => {

    try {
      const respone = await axios.get(handleSortingAscDescApi, {
        params: {
          type: type,
          sortType,
          number: number.current
        }
      })
      if (respone.status == 200) {
        setData(respone.data)
        setpage(0)
        ref.current?.scrollToIndex({ animated: false, index: 0 })
        number.current = 1
      }
    } catch (error) {
      console.log(error)
    }

  };

  const _handleSorting = async (type: string, sortType: string) => {

    try {
      const respone = await axios.get(handleSortingAscDescApi, {
        params: {
          type: type,
          sortType,
          number: number.current
        }
      })
      if (respone.status == 200) {
        setData([...data, ...respone.data])
        setpage(0)
        ref.current?.scrollToIndex({ animated: true, index: page + 1 })
      }
    } catch (error) {
      console.log(error)
    }

  };

  const handleOpenInstruction = () => {
    setOpenInstruction(pre => !pre)
  }
  const handlePaging = async () => {

    if (data.length == 1 + page && data[data.length - 1].length == 12) {
      number.current++
      await getSensorData()
      ref.current?.scrollToIndex({ animated: true, index: page + 1 })
      setpage(page + 1)
    } else if (page + 1 < data.length) {
      setpage(page + 1)
      ref.current?.scrollToIndex({ animated: true, index: page + 1 })
    }

  }
  return (
    <View style={{ flex: 1, backgroundColor: '#2653B0', padding: 10 }}>
      <Text style={{ color: 'white', fontSize: 40, fontWeight: 'bold' }}>SENSOR HISTORY</Text>
      <View style={styles.searchBar}>
        <TouchableOpacity
          onPress={() => handleOpenInstruction()}
          style={{ height: 40, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 5, }}>
          <Ionicons name='help-circle' color={'#F3485B'} size={40} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setVisible(!visible)}
          style={{ height: 40, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 5, }}>
          <Ionicons name='filter' color={'#F3485B'} size={40} />
        </TouchableOpacity>
      </View>

      {
        openInstruction && <SensorInstruction />
      }
      <SensorHistoryBody page={page} data={data} isLoading={isLoading} viewOptions={viewOptions} setpage={setpage} number={number} ref={ref} />
      {
        visible && <SensorModal handleSorting={handleSorting} setVisible={setVisible} setViewOptions={setViewOptions} number={number} />
      }

      <View style={{ position: 'absolute', flexDirection: 'row', bottom: 20, right: 20, gap: 10, alignItems: 'center' }}>
        <TouchableOpacity
          onPress={_.debounce(() => {
            if (page > 0) {
              setpage(page - 1)
              ref.current?.scrollToIndex({ animated: true, index: page - 1 }), 200
            }
          })}
          style={styles.pagingBtn}
        >
          <View style={{ width: 15, height: 3, backgroundColor: 'white' }} />
        </TouchableOpacity>
        <Text style={{ color: 'white', fontSize: 20, fontStyle: 'italic' }}>{page + 1}</Text>
        <TouchableOpacity
          onPress={_.debounce(() => {
            handlePaging(), 200
          })}
          style={styles.pagingBtn}
        >
          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>+</Text>
        </TouchableOpacity>
      </View>

      <Menu navigation={navigation} />

    </View >
  )
}

export default SensorHistory

const styles = StyleSheet.create({
  pagingBtn: {
    justifyContent: 'center', alignItems: 'center', height: 30, width: 30, borderRadius: 5, backgroundColor: '#FECB3E'
  },
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
