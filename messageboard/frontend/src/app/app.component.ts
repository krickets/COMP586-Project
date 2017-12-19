import { Component } from '@angular/core';
import { MessagesComponent } from './messages.component';
import { NewMessageComponent } from './new-message.component';
//import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import {NavComponent} from './nav.component';

@Component({
  selector: 'app-root',
  template: `
  <nav></nav>
  <h1>OUR STORE'S FORUM</h1>
  <body>Let us know what you think!</body>
  <router-outlet></router-outlet>
  `,
})
export class AppComponent 
{
  
}
