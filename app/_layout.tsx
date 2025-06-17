import { Slot, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { usePushNotifications } from "../usePushNotifications";

export default function RootLayout() {
  const { expoPushToken, notification } = usePushNotifications();
  const data = JSON.stringify(notification, undefined, 2);  
  
  console.log("Token: ", expoPushToken);
  console.log("App: ", data);

  return (
    <AuthProvider>
      <LayoutWithAuth />
    </AuthProvider>
  );
}

function LayoutWithAuth() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.replace('./login');
      } else {
        router.replace('./home');
      }
    } 
  }, [loading, isAuthenticated]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Slot />;
}