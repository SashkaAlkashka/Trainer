import { instance } from "../api/axios.api";
import { IUserData } from "../types/types";

export const AuthService = {
    async registration(userData: IUserData) {
        const { data } = await instance.post<IUserData>('/auth/register', userData);
        return data;
    }, 
    async login(userData: IUserData) {
        const { data } = await instance.post<IUserData>('/auth/login', userData);
        return data;
    },
    async guest() {
        const { data } = await instance.post<IUserData>('/auth/guest');
        return data;
    },
}