import {
  Dimensions,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Menu from '../components/Menu';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SensorHistoryBody from '../components/SensorHistoryBody';
import {FlashList} from '@shopify/flash-list';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {
  getAllSensorsApi,
  handleSearchByCharactersApi,
  handleSortingAscDescApi,
} from '../utils/API/sensorApi';
import _ from 'lodash';
import SensorInstruction from '../components/SensorInstruction';
import SensorModal from '../components/SensorModal';
import {CHANGE_SENSOR_FILTER_STATE} from '../redux/actionType/actions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Popup from '../components/Popup';
import InstructionModal from '../components/InstructionModal';
const {width, height} = Dimensions.get('window');

const SensorHistory = ({navigation}: any) => {
  const [visible, setVisible] = useState(false);
  const numberOfQueries = useRef(1);
  const [text, setText] = useState('');
  const [page, setpage] = useState(0);
  const [openInstruction, setOpenInstruction] = useState(false);
  const [viewOptions, setViewOptions] = useState('All');
  const [selection, setSelection] = useState<string>('None');
  const [isShowPopup, setIsShowPopup] = useState<boolean>(false);
  const ref = useRef<FlashList<any>>(null);
  const {filter, isLoading} = useSelector(
    (state: any) => state.sensorFilterReducer,
  );
  const [data, setData] = useState<any>([]);
  const dispatch = useDispatch();
  const selectionData = [
    'None',
    'Id',
    'Temperature',
    'Humidity',
    'Brightness',
    'Extra',
    'Datetime',
  ];

  const getSensorData = async () => {
    try {
      if (!filter.type) {
        const result = await axios.get(getAllSensorsApi, {
          params: {
            numberOfQueries: numberOfQueries.current,
          },
        });

        if (result.status == 200) {
          setData([...data, ...result.data]);
        }
      } else if (filter.sortType) {
        await _handleSorting(filter.type, filter.sortType);
      } else {
        await _handleSearchByCharacters();
      }
    } catch (error) {
      console.error('error get action data ', error);
    }
  };

  useEffect(() => {
    getSensorData();
  }, []);

  const handleSorting = async (type: string, sortType: string) => {
    try {
      const respone = await axios.get(handleSortingAscDescApi, {
        params: {
          type: type,
          sortType,
          numberOfQueries: numberOfQueries.current,
        },
      });
      if (respone.status == 200) {
        setData(respone.data);
        setpage(0);
        ref.current?.scrollToIndex({animated: false, index: 0});
        numberOfQueries.current = 1;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const _handleSorting = async (type: string, sortType: string) => {
    try {
      const respone = await axios.get(handleSortingAscDescApi, {
        params: {
          type: type,
          sortType,
          numberOfQueries: numberOfQueries.current,
        },
      });
      if (respone.status == 200) {
        setData([...data, ...respone.data]);
        setpage(0);
        ref.current?.scrollToIndex({animated: true, index: page + 1});
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenInstruction = () => {
    setOpenInstruction(pre => !pre);
  };
  const handlePaging = async () => {
    if (data.length == 1 + page && data[data.length - 1].length == 12) {
      numberOfQueries.current++;
      await getSensorData();
      ref.current?.scrollToIndex({animated: true, index: page + 1});
      setpage(page + 1);
    } else if (page + 1 < data.length) {
      setpage(page + 1);
      ref.current?.scrollToIndex({animated: true, index: page + 1});
    }
  };

  async function handleSearchByCharacters() {
    dispatch({
      type: CHANGE_SENSOR_FILTER_STATE,
      payload: {
        type: 'keyword',
        keyword: text,
        field: selection === 'None' ? '' : selection,
      },
    });
    try {
      const respone = await axios.get(handleSearchByCharactersApi, {
        params: {
          keyword: text,
          numberOfQueries: 1,
          field: selection === 'None' ? '' : selection,
        },
      });
      if (respone.status == 200) {
        setData(respone.data);
        setpage(0);
        ref.current?.scrollToIndex({animated: false, index: 0});
        numberOfQueries.current = 1;
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function _handleSearchByCharacters() {
    try {
      const respone = await axios.get(handleSearchByCharactersApi, {
        params: {
          keyword: text,
          numberOfQueries: numberOfQueries.current,
          field: selection === 'None' ? '' : selection,
        },
      });
      if (respone.status == 200) {
        setData([...data, ...respone.data]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={{flex: 1, backgroundColor: '#2653B0', padding: 10}}>
      <View
        style={{width, flexDirection: 'row', justifyContent: 'space-around'}}>
        <Text style={{color: 'white', fontSize: 30, fontWeight: 'bold'}}>
          SENSOR HISTORY
        </Text>
        <TouchableOpacity
          onPress={() => handleOpenInstruction()}
          style={{
            height: 40,
            width: 50,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
          }}>
          <Ionicons name="help-circle" color={'#F3485B'} size={40} />
        </TouchableOpacity>
      </View>
      <View style={styles.searchBar}>
        <TextInput
          value={text}
          onChangeText={t => setText(t)}
          placeholder="Search"
          style={styles.txtIn}
        />

        <Pressable
          onPress={() => setIsShowPopup(pre => !pre)}
          style={styles.popup}>
          <Text style={styles.popupTxt}>{selection}</Text>
          <FontAwesome name="chevron-down" size={16} color={'white'} />
        </Pressable>

        <TouchableOpacity
          onPress={() => handleSearchByCharacters()}
          style={{
            height: 40,
            width: 50,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
          }}>
          <Ionicons name="search" color={'white'} size={30} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setVisible(!visible)}
          style={{
            height: 40,
            width: 50,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
          }}>
          <Ionicons name="filter" color={'white'} size={40} />
        </TouchableOpacity>
      </View>

      {openInstruction && <InstructionModal />}
      {isShowPopup && (
        <Popup
          setSelection={setSelection}
          setIsShowPopup={setIsShowPopup}
          selectionData={selectionData}
        />
      )}
      {data.length > 0 && (
        <SensorHistoryBody
          page={page}
          data={data}
          isLoading={isLoading}
          viewOptions={viewOptions}
          setpage={setpage}
          numberOfQueries={numberOfQueries}
          ref={ref}
        />
      )}
      {visible && (
        <SensorModal
          handleSorting={handleSorting}
          setVisible={setVisible}
          setViewOptions={setViewOptions}
          numberOfQueries={numberOfQueries}
        />
      )}

      <View
        style={{
          position: 'absolute',
          flexDirection: 'row',
          bottom: 20,
          right: 20,
          gap: 10,
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={_.debounce(() => {
            if (page > 0) {
              setpage(page - 1);
              ref.current?.scrollToIndex({animated: true, index: page - 1}),
                200;
            }
          })}
          style={styles.pagingBtn}>
          <View style={{width: 15, height: 3, backgroundColor: 'white'}} />
        </TouchableOpacity>
        <Text style={{color: 'white', fontSize: 20, fontStyle: 'italic'}}>
          {page + 1}
        </Text>
        <TouchableOpacity
          onPress={_.debounce(() => {
            handlePaging(), 200;
          })}
          style={styles.pagingBtn}>
          <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
            +
          </Text>
        </TouchableOpacity>
      </View>

      <Menu navigation={navigation} />
    </View>
  );
};

export default SensorHistory;

const styles = StyleSheet.create({
  popupTxt: {color: '#F3485B', fontSize: 14, fontWeight: 'bold'},
  popup: {
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 30,
    width: 100,
    borderRadius: 5,
    backgroundColor: '#FECB3E',
    flexDirection: 'row',
  },
  pagingBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    width: 30,
    borderRadius: 5,
    backgroundColor: '#FECB3E',
  },
  btn: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  text: {flex: 1, color: '#F3485B', fontSize: 15},
  text1: {color: 'white', fontSize: 15},
  modal: {
    height: height * 0.4,
    width: 250,
    backgroundColor: 'white',
    position: 'absolute',
    top: height * 0.17,
    right: 10,
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  txtIn: {
    backgroundColor: 'white',
    height: 40,
    width: 150,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  searchBar: {
    height: 50,
    width: '100%',
    marginVertical: 15,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    width: width - 20,
    height: 40,
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
    paddingTop: 10,
  },
});
