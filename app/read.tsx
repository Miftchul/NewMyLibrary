import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../supabaseClient'; // Pastikan path ini benar

export default function ReadBookScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const bookId = params.id as string;
  const bookTitle = params.title as string;
  const bookAuthor = params.author as string;

  const handleAddToMyBooks = async () => {
    // 1. Dapatkan user yang sedang login
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      Alert.alert("Error", "You must be logged in to add books.");
      return;
    }

    // 2. Masukkan data ke tabel 'rentals'
    const { error } = await supabase
      .from('rentals')
      .insert({ user_id: user.id, book_id: bookId });

    if (error) {
      // Cek jika error karena duplikat
      if (error.code === '23505') { // Kode error PostgreSQL untuk unique violation
        Alert.alert("Info", `${bookTitle} is already in your library.`);
      } else {
        Alert.alert("Error", "Could not add the book to your library.");
        console.error(error);
      }
    } else {
      Alert.alert("Success!", `${bookTitle} has been added to My Books.`);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle} numberOfLines={1}>{bookTitle}</Text>
          <Text style={styles.headerAuthor}>{bookAuthor}</Text>
        </View>
        <TouchableOpacity onPress={handleAddToMyBooks} style={styles.addButton}>
          <Ionicons name="add-circle-outline" size={28} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.contentText}>
          Ini adalah halaman untuk membaca buku. Konten lengkap dari buku "{bookTitle}" akan ditampilkan di sini.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#121212' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#1E1E1E',
  },
  backButton: { paddingRight: 15 },
  headerTextContainer: { flex: 1 },
  headerTitle: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  headerAuthor: { color: 'gray', fontSize: 14 },
  addButton: { paddingLeft: 15 },
  contentContainer: { padding: 20 },
  contentText: { color: '#B3B3B3', fontSize: 16, lineHeight: 26 },
});