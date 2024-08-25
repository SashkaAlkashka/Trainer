import { instance } from "../api/axios.api";
import { IUserData } from "../types/types";

export const AuthService = {
    async registration(userData: IUserData) {
        const {data} = await instance.post<IUserData>('user', userData)
        return data
    }, 
    async login() {},
}