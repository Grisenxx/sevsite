import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { apiRequest } from '../lib/api';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null, // { username, expiry, session_token, product }
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (username, password, product_id = "severance") => {
        set({ isLoading: true, error: null });
        try {
          const res = await apiRequest({
            login: true,
            username,
            password,
            product_id,
            hwid: "WEB_DASHBOARD",
            timestamp: Date.now()
          });

          if (res.success) {
            set({
              user: {
                username,
                session_token: res.session_token,
                expiry: res.expiry,
                product: product_id
              },
              isAuthenticated: true,
              isLoading: false
            });
            return { success: true };
          }
          throw new Error(res.error || "Login failed");
        } catch (error) {
          set({ error: error.message, isLoading: false });
          return { success: false, error: error.message };
        }
      },

      activate: async (license_key, username, password, product_id = "severance") => {
        set({ isLoading: true, error: null });
        try {
          const res = await apiRequest({
            activate: true,
            license_key,
            username,
            password,
            product_id,
            hwid: "WEB_DASHBOARD",
            timestamp: Date.now()
          });

          if (res.success) {
            set({
              user: {
                username,
                session_token: res.session_token,
                expiry: res.expiry,
                product: product_id
              },
              isAuthenticated: true,
              isLoading: false
            });
            return { success: true };
          }
          throw new Error(res.error || "Activation failed");
        } catch (error) {
          set({ error: error.message, isLoading: false });
          return { success: false, error: error.message };
        }
      },

      extend: async (license_key) => {
        const { user } = get();
        if (!user || !user.session_token) throw new Error("Not authenticated");
        
        set({ isLoading: true, error: null });
        try {
          const res = await apiRequest({
            extend: true,
            session_token: user.session_token,
            license_key,
            product_id: user.product,
            timestamp: Date.now()
          });

          if (res.success) {
            set((state) => ({
              user: { ...state.user, expiry: res.new_expiry || res.expiry },
              isLoading: false
            }));
            return { success: true };
          }
          throw new Error(res.error || "Extension failed");
        } catch (error) {
          set({ error: error.message, isLoading: false });
          return { success: false, error: error.message };
        }
      },

      downloadLoader: async () => {
        const { user } = get();
        if (!user) throw new Error("Not authenticated");
        
        try {
          const res = await apiRequest({
            download: true,
            session_token: user.session_token,
            timestamp: Date.now()
          });
          return res;
        } catch (error) {
          console.error("Download request failed", error);
          throw error;
        }
      },

      claimDiscordRole: async (discordId) => {
        const { user } = get();
        if (!user) throw new Error("Not authenticated");
        if (!discordId || !discordId.trim()) throw new Error("Discord ID is required");
        
        try {
          const res = await apiRequest({
            discord_claim: true,
            session_token: user.session_token,
            discord_id: discordId.trim(),
            timestamp: Date.now()
          });
          return res;
        } catch (error) {
          console.error("Discord claim failed", error);
          throw error;
        }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      heartbeat: async () => {
         const { user, isAuthenticated, logout } = get();
         if (!isAuthenticated || !user?.session_token) return;

         try {
             const res = await apiRequest({
                 heartbeat: true,
                 session_token: user.session_token,
                 timestamp: Date.now()
             });
             if (res.error) throw new Error(res.error);
         } catch (error) {
             console.error("Heartbeat failed, logging out", error);
             logout();
         }
      }
    }),
    {
      name: 'auth-storage',
    }
  )
);

export default useAuthStore;
