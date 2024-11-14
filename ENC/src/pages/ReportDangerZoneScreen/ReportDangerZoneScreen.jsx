import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

const ReportDangerZoneScreen = () => {
  const [image, setImage] = useState(null); // 이미지 상태
  const [description, setDescription] = useState(""); // 설명 상태

  // 갤러리 권한 요청 및 이미지 선택
  const pickImageFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri); // 선택한 이미지 URI 상태에 저장
      console.log(image);
    }
  };

  // 사진 삭제 함수
  const deleteImage = () => {
    setImage(null); // 이미지 상태 초기화
  };

  // 제출 함수
  const handleSubmit = () => {
    if (!image || !description) {
      Alert.alert("모든 필드를 채워주세요.");
    } else {
      Alert.alert("위험구역 알림", "위험구역 알림이 완료되었습니다.");
      // 추가적인 제출 로직 (API 호출 등) 필요
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>위험 구역 알리기</Text>

      {/* 사진 선택 버튼 */}
      <TouchableOpacity
        style={styles.imagePicker}
        onPress={pickImageFromGallery}
      >
        {image ? (
          <View style={styles.imageContainer}>
            <Image source={{ uri: image }} style={styles.image} />
            {/* 엑스 버튼 */}
            <TouchableOpacity style={styles.deleteButton} onPress={deleteImage}>
              <Text style={styles.deleteButtonText}>X</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={styles.imageText}>갤러리에서 사진 선택</Text>
        )}
      </TouchableOpacity>

      {/* 위험 설명 텍스트 입력 */}
      <TextInput
        style={styles.input}
        placeholder="위험한 내용을 작성해주세요."
        value={description}
        onChangeText={setDescription}
        multiline
      />

      {/* 제출 버튼 */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>제출하기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  imagePicker: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    height: 200,
    marginBottom: 20,
  },
  imageText: {
    color: "#FFEB3B",
    fontSize: 16,
    fontWeight: "bold",
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  deleteButton: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "rgba(255, 0, 0, 0.7)",
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  input: {
    height: 100,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#FFEB3B", // Yellow background color
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  submitButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ReportDangerZoneScreen;
