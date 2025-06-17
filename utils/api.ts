import axios from 'axios';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

const router = useRouter();
const api = axios.create({
  baseURL: 'https://your-api-url.com',
});

// 요청에 토큰 자동 추가
api.interceptors.request.use(async (config) => {
  const jwt_token = await SecureStore.getItemAsync('jwt_token');
  if (jwt_token) {
    config.headers.Authorization = `Bearer ${jwt_token}`;
  }
  return config;
});

// 응답에서 401 처리
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 액세스 토큰 만료 시, 새 토큰 요청
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      await SecureStore.getItemAsync('refresh_token')
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = await SecureStore.getItemAsync('refresh_token');
        const res = await axios.post('https://your-api-url.com/refresh', {
          refreshToken,
        });

        const newAccessToken = res.data.jwt_token;
        const nrwRefreshToken = res.data.refresh_token;
        await SecureStore.setItemAsync('jwt_token', newAccessToken);
        await SecureStore.setItemAsync('refresh_token', nrwRefreshToken);

        // 다시 원래 요청 재시도
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // 리프레시 실패 → 로그아웃
        await SecureStore.deleteItemAsync('jwt_token');
        await SecureStore.deleteItemAsync('refresh_token');
        // 로그인 화면으로 이동 등 추가 처리
        router.replace('./login');
      }
    }

    return Promise.reject(error);
  }
);

export default api;
