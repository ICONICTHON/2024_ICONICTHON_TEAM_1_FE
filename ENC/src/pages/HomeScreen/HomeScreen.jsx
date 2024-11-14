import React from "react";
import {
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");

const HomeScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("./assets/background.png")} // 배경 이미지 파일 경로
      style={styles.container} // container 스타일을 ImageBackground에 적용
    >
      <Image source={require("./assets/info.png")} style={styles.info} />
      <View style={styles.dashboard}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("main")}
        >
          <Image
            source={require("./assets/enc.png")} // 이미지 파일 경로
            style={styles.dashboard}
          />
        </TouchableOpacity>
      </View>
      <Image source={require("./assets/text.png")} style={styles.text} />
      <View style={styles.buttoncontainer}>
        <View style={styles.leftContainer}>
          <TouchableOpacity
            style={styles.smallButton}
            onPress={() => navigation.navigate("store")}
          >
            <Image
              source={require("./assets/store-icon.png")}
              style={styles.buttonImage}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.smallButton}
            onPress={() => navigation.navigate("notice")}
          >
            <Image
              source={require("./assets/notice-icon.png")}
              style={styles.buttonImage}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.smallButton}
            onPress={() => navigation.navigate("ReportDangerZone")}
          >
            <Image
              source={require("./assets/alert.png")}
              style={styles.buttonImage}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.largeButton}
          onPress={() => navigation.navigate("details")}
        >
          <Image
            source={require("./assets/maps-icon.png")}
            style={styles.buttonImage}
          />
        </TouchableOpacity>
      </View>
    </ImageBackground>
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
    width: width * 0.9,
    height: width * 0.9,
    resizeMode: "contain",
    marginBottom: -120,
    marginTop: -100,
  },
  dashboard: {
    width: width * 1, // 화면 너비의 90%
    height: width * 1, // 비율 맞추기 위해 가로 크기와 같은 크기로 설정
    resizeMode: "contain",
    marginBottom: 0,
  },
  text: {
    width: width * 0.9,
    height: width * 0.1,
    resizeMode: "contain",
    marginBottom: -5,
    marginTop: 10,
  },
  buttoncontainer: {
    flexDirection: "row", // 버튼들을 가로로 정렬
    justifyContent: "space-between", // 버튼들 사이에 공간을 균등하게 배분
    width: "100%", // 화면 너비 전체를 사용
    height: "30%", // 화면 높이를 꽉 채움
  },

  leftContainer: {
    flex: 1, // 화면 왼쪽 절반을 차지
    justifyContent: "flex-start", // 버튼들을 세로로 상단에 정렬
    alignItems: "center", // 버튼들 세로로 중앙 정렬
    paddingVertical: 7, // 버튼들 간의 세로 여백을 추가
  },

  smallButton: {
    height: 60, // 버튼 높이를 줄여서 간격을 좁힘
    width: "100%", // 버튼 너비 설정 (화면 너비에 비례)
    marginVertical: 3, // 버튼 간의 세로 간격을 3으로 설정하여 좁힘
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5, // 둥근 모서리
  },

  largeButton: {
    flex: 1, // 화면 오른쪽 절반을 차지
    justifyContent: "center",
    alignItems: "center",
    height: 200, // 큰 버튼의 높이를 설정
    width: "80%", // 버튼 너비 설정 (화면 너비에 비례)
    margin: 7, // 버튼 간 간격 설정
    borderRadius: 5, // 둥근 모서리
  },

  buttonImage: {
    width: "100%", // 이미지가 버튼을 꽉 채우도록 설정
    height: "100%", // 이미지가 버튼을 꽉 채우도록 설정
    resizeMode: "contain", // 이미지 비율 유지하면서 크기 조정
    borderRadius: 5, // 이미지 모서리 둥글게
  },
});

export default HomeScreen;
