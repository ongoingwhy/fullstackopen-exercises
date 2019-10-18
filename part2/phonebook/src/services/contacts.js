import axios from 'axios'

const baseURL = 'http://localhost:3001/persons';

const getAll = () => {
    const promise = axios.get(baseURL);
    return promise.then(response => response.data);
}

const addContact = newObject => {
    const promise = axios.post(baseURL, newObject);
    return promise.then(response => response.data);
}

const removeContact = id => {
    const promise = axios.delete(`${baseURL}/${id}`);
    return promise.then(response => response.data);
}

const editNumber = (newObject) => {
    const promise = axios.put(`${baseURL}/${newObject.id}`, newObject);
    return promise.then(response => response.data);
}

export default {getAll, addContact, removeContact, editNumber}