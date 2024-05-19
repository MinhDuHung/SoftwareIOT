import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React, {memo, useEffect, useRef, useState} from 'react';
import Sensor from '../components/Sensor';
import WebView from 'react-native-webview';
import socket from '../utils/socket/socketService';
const {width, height} = Dimensions.get('window');
const WebViewChart = ({navigation}: any) => {
  const [temperatureData, setTemperatureData] = useState([0]);
  const [brightnessData, setBrightnessData] = useState([0]);
  const [humidityData, setHumidityData] = useState([0]);
  const [extraData, setExtraData] = useState([0]);
  const [temperature, setTemperature] = useState(0);
  const [brightness, setBrightness] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [extra, setExtra] = useState(0);
  const chartRef = useRef<WebView>(null);

  useEffect(() => {
    socket.initializeSocket();
    socket.on('send_sensor_data', (data: any) => {
      if (data) {
        const {brightness, temperature, humidity, extra} = data;
        setBrightnessData(pre => [...pre, brightness]);
        setHumidityData(pre => [...pre, humidity]);
        setTemperatureData(pre => [...pre, temperature]);
        setExtraData(pre => [...pre, extra]);
      }
    });
  }, []);

  useEffect(() => {
    setHumidity(humidityData[humidityData.length - 1]);
    setTemperature(temperatureData[temperatureData.length - 1]);
    setBrightness(brightnessData[brightnessData.length - 1]);
    setExtra(extraData[extraData.length - 1]);
    if (humidityData.length >= 11) {
      setHumidityData(prevData => prevData.slice(1));
      setBrightnessData(prevData => prevData.slice(1));
      setTemperatureData(prevData => prevData.slice(1));
      setExtraData(prevData => prevData.slice(1));
    }
  }, [temperatureData, brightnessData, humidityData, extraData]);

  const chartData = {
    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
  };

  const chartHtml = `
    <html>
    <head>
      <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    </head>
    <body>
    <canvas id="myChart" width="${width}" height="${height * 0.5}" ></canvas>
      <script>
        const ctx = document.getElementById('myChart').getContext('2d');
        const data = ${JSON.stringify(chartData)};
        const data1 = ${JSON.stringify(temperatureData)};
        const data2 = ${JSON.stringify(humidityData)};
        const data3 = ${JSON.stringify(brightnessData)};
        const data4 = ${JSON.stringify(extraData)};
        Chart.defaults.font.size = 30
        const plugin = {
            id: 'customCanvasBackgroundColor',
            beforeDraw: (chart, args, options) => {
              const {ctx} = chart;
              ctx.save();
              ctx.globalCompositeOperation = 'destination-over';
              ctx.fillStyle = options.color || '#99ffff';
              ctx.fillRect(0, 0, chart.width, chart.height);
              ctx.restore();
            }
          };
        const myChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: data.labels,
            datasets: [
              {
                yAxisID: 'A',
                label: 'Temperature',
                data: data1,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: '#F3485B',
                borderWidth: 4,
              },
              {
                yAxisID: 'A',
                label: 'Humidity',
                data: data2,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: '#2653B0',
                borderWidth: 4,
              },
              {
                yAxisID: 'B',
                label: 'Humidity',
                data: data3,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: '#FECB3E',
                borderWidth: 4,
              },
              {
                yAxisID: 'A',
                label: 'Extra',
                data: data4,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'pink',
                borderWidth: 4,
              },
            ],
          },
         plugins: [plugin],
          options: {
            animation:false,
            tension:.5,
            responsive: true,
            plugins: {
                legend: false,
                customCanvasBackgroundColor: {
                    color: '#012548',
                }
            },
            scales: {
                A: {
                  type: 'linear',
                  position: 'left',
                  ticks: { beginAtZero: true, color:  '#Ffff' },
                  grid: { display: false, },
                  max:100
                },
                B: {
                  type: 'linear',
                  position: 'right',
                  ticks: { color: '#FECB3E' },
                  beginAtZero: true, 
                  max:1000,
                  grid: { display: true , color:'white'}
                },
                x:{
                    grid: { display: true , color:'white'}
                }
                },
            },
        });
      </script>
    </body>
    </html>
    
  `;

  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <Sensor value={temperature} title={'Temperature'} />
        <Sensor value={brightness} title={'Brightness'} />
        <Sensor value={humidity} title={'Humidity'} />
        <Sensor value={extra} title={'Extra'} />
      </View>
      <View style={styles.body}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            height: 40,
            width,
            justifyContent: 'space-around',
          }}>
          <View style={styles.legends}>
            <View style={{height: 15, width: 15, backgroundColor: '#F3485B'}} />
            <Text style={styles.txt}>Temperature</Text>
          </View>
          <View style={styles.legends}>
            <View style={{height: 15, width: 15, backgroundColor: '#FECB3E'}} />
            <Text style={styles.txt}>Brightness</Text>
          </View>
          <View style={styles.legends}>
            <View style={{height: 15, width: 15, backgroundColor: '#2653B0'}} />
            <Text style={styles.txt}>Humidity</Text>
          </View>
          <View style={styles.legends}>
            <View style={{height: 15, width: 15, backgroundColor: 'pink'}} />
            <Text style={styles.txt}>Extra</Text>
          </View>
        </View>
        <View style={{height: height * 0.5}}>
          <WebView source={{html: chartHtml}} ref={chartRef} />
        </View>
      </View>
    </View>
  );
};

export default memo(WebViewChart);

const styles = StyleSheet.create({
  legends: {
    height: 30,
    paddingHorizontal: 10,
    gap: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  txt: {
    color: 'white',
  },
  header: {
    flex: 2,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  body: {
    flex: 8,
  },
  line: {
    height: height * 0.5 - 80,
    width: 40,
    marginLeft: 10,
    justifyContent: 'space-between',
    marginTop: 10,
  },
});
