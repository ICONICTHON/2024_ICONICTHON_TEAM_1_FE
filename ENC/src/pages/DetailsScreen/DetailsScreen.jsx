import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
} from "react-native";
import MapView, { Marker, Polygon, Callout } from "react-native-maps";

const DetailsScreen = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("위험구역");

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
    closeModal();
  };

  // 위험구역 알리기 페이지로 이동
  const navigateToReportPage = () => {
    navigation.navigate("ReportDangerZone");
  };

  return (
    <View style={styles.container}>
      {/* 지도 */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.5585,
          longitude: 127.0001,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      >
        {/* 필터에 따라 마커 표시 */}
        {selectedFilter === "경비실" && (
          <>
            <Marker
              coordinate={{ latitude: 37.5587, longitude: 127.0003 }}
              title="경비실 1"
              pinColor="blue"
            >
              <Image
                source={require("../DetailsScreen/assets/Marker1.png")}
                style={{ width: 25, height: 25 }} // 마커 이미지 크기 조정
              />
              <Callout>
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutTitle}>경비실 1</Text>
                  <Text style={styles.calloutDescription}>
                    Common Rail Fuel Injection
                  </Text>
                </View>
              </Callout>
            </Marker>
            <Marker
              coordinate={{ latitude: 37.559, longitude: 127.0006 }}
              title="경비실 2"
              pinColor="blue"
            >
              <Image
                source={require("../DetailsScreen/assets/Marker1.png")}
                style={{ width: 25, height: 25 }} // 마커 이미지 크기 조정
              />
            </Marker>
          </>
        )}

        {selectedFilter === "위험구역" && (
          <>
            <Marker
              coordinate={{ latitude: 37.5582, longitude: 127.0005 }}
              title="위험구역"
              pinColor="red"
            >
              <Image
                source={require("../DetailsScreen/assets/Marker2.png")}
                style={{ width: 25, height: 25 }} // 마커 이미지 크기 조정
              />
            </Marker>
            <Marker
              coordinate={{ latitude: 37.5589, longitude: 127.001 }}
              title="위험구역"
              pinColor="red"
            >
              <Image
                source={require("../DetailsScreen/assets/Marker2.png")}
                style={{ width: 25, height: 25 }} // 마커 이미지 크기 조정
              />
            </Marker>
          </>
        )}

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

      {/* 상단 바 */}
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

        {/* 필터 버튼 */}
        <TouchableOpacity style={styles.filterButton} onPress={openModal}>
          <Image
            style={styles.filterIcon}
            resizeMode="cover"
            source={require("../DetailsScreen/assets/Group.png")}
          />
        </TouchableOpacity>
      </View>

      {/* Modal (하단에서 슬라이드) */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          {/* 현재 내 주변 정보 패널 (상단에 고정, 약간 겹치도록 설정) */}
          <View style={styles.infoPanel}>
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Image
                style={styles.closeButtonImage}
                source={require("../DetailsScreen/assets/Delete.png")}
              />
            </TouchableOpacity>
            <View style={styles.infoTitleContainer}>
              <Text style={styles.infoTitle}>현재 내 주변</Text>
            </View>
            <View style={styles.infoSubtitleContainer}>
              <Image
                style={styles.arrowImage}
                source={require("../DetailsScreen/assets/Arrow.png")}
              />
              <Text style={styles.infoSubtitle}>신공학관</Text>
            </View>
          </View>
          <View style={styles.modalContent}>
            {/* Filter 내용 */}
            <Text style={styles.filterTitle}>Filter</Text>

            {/* 필터 버튼들 - 가로로 정렬 */}
            <View style={styles.filterButtonsContainer}>
              <TouchableOpacity
                onPress={() => handleFilterSelect("경비실")}
                style={styles.filterOption}
              >
                <Text style={styles.filterText}>경비실</Text>
                <Text style={styles.filterDescription}>
                  Common Rail Fuel Injection
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleFilterSelect("인구 밀집도")}
                style={styles.filterOption}
              >
                <Text style={styles.filterText}>인구 밀집도</Text>
                <Text style={styles.filterDescription}>0 - 100km / 11s</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleFilterSelect("위험구역")}
                style={styles.filterOption}
              >
                <Text style={styles.filterText}>위험 구역</Text>
                <Text style={styles.filterDescription}>
                  Temp Control on seat
                </Text>
              </TouchableOpacity>
            </View>

            {/* 하단 알림 버튼 */}
            <View style={styles.bottomSection}>
              <View style={styles.costContainer}>
                <Text style={styles.cost}>$120</Text>
              </View>

              {/* 위험구역 알리기 버튼 */}
              <TouchableOpacity
                style={styles.alertButton}
                onPress={navigateToReportPage}
              >
                <Text style={styles.alertButtonText}>위험 구역 알리기</Text>
              </TouchableOpacity>
            </View>
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
  filterButton: {
    padding: 10,
  },
  filterIcon: {
    width: 24,
    height: 24,
  },
  infoPanel: {
    backgroundColor: "#897C75",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 2,
    marginBottom: -10,
    width: "100%",
  },
  infoTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  infoSubtitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  arrowImage: {
    width: 16,
    height: 16,
    marginRight: 10,
  },
  infoSubtitle: {
    fontSize: 14,
    color: "white",
    marginBottom: 10,
  },
  closeButtonImage: {
    width: 20,
    height: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "100%",
    backgroundColor: "#ffffff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
    marginTop: -10,
    zIndex: 3,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  filterTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  filterButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  filterOption: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 10,
    width: "30%",
    alignItems: "center",
  },
  filterText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  filterDescription: {
    fontSize: 12,
    color: "gray",
  },
  bottomSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  costContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  cost: {
    fontSize: 24,
    fontWeight: "bold",
  },
  alertButton: {
    backgroundColor: "#FFEB3B",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  alertButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default DetailsScreen;
