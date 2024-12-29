import axios from "axios";


axios.defaults.baseURL = "http://localhost:8081/api/";

const responseBody = (response) => response.data;

const requests = {
    get: (url) => axios.get(url).then(responseBody),
    post: (url, body) => axios.post(url, body).then(responseBody),
    put: (url, body) => axios.put(url, body).then(responseBody),
    delete: (url) => axios.delete(url).then(responseBody)
};


const Drivers = {
    listAll: () => requests.get("drivers"),
    listOne: (id) => requests.get(`drivers/${id}`),
    addDriver: (driver) => requests.post("drivers", driver),
    editDriver: (id, driver) => requests.put(`drivers/${id}`, driver),
    deleteDriver: (id) => requests.delete(`drivers/${id}`)
};

const Passengers = {
    listAll: () => requests.get("passengers"),
    listOne: (id) => requests.get(`passengers/${id}`),
    addPassenger: (passenger) => requests.post("passengers", passenger),
    editPassenger: (id, passenger) => requests.put(`passengers/${id}`, passenger),
    deletePassenger: (id) => requests.delete(`passengers/${id}`)
};

const Rides = {
    listAll: () => requests.get("rides"),
    listOne: (id) => requests.get(`rides/${id}`),
    requestRide: (passengerId, destX, destY) =>
        axios.post("rides/request", null, {
            params: { passengerId, destX, destY }
        }),
    startRide: (id) => requests.post(`rides/${id}/start`),
    endRide: (id) => requests.post(`rides/${id}/end`)
};

const agent = {
    Drivers,
    Passengers,
    Rides
}

export default agent;