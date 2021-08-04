import axios from "axios";
import Constants from 'expo-constants';
import { users } from "../Global_Values/Global_Functions";

const API = axios.create({baseURL: Constants.manifest.extra.SERVER_URL});

API.interceptors.request.use((req) => {
    users().then(res => {
        if(res)
            req.headers.Authorization = `Bearer ${res.token}`;
    })
    return req;
});

export const signin = (data) => API.post("/60ec22bf68ae611a0b961442/signin", data);
export const signup = (data) => API.post("/60ec22bf68ae611a0b961442/signup", data);
export const updateProfile = (id,data) => API.patch(`/60ec22bf68ae611a0b961442/update/${id}`, data);

export const fetchPlaylist = (id) => API.get(`/60f244dd188779be8fe61cb8/${id}`);
export const createPlaylist = (id,data) => API.patch(`/60f244dd188779be8fe61cb8/create/${id}`, data);
export const deletePlaylist = (id,data) => API.patch(`/60f244dd188779be8fe61cb8/delete/${id}`, data);

export const getMusic = () => API.get("/60f245b3188779be8fe61cbe/music");
export const likeMusic = (id,data) => API.patch(`/60f245b3188779be8fe61cbe/${id}`, data);
export const createMusic = (data) => API.post("/60f245b3188779be8fe61cbe/create", data);

export default API;