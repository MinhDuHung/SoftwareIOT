import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const InstructionModal = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Searching Instruction</Text>
            <Text style={styles.content}>You can sort the list in descending order (Desc) or ascending (Asc) by ID</Text>
            <Text style={styles.content}>You can sort the list in descending order (Desc) or ascending (Asc) by DateTime</Text>
            <Text style={styles.content}>You can sort the list that displays only the data of FAN or LIGHTS devices</Text>
            <Text style={styles.content}>You can sort the list that displays only data for ON or OFF mode</Text>
            <Text style={styles.content}>You can choose to view the data option: All/Device only/Mode only/Date only</Text>
        </View>
    )
}

export default InstructionModal

const styles = StyleSheet.create({
    title: {
        fontSize: 24, fontWeight: 'bold', color: '#F3485B',
    },
    content: {
        fontSize: 16, fontWeight: 'bold', color: '#2653B0', textAlign: 'center'
    },
    container: {
        height: 400, width: 300, backgroundColor: '#FECB3E', position: "absolute", zIndex: 1,
        top: 140, left: 10, justifyContent: "space-evenly", alignItems: "center", paddingHorizontal: 10,
        elevation: 5

    }
})