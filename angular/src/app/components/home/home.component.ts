import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  rooms:any[] = [];
  model:any = {
    nickName:"",
    roomId:0
  };
  errorMessage:string;

  constructor(private _chatService:ChatService,
              private _router:Router) {
  }

  ngOnInit() {
    this._chatService.getRooms().subscribe( (data:any) => {
      this.rooms = data.data;
    });
  }

  join(){
    if(this.model.nickName.trim() != "" && this.model.roomId != 0){
      this.errorMessage = null;
      this._router.navigate(["/room",this.model.roomId],{queryParams:{nickname:this.model.nickName}})
    }
    else{
      this.errorMessage = "Please Enter a nickname and choose a room";
    }
  }

}
