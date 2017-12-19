import { Component } from '@angular/core';
import {MessagesComponent} from './messages.component';
import {NewMessageComponent} from './new-message.component';
import {NavComponent} from './nav.component';

@Component({
  selector: 'home',
  template: `<mat-card>
  <new-message></new-message> 
  <messages></messages>
  </mat-card>
  `,
})
export class HomeComponent 
{
  
}
