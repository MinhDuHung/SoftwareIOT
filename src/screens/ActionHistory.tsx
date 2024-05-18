import { ActivityIndicator, Dimensions, FlatList, Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Menu from '../components/Menu';
import Ionicons from 'react-native-vector-icons/Ionicons'
import axios from 'axios';
import { getAllActionsApi, handleSearchByCharactersApi, handleSortingAscDescApi, handleSortingChosenOneApi } from '../utils/API/actionApi';
import ModalComp from '../components/ActionModal';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux'
import ActionHistoryBody from '../components/ActionHistoryBody';
import { FlashList } from '@shopify/flash-list';
import InstructionModal from '../components/InstructionModal';
import { CHANGE_FILTER_STATE } from '../redux/actionType/actions';
import Popup from '../components/Popup';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const { width, height } = Dimensions.get("window")

const ActionHistory = ({ navigation }: any) => {

  const [data, setData] = useState<any>([])
  const [visible, setVisible] = useState(false)
  const [selection, setSelection] = useState<string>('None')
  const [isShowPopup, setIsShowPopup] = useState<boolean>(false)
  const [text, setText] = useState('')
  const [page, setpage] = useState(0)
  const [openInstruction, setOpenInstruction] = useState(false)
  const [viewOptions, setViewOptions] = useState('All')
  const numberOfQueries = useRef(1)
  const filterReducer = useSelector((state: any) => state.filterReducer)
  const ref = useRef<FlashList<any>>(null)
  const dispatch = useDispatch()
  const selectionData = ['None', 'Device', 'Id', 'Mode', 'Datetime']

  const getActionData = async () => {
    try {
      if (!filterReducer.filter.type) {
        const result = await axios.get(getAllActionsApi, {
          params: {
            numberOfQueries: numberOfQueries.current,
          }
        })

        if (result.status == 200) {
          setData([...data, ...result.data])
        }
      } else if (filterReducer.filter.sortType) {
        await _handleSorting(filterReducer.filter.type, filterReducer.filter.sortType)
      } else if (filterReducer.filter.action) {
        await _handleSortingChosenOne(filterReducer.filter.type, filterReducer.filter.action)
      } else {
        await _handleSearchByCharacters()
      }
    } catch (error) {
      console.error('error get action data ', error)
    }
  }

  useEffect(() => {
    getActionData()
  }, [])

  const handleOpenInstruction = () => {
    setOpenInstruction(pre => !pre)
  }

  const handleSortingChosenOne = async (type: string, action: string) => {
    try {
      const respone = await axios.get(handleSortingChosenOneApi, {
        params: {
          type,
          numberOfQueries: numberOfQueries.current,
          action
        }
      })
      if (respone.status == 200) {
        setData(respone.data)
        numberOfQueries.current = 1
        ref.current?.scrollToIndex({ animated: false, index: 0 })
        setpage(0)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const _handleSortingChosenOne = async (type: string, action: string) => {
    try {
      const respone = await axios.get(handleSortingChosenOneApi, {
        params: {
          type,
          numberOfQueries: numberOfQueries.current,
          action
        }
      })
      if (respone.status == 200) {
        setData([...data, ...respone.data])
      }
    } catch (error) {
      console.log(error)
    }
  }


  const handleSorting = async (type: string, sortType: string) => {

    try {
      const respone = await axios.get(handleSortingAscDescApi, {
        params: {
          type: type,
          sortType,
          numberOfQueries: numberOfQueries.current
        }
      })
      if (respone.status == 200) {
        setData(respone.data)
        setpage(0)
        ref.current?.scrollToIndex({ animated: false, index: 0 })
        numberOfQueries.current = 1
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
          numberOfQueries: numberOfQueries.current
        }
      })
      if (respone.status == 200) {
        setData([...data, ...respone.data])
      }
    } catch (error) {
      console.log(error)
    }

  };


  const handlePaging = async () => {

    if (data.length == 1 + page && data[data.length - 1].length == 12) {
      numberOfQueries.current++
      await getActionData()
      ref.current?.scrollToIndex({ animated: true, index: page + 1 })
      setpage(page + 1)
    } else if (page + 1 < data.length) {
      setpage(page + 1)
      ref.current?.scrollToIndex({ animated: true, index: page + 1 })
    }
  }

  async function handleSearchByCharacters() {
    dispatch({ type: CHANGE_FILTER_STATE, payload: { type: 'keyword', keyword: text, field: selection === 'None' ? '' : selection } })
    try {
      const respone = await axios.get(handleSearchByCharactersApi, {
        params: {
          keyword: text,
          numberOfQueries: 1,
          field: selection === 'None' ? '' : selection
        }
      })
      if (respone.status == 200) {
        setData(respone.data)
        setpage(0)
        ref.current?.scrollToIndex({ animated: false, index: 0 })
        numberOfQueries.current = 1
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function _handleSearchByCharacters() {
    try {
      const respone = await axios.get(handleSearchByCharactersApi, {
        params: {
          keyword: text,
          numberOfQueries: numberOfQueries.current,
          field: selection === 'None' ? '' : selection
        }
      })
      if (respone.status == 200) {
        setData([...data, ...respone.data])
      }
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <View style={{ flex: 1, backgroundColor: '#2653B0', padding: 10 }}>

      <View style={{ width, flexDirection: 'row', justifyContent: "space-around" }}>
        <Text style={{ color: 'white', fontSize: 30, fontWeight: 'bold' }}>ACTION HISTORY</Text>
        <TouchableOpacity
          onPress={() => handleOpenInstruction()}
          style={{ height: 40, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 5, }}>
          <Ionicons name='help-circle' color={'#F3485B'} size={40} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchBar}>

        <TextInput
          value={text}
          onChangeText={t => setText(t)}
          placeholder='Search'
          style={styles.txtIn} />

        <Pressable
          onPress={() => setIsShowPopup(pre => !pre)}
          style={styles.popup}>
          <Text style={styles.popupTxt}>{selection}</Text>
          <FontAwesome name='chevron-down' size={16} color={'white'} />
        </Pressable>

        <TouchableOpacity
          onPress={() => handleSearchByCharacters()}
          style={{ height: 40, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 5, }}>
          <Ionicons name='search' color={'white'} size={30} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setVisible(!visible)}
          style={{ height: 40, width: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 5, }}>
          <Ionicons name='filter' color={'white'} size={40} />
        </TouchableOpacity>
      </View>

      {
        openInstruction && <InstructionModal />
      }
      {
        isShowPopup && <Popup setSelection={setSelection} setIsShowPopup={setIsShowPopup} selectionData={selectionData} />
      }

      <View style={{ flex: 1 }}>
        {data.length > 0 && <ActionHistoryBody ref={ref} data={data} viewOptions={viewOptions} />}
      </View>

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

      <Menu navigation={navigation} screen={'ActionHistory'} />
      {
        visible && <ModalComp handleSorting={handleSorting} setVisible={setVisible} setViewOptions={setViewOptions}
          handleSortingChosenOne={handleSortingChosenOne} numberOfQueries={numberOfQueries} />
      }
    </View >
  )
}

export default ActionHistory

const styles = StyleSheet.create({
  popup: {
    justifyContent: 'space-around', alignItems: 'center', height: 30, width: 100, borderRadius: 5, backgroundColor: '#FECB3E',
    flexDirection: 'row'
  },
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
  popupTxt: { color: '#F3485B', fontSize: 14, fontWeight: 'bold' },
  txtIn: {
    backgroundColor: 'white', height: 40, width: 150, borderRadius: 10, paddingHorizontal: 10
  },
  searchBar: {
    height: 50, width: '100%', marginVertical: 15,
    borderRadius: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'
  },
  title: {
    width: width - 20, height: 40, borderWidth: 1, borderBottomWidth: 0, borderColor: 'white', justifyContent: 'space-around',
    alignItems: 'center', flexDirection: 'row',
  },
  titleTxt: {
    fontSize: 13, color: 'white', borderRightWidth: 1, height: '100%', borderColor: 'white', textAlign: 'center', paddingTop: 10
  }
})
