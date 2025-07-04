//Here we will have different states and functions we can use in different components

import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
    //The below are the few states of user
    authUser:null ,
    //isSingingUp jo state hai will be true when user is signing up matlab ki jab wo form fill karke and submit karega tab ... aayega uske liye
    isSigningUp : false ,
    isLoggingIn : false , 
    isUpdatingProfile : false ,
    //ischeckingAuth will check after every refresh if its authenticated or not
    isCheckingAuth : true ,

    checkAuth : async() => {
        try {
            const res = await axiosInstance.get("/auth/check") ;
            set({authUser : res.data}) ;
        } catch (error) {
            console.log("Error in checkAuth");
            
            set({authUser : null})
        }finally {
            set({isCheckingAuth : false}) ;
        }
    }, 

    signup :async(data) => {
        set({isSigningUp : true}) ; 
        try {
            const res = await axiosInstance.post("/auth/signup" , data) ;
            set({authUser : res.data}) ;
            toast.success("Account created successfully") ;
            
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred during signup") ;
        } finally {
            set({isSigningUp : false}) ;
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true });
        try {
        const res = await axiosInstance.post("/auth/login", data);
        set({ authUser: res.data });
        toast.success("Logged in successfully");

        get().connectSocket();
        } catch (error) {
        toast.error(error.response.data.message);
        } finally {
        set({ isLoggingIn: false });
        }
    },

    logout: async () => {
        try {
        await axiosInstance.post("/auth/logout");
        set({ authUser: null });
        toast.success("Logged out successfully");
        //   get().disconnectSocket();
        } catch (error) {
        toast.error(error.response.data.message);
        }
    },

    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
          const res = await axiosInstance.put("/auth/update-profile", data);
          set({ authUser: res.data });
          toast.success("Profile updated successfully");
        } catch (error) {
          console.log("error in update profile:", error);
          toast.error(error.response.data.message);
        } finally {
          set({ isUpdatingProfile: false });
        }
      },



}))