import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';

export interface User {
  id: number;
  first_name?: string;
  firstName?: string
  last_name?: string;
  lastName?: string;
  phone_number?: string,
  phoneNumber?: string;
  token?: string;
}

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
  hydrated: boolean;
  setHydrated: (hydrated: boolean) => void,
}

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        setUser: (user) => set({ user }),
        clearUser: () => set({ user: null }),
        hydrated: false,
        setHydrated: (hydrated: boolean) => set({hydrated})
      }),
      {
        name: 'user-storage', // ключ в AsyncStorage
        storage: createJSONStorage(() => AsyncStorage),
        onRehydrateStorage: () => (state) => {
          state?.setHydrated(true)
        },
        partialize: (state) => ({ user: state.user }), // сохраняем только user
      }
    ),
    { name: 'UserStore' }
  )
);