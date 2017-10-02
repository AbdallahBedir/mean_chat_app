import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './components/chat/chat.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path:"room/:id",component:ChatComponent},
  {path:"home",component:HomeComponent},
  {path:"",component:HomeComponent,pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
