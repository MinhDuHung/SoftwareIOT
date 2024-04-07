import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const SensorInstruction = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Searching Instruction</Text>
            <Text style={styles.content}>You can sort the list in descending order (Desc) or ascending (Asc) by ID</Text>
            <Text style={styles.content}>You can sort the list in descending order (Desc) or ascending (Asc) by TEMPERATURE</Text>
            <Text style={styles.content}>You can sort the list in descending order (Desc) or ascending (Asc) by BRIGHTNESS</Text>
            <Text style={styles.content}>You can sort the list in descending order (Desc) or ascending (Asc) by HUMIDITY</Text>
            <Text style={styles.content}>You can sort the list in descending order (Desc) or ascending (Asc) by DATETIME</Text>

            <Text style={styles.content}>You can choose to view the data option: All/ TEMPERATURE only/ BRIGHTNESS only/ HUMIDITY only/ DATETIME only</Text>
        </View>
    )
}

export default SensorInstruction

const styles = StyleSheet.create({
    title: {
        fontSize: 24, fontWeight: 'bold', color: '#F3485B',
    },
    content: {
        fontSize: 16, fontWeight: 'bold', color: '#2653B0', textAlign: 'center'
    },
    container: {
        height: 450, width: 300, backgroundColor: '#FECB3E', position: "absolute", zIndex: 1,
        top: 140, left: 10, justifyContent: "space-evenly", alignItems: "center", paddingHorizontal: 10,
        elevation: 5

    }
})