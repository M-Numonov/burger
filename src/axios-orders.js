import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-9f4db-default-rtdb.europe-west1.firebasedatabase.app/'
});
export default instance;