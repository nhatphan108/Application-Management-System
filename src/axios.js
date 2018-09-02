import axios from 'axios';

const myaxios = axios.create({
    baseURL:'https://react-http-b8247.firebaseio.com/'
});
export default myaxios;