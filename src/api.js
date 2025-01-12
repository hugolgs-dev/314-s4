import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json'
    },
});

/* On défini dans le frontend les méthodes HTTP utilisées dans le backend */

export default {
    getUsers(){
        return api.get('/users');
    },
    getOneUser(id){
        return api.get(`/users/${id}`);
    },
    createUser(user){
        return api.post('/users', user);
    },
    updateUser(id,user){
        return api.put(`/users/${id}`, user);
    },
    deleteUser(id){
        return api.delete(`/users/${id}`);
    },
};