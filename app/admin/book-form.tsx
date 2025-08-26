import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { supabase } from '../../supabaseClient';

export default function BookFormScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const bookId = params.id as string | undefined;

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (bookId) {
      setLoading(true);
      const fetchBook = async () => {
        const { data, error } = await supabase.from('books').select('*').eq('id', bookId).single();
        if (error) Alert.alert('Error', 'Could not fetch book details.');
        else if (data) {
          setTitle(data.title);
          setAuthor(data.author || '');
          setCoverUrl(data.cover_image_url || '');
        }
        setLoading(false);
      };
      fetchBook();
    }
  }, [bookId]);

  const handleSubmit = async () => {
    setLoading(true);
    let error;
    if (bookId) {
      // Update mode
      ({ error } = await supabase.from('books').update({ title, author, cover_image_url: coverUrl }).eq('id', bookId));
    } else {
      // Create mode
      ({ error } = await supabase.from('books').insert({ title, author, cover_image_url: coverUrl }));
    }

    if (error) Alert.alert('Error', 'Could not save the book.');
    else router.back(); // Kembali ke halaman manage-books
    setLoading(false);
  };

  if (loading && bookId) return <View style={styles.centered}><ActivityIndicator/></View>

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>{bookId ? 'Edit Book' : 'Add New Book'}</Text>
      <TextInput style={styles.input} placeholder="Book Title" value={title} onChangeText={setTitle} placeholderTextColor="#888"/>
      <TextInput style={styles.input} placeholder="Author" value={author} onChangeText={setAuthor} placeholderTextColor="#888"/>
      <TextInput style={styles.input} placeholder="Cover Image URL" value={coverUrl} onChangeText={setCoverUrl} placeholderTextColor="#888"/>
      <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff"/> : <Text style={styles.buttonText}>Save Book</Text>}
      </TouchableOpacity>
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