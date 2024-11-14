import React from "react";
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");

const NoticeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("./assets/notice-screen.png")} // 추가할 이미지 파일 경로
        style={styles.image}
      />
      <View style={styles.header}>
        {/* 뒤로가기 버튼 */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Image
            style={styles.backIcon}
            resizeMode="cover"
            source={require("../DetailsScreen/assets/Back.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10, // 화면 가장자리 여백 추가
  },
  image: {
    width: width, // 이미지 크기 설정 (화면 너비의 40%)
    height: height, // 이미지 크기 설정 (화면 너비의 40%)
    resizeMode: "contain",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 40,
    paddingHorizontal: 20,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  backButton: {
    padding: 10,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
});

export default NoticeScreen;
