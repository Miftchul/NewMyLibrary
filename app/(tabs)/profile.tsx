import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../supabaseClient';
import { useRouter } from 'expo-router'; // <-- 1. Import useRouter

// Asumsi komponen Login & Register sudah ada di folder components
import LoginScreen from '../../components/LoginScreen';
import RegistrationScreen from '../../components/RegistrationScreen';

// --- TENTUKAN EMAIL ADMIN DI SINI ---
// Ganti dengan email user di Supabase yang ingin kamu jadikan admin
const ADMIN_EMAIL = "botcomputer941@gmail.com"; 

// Komponen untuk Tampilan Profil (jika sudah login)
const UserProfile = () => {
  const { user } = useAuth(); 
  const router = useRouter(); // <-- 2. Panggil hook router

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert("Error", "Could not log out.");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarWrapper}>
        <Image
          source={{ uri: `https://i.pravatar.cc/150?u=${user?.id}` }}
          style={styles.avatar}
        />
      </View>
      <Text style={styles.name}>Welcome!</Text>
      <Text style={styles.email}>{user?.email}</Text>
      
      {/* 3. Tombol Admin hanya muncul jika email cocok */}
      {user?.email === ADMIN_EMAIL && (
        <TouchableOpacity 
          style={styles.adminButton} 
          onPress={() => router.push('/admin/manage-books')}
        >
          <Text style={styles.adminButtonText}>Manage Books (Admin)</Text>
        </TouchableOpacity>
      )}

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>About Me</Text>
        <Text style={styles.infoText}>
          This is a profile with a dark theme. Change the information as you need.
        </Text>
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

// Komponen Utama
export default function ProfileScreen() {
  const { session } = useAuth();
  const [isLoginView, setIsLoginView] = useState(true);

  if (session) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#181818' }}>
        <UserProfile />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#181818' }}>
      {isLoginView ? (
        <LoginScreen onSwitchToRegister={() => setIsLoginView(false)} />
      ) : (
        <RegistrationScreen onSwitchToLogin={() => setIsLoginView(true)} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: '5%',
  },
  avatarWrapper: {
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
    borderRadius: 70,
    backgroundColor: '#232323',
    padding: 6,
    marginBottom: 18,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#fff',
  },
  name: {
    color: '#fff',
    fontSize: 23,
    fontWeight: '700',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  email: {
    color: '#bbb',
    fontSize: 15,
    marginBottom: 22,
    letterSpacing: 0.2,
  },
  // 4. Style untuk Tombol Admin
  adminButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#007AFF',
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 20,
  },
  adminButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoContainer: {
    backgroundColor: '#232323',
    padding: 20,
    borderRadius: 14,
    width: '100%',
  },
  infoTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  infoText: {
    color: '#ccc',
    fontSize: 15,
    lineHeight: 22,
  },
  logoutButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#D32F2F',
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 30,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});