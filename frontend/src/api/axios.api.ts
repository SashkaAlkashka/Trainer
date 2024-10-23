import axios from 'axios'
import { getTokenFromLocalStorage } from '../helpers/localstorage.helper'
//http://localhost:3001

export const instance = axios.create(
    {
        baseURL: 'http://localhost:3001',
        headers: {
            Authorization: getTokenFromLocalStorage() ? 'Bearer ' + getTokenFromLocalStorage() : '',
        }
    }
)