import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://reactburger-de030.firebaseio.com'
});

export default instance;