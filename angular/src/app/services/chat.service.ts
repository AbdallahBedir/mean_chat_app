import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ChatService {

  constructor(private _http:Http)  { 

  }
  
  getRooms(){
    return this._http.get('http://localhost:3000/api/rooms/')
            .map(res => res.json());
  }

  addRoom(roomName){
    return this._http.post('http://localhost:3000/api/rooms/',{name:roomName})
            .map(res => res.json());
  }

  removeRoom(id){
    return this._http.delete(`http://localhost:3000/api/rooms/${id}`)
            .map(res => res.json());
  }

  addMessageToChat(message){
    return this._http.post('http://localhost:3000/api/chat/',message)
            .map(res => res.json());
  }

  getRoomMessages(roomId){
    return this._http.get(`http://localhost:3000/api/chat/?roomId=${roomId}`)
            .map(res => res.json());
  }

}
