import {Dimensions, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import ModeController from '../components/ModeController';
import Warning from '../components/Warning';
import Menu from '../components/Menu';
import WebViewChart from '../components/WebViewChart';
import socketServcies from '../utils/socket/socketService';
const Dashboard = ({navigation}: any) => {
  return (
    <View style={{flex: 1, backgroundColor: '#012548'}}>
      <View style={styles.body}>
        {/* <BodyDashboard /> */}
        <WebViewChart />
      </View>
      <View style={styles.footer}>
        <ModeController title={'Fan'} />
        <ModeController title={'Light'} />
        {/* <ModeController title={'Extra'} /> */}
      </View>

      <Menu navigation={navigation} screen={'Dashboard'} />
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  body: {
    flex: 8,
  },
  footer: {
    flex: 2,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
