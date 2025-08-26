import React, { useState } from 'react';
// PERUBAHAN 1: Import useRouter dan TouchableOpacity
import { View, TextInput, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

// PERUBAHAN 2: Tambahkan data 'author' agar konsisten dengan halaman 'read'
const DATA = [
  { id: '1', title: 'React Native', author: 'Facebook' },
  { id: '2', title: 'TypeScript', author: 'Microsoft' },
  { id: '3', title: 'JavaScript', author: 'Brendan Eich' },
  { id: '4', title: 'Expo', author: 'Expo Team' },
  { id: '5', title: 'Redux', author: 'Dan Abramov' },
];

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  // PERUBAHAN 3: Ambil instance router
  const router = useRouter();

  const filteredData = DATA.filter(item =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Search</Text>
      <TextInput
        style={styles.input}
        placeholder="Type to search..."
        placeholderTextColor="#aaa"
        value={query}
        onChangeText={setQuery}
        clearButtonMode="while-editing"
      />
      <FlatList
        data={filteredData}
        keyExtractor={item => item.id}
        // PERUBAHAN 4: Ubah renderItem agar bisa diklik dan navigasi
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.item}
            onPress={() => router.push({
              pathname: '/read',
              params: { title: item.title, author: item.author }
            })}
          >
            <Text style={styles.itemText}>{item.title}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No results found.</Text>
        }
        contentContainerStyle={
          filteredData.length === 0 ? { flex: 1, justifyContent: 'center' } : undefined
        }
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',
    padding: 18,
    paddingTop: 40, // Tambah padding atas
  },
  header: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 18,
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: '#232323',
    color: '#fff',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 18,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  item: {
    backgroundColor: '#232323',
    paddingVertical: 18,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.10,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  itemText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  emptyText: {
    color: '#888',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 32,
  },
});
