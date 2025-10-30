import {create} from 'zustand'
import { axiosInstance } from '../lib/axios';
import { toast } from 'react-hot-toast';

export const useAuthStore = create((set) => ({
    authUser: null,
    isCheckingAuth: true,
    isSigningup: false,

    checkAuth : async () => {
        try {
            const res = await axiosInstance.get('/auth/check-auth');
            set({authUser: res.data})
        } catch (error) {
            console.error("Auth check failed:", error);
            set({authUser: null});
        } finally {
            set({isCheckingAuth: false});
        }
    },

    signup: async (data) => {
        set({isSigningup: true});
        try {
            const res = await axiosInstance.post('/auth/signup', data);
            set({authUser: res.data});
           toast.success("Signup successful!");

        } catch (error) {
            toast.error(error.response?.data?.message || "Signup failed. Please try again.");
        } finally{
        set({isSigningup: false});
        }
    }
    
}));