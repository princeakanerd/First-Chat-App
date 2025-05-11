//Here we will have different states and functions we can use in different components

import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useAuthStore = create((set) => ({
    //The below are the few states of user
    authUser:null ,
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
            
            sessionStorage({authUser : null})
        }finally {
            set({isCheckingAuth : false}) ;
        }
    }
}))