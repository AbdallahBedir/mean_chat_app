import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../../services/chat.service';
import { Message } from '../../interfaces/message';
import { Router } from '@angular/router';

declare var io:any;

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  title = 'welcome';
  socket = io("http://localhost:4000"); 
  roomId:number;
  messages:Message[] = [];
  nickName = "";
  disconnected:boolean = true;

  constructor(private _activatedRoute:ActivatedRoute,
              private _chatService:ChatService,
              private _router:Router){  
  }

  ngOnInit(){
    this.roomId   = this._activatedRoute.snapshot.params["id"];
    this.nickName = this._activatedRoute.snapshot.queryParams["nickname"];
    this._chatService.getRoomMessages(this.roomId).subscribe(res =>{
      this.messages = res.data; 
    });
    this.socket.on('connect', ()=>{
      this.title = "Connected to Cyber Chat";
      if(this.disconnected){
        this.socket.emit(this.roomId,{nickname:this.nickName,roomId:this.roomId,message:'Joined the room',createdAt:new Date()});
        this.addMessageToDatabase({nickname:this.nickName,roomId:this.roomId,message:'Joined the room',createdAt:new Date()});
        this.disconnected = false;
      }
    });
    this.socket.on(this.roomId, (message)=>{
      if(!this.disconnected){
        this.messages.push(message);
      }
    });
    this.socket.on('disconnect', ()=>{
      this.disconnected = true;
      this.title = "Disconnected";
      this.socket.emit(this.roomId,{nickname:this.nickName,roomId:this.roomId,message:'Left the room',createdAt:new Date()});
      this.addMessageToDatabase({nickname:this.nickName,roomId:this.roomId,message:'Left the room',createdAt:new Date()});
    });
  }

  sendMessage(e){
    let msgBody = e.target.value; 
    let message:Message = {
      nickname:this.nickName,
      roomId:this.roomId,
      message:msgBody,
      createdAt:new Date()
    };
    this.socket.emit(this.roomId,message);
    e.target.value = "";
    this.addMessageToDatabase(message);
  }

  addMessageToDatabase(message){
    this._chatService.addMessageToChat(message).subscribe(res => {
        this.messages.push(res.data);
    });
  }

  leaveTheRoom(){
    this.disconnected = true;
    this._router.navigate(["/home"]);
    this.socket.emit(this.roomId,{nickname:this.nickName,roomId:this.roomId,message:'Left the room',createdAt:new Date()});
    this.addMessageToDatabase({nickname:this.nickName,roomId:this.roomId,message:'Left the room',createdAt:new Date()});
  }
  
} 
