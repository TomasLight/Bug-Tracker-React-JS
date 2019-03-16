import axios from "axios";

export class Http {
    public static get(url: string) {
        return axios.get(url);
    }

    public static post(url: string, data?: any) {
        return axios.post(url, data);
    }

    public static put(url: string, data?: any) {
        return axios.put(url, data);
    }

    public static delete(url: string) {
        return axios.delete(url);
    }
}