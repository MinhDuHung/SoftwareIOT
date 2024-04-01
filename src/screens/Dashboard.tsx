import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ModeController from '../components/ModeController'
import BodyDashboard from '../components/BodyDashBoard'
import Warning from '../components/Warning'
import Menu from '../components/Menu'
import WebViewChart from '../components/WebViewChart'
import { useSelector } from 'react-redux'
const { width, height } = Dimensions.get("window")
const Dashboard = ({ navigation }: any) => {
    const { isLoading, isWarning } = useSelector((state: any) => state.warningReducer)
    return (
        <View style={{ flex: 1, backgroundColor: '#012548' }}>
            <View style={styles.body}>
                {/* <BodyDashboard /> */}
                <WebViewChart />
            </View>
            <View style={styles.footer}>
                <ModeController title={'Fan'} />
                <ModeController title={'Light'} />
            </View>
            {
                isWarning &&
                <Warning />
            }
            <Menu navigation={navigation} screen={'Dashboard'} />
        </View>
    )
}

export default Dashboard

const styles = StyleSheet.create({
    body: {
        flex: 8
    },
    footer: {
        flex: 2, justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row'
    }
})