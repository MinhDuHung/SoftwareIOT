import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const Popup = ({ setSelection, setIsShowPopup, selectionData }: any) => {

    return (
        <View style={styles.container}>
            {
                selectionData.map((item: any, index: number) => {
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                setSelection(item)
                                setIsShowPopup(false)
                            }}
                            key={index}
                            style={styles.btn}
                        >
                            <Text style={styles.txt}>{item}</Text>
                        </TouchableOpacity>
                    )
                })
            }
        </View>
    )
}

export default Popup

const styles = StyleSheet.create({
    container: {
        paddingVertical:10, width: 130, backgroundColor: 'white', position: 'absolute', top: 110, left: 170, zIndex: 1,
        borderRadius: 20, justifyContent: 'center', alignItems: 'center',gap:10,
    },
    btn: {
        flex: 1
    },
    txt: {
        color: '#2653B0', fontWeight: 'bold'
    }
})