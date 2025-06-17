import { useRouter } from 'expo-router';
import { Button, Text, View } from 'react-native';
import { useAuth } from '../context/AuthContext';
import '../global.css';

export default function Login() {
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    // 서버로부터 JWT를 받아오는 과정 (여기선 모의로 처리)
    const jwt_token = 'your.jwt.token';
    const refresh_token = 'your.jwt.token';
    await login(jwt_token, refresh_token);
    router.replace('./home');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Login Screen</Text>
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}
