import { ActivityIndicator, Dimensions, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { FlashList } from '@shopify/flash-list'
import axios from 'axios'
import { getAllSensorsApi, handleSortingAscDescApi } from '../utils/API/sensorApi'

const { width, height } = Dimensions.get("window")

const SensorHistoryBody = React.forwardRef(({ page, number, data, isLoading, setpage, viewOptions, }: any, ref: any) => {

    return (
        <View style={styles.container}>
            <FlashList
                data={data}
                keyExtractor={(item, index) => (index).toString()}
                estimatedItemSize={height * 0.5}
                ref={ref}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
                renderItem={({ item, index }: any) => {
                    return (
                        <View style={styles.page}>
                            <FlatList
                                data={item}
                                scrollEnabled={false}
                                keyExtractor={(item, index) => index.toString()}

                                ListHeaderComponent={() => {
                                    return (
                                        <View style={styles.title}>
                                            <Text style={[styles.titleTxt, { flex: 1 }]}>ID</Text>
                                            {(viewOptions == 'All' || viewOptions == "Temperature") && <Text style={[styles.titleTxt, { flex: 1 }]}>TEMP</Text>}
                                            {(viewOptions == 'All' || viewOptions == "Brightness") && <Text style={[styles.titleTxt, { flex: 1 }]}>BRIG</Text>}
                                            {(viewOptions == 'All' || viewOptions == "Humidity") && <Text style={[styles.titleTxt, { flex: 1 }]}>HUMI</Text>}
                                            {(viewOptions == 'All' || viewOptions == "Date") && <Text style={[styles.titleTxt, { flex: 2 }]}>DATETIME</Text>}
                                        </View>
                                    )
                                }}

                                renderItem={({ item, index }: any) => {
                                    return (
                                        <View style={styles.title}>
                                            <Text style={[styles.titleTxt, { flex: 1 }]}>{item.id}</Text>
                                            {(viewOptions == 'All' || viewOptions == "Temperature") && <Text style={[styles.titleTxt, { flex: 1 }]}>{item.temperature}</Text>}
                                            {(viewOptions == 'All' || viewOptions == "Brightness") && <Text style={[styles.titleTxt, { flex: 1 }]}>{item.brightness}</Text>}
                                            {(viewOptions == 'All' || viewOptions == "Humidity") && <Text style={[styles.titleTxt, { flex: 1 }]}>{item.humidity}</Text>}
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
                    )
                }}

            />

            {
                isLoading && <ActivityIndicator size={30} color={'red'} />
            }
        </View>
    );
});


export default SensorHistoryBody

const styles = StyleSheet.create({
    container: {
        width: width - 20, height: height * .7,
    },
    page: {
        width: width - 20, height: height * .7,
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
        fontSize: 12, color: 'white', borderRightWidth: 1, height: '100%', borderColor: 'white', textAlign: 'center',
        textAlignVertical: 'center'
    }
})