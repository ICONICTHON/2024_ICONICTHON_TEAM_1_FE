import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import * as ImagePicker from "expo-image-picker"; // expo-image-picker 임포트
import { Picker } from "@react-native-picker/picker"; // Picker 컴포넌트 임포트
import { Alert } from "react-native"; // Alert 임포트

const ReportDangerZoneScreen = () => {
  const [imageUri, setImageUri] = useState(null); // 선택한 이미지 URI 상태 관리
  const [selectedBuilding, setSelectedBuilding] = useState(null); // 선택된 건물명
  const [selectedCategory, setSelectedCategory] = useState(null); // 선택된 위험 카테고리
  const [description, setDescription] = useState(""); // 위험 설명

  // 제출 버튼 클릭 핸들러 추가
  const handleSubmit = () => {
    Alert.alert(
      "저장 완료되었습니다",
      "위험 구역 정보가 성공적으로 저장되었습니다."
    );
  };

  // 이미지 선택 핸들러
  const handleImageUpload = async () => {
    // 이미지 라이브러리에서 선택
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled && result.assets && result.assets[0]) {
      // 선택된 이미지 URI를 상태에 업데이트
      setImageUri(result.assets[0].uri); // URI 업데이트
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>위험 구역을 알려주세요</Text>
      <Text style={styles.subtitle}>
        오늘도 서하은님 덕분에 캠퍼스는 안전해요.
      </Text>
      {/* 카메라 아이콘 버튼 - 이미지 선택, 이미지가 선택되면 숨김 */}
      {!imageUri && (
        <TouchableOpacity
          onPress={handleImageUpload}
          style={styles.cameraButton}
        >
          <Image
            source={require("../ReportDangerZoneScreen/assets/camera.png")} // 카메라 아이콘 이미지 경로
            style={{ width: 48.2, height: 47.1 }}
          />
        </TouchableOpacity>
      )}
      {/* 미리보기 */}
      <View style={styles.preview}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.previewImage} />
        ) : (
          <></>
        )}
      </View>
      {/* 건물명, 카테고리 선택 Picker 추가 및 설명 입력 */}
      <View style={styles.inputContainer}>
        {/* 건물명 선택 Picker */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>건물명을 선택하세요.</Text>
          <Picker
            selectedValue={selectedBuilding}
            onValueChange={setSelectedBuilding}
            style={styles.picker}
          >
            <Picker.Item label="건물명 선택" value={null} />
            <Picker.Item label="신공학관" value="신공학관" />
            <Picker.Item label="중앙도서관" value="중앙도서관" />
            <Picker.Item label="학생회관" value="학생회관" />
            <Picker.Item label="경비실" value="경비실" />
            <Picker.Item label="국제관" value="국제관" />
          </Picker>
        </View>

        {/* 위험 카테고리 선택 Picker */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>위험 카테고리</Text>
          <Picker
            selectedValue={selectedCategory}
            onValueChange={setSelectedCategory}
            style={styles.picker}
          >
            <Picker.Item label="카테고리 선택" value={null} />
            <Picker.Item label="승강기 고장" value="승강기 고장" />
            <Picker.Item label="화재" value="화재" />
            <Picker.Item label="전기 누전" value="전기 누전" />
            <Picker.Item label="교내 폭력" value="교내 폭력" />
            <Picker.Item label="대규모 낙석" value="대규모 낙석" />
          </Picker>
        </View>

        {/* 설명 입력 */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>설명</Text>
          <TextInput
            style={styles.input}
            placeholder="위험한 내용을 작성해주세요."
            value={description}
            onChangeText={setDescription}
            multiline
          />
        </View>
      </View>
      // 제출 버튼의 onPress 이벤트에 handleSubmit 추가
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>저장하기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "left", // 왼쪽 정렬
    width: "100%", // 추가: 화면 크기에 맞게 조정
    paddingLeft: 10, // 왼쪽 여백 추가
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    marginBottom: 30,
    textAlign: "left", // 왼쪽 정렬
    width: "100%", // 추가: 화면 크기에 맞게 조정
    paddingLeft: 10, // 왼쪽 여백 추가
  },
  cameraButton: {
    alignSelf: "flex-start", // 왼쪽 정렬
    marginBottom: 20,
  },
  preview: {
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  previewImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    resizeMode: "cover",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
    width: "100%",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  picker: {
    height: 60,
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingLeft: 10,
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
    backgroundColor: "#011F4C",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    width: 250,
  },
  submitButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ReportDangerZoneScreen;
