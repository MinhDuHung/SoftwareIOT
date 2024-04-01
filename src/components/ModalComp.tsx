import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux'
import { CHANGE_FILTER_STATE } from '../utils/actions'
const { width, height } = Dimensions.get("window")
const ModalComp = ({ handleSorting, setVisible, setViewOptions, handleSortingChosenOne, number, setpage }: any) => {
    const dispatch = useDispatch()
    return (
        <View style={styles.modal}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                <Text style={styles.text}>ID</Text>
                <View style={styles.btn}>
                    <TouchableOpacity
                        onPress={() => {
                            number.current = 1
                            handleSorting('id', 'DESC')
                            dispatch({ type: CHANGE_FILTER_STATE, payload: { type: 'id', sortType: 'DESC' } })
                            setVisible(false)
                            setpage(0)
                        }}
                        style={{ justifyContent: 'space-around', alignItems: 'center', height: 40, width: 60, borderRadius: 5, backgroundColor: '#FECB3E', }}>
                        <Text style={styles.text1}>Desc</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            number.current = 1
                            handleSorting('id', "ASC")
                            dispatch({ type: CHANGE_FILTER_STATE, payload: { type: 'id', sortType: 'ASC' } })
                            setVisible(false)
                            setpage(0)
                        }}
                        style={{ justifyContent: 'space-around', alignItems: 'center', height: 40, width: 60, borderRadius: 5, backgroundColor: '#2653B0', }}>
                        <Text style={styles.text1}>Asc</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                <Text style={styles.text}>DEVICE</Text>
                <View style={styles.btn}>
                    <TouchableOpacity
                        onPress={() => {
                            number.current = 1
                            handleSortingChosenOne('device', '1')
                            dispatch({ type: CHANGE_FILTER_STATE, payload: { type: 'device', action: '1' } })
                            setVisible(false)
                            setpage(0)
                        }}
                        style={{ justifyContent: 'space-around', alignItems: 'center', height: 40, width: 60, borderRadius: 5, backgroundColor: '#FECB3E', }}>
                        <Text style={styles.text1}>Fan</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            number.current = 1
                            handleSortingChosenOne('device', '0')
                            dispatch({ type: CHANGE_FILTER_STATE, payload: { type: 'device', action: '0' } })
                            setVisible(false)
                            setpage(0)
                        }}
                        style={{ justifyContent: 'space-around', alignItems: 'center', height: 40, width: 60, borderRadius: 5, backgroundColor: '#2653B0', }}>
                        <Text style={styles.text1}>Light</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                <Text style={styles.text}>MODE</Text>
                <View style={styles.btn}>
                    <TouchableOpacity
                        onPress={() => {
                            number.current = 1
                            dispatch({ type: CHANGE_FILTER_STATE, payload: { type: 'mode', action: '1' } })
                            handleSortingChosenOne('mode', '1')
                            setVisible(false)
                            setpage(0)
                        }}
                        style={{ justifyContent: 'space-around', alignItems: 'center', height: 40, width: 60, borderRadius: 5, backgroundColor: '#FECB3E', }}>
                        <Text style={styles.text1}>On</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            number.current = 1
                            dispatch({ type: CHANGE_FILTER_STATE, payload: { type: 'mode', action: '0' } })
                            handleSortingChosenOne('mode', '0')
                            setVisible(false)
                            setpage(0)
                        }}
                        style={{ justifyContent: 'space-around', alignItems: 'center', height: 40, width: 60, borderRadius: 5, backgroundColor: '#2653B0', }}>
                        <Text style={styles.text1}>Off</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                <Text style={styles.text}>DATETIME</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={() => {
                            number.current = 1
                            dispatch({ type: CHANGE_FILTER_STATE, payload: { type: 'datetime', sortType: 'DESC' } })
                            handleSorting('datetime', "DESC")
                            setVisible(false)
                            setpage(0)
                        }}
                        style={{ justifyContent: 'space-around', alignItems: 'center', height: 40, width: 60, borderRadius: 5, backgroundColor: '#FECB3E', }}>
                        <Text style={styles.text1}>Desc</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            number.current = 1
                            dispatch({ type: CHANGE_FILTER_STATE, payload: { type: 'datetime', sortType: 'ASC' } })
                            handleSorting('datetime', 'ASC')
                            setVisible(false)
                            setpage(0)
                        }}
                        style={{ justifyContent: 'space-around', alignItems: 'center', height: 40, width: 60, borderRadius: 5, backgroundColor: '#2653B0', }}>
                        <Text style={styles.text1}>Asc</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ flex: 3, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderTopWidth: 2, borderTopColor: 'blue' }}>
                <Text style={styles.text}>VIEW OPTIONS</Text>
                <View style={{ alignItems: 'center', justifyContent: 'space-around', height: '100%' }}>
                    <TouchableOpacity
                        onPress={() => {
                            setVisible(false)
                            setViewOptions("All")
                        }}
                        style={{ justifyContent: 'space-around', alignItems: 'center', height: 30, width: 60, borderRadius: 5, backgroundColor: '#FECB3E', }}>
                        <Text style={styles.text1}>All</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            setVisible(false)
                            setViewOptions("Device")
                        }}
                        style={{ justifyContent: 'space-around', alignItems: 'center', height: 30, width: 90, borderRadius: 5, backgroundColor: '#2653B0', }}>
                        <Text style={styles.text1}>Device only</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            setVisible(false)
                            setViewOptions("Mode")
                        }}
                        style={{ justifyContent: 'space-around', alignItems: 'center', height: 30, width: 90, borderRadius: 5, backgroundColor: '#2653B0', }}>
                        <Text style={styles.text1}>Mode only</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            setVisible(false)
                            setViewOptions("Date")
                        }}
                        style={{ justifyContent: 'space-around', alignItems: 'center', height: 30, width: 90, borderRadius: 5, backgroundColor: '#2653B0', }}>
                        <Text style={styles.text1}>Date only</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default ModalComp

const styles = StyleSheet.create({
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
        width: width - 20, height: 50, borderWidth: 1, borderBottomWidth: 0, borderColor: 'white', justifyContent: 'space-around',
        alignItems: 'center', flexDirection: 'row',
    },
    titleTxt: {
        fontSize: 13, color: 'white', borderRightWidth: 1, height: '100%', borderColor: 'white', textAlign: 'center', paddingTop: 14
    }
})