import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const { width, height } = Dimensions.get('window')
const Sensor = ({ value, title }: any) => {
    const backgroundColor = title == 'Tempurature' ? '#F3485B' : (title == "Brightness" ? '#FECB3E' : '#2653B0')
    return (
        <View style={[styles.box, { backgroundColor }]}>
            <Text style={styles.txt}>{title}</Text>
            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.value}>{value}</Text>
                {
                    title == 'Tempurature' ?
                        <MaterialCommunityIcons name='temperature-celsius' color={'white'} size={20} />
                        : (title == "Humidity" ? <MaterialCommunityIcons name='water-percent' color={'white'} size={30} /> :
                            <MaterialCommunityIcons name='brightness-7' color={'white'} size={20} />)
                }
            </View>

        </View>
    )
}

export default memo(Sensor)

const styles = StyleSheet.create({
    box: {
        width: width / 3 - 20, height: 120, borderRadius: 10, justifyContent: 'center', alignItems: 'center'
    },
    txt: {
        fontSize: 16, color: 'white'
    },
    value: {
        fontSize: 24, color: 'white', fontWeight: 'bold'
    },
})