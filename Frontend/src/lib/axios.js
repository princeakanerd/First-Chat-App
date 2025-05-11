// We'll create an instance that we'll use throughout our app
//Jo daata user ne input kia usko backend pe bhejta hai axios 

// Example use of axios

/*

axios.post("/login", { email, password });




*/

//Also we installed Zustand for Global State management for authenticated users
import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:5001/api",
    //On making it true we can send cookies with every request 
    withCredentials: true
})