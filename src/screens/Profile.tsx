import {
  Dimensions,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  Modal,
  ActivityIndicator,
  ImageBackground,
  FlatList,
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {useFocusEffect} from '@react-navigation/native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {BlurView} from '@react-native-community/blur';
import Menu from '../components/Menu';
const {height, width} = Dimensions.get('window');

const Profile = ({navigation, route}: any) => {
  const [isReadmore, setIsReadMore] = useState(true);
  const [blur, setBlur] = useState(0);
  const [data, setData] = useState(['Football', 'Music', 'Money']);
  const [img, setImg] = useState([
    'https://th.bing.com/th/id/OIP.PG8tJHNlVnKY3QMWqcb3FwHaEo?rs=1&pid=ImgDetMain',
    'https://cdn.images.express.co.uk/img/dynamic/67/1200x712/5173202.jpg',
    'https://resources.premierleague.com/premierleague/photos/players/250x250/p220566.png',
    'https://www.mancity.com/meta/media/4cicyu5v/john-stones.png',
    'https://www.mancity.com/meta/media/343pex31/bernardo-silva.png?width=1000',
  ]);

  return (
    <View style={{flex: 1, backgroundColor: '#08130D'}}>
      <View>
        <Image
          source={require('../utils/minh.png')}
          style={{
            height: height / 2 - 30,
            width,
            position: 'absolute',
            resizeMode: 'contain',
          }}
        />
        {blur > 0 && (
          <BlurView
            blurType="light"
            blurAmount={blur}
            style={{height: height / 2, width, position: 'absolute'}}
          />
        )}
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={e => {
          setBlur(Math.floor(e.nativeEvent.contentOffset.y / 10));
        }}>
        <View
          style={[
            styles.bottomSheet,
            {marginTop: height / 2.2},
            {backgroundColor: 'white'},
          ]}>
          <View
            style={{
              paddingTop: 50,
              paddingHorizontal: 30,
              justifyContent: 'space-around',
              flex: 1,
            }}>
            <View style={styles.section}>
              <View>
                <Text style={styles.name}>Du Hung Minh, 22</Text>
                <Text style={styles.job}>B20DCPT127</Text>
              </View>
            </View>

            <View style={styles.section}>
              <View>
                <Text style={styles.name}>Job</Text>
                <Text style={styles.job}>Student, University</Text>
              </View>
            </View>
            <View style={styles.section}>
              <View>
                <Text style={styles.name}>Email</Text>
                <Text style={styles.job}>duhungminh222@gmail.com</Text>
              </View>
            </View>
            <View style={styles.section}>
              <View>
                <Text style={styles.name}>About</Text>
                <Text
                  numberOfLines={4}
                  style={[styles.job, {maxWidth: '100%'}]}>
                  Nothing
                </Text>
              </View>
            </View>

            <View style={styles.section}>
              <View style={{width: '100%'}}>
                <Text style={styles.name}>Interests</Text>
                <FlatList
                  data={data}
                  keyExtractor={(item, index) => index.toString()}
                  contentContainerStyle={{gap: 10}}
                  columnWrapperStyle={{
                    justifyContent: 'space-evenly',
                    width: '100%',
                  }}
                  scrollEnabled={false}
                  numColumns={3}
                  renderItem={({item}) => {
                    return (
                      <View style={[styles.box, {borderColor: '#2653B0'}]}>
                        <Ionicons
                          name="checkmark-done-outline"
                          size={20}
                          color={'#2653B0'}
                        />
                        <Text style={[styles.redTxt, {color: '#2653B0'}]}>
                          {item}
                        </Text>
                      </View>
                    );
                  }}
                />
              </View>
            </View>
            <View style={styles.section}>
              <View style={{width: '100%'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}>
                  <Text style={styles.name}>Gallery</Text>
                </View>
                <FlatList
                  data={img.slice(0, 2)}
                  keyExtractor={(item, index) => index.toString()}
                  contentContainerStyle={{gap: 10}}
                  scrollEnabled={false}
                  showsHorizontalScrollIndicator={false}
                  horizontal
                  renderItem={({item, index}) => {
                    return (
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('ImageDetails', {img: item})
                        }>
                        <Image
                          source={{uri: item}}
                          style={{
                            borderRadius: 10,
                            height: 250,
                            width: width / 2 - 35,
                          }}
                        />
                      </TouchableOpacity>
                    );
                  }}
                />
                <FlatList
                  data={img.slice(2, 5)}
                  keyExtractor={(item, index) => index.toString()}
                  contentContainerStyle={{gap: 5}}
                  scrollEnabled={false}
                  showsHorizontalScrollIndicator={false}
                  horizontal
                  renderItem={({item, index}) => {
                    return (
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('ImageDetails', {img: item})
                        }>
                        <Image
                          source={{uri: item}}
                          style={{
                            borderRadius: 10,
                            height: 150,
                            width: width / 3 - 25,
                            marginTop: 10,
                          }}
                        />
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <Menu screen={'Profile'} navigation={navigation} />
    </View>
  );
};
export default Profile;

const styles = StyleSheet.create({
  interests: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    maxWidth: '100%',
  },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: 10,
    borderWidth: 1,
    padding: 5,
  },
  distance: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: 90,
    height: 40,
    backgroundColor: 'red',
    borderRadius: 10,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  name: {
    color: '#2653B0',
    fontSize: 30,
    maxWidth: 250,
    lineHeight: 30,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  job: {
    color: '#2653B0',
    fontSize: 18,
    maxWidth: 250,
  },
  headerSheet: {
    position: 'absolute',
    top: -40,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    width: width,
    paddingHorizontal: 30,
  },
  circle: {
    height: 70,
    width: 70,
    borderRadius: 60,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  bottomSheet: {
    backgroundColor: '#2653B0',
    width,
    borderTopLeftRadius: 50,
    height: height * 1.5,
    borderTopRightRadius: 50,
  },
  redTxt: {
    fontSize: 18,
  },
});
