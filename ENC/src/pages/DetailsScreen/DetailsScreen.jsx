import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import MapView, { Marker, Polygon, Callout } from "react-native-maps";
import {
  getAllDangers,
  getDangerDetail,
} from "../../../src/lib/apis/dangerApi"; // API 호출 함수

const DetailsScreen = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isDangerDetailModalVisible, setDangerDetailModalVisible] =
    useState(false); // 위험 상세 모달 상태
  const [selectedFilter, setSelectedFilter] = useState("위험구역");
  const [dangers, setDangers] = useState([]);
  const [selectedDanger, setSelectedDanger] = useState(null);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);
  const openDangerDetailModal = () => setDangerDetailModalVisible(true); // 위험 상세 모달 열기
  const closeDangerDetailModal = () => setDangerDetailModalVisible(false); // 위험 상세 모달 닫기

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
    closeModal();
  };

  const navigateToReportPage = () => {
    navigation.navigate("ReportDangerZone");
    setModalVisible(false); // 모달 닫기
  };

  // 위험 요소 목록을 가져오는 함수
  const fetchDangers = async () => {
    try {
      const data = await getAllDangers();
      setDangers(data);
    } catch (error) {
      console.error("Error fetching dangers:", error);
    }
  };

  // 특정 위험 요소의 상세 정보를 가져오는 함수
  const fetchDangerDetail = async (dangerId) => {
    try {
      const dangerDetail = await getDangerDetail(dangerId);
      setSelectedDanger(dangerDetail);
      openDangerDetailModal(); // 위험 상세 모달 열기
    } catch (error) {
      console.error("Error fetching danger detail:", error);
    }
  };

  // 초기 데이터 가져오기
  useEffect(() => {
    fetchDangers();
  }, []);

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
        {/* 내 위치 마커 (항상 지도 중심에 표시) */}
        <Marker
          coordinate={{
            latitude: 37.5585, // 지도 중심의 위도
            longitude: 127.0001, // 지도 중심의 경도
          }}
          title="내 위치"
        >
          <Image
            source={require("../DetailsScreen/assets/My.png")} // My.png 이미지 경로
            style={{ width: 40, height: 47 }}
          />
        </Marker>

        {/* 필터에 따라 마커 표시 */}
        {selectedFilter === "경비실" && (
          <Marker
            coordinate={{ latitude: 37.5587, longitude: 127.0003 }}
            title="경비실 1"
          >
            <Image
              source={require("../DetailsScreen/assets/Marker1.png")}
              style={{ width: 25, height: 25 }}
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
        )}

        {selectedFilter === "위험구역" &&
          dangers.map((danger) => (
            <Marker
              key={danger.dangerId}
              coordinate={{
                latitude: danger.latitude,
                longitude: danger.longitude,
              }}
              title={danger.buildingName}
              pinColor="red"
              onPress={() => fetchDangerDetail(danger.dangerId)}
            >
              <Image
                source={require("../DetailsScreen/assets/Marker2.png")}
                style={{ width: 25, height: 25 }}
              />
              <Callout>
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutTitle}>{danger.buildingName}</Text>
                  <Text style={styles.calloutDescription}>
                    {danger.content}
                  </Text>
                </View>
              </Callout>
            </Marker>
          ))}

        {selectedFilter === "인구 밀집도" && (
          <Polygon
            coordinates={[
              { latitude: 37.5582, longitude: 127.0001 },
              { latitude: 37.5585, longitude: 127.001 },
              { latitude: 37.559, longitude: 127.0008 },
              { latitude: 37.5593, longitude: 127.0002 },
            ]}
            fillColor="rgba(255, 0, 0, 0.3)"
            strokeColor="rgba(255, 0, 0, 0.7)"
          />
        )}
      </MapView>

      {/* 상단 바 */}
      <View style={styles.header}>
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

        <TouchableOpacity style={styles.filterButton} onPress={openModal}>
          <Image
            style={styles.filterIcon}
            resizeMode="cover"
            source={require("../DetailsScreen/assets/Group.png")}
          />
        </TouchableOpacity>
      </View>

      {/* Modal - 필터 모달 */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
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
            <Text style={styles.filterTitle}>Filter</Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filterButtonsContainer}
            >
              <TouchableOpacity
                onPress={() => handleFilterSelect("경비실")}
                style={styles.filterOption}
              >
                <Image
                  source={require("../DetailsScreen/assets/security.png")}
                  style={{ width: 28, height: 25, marginBottom: 8 }}
                />
                <Text style={styles.filterText}>경비실</Text>
                <Text style={styles.filterDescription}>security office</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleFilterSelect("인구 밀집도")}
                style={styles.filterOption}
              >
                <Image
                  source={require("../DetailsScreen/assets/Population.png")}
                  style={{ width: 25, height: 22, marginBottom: 8 }}
                />
                <Text style={styles.filterText}>인구 밀집도</Text>
                <Text style={styles.filterDescription}>population density</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleFilterSelect("위험구역")}
                style={styles.filterOption}
              >
                <Image
                  source={require("../DetailsScreen/assets/Danger.png")}
                  style={{ width: 25, height: 22, marginBottom: 8 }}
                />
                <Text style={styles.filterText}>위험구역</Text>
                <Text style={styles.filterDescription}>danger Zone</Text>
              </TouchableOpacity>
            </ScrollView>

            <View style={styles.bottomSection}>
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

      {/* 위험 상세 정보 모달 */}
      <Modal
        visible={isDangerDetailModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeDangerDetailModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={closeDangerDetailModal}
              style={styles.closeButton}
            >
              <Image
                style={styles.closeButtonImage}
                source={require("../DetailsScreen/assets/Delete.png")}
              />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>위험 상세 정보</Text>

            {/* 위험 정보와 이미지 */}
            {selectedDanger && (
              <>
                <Text style={styles.modalText}>{selectedDanger.content}</Text>
                {selectedDanger.imageUrl && (
                  <Image
                    source={{ uri: selectedDanger.imageUrl }}
                    style={styles.modalImage}
                  />
                )}
              </>
            )}

            <TouchableOpacity
              style={styles.alertButton}
              onPress={closeDangerDetailModal}
            >
              <Text style={styles.alertButtonText}>닫기</Text>
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
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    alignItems: "center",
    marginTop: -10,
    zIndex: 3,
  },
  infoPanel: {
    backgroundColor: "#011F4C",
    padding: 20,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    zIndex: 2,
    marginBottom: -20,
    width: "100%",
    height: "130",
  },
  infoTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 10,
  },
  infoTitle: {
    fontSize: 23,
    fontWeight: "bold",
    color: "white",
    marginRight: 10,
  },
  infoSubtitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  arrowImage: {
    width: 16,
    height: 16,
    marginRight: 5,
    marginBottom: 10,
  },
  infoSubtitle: {
    fontSize: 14,
    color: "#DBDBDB",
    marginBottom: 10,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 20,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DBDBDB",
  },
  closeButtonImage: {
    width: 20,
    height: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalImage: {
    width: 300,
    height: 200,
    borderRadius: 10,
    resizeMode: "cover",
    marginBottom: 20,
  },
  alertButton: {
    backgroundColor: "#FFEB3B",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    width: 250,
  },
  alertButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  filterTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    marginRight: 320,
    color: "#969696",
  },
  filterButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  filterOption: {
    borderStyle: "solid",
    borderColor: "#e8e8e8",
    borderWidth: 1,
    padding: 15,
    borderRadius: 16,
    width: 136,
    height: 89,
    alignItems: "center",
    marginRight: 15,
  },
  filterText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  filterDescription: {
    fontSize: 9,
    color: "gray",
  },
});

export default DetailsScreen;
