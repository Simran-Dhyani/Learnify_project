import axios from "axios";
const API=import.meta.env.VITE_API_URL;
const authService={ async register(data){

    const formData = new FormData();
    formData.append("fullname", data.fullname);
    formData.append("email", data.email);
    formData.append("username", data.username);
    formData.append("password", data.password);
    formData.append("avatar", data.avatar);

    if(data.coverImage){
        formData.append("coverImage", data.coverImage);
    }

    const res = await axios.post(
        `${API}/api/v1/users/register`,
        formData,
        {
            withCredentials:true,
            headers:{
                "Content-Type":"multipart/form-data"
            }
        }
    );

    return res.data.data;
},
async login(data){
    const res=await axios.post(`${API}/api/v1/users/login`,data,{withCredentials:true});
    return res.data.data;
},
async getUser(){
    try {
        const res=await axios.get(`${API}/api/v1/users/current-user`,{withCredentials:true});
        return res.data.data;
    } catch (error) {
        return null;
    }
},
async getWatchHistory() {
    console.log(`${API}/api/v1/watch-history`);
    const res = await axios.get(
        `${API}/api/v1/watch-history`,
        {
            withCredentials: true,
        }
    );

   console.log("AXIOS RESPONSE =", res);
    console.log("AXIOS RESPONSE DATA =", res.data);


    return res.data.data;
},
 async addToWatchHistory({
    videoId,
    videoTitle,
    thumbnail,
}) {
    const res = await axios.post(
        `${API}/api/v1/watch-history`,
        {
            videoId,
            videoTitle,
            thumbnail,
        },
        {
            withCredentials: true,
        }
    );

    return res.data.data;
},


async updateAccount(data) {
    const res = await axios.patch(
        `${API}/api/v1/users/update-account`,
        data,
        {
            withCredentials: true,
        }
    );

    return res.data.data;
},

async changePassword(data) {
    const res = await axios.post(
        `${API}/api/v1/users/change-password`,
        data,
        {
            withCredentials: true,
        }
    );

    return res.data.data;
},

async updateAvatar(file) {
    const formData = new FormData();
    formData.append("avatar", file);

    const res = await axios.patch(
        `${API}/api/v1/users/avatar`,
        formData,
        {
            withCredentials: true,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return res.data.data;
},

async updateCoverImage(file) {
    const formData = new FormData();
    formData.append("coverImage", file);

    const res = await axios.patch(
        `${API}/api/v1/users/cover-image`,
        formData,
        {
            withCredentials: true,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return res.data.data;
},
async logout(){
 await axios.post(`${API}/api/v1/users/logout`,{},{withCredentials:true});
    
}



}
export default authService;