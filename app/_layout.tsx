import { Stack } from 'expo-router';
import { AuthProvider } from '../context/AuthContext';

export default function RootLayout() {
  return (
    // Pastikan AuthProvider tetap membungkus semua navigasi
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        {/* Opsi ini akan merender semua screen di dalam folder (tabs) */}
        <Stack.Screen name="(tabs)" />
        
        {/* Opsi ini akan merender screen baca buku */}
        <Stack.Screen name="read" />
        {/* Tambahkan dua baris ini */}
        <Stack.Screen name="admin/manage-books" options={{ headerShown: true, title: 'Admin Panel', headerStyle: { backgroundColor: '#181818'}, headerTintColor: '#fff' }}/>
        <Stack.Screen name="admin/book-form" options={{ presentation: 'modal', headerShown: true, title: 'Book Form', headerStyle: { backgroundColor: '#181818'}, headerTintColor: '#fff' }}/>
      </Stack>
    </AuthProvider>
  );
}
