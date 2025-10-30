import {create} from 'zustand'

export const useAuthStore = create((set) => ({
    authUser: {name: "harsh",_id: "12345",age: 21},
    isLoaggedIn: false,

    login:()=>{
        console.log("login called")
        set({isLoaggedIn:true})
    },
    
}))