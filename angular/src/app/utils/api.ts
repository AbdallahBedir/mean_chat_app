import { environment as Environment } from '../../environments/environment';

/**
 * The URL endpoint to connect the app to the staging server or to the testing server
 * @type {string}
 */
export const URL = Environment.production ?  "http://localhost:3000/api" : "http://localhost:3000/api";

/**
 * An Object that holds all the api endpoints of the backend
 * @type {Object}
 */
export const API = {
    URL: URL,
    Room:{
        getRooms:`${URL}/rooms`,
        addRoom:`${URL}/rooms`,
        removeRoom:`${URL}/rooms`,
    },
    Chat:{
        addMessageToChat:`${URL}/chat`,
        getRoomMessages:`${URL}/chat`,
    }
};