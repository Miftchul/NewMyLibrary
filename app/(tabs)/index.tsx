import React, { useState, useCallback } from 'react';
import { Image } from 'expo-image';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router'; // <-- Perubahan di sini
import { supabase } from '../../supabaseClient';

interface Book {
  id: string;
  title: string;
  author: string;
  cover_image_url: string;
}

export default function LibraryScreen() {
  const router = useRouter();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  // --- PERUBAHAN UTAMA DI SINI ---
  // Menggunakan useFocusEffect agar data di-fetch setiap kali layar ini aktif/dibuka
  useFocusEffect(
    useCallback(() => {
      const fetchBooks = async () => {
        // Jangan set loading di sini agar refresh terasa lebih mulus
        const { data, error } = await supabase.from('books').select('*');

        if (error) {
          console.error('Error fetching books:', error);
        } else {
          setBooks(data || []);
        }
        setLoading(false); // Set loading false setelah data didapat
      };

      fetchBooks();
    }, [])
  );

  if (loading) {
    return <View style={styles.centered}><ActivityIndicator size="large" color="#FFD700" /></View>;
  }

  return (
    <View style={styles.container}>
      <SectionHeader title="You might like" />
      <FlatList
        data={books}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.flatListHorizontal}
        renderItem={({ item }) => <BookCard item={item} router={router} />}
      />

      <SectionHeader title="Popular Books" />
      <FlatList
        data={books}
        numColumns={2}
        key={'popular-books-2-cols'}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.flatListVertical}
        renderItem={({ item }) => <PopularBookCard item={item} router={router} />}
      />
    </View>
  );
}

// -- Komponen-komponen Helper (Tidak ada perubahan) --

function BookCard({ item, router }: { item: Book; router: any }) {
  return (
    <TouchableOpacity
      style={styles.bookCard}
      onPress={() => router.push({ 
        pathname: '/read', 
        params: { id: item.id, title: item.title, author: item.author } 
      })}
    >
      <Image source={{ uri: item.cover_image_url }} style={styles.bookImage} />
      <Text style={styles.bookTitle} numberOfLines={1}>{item.title}</Text>
      <Text style={styles.bookAuthor} numberOfLines={1}>{item.author}</Text>
    </TouchableOpacity>
  );
}

function PopularBookCard({ item, router }: { item: Book, router: any }) {
  return (
    <TouchableOpacity 
      style={styles.popularBookCard}
      onPress={() => router.push({
        pathname: '/read',
        params: { id: item.id, title: item.title, author: item.author }
      })}
    >
      <Image source={{ uri: item.cover_image_url }} style={styles.popularBookImage} />
    </TouchableOpacity>
  );
}

function SectionHeader({ title, hideMore }: { title: string; hideMore?: boolean }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {!hideMore && (
        <TouchableOpacity>
          <Text style={styles.moreText}>More</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#181818' },
  container: { flex: 1, backgroundColor: '#181818', paddingHorizontal: 16, paddingTop: 40 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, marginTop: 8 },
  sectionTitle: { color: '#fff', fontSize: 20, fontWeight: '700', letterSpacing: 0.5 },
  moreText: { color: '#FFD700', fontSize: 15, fontWeight: '500' },
  flatListHorizontal: { paddingBottom: 12, marginBottom: 8 },
  flatListVertical: { paddingBottom: 24 },
  bookCard: { width: 140, marginRight: 16 },
  bookImage: { width: '100%', height: 200, borderRadius: 10, marginBottom: 8 },
  bookTitle: { color: '#fff', fontSize: 15, fontWeight: 'bold', marginBottom: 2 },
  bookAuthor: { color: '#aaa', fontSize: 13 },
  popularBookCard: { flex: 1, margin: 8, alignItems: 'center' },
  popularBookImage: { width: Dimensions.get('window').width / 2.5, height: 230, borderRadius: 10 },
});
// --- PERUBAHAN UTAMA DI SINI ---