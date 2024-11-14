import React from "react";
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("store")}
      >
        <Image
          source={require("./assets/info.png")} // 이미지 파일 경로
          style={styles.info}
        />
      </TouchableOpacity>
      <View style={styles.dashboard}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("details")}
        >
          <Image
            source={require("./assets/dashboard.png")} // 이미지 파일 경로
            style={styles.dashboard}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("store")}
        >
          <Image
            source={require("./assets/store-icon.png")} // 이미지 파일 경로
            style={styles.image}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("details")}
        >
          <Image
            source={require("./assets/maps-icon.png")} // 이미지 파일 경로
            style={styles.image}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("details")}
      >
        <Image
          source={require("./assets/notice-icon.png")} // 추가할 이미지 파일 경로
          style={styles.noticeImage}
        />
      </TouchableOpacity>
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
  info: {
    width: width * 0.85, // 화면 너비의 90%
    height: width * 0.1, // 비율 맞추기 위해 가로 크기와 같은 크기로 설정
    resizeMode: "contain",
    marginTop: width * 0.1,
    marginBottom: -30,
  },
  dashboard: {
    width: width * 0.9, // 화면 너비의 90%
    height: width * 0.9, // 비율 맞추기 위해 가로 크기와 같은 크기로 설정
    resizeMode: "contain",
    marginBottom: -30,
  },
  buttonContainer: {
    flexDirection: "row", // 버튼들을 가로로 정렬
    justifyContent: "center", // 버튼들 사이에 간격을 균등하게 배치
    alignItems: "center",
    marginBottom: 20, // 버튼 간 간격 추가
  },
  button: {
    marginHorizontal: 0, // 버튼들 사이에 간격을 추가
  },
  image: {
    width: width * 0.45, // 이미지 크기 설정 (화면 너비의 40%)
    height: width * 0.45, // 이미지 크기 설정 (화면 너비의 40%)
    resizeMode: "contain",
  },
  noticeImage: {
    width: width * 0.85, // 화면 너비의 90%
    height: width * 0.85, // 비율 맞추기 위해 가로 크기와 같은 크기로 설정
    resizeMode: "contain", // 이미지 비율 유지
    marginTop: -50, // 버튼과 이미지 사이의 간격
  },
});

export default HomeScreen;
