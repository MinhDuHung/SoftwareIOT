import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React, {memo, useEffect, useRef, useState} from 'react';
import Sensor from '../components/Sensor';
import WebView from 'react-native-webview';
import socket from '../utils/socket/socketService';
import Warning from './Warning';

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
  const [isWarning, setIsWarning] = useState(false);

  useEffect(() => {
    socket.initializeSocket();
    socket.on('send_sensor_data', (data: any) => {
      if (data) {
        const {brightness, temperature, humidity, windspeed} = data;
        if (temperature >= 34) {
          setIsWarning(true);
        } else {
          setIsWarning(false);
        }
        setBrightnessData(prevData => [...prevData, brightness]);
        setHumidityData(prevData => [...prevData, humidity]);
        setTemperatureData(prevData => [...prevData, temperature]);
        setExtraData(prevData => [...prevData, windspeed]);
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
  <style>
  body, html {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    background-color: #012548;
  }
    .chart-container {
      display: flex;
      width: 50%;
      height: 100%;
    }
    .chart {
      width: 100%;
      height: 100%;
    }
  </style>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
  <div class="chart-container">
    <canvas id="chart1" class="chart"></canvas>
    <canvas id="chart2" class="chart"></canvas>
  </div>
  <script>
    const ctx1 = document.getElementById('chart1').getContext('2d');
    const ctx2 = document.getElementById('chart2').getContext('2d');

    const data = ${JSON.stringify(chartData)};
    const data1 = ${JSON.stringify(temperatureData)};
    const data2 = ${JSON.stringify(humidityData)};
    const data3 = ${JSON.stringify(brightnessData)};
    const data4 = ${JSON.stringify(extraData)};

    Chart.defaults.font.size = 20;
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

    const myChart1 = new Chart(ctx1, {
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
            label: 'Brightness',
            data: data3,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: '#FECB3E',
            borderWidth: 4,
          },
        ],
      },
      plugins: [plugin],
      options: {
        animation: false,
        tension: .5,
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
            max:100,
            min:0
          },
          B: {
            type: 'linear',
            position: 'right',
            ticks: { color: '#FECB3E' },
            beginAtZero: true, 
            max:1000,
            grid: { display: true , color:'white'}
          },
          x: {
            grid: { display: true , color:'white'}
          }
        },
      },
    });

    const myChart2 = new Chart(ctx2, {
      type: 'line',
      data: {
        labels: data.labels,
        datasets: [
          {
            yAxisID: 'B',
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
        animation: false,
        tension: .5,
        responsive: true,
        plugins: {
          legend: false,
          customCanvasBackgroundColor: {
            color: '#012548',
          }
        },
        scales: {
          B: {
            type: 'linear',
            position: 'left',
            ticks: { beginAtZero: true, color:  '#Ffff', display: true }, // Ẩn nhãn trục y
            grid: { 
              display: true,
              color: 'white',
              lineWidth: 1, // Độ rộng của dòng grid
              drawBorder: false, // Không vẽ viền
            },
            max:100
          },
          x: {
            grid: { 
              display: true,
              color: 'white',
              lineWidth: 1, // Độ rộng của dòng grid
              drawBorder: false, // Không vẽ viền
            }
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
      {isWarning && <Warning />}
      <View style={styles.header}>
        <Sensor value={temperature} title={'Temperature'} />
        <Sensor value={brightness} title={'Brightness'} />
        <Sensor value={humidity} title={'Humidity'} />
        <Sensor value={extra} title={'windspeed'} />
      </View>
      <View style={styles.body}>
        <WebView source={{html: chartHtml}} ref={chartRef} />
      </View>
    </View>
  );
};

export default memo(WebViewChart);

const styles = StyleSheet.create({
  header: {
    flex: 2,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  body: {
    flex: 8,
  },
});
