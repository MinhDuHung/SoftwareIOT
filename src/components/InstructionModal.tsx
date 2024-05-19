import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const InstructionModal = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hướng dẫn cách tìm kiếm</Text>
      <Text style={styles.content}>
        - Với tìm kiếm bằng ký tự: bạn có thể nhập bất kỳ giá trị nào muốn tìm
        kiếm và có thể chọn thêm thuộc tính tìm kiếm nếu muốn.
      </Text>
      <Text style={styles.content}>
        - Với tìm kiếm bằng filter: Bạn có thể tìm kiếm dữ liệu theo giá trị
        tăng hoặc giảm dần, bạn có thể tìm kiếm theo tên thiết bị hoặc chế độ
        bật tắt của thiết bị.
      </Text>
      <Text style={styles.content}>
        - Bạn có thể chọn chế độ xem những thuộc tính mà mình muốn và ẩn các
        phần còn lại.
      </Text>
    </View>
  );
};

export default InstructionModal;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F3485B',
  },
  content: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2653B0',
  },
  container: {
    height: 400,
    width: 300,
    backgroundColor: '#FECB3E',
    position: 'absolute',
    zIndex: 1,
    top: 60,
    left: 60,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: 10,
    elevation: 5,
  },
});
