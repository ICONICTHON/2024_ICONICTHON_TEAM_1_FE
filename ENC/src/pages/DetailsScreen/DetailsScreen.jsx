import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker, Polygon } from "react-native-maps";

const DetailsScreen = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
    closeModal();
  };

  return (
    <View style={styles.container}>
      {/* 지도 */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.5585,
          longitude: 127.0001,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {/* 경비실 마커 */}
        {selectedFilter === "경비실" && (
          <>
            <Marker
              coordinate={{ latitude: 37.5587, longitude: 127.0003 }}
              title="경비실 1"
            />
            <Marker
              coordinate={{ latitude: 37.559, longitude: 127.0006 }}
              title="경비실 2"
            />
          </>
        )}

        {/* 위험구역 마커 */}
        {selectedFilter === "위험구역" && (
          <>
            <Marker
              coordinate={{ latitude: 37.5582, longitude: 127.0005 }}
              title="위험구역"
              pinColor="red"
              description="공사 중"
            />
            <Marker
              coordinate={{ latitude: 37.5589, longitude: 127.001 }}
              title="위험구역"
              pinColor="red"
              description="공사 중"
            />
          </>
        )}

        {/* 인구 밀집도 히트맵 효과 */}
        {selectedFilter === "인구 밀집도" && (
          <Polygon
            coordinates={[
              { latitude: 37.5582, longitude: 127.0001 },
              { latitude: 37.5585, longitude: 127.001 },
              { latitude: 37.559, longitude: 127.0008 },
              { latitude: 37.5593, longitude: 127.0002 },
            ]}
            fillColor="rgba(255, 0, 0, 0.3)" // 투명 빨간색
            strokeColor="rgba(255, 0, 0, 0.7)" // 진한 빨간색
          />
        )}
      </MapView>

      {/* 지도 위에 겹쳐지는 다른 UI 요소 */}
      <View style={styles.infoPanel}>
        <Text style={styles.infoTitle}>현재 내 주변</Text>
        <Text style={styles.infoSubtitle}>신공학관</Text>
        <TouchableOpacity onPress={openModal} style={styles.filterButton}>
          <Text style={styles.filterButtonText}>Filter</Text>
        </TouchableOpacity>
      </View>

      {/* Modal */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filter</Text>
            <Button
              title="경비실"
              onPress={() => handleFilterSelect("경비실")}
            />
            <Button
              title="인구 밀집도"
              onPress={() => handleFilterSelect("인구 밀집도")}
            />
            <Button
              title="위험구역"
              onPress={() => handleFilterSelect("위험구역")}
            />
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  infoPanel: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#d1c4e9", // 임시 색상
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  infoSubtitle: {
    fontSize: 14,
    color: "gray",
    marginBottom: 10,
  },
  filterButton: {
    backgroundColor: "#fbc02d",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  filterButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#f44336",
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default DetailsScreen;
