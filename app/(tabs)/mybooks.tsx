import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../../supabaseClient';
import { useAuth } from '../../context/AuthContext';

export default function MyBooks() {
  const router = useRouter();
  const { user } = useAuth();
  const [myBooks, setMyBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const fetchMyBooks = async () => {
        setLoading(true);
        const { data, error } = await supabase
          .from('rentals')
          .select(`
            id,
            books (
              id, title, author
            )
          `)
          .eq('user_id', user.id);

        if (error) {
          console.error("Error fetching my books: ", error);
        } else if (data) {
          // ==========================================================
          // PERUBAHAN KRUSIAL ADA DI SINI:
          // Kita filter dulu untuk memastikan 'books' tidak null
          const formattedBooks = data
            .filter(rental => rental.books) // <-- BARIS INI YANG MEMPERBAIKI
            .map(rental => rental.books);
          // ==========================================================
          
          setMyBooks(formattedBooks);
        }
        setLoading(false);
      };

      fetchMyBooks();
    } else {
      setMyBooks([]);
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return <View style={styles.centered}><ActivityIndicator size="large" color="#FFD700" /></View>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Books</Text>
      <FlatList
        data={myBooks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.bookItem}
            onPress={() => router.push({
              pathname: '/read',
              params: { id: item.id, title: item.title, author: item.author }
            })}
          >
            <Text style={styles.bookTitle}>{item.title}</Text>
            <Text style={styles.bookAuthor}>{item.author}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>You have no books yet.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#181818' },
  container: { flex: 1, backgroundColor: '#181818', padding: 18, paddingTop: 40, },
  header: { color: '#fff', fontSize: 22, fontWeight: '700', marginBottom: 18, letterSpacing: 0.5 },
  listContent: { paddingBottom: 24 },
  bookItem: { backgroundColor: '#232323', paddingVertical: 18, paddingHorizontal: 16, borderRadius: 12, marginBottom: 16 },
  bookTitle: { color: '#fff', fontSize: 17, fontWeight: '600', marginBottom: 4 },
  bookAuthor: { color: '#bbb', fontSize: 15 },
  emptyText: { color: '#888', textAlign: 'center', fontSize: 16, marginTop: 32 },
});