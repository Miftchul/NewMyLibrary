import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LibraryScreen from './index';
import SearchScreen from './search';
import MyBooksScreen from './mybooks';
import ProfileScreen from './profile'; // Nama file tetap profile
import { Ionicons } from '@expo/vector-icons';
import { AuthProvider } from '../../context/AuthContext'; // <-- 1. IMPORT AuthProvider

const Tab = createBottomTabNavigator();

export default function Layout() {
  return (
    // <-- 2. BUNGKUS Tab.Navigator dengan AuthProvider
    <AuthProvider> 
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName: React.ComponentProps<typeof Ionicons>['name'] = 'help-outline';
            // Logika ikonmu sudah benar, tidak perlu diubah
            if (route.name === 'Library') iconName = 'home-outline';
            else if (route.name === 'Search') iconName = 'search-outline';
            else if (route.name === 'MyBooks') iconName = 'book-outline';
            else if (route.name === 'Profile') iconName = 'person-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          headerShown: false,
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: '#888',
          // Tambahkan style untuk tab bar agar sesuai dengan tema gelapmu
          tabBarStyle: {
            backgroundColor: '#181818',
            borderTopColor: '#232323'
          }
        })}
      >
        <Tab.Screen name="Library" component={LibraryScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="MyBooks" component={MyBooksScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </AuthProvider>
  );
}
