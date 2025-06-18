import { Ionicons } from '@expo/vector-icons'; // 아이콘 사용
import axios from 'axios';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../context/AuthContext';
import '../global.css';

export default function Login() {
  const { login } = useAuth();
  const router = useRouter();

  const [account_id, setAccount_id] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!account_id) return Alert.alert('아이디를 입력해 주세요.');
    if (!password) return Alert.alert('비밀번호를 입력해 주세요.');

    try {
      // 실제 API 호출 예시
      const res = await axios.post('http://mapi.kvilla.co.kr/login', {
        account_id,
        password,
      });

      const { accessToken, refreshToken } = res.data;
      await login(accessToken, refreshToken); // context 처리
      router.replace('/home');
    } catch (err) {
      console.log(err);
      Alert.alert('error', `${err}`);
    }
  };

  return (
    <View className="flex-1 bg-gradient-to-b from-blue-100 to-white justify-center items-center px-6">
      <Image
        source={require('../assets/images/react-logo.png')}
        style={{ width: 150, height: 50, marginBottom: 12 }}
        resizeMode="contain"
      />
      <Text className="text-lg text-gray-600 mb-8">Sign in to continue</Text>

      <View className="bg-white w-full rounded-3xl shadow-lg p-6">
        {/* Account_id Input */}
        <View className="mb-4">
          <Text className="text-gray-700 font-medium mb-2">아이디</Text>
          <View className="flex-row items-center border border-gray-300 rounded-xl px-3 py-2 bg-gray-50">
            <Ionicons name="person" size={20} color="#6b7280" className="mr-2" />
            <TextInput
              value={account_id}
              onChangeText={setAccount_id}
              placeholder="Enter account_id"
              className="flex-1 text-base text-gray-700"
              placeholderTextColor="#9ca3af"
            />
          </View>
        </View>

        {/* Password Input */}
        <View className="mb-6">
          <Text className="text-gray-700 font-medium mb-2">비밀번호</Text>
          <View className="flex-row items-center border border-gray-300 rounded-xl px-3 py-2 bg-gray-50">
            <Ionicons name="lock-closed" size={20} color="#6b7280" className="mr-2" />
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Enter password"
              secureTextEntry
              className="flex-1 text-base text-gray-700"
              placeholderTextColor="#9ca3af"
            />
          </View>
        </View>

        {/* Login Button */}
        <TouchableOpacity
          onPress={handleLogin}
          className="bg-blue-600 rounded-xl py-3 active:bg-blue-700"
        >
          <Text className="text-white text-center text-lg font-semibold">시작하기</Text>
        </TouchableOpacity>
      </View>

      <Text className="text-sm text-gray-400 mt-10">Don't have an account? 
        <Text className="text-blue-600 font-semibold">Sign up</Text>
      </Text>
    </View>
  );
}
