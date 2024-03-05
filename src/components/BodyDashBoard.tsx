import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { memo, useEffect, useState } from 'react'
import Sensor from '../components/Sensor'
import { LineChart } from 'react-native-chart-kit'
import ModeController from '../components/ModeController'
import Animated, { Extrapolation, interpolate, interpolateColor, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import { opacity } from 'react-native-reanimated/lib/typescript/reanimated2/Colors'
const { width, height } = Dimensions.get("window")
const BodyDashboard = ({ navigation }: any) => {

    const generateRandomData = (length: number) => {
        return Array.from({ length }, () => Math.floor(Math.random() * 100));
    };
    const [temperatureData, setTemperatureData] = useState(generateRandomData(10));
    const [brightnessData, setBrightnessData] = useState(generateRandomData(10));
    const [humidityData, setHumidityData] = useState(generateRandomData(10));
    const [temperature, setTemperature] = useState(99)
    const [brightness, setBrightness] = useState(990)
    const [humidity, setHumidity] = useState(83)

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTemperatureData((pre: any) => [...pre.slice(1), Math.floor(Math.random() * 100)]);
            setBrightnessData((pre: any) => [...pre.slice(1), Math.floor(Math.random() * 1000)]);
            setHumidityData((pre: any) => [...pre.slice(1), Math.floor(Math.random() * 100)]);
            // setTemperature(pre => pre + 1)
        }, 200000);
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        setHumidity(humidityData[humidityData.length - 1]);
        setTemperature(temperatureData[temperatureData.length - 1]);
        setBrightness(brightnessData[brightnessData.length - 1]);
    }, [temperatureData, brightnessData, humidityData]);

    const data1 = {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
        datasets: [
            {
                data: temperatureData,
                color: () => '#F3485B',
                strokeWidth: 2
            },
            {
                data: humidityData,
                color: () => '#2653B0',
                strokeWidth: 2
            }
        ],
        // legend: ["Tempurature", "Humidity"]
    }
    const data2 = {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
        datasets: [
            {
                data: brightnessData,
                color: () => '#FECB3E',
                strokeWidth: 2
            },
        ],
        // legend: ["Brightness"]
    }

    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0.5,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2,
        barPercentage: .5,
        useShadowColorFromDataset: false
    };
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.header}>
                <Sensor value={temperature} title={'Tempurature'} />
                <Sensor value={brightness} title={'Brightness'} />
                <Sensor value={humidity} title={'Humidity'} />
            </View>
            <View style={styles.body}>
                <View style={{ flexDirection: 'row', marginTop: 10, height: 40, width, justifyContent: 'space-around' }}>
                    <View style={styles.legends}>
                        <View style={{ height: 15, width: 15, backgroundColor: '#F3485B' }} />
                        <Text style={styles.txt}>Temperature</Text>
                    </View>
                    <View style={styles.legends}>
                        <View style={{ height: 15, width: 15, backgroundColor: '#FECB3E' }} />
                        <Text style={styles.txt}>Brightness</Text>
                    </View>
                    <View style={styles.legends}>
                        <View style={{ height: 15, width: 15, backgroundColor: '#2653B0' }} />
                        <Text style={styles.txt}>Humidity</Text>
                    </View>
                </View>
                <LineChart
                    style={{ position: 'absolute', left: -20, top: 50 }}
                    data={data1}
                    width={width}
                    height={height * .5}
                    bezier
                    chartConfig={chartConfig}
                    fromZero={true}
                    withInnerLines={false}
                    withOuterLines={false}
                    withHorizontalLabels={false}
                />
                <LineChart
                    style={{ position: 'absolute', top: 50, left: -20 }}
                    data={data2}
                    width={width}
                    height={height * .5}
                    bezier
                    chartConfig={chartConfig}
                    fromZero={true}
                    withHorizontalLabels={false}
                    withInnerLines={false}
                    yLabelsOffset={-width + 90}
                />
                <View style={styles.line}>
                    <Text style={{ color: 'rgba(26, 255, 146, 1)', fontSize: 12 }}>100</Text>
                    <Text style={{ color: 'rgba(26, 255, 146, 1)', fontSize: 12 }}>80</Text>
                    <Text style={{ color: 'rgba(26, 255, 146, 1)', fontSize: 12 }}>60</Text>
                    <Text style={{ color: 'rgba(26, 255, 146, 1)', fontSize: 12 }}>40</Text>
                    <Text style={{ color: 'rgba(26, 255, 146, 1)', fontSize: 12 }}>20</Text>
                    <Text style={{ color: 'rgba(26, 255, 146, 1)', fontSize: 12 }}>0</Text>
                </View>
                <View style={[styles.line, { position: 'absolute', right: 0, top: 45 }]}>
                    <Text style={{ color: '#FECB3E', fontSize: 12 }}>1000</Text>
                    <Text style={{ color: '#FECB3E', fontSize: 12 }}>800</Text>
                    <Text style={{ color: '#FECB3E', fontSize: 12 }}>600</Text>
                    <Text style={{ color: '#FECB3E', fontSize: 12 }}>400</Text>
                    <Text style={{ color: '#FECB3E', fontSize: 12 }}>200</Text>
                    <Text style={{ color: '#FECB3E', fontSize: 12 }}>0</Text>
                </View>
            </View>
        </View>
    )
}

export default memo(BodyDashboard)

const styles = StyleSheet.create({
    legends: {
        height: 30, paddingHorizontal: 10, gap: 10, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'
    },
    txt: {
        color: 'white'
    },
    header: {
        flex: 2, justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row'
    },
    body: {
        flex: 8
    },
    line: {
        height: height * .5 - 80, width: 40, marginLeft: 10, justifyContent: 'space-between', marginTop: 10
    }
})