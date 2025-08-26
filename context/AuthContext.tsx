import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { supabase } from '../supabaseClient'; // Pastikan path ini benar
import { Session, User } from '@supabase/supabase-js';

// Definisikan tipe untuk value yang akan kita sediakan
interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  // Kita tidak perlu lagi fungsi login/logout manual di sini
  // karena Supabase client akan menanganinya secara otomatis
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ambil sesi yang sedang berjalan saat aplikasi pertama kali dimuat
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getInitialSession();

    // Listener ini akan "mendengarkan" setiap perubahan status auth (LOGIN, LOGOUT)
    // dan secara otomatis memperbarui state di seluruh aplikasi
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    // Berhenti "mendengarkan" saat komponen tidak lagi digunakan
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const value = {
    user,
    session,
    loading,
  };

  // Tampilkan loading screen jika sesi belum siap, atau tampilkan aplikasi
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook untuk mempermudah penggunaan context di komponen lain
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};