import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { MsalUserService } from "app/msaluser.service";

var url ='https://cognizantreflectapi.com/feedback/Feedback/';
var userUrl ='https://cognizantreflectapi.com/users/userdetails/';


@Injectable()
export class NotificationService {
    constructor(private httpClient: HttpClient,private msalService:MsalUserService) { }

    httpOptions = {  
        headers: new HttpHeaders({  
            'Content-Type': 'application/json',  
            'Authorization': 'Bearer ' + this.msalService.GetAccessToken()  
        })  
  
    }; 

    getNotificationsCount(userid:string)
    {
        return this.httpClient.get(url+"getNotificationsCount/"+userid,this.httpOptions);
    }

    getNotifications(user:any, start:any, count:any)
    {
        return this.httpClient.get(url+"getNotificationListForUser/"+user+"/"+start+"/"+count,this.httpOptions);

    }

    getRoleByUser(emailId:any)
    {
       return this.httpClient.get(userUrl+"getUser/"+emailId,this.httpOptions);
    }


    
}

