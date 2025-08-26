import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { supabase } from '../../supabaseClient';
import { Ionicons } from '@expo/vector-icons';

interface Book { id: string; title: string; author: string; }

export default function ManageBooksScreen() {
  const router = useRouter();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    const { data, error } = await supabase.from('books').select('id, title, author');
    if (error) Alert.alert('Error', 'Could not fetch books.');
    else setBooks(data || []);
    setLoading(false);
  };

  // useFocusEffect akan menjalankan fetchBooks setiap kali layar ini dibuka/kembali
  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      fetchBooks();
    }, [])
  );

  const handleDelete = async (bookId: string, bookTitle: string) => {
    Alert.alert(
      'Delete Book',
      `Are you sure you want to delete "${bookTitle}"? This cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const { error } = await supabase.from('books').delete().eq('id', bookId);
            if (error) Alert.alert('Error', 'Could not delete the book.');
            else fetchBooks(); // Refresh list setelah delete
          },
        },
      ]
    );
  };
  
  if (loading) return <View style={styles.centered}><ActivityIndicator/></View>

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Manage Books</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => router.push('/admin/book-form')}>
          <Ionicons name="add" size={24} color="#fff" />
          <Text style={styles.addButtonText}>Add Book</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.bookItem}>
            <View style={styles.bookInfo}>
              <Text style={styles.bookTitle}>{item.title}</Text>
              <Text style={styles.bookAuthor}>{item.author}</Text>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => router.push({ pathname: '/admin/book-form', params: { id: item.id }})}>
                <Ionicons name="pencil" size={24} color="#007AFF" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item.id, item.title)}>
                <Ionicons name="trash-bin" size={24} color="#D32F2F" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}
// ... (Styles ada di bawah)
const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#181818' },
  container: { flex: 1, backgroundColor: '#181818', padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  headerTitle: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  addButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#007AFF', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8 },
  addButtonText: { color: '#fff', marginLeft: 8, fontWeight: 'bold' },
  bookItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, backgroundColor: '#232323', borderRadius: 8, marginBottom: 10 },
  bookInfo: { flex: 1 },
  bookTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  bookAuthor: { color: '#aaa', fontSize: 14 },
  actions: { flexDirection: 'row', width: 60, justifyContent: 'space-between' },
  input: { backgroundColor: '#232323', color: '#fff', borderRadius: 10, padding: 15, marginBottom: 15, fontSize: 16 },
  button: { backgroundColor: '#007AFF', padding: 15, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});