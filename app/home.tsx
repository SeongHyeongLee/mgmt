import { Button, Text, View } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { logout } = useAuth();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Screen (Protected)</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}
