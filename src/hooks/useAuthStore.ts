import { create } from "zustand";

 type AuthState = {
    accessToken: string | null;
    setAccessToken: (accessToken: string | null) => void;
    logout: () => void;
 }

 export const useAuthStore = create<AuthState>((set) => ({
    accessToken: null,
    setAccessToken: (accessToken) => set({ accessToken: accessToken }),
    logout: () => {
        localStorage.removeItem('refreshToken');
        set({ accessToken: null })},
 }))