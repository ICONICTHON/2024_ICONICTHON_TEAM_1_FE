import axios from "axios";

const BASE_URL =
  "http://ec2-3-37-57-36.ap-northeast-2.compute.amazonaws.com:8080/api/danger";

// 모든 위험 요소 목록을 가져오는 함수
export const getAllDangers = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching all dangers:", error);
    throw error;
  }
};

// 특정 위험 요소의 상세 정보를 가져오는 함수
export const getDangerDetail = async (dangerId) => {
  try {
    const response = await axios.get(`${BASE_URL}/detail/${dangerId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching danger detail for ID ${dangerId}:`, error);
    throw error;
  }
};
