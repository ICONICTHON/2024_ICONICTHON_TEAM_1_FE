import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import { AssetsSelector } from "expo-images-picker"; // 이미지 선택 컴포넌트
import { Ionicons } from "@expo/vector-icons"; // 아이콘 컴포넌트

const ReportDangerZoneScreen = ({ navigation }) => {
  const [selectedBuilding, setSelectedBuilding] = useState(null); // 선택된 건물명
  const [selectedCategory, setSelectedCategory] = useState(null); // 선택된 위험 카테고리
  const [description, setDescription] = useState(""); // 위험 설명
  const [imageUrl, setImageUrl] = useState(""); // 선택된 이미지 URL

  // 이미지 선택에 대한 설정
  const widgetSettings = useMemo(
    () => ({
      getImageMetaData: false,
      initialLoad: 100,
      assetsType: ["photo"], // 사진만 선택
      minSelection: 1,
      maxSelection: 1, // 한 개의 이미지만 선택
      portraitCols: 4,
      landscapeCols: 4,
    }),
    []
  );

  // 오류 처리
  const widgetErrors = useMemo(
    () => ({
      errorTextColor: "red",
      errorMessages: {
        hasErrorWithPermissions: "권한 오류",
        hasErrorWithLoading: "로딩 오류",
        hasErrorWithResizing: "크기 조정 오류",
        hasNoAssets: "선택된 자산이 없습니다.",
      },
    }),
    []
  );

  // 스타일 설정
  const widgetStyles = useMemo(
    () => ({
      margin: 2,
      bgColor: "white",
      spinnerColor: "blue",
      widgetWidth: 100,
      widgetStyle: { margin: 10 },
      videoIcon: {
        Component: Ionicons,
        iconName: "ios-videocam",
        color: "black",
        size: 20,
      },
      selectedIcon: {
        Component: Ionicons,
        iconName: "ios-checkmark-circle-outline",
        color: "white",
        bg: "blue",
        size: 26,
      },
    }),
    []
  );

  // 카테고리 및 건물명 선택 시 해당 필드 설정
  const handleBuildingSelect = (building) => {
    setSelectedBuilding(building);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  // 이미지 선택 후 처리
  const handleImageSelection = (result) => {
    if (result.cancelled) {
      return;
    }
    setImageUrl(result.uri); // 이미지 URL 업데이트
  };

  // 필터 옵션 설정
  const widgetNavigator = useMemo(
    () => ({
      Texts: {
        finish: "완료",
        back: "뒤로",
        selected: "선택됨",
      },
      onBack: () => navigation.goBack(),
      onSuccess: (data) => {
        console.log("선택된 이미지:", data);
        setImageUrl(data[0].uri); // 선택된 이미지 URL 업데이트
      },
    }),
    [navigation]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>위험 구역 알리기</Text>

      {/* 건물명 선택 */}
      <View style={styles.selectionContainer}>
        <Text style={styles.label}>건물명을 선택하세요.</Text>
        <TouchableOpacity onPress={() => handleBuildingSelect("신공학관")}>
          <Text style={styles.optionText}>
            {selectedBuilding || "건물명 선택"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* 위험 카테고리 선택 */}
      <View style={styles.selectionContainer}>
        <Text style={styles.label}>위험 카테고리</Text>
        <TouchableOpacity onPress={() => handleCategorySelect("승강기 고장")}>
          <Text style={styles.optionText}>
            {selectedCategory || "카테고리 선택"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* 설명 입력 */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>설명</Text>
        <TextInput
          style={styles.input}
          placeholder="위험한 내용을 작성해주세요."
          value={description}
          onChangeText={setDescription}
          multiline
        />
      </View>
      <Image
        source={require("../ReportDangerZoneScreen/assets/camera.png)} // My.png 이미지 경로
        style={{ width: 40, height: 47 }}
      />

      {/* 이미지 선택 */}
      <AssetsSelector
        Settings={widgetSettings}
        Errors={widgetErrors}
        Styles={widgetStyles}
        Navigator={widgetNavigator}
        onSuccess={handleImageSelection}
      />

      {/* 선택된 이미지 미리보기 */}
          {imageUrl ? (
              console.log(imageUrl);
        <Image source={{ uri: imageUrl }} style={{ width: 200, height: 200 }} />
      ) : (
        <Text>선택된 이미지 없음</Text>
      )}

      {/* 제출 버튼 */}
      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitButtonText}>제출하기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  selectionContainer: {
    marginBottom: 20,
    width: "100%",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  optionText: {
    fontSize: 14,
    color: "#007BFF",
  },
  inputContainer: {
    marginBottom: 20,
    width: "100%",
  },
  input: {
    height: 100,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#FFEB3B",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  submitButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ReportDangerZoneScreen;
