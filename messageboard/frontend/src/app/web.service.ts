import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {Subject} from 'rxjs/Rx';
import { AuthService } from './auth.service';
import {MatSnackBar} from '@angular/material'

@Injectable()
export class WebService 
{
    BASE_URL = 'http://localhost:53675/api';

    private messageStore = [];

    private messageSubject = new Subject();

    messages = this.messageSubject.asObservable();

    constructor(private http: Http, private sb : MatSnackBar, private auth: AuthService)
    {
        this.getMessages('');
    }

    getMessages(user)
    {
        if(user)
        {
            user = '/' + user;
        }
        else
        {
            user = '';
        }
        this.http.get(this.BASE_URL+'/messages'+user).subscribe(
        response => 
        {
            this.messageStore = response.json();
            this.messageSubject.next(this.messageStore);
        }, 
        error => 
        {
            this.handleError("Unable to get messages.");
        });        
    }

    async postMessage(message)
    {
        try 
        {
            var response = await this.http.post(this.BASE_URL+'/messages', message).toPromise();
            this.messageStore.push(response.json());
            this.messageSubject.next(this.messageStore);
        } catch (error) 
        {
            this.handleError("Unable to post message.");
        }
        
    }

    getUser()
    {
        return this.http.post(this.BASE_URL + '/users/me', this.auth.tokenHeader)
            .map(res => res.json());
    }

    saveUser(userData)
    {
        return this.http.post(this.BASE_URL + '/users/me', userData,
        this.auth.tokenHeader).map(res => res.json());
    }

    private handleError(error)
    {
        console.error(error);
        this.sb.open(error, 'close', {duration:1500})
    }
}