import axios from 'axios'; 

const baseURL = 'https://hacker-news.firebaseio.com/v0';
const options = {
    baseURL: baseURL,
    responseType: 'json',
};

const instance = axios.create(options); 

export default instance;