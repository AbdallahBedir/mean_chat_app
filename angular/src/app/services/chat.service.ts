import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { API } from '../utils/api';
import 'rxjs/add/operator/map';

@Injectable()
export class ChatService {

  constructor(private _http:Http)  { 

  }
  
  getRooms(){
    return this._http.get(`${API.Room.getRooms}/`)
            .map(res => res.json());
  }

  addRoom(roomName){
    return this._http.post(`${API.Room.addRoom}/`,{name:roomName})
            .map(res => res.json());
  }

  removeRoom(id){
    return this._http.delete(`${API.Room.addRoom}/${id}`)
            .map(res => res.json());
  }

  addMessageToChat(message){
    return this._http.post(`${API.Chat.addMessageToChat}/`,message)
            .map(res => res.json());
  }

  getRoomMessages(roomId){
    return this._http.get(`${API.Chat.getRoomMessages}/?roomId=${roomId}`)
            .map(res => res.json());
  }

}
