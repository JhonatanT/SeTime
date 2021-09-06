import axios from "axios";
import { parseCookies } from "nookies";

export function getAPIClient(ctx?: any) {

    const api = axios.create({
        baseURL: 'http://localhost:3030/'
    });

    const { 'SetTimetoken': token } = parseCookies(ctx);

    if (token) {
        api.defaults.headers.authorization = `Bearer ${token}`
    }

    return api

}