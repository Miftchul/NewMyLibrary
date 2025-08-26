import 'react-native-url-polyfill/auto'; // Diperlukan untuk Supabase di React Native
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://batyldwfqsxfnnvdzghs.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhdHlsZHdmcXN4Zm5udmR6Z2hzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYyMzY5NDIsImV4cCI6MjA3MTgxMjk0Mn0.t-B2EsUANto4ESoXvgNUybjl5vyXpLbML5MRacfqaHo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);